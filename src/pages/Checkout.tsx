
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

const customerFormSchema = z.object({
  customerName: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  customerEmail: z.string().email({ message: 'Please enter a valid email address' }),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(5, { message: 'Please enter a valid shipping address' }),
  city: z.string().min(2, { message: 'Please enter a valid city' }),
  state: z.string().min(2, { message: 'Please enter a valid state' }),
  zipCode: z.string().min(5, { message: 'Please enter a valid ZIP/postal code' }),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'customer'>('customer');
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
      customerName: user?.user_metadata?.full_name || '',
      customerEmail: user?.email || '',
      customerPhone: '',
      shippingAddress: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  if (items.length === 0) {
    navigate('/egg-rolls');
    toast.error('Your cart is empty');
    return null;
  }

  const validateAddress = async (data: CustomerFormValues) => {
    setIsValidatingAddress(true);
    setAddressValidation(prev => ({ ...prev, checked: true }));
    
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
      }
    } catch (error) {
      console.error('Error validating address:', error);
      setAddressValidation({
        valid: false,
        message: 'Could not validate address. Please check your information.',
        checked: true
      });
    } finally {
      setIsValidatingAddress(false);
    }
  };

  const handleStripeCheckout = async (values: CustomerFormValues) => {
    // If we haven't validated the address yet, do it now
    if (!addressValidation.checked) {
      await validateAddress(values);
      
      // If the address is invalid, don't proceed
      if (!addressValidation.valid) {
        toast.error('Please correct your address before proceeding.');
        return;
      }
    }
    
    // If address validation was checked and is not valid, don't proceed
    if (addressValidation.checked && !addressValidation.valid) {
      toast.error('Please correct your address before proceeding.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order details for Stripe
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          service: 'Chef Gang Food Products',
          customerName: values.customerName,
          customerEmail: values.customerEmail,
          // Convert price to cents for Stripe
          amount: Math.round(totalPrice * 100)
        }
      });

      if (error) {
        console.error('Error creating payment session:', error);
        toast.error('Failed to create payment session');
        setIsSubmitting(false);
        return;
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        toast.error('Invalid response from payment service');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment');
      setIsSubmitting(false);
    }
  };

  // Watch form fields for address validation
  const shippingAddress = customerForm.watch('shippingAddress');
  const city = customerForm.watch('city');
  const state = customerForm.watch('state');
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
  }, [shippingAddress, city, state, zipCode]);

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
                      <p>Free</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <p>Total</p>
                      <p>${totalPrice.toFixed(2)}</p>
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
                  <form onSubmit={customerForm.handleSubmit(handleStripeCheckout)} className="space-y-4">
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
                              <Input placeholder="IL" {...field} />
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
                    
                    {/* Address Validation Section */}
                    <div className="mt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          const values = customerForm.getValues();
                          validateAddress(values);
                        }}
                        disabled={isValidatingAddress || 
                          !customerForm.getValues().shippingAddress || 
                          !customerForm.getValues().city || 
                          !customerForm.getValues().state || 
                          !customerForm.getValues().zipCode}
                        className="w-full"
                      >
                        {isValidatingAddress ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Validating Address...
                          </>
                        ) : (
                          'Validate Address'
                        )}
                      </Button>
                      
                      {addressValidation.checked && (
                        <div className={`mt-2 p-3 rounded-md flex items-start ${addressValidation.valid ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
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
                    </div>
                    
                    <div className="border rounded-md p-4 mt-4 bg-gray-50">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Note:</span> You will be redirected to Stripe's secure payment page to complete your purchase.
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-flavour-red hover:bg-red-700 mt-6"
                      disabled={isSubmitting || (addressValidation.checked && !addressValidation.valid)}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
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
