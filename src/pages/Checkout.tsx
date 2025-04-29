
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

const customerFormSchema = z.object({
  customerName: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  customerEmail: z.string().email({ message: 'Please enter a valid email address' }),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(5, { message: 'Please enter a valid shipping address' }),
  city: z.string().min(2, { message: 'Please enter a valid city' }),
  state: z.string().min(2, { message: 'Please enter a valid state' }),
  zipCode: z.string().min(5, { message: 'Please enter a valid ZIP/postal code' }),
});

const paymentFormSchema = z.object({
  cardholderName: z.string().min(2, { message: 'Please enter the cardholder name' }),
  cardNumber: z.string()
    .min(13, { message: 'Card number must be between 13-19 digits' })
    .max(19)
    .refine((val) => /^[0-9]+$/.test(val), { message: 'Card number must contain only digits' }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, { message: 'Please use format MM/YY' }),
  cvv: z.string()
    .min(3, { message: 'CVV must be 3-4 digits' })
    .max(4)
    .refine((val) => /^[0-9]+$/.test(val), { message: 'CVV must contain only digits' }),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;
type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'customer' | 'payment'>('customer');

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

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  if (items.length === 0) {
    navigate('/egg-rolls');
    toast.error('Your cart is empty');
    return null;
  }

  const onCustomerSubmit = (values: CustomerFormValues) => {
    setCurrentStep('payment');
  };

  const onPaymentSubmit = async (values: PaymentFormValues) => {
    setIsSubmitting(true);

    try {
      const customerData = customerForm.getValues();
      const fullAddress = `${customerData.shippingAddress}, ${customerData.city}, ${customerData.state} ${customerData.zipCode}`;
      
      const orderData = {
        customer_name: customerData.customerName,
        customer_email: customerData.customerEmail,
        customer_phone: customerData.customerPhone || null,
        shipping_address: fullAddress,
        order_status: 'pending',
        payment_status: 'paid', // In a real application, this would depend on actual payment processing
        total_amount: totalPrice,
        user_id: user?.id || null,
      };

      const orderItems = items.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      await createOrder.mutateAsync({
        orderData,
        items: orderItems,
      });

      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format credit card number with spaces
  const formatCreditCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };

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
              {currentStep === 'customer' ? (
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                  
                  <Form {...customerForm}>
                    <form onSubmit={customerForm.handleSubmit(onCustomerSubmit)} className="space-y-4">
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
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-flavour-red hover:bg-red-700 mt-6"
                      >
                        Continue to Payment
                      </Button>
                    </form>
                  </Form>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Payment Information</h2>
                    <Button 
                      variant="ghost" 
                      onClick={() => setCurrentStep('customer')}
                    >
                      Back
                    </Button>
                  </div>

                  <Form {...paymentForm}>
                    <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                      <FormField
                        control={paymentForm.control}
                        name="cardholderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={paymentForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="1234 5678 9012 3456"
                                value={formatCreditCardNumber(field.value)}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={paymentForm.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date (MM/YY)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="MM/YY" 
                                  maxLength={5}
                                  value={formatExpiryDate(field.value)}
                                  onChange={(e) => field.onChange(e.target.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={paymentForm.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input 
                                  type="text" 
                                  placeholder="123"
                                  maxLength={4}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="border rounded-md p-4 mt-4 bg-gray-50">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Note:</span> This is a demo application. No actual payment will be processed, 
                          and your credit card information is not stored.
                        </p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-flavour-red hover:bg-red-700 mt-6"
                        disabled={isSubmitting || items.length === 0}
                      >
                        {isSubmitting ? 'Processing...' : 'Place Order'}
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
