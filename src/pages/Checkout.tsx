import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSquareCustomer, createRetailOrder } from '@/integrations/square/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Loader2, 
  CheckCircle, 
  AlertTriangle, 
  Package, 
  InfoIcon 
} from 'lucide-react';
import { 
  EXCLUDED_STATES, 
  STATE_NAMES, 
  SHIPPING_METHODS,
  isShippingAllowed
} from '@/utils/shippingUtils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const customerFormSchema = z.object({
  customerName: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  customerEmail: z.string().email({ message: 'Please enter a valid email address' }),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(5, { message: 'Please enter a valid shipping address' }),
  city: z.string().min(2, { message: 'Please enter a valid city' }),
  state: z.string().refine(state => isShippingAllowed(state), {
    message: "We currently don't ship to this state due to extreme heat conditions"
  }),
  zipCode: z.string().min(5, { message: 'Please enter a valid ZIP/postal code' }),
  shippingMethod: z.enum(['standard', 'fedex_2day']),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [addressValidation, setAddressValidation] = useState<{
    valid: boolean;
    message: string;
    checked: boolean;
  }>({
    valid: false,
    message: '',
    checked: false,
  });
  
  const customerForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      shippingAddress: '',
      city: '',
      state: '',
      zipCode: '',
      shippingMethod: 'standard',
    },
  });

  // Watch for shipping method changes to calculate total
  const selectedShippingMethod = customerForm.watch('shippingMethod');
  const selectedState = customerForm.watch('state');
  const shippingCost = SHIPPING_METHODS[selectedShippingMethod].price;
  const orderTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    navigate('/egg-rolls');
    toast.error('Your cart is empty');
    return null;
  }

  // Sort states alphabetically and filter out excluded ones
  const availableStates = Object.entries(STATE_NAMES)
    .filter(([code]) => isShippingAllowed(code))
    .sort((a, b) => a[1].localeCompare(b[1]));

  const validateAddress = async (data: CustomerFormValues) => {
    setIsValidatingAddress(true);
    
    try {
      const { data: validationData, error } = await supabase.functions.invoke('validate-address', {
        body: {
          address: data.shippingAddress,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        }
      });

      if (error) {
        console.error('Error validating address:', error);
        setAddressValidation({
          valid: false,
          message: 'Could not validate address. Please check your information.',
          checked: true
        });
        return false;
      } else {
        setAddressValidation({
          valid: validationData.valid,
          message: validationData.message,
          checked: true
        });

        // If address is valid, we can update the form with formatted values
        if (validationData.valid && validationData.formattedAddress) {
          customerForm.setValue('shippingAddress', validationData.formattedAddress.address);
          customerForm.setValue('city', validationData.formattedAddress.city);
          customerForm.setValue('state', validationData.formattedAddress.state);
          customerForm.setValue('zipCode', validationData.formattedAddress.zipCode);
        }
        
        return validationData.valid;
      }
    } catch (error) {
      console.error('Error validating address:', error);
      setAddressValidation({
        valid: false,
        message: 'Could not validate address. Please check your information.',
        checked: true
      });
      return false;
    } finally {
      setIsValidatingAddress(false);
    }
  };

  const handleSquareCheckout = async (values: CustomerFormValues) => {
    setIsSubmitting(true);
    
    // Always validate the address first
    const isAddressValid = await validateAddress(values);
    
    // If the address is invalid, don't proceed with payment
    if (!isAddressValid) {
      setIsSubmitting(false);
      toast.error('Please correct your address before proceeding', {
        description: addressValidation.message
      });
      return;
    }

    try {
      toast.info('Processing your order...', {
        duration: 5000
      });
      
      // Format the full address
      const fullAddress = `${values.shippingAddress}, ${values.city}, ${values.state} ${values.zipCode}`;
      
      // 1. Create Square customer
      const customerResponse = await createSquareCustomer({
        contactName: values.customerName,
        contactEmail: values.customerEmail,
        contactPhone: values.customerPhone
      });
      
      if (!customerResponse.success || !customerResponse.customerId) {
        throw new Error("Failed to create customer in Square");
      }
      
      // 2. Create Square order with the customer ID
      const orderResponse = await createRetailOrder({
        customerId: customerResponse.customerId,
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhone: values.customerPhone,
        shippingAddress: fullAddress,
        shippingMethod: SHIPPING_METHODS[values.shippingMethod].name,
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      });
      
      if (!orderResponse.success) {
        throw new Error("Failed to create order in Square");
      }
      
      // Store checkout data in session storage for success page
      sessionStorage.setItem('checkout_details', JSON.stringify({
        orderTotal: orderTotal,
        items: items,
        shippingMethod: values.shippingMethod,
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        shippingAddress: fullAddress,
        orderId: orderResponse.orderId
      }));
      
      // Create payment session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          service: 'Chef Gang Food Products',
          customerName: values.customerName,
          customerEmail: values.customerEmail,
          // Convert price to cents for Square
          amount: Math.round(orderTotal * 100),
          // Include shipping method details
          shippingMethod: values.shippingMethod,
          shippingCost: shippingCost,
          // Include order ID to link payment to order
          orderId: orderResponse.orderId
        }
      });

      if (error) {
        console.error('Error creating payment session:', error);
        toast.error('Failed to create payment session', {
          description: error.message || 'Please try again later'
        });
        setIsSubmitting(false);
        return;
      }

      if (!data || !data.url) {
        toast.error('Invalid response from payment service', {
          description: 'Please try again or contact support'
        });
        console.error('Invalid payment data returned:', data);
        setIsSubmitting(false);
        return;
      }
      
      console.log('Redirecting to Square payment URL:', data.url);
      
      // Redirect to Square Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Failed to process order', {
        description: 'Please try again or contact support'
      });
      setIsSubmitting(false);
    }
  };

  // Watch form fields for address validation reset
  const shippingAddress = customerForm.watch('shippingAddress');
  const city = customerForm.watch('city');
  const zipCode = customerForm.watch('zipCode');

  // Reset validation status when address fields change
  React.useEffect(() => {
    if (addressValidation.checked) {
      setAddressValidation({
        valid: false,
        message: '',
        checked: false
      });
    }
  }, [shippingAddress, city, selectedState, zipCode]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20">
        <div className="container-wide">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-2">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {item.name} x {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <p>Subtotal</p>
                      <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <p>Shipping</p>
                      <p>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <p>Total</p>
                      <p>${orderTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Restriction Notice */}
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <div className="flex items-start">
                    <InfoIcon className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium text-amber-800">Shipping Restrictions</p>
                      <p className="text-sm text-amber-700 mt-1">
                        We currently don't ship to the following states due to extreme heat conditions:
                      </p>
                      <p className="text-sm font-medium text-amber-700 mt-1">
                        {EXCLUDED_STATES.map(code => STATE_NAMES[code]).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information Form */}
            <div className="lg:col-span-2 order-1 lg:order-1">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                
                <Form {...customerForm}>
                  <form onSubmit={customerForm.handleSubmit(handleSquareCheckout)} className="space-y-4">
                    <FormField
                      control={customerForm.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={customerForm.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={customerForm.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <h3 className="font-medium mb-3">Shipping Address</h3>
                    </div>

                    <FormField
                      control={customerForm.control}
                      name="shippingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={customerForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Chicago" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={customerForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableStates.map(([code, name]) => (
                                    <SelectItem key={code} value={code}>
                                      {name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={customerForm.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP/Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="60601" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Shipping Method Selection */}
                    <div className="pt-4">
                      <h3 className="font-medium mb-3">Shipping Method</h3>
                      <FormField
                        control={customerForm.control}
                        name="shippingMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-3"
                              >
                                {Object.entries(SHIPPING_METHODS).map(([key, method]) => (
                                  <div key={key} className={`flex items-start space-x-3 border p-4 rounded-md cursor-pointer ${field.value === key ? 'bg-gray-50 border-gray-300' : 'border-gray-200'}`}>
                                    <RadioGroupItem value={key} id={`shipping-${key}`} />
                                    <div className="flex-1">
                                      <div className="flex justify-between items-center">
                                        <label htmlFor={`shipping-${key}`} className="font-medium cursor-pointer flex items-center">
                                          {key === 'fedex_2day' && <Package className="h-4 w-4 mr-2 text-blue-600" />}
                                          {method.name}
                                        </label>
                                        <span className="font-semibold">
                                          {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Address Validation Feedback Section */}
                    {isValidatingAddress && (
                      <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-100">
                        <div className="flex items-center">
                          <Loader2 className="text-blue-600 mr-2 animate-spin" size={16} />
                          <span className="text-sm text-blue-700">
                            Validating your shipping address...
                          </span>
                        </div>
                      </div>
                    )}

                    {addressValidation.checked && !isValidatingAddress && (
                      <div className={`mt-4 p-3 rounded-md flex items-start ${addressValidation.valid ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                        {addressValidation.valid ? (
                          <CheckCircle className="text-green-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                        ) : (
                          <AlertTriangle className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                        )}
                        <span className={`text-sm ${addressValidation.valid ? 'text-green-700' : 'text-amber-700'}`}>
                          {addressValidation.message}
                        </span>
                      </div>
                    )}
                    
                    <div className="border rounded-md p-4 mt-4 bg-gray-50">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Note:</span> You will be redirected to Square's secure payment page to complete your purchase.
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-flavour-red hover:bg-red-700 mt-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isValidatingAddress ? "Validating Address..." : "Processing..."}
                        </>
                      ) : (
                        'Proceed to Payment'
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
