
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createSquareCustomer, createRetailOrder } from "@/integrations/square/client";
import { SHIPPING_METHODS } from "@/utils/shippingUtils";

// Define the checkout form schema
const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().regex(/^\d{5}(?:-\d{4})?$/, { message: "Please enter a valid ZIP code." }),
  shipping: z.string().min(1, { message: "Please select a shipping option." }),
});

// Use the shipping options from shippingUtils
const shippingOptions = [
  { value: "standard", label: SHIPPING_METHODS.standard.description },
  { value: "fedex_2day", label: SHIPPING_METHODS.fedex_2day.description },
];

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  shippingMethod: string;
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart, totalPrice } = useCart();
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  
  // Calculate order totals with the proper shipping cost
  const calculateTotals = () => {
    const subtotal = totalPrice || 0;
    const selectedShippingMethod = form.watch("shipping") || "standard";
    const shipping = SHIPPING_METHODS[selectedShippingMethod as keyof typeof SHIPPING_METHODS]?.price || SHIPPING_METHODS.standard.price;
    const taxRate = 0.0625; // Example tax rate (6.25%)
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;
    
    return {
      subtotal,
      shippingCost: shipping,
      tax,
      total
    };
  };

  // Initialize form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      shipping: "standard", // Default to standard shipping
    },
  });
  
  const cartTotals = calculateTotals();

  // Submit order function using Square
  const submitOrder = async (values: z.infer<typeof checkoutFormSchema>) => {
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      // Create the customer in Square
      const customerResponse = await createSquareCustomer({
        contactName: `${values.firstName} ${values.lastName}`,
        contactEmail: values.email,
        contactPhone: values.phone
      });

      if (!customerResponse.success || !customerResponse.customerId) {
        throw new Error("Failed to create customer record");
      }
      
      // Get the selected shipping method data
      const shippingMethodKey = values.shipping as keyof typeof SHIPPING_METHODS;
      const shippingMethodName = SHIPPING_METHODS[shippingMethodKey]?.name || SHIPPING_METHODS.standard.name;
      
      // Create the order in Square
      const orderResponse = await createRetailOrder({
        customerId: customerResponse.customerId,
        customerName: `${values.firstName} ${values.lastName}`,
        customerEmail: values.email,
        customerPhone: values.phone,
        shippingAddress: `${values.address}, ${values.city}, ${values.state} ${values.zipCode}`,
        shippingMethod: shippingMethodName,
        items: items
      });
      
      if (!orderResponse.success) {
        throw new Error("Failed to create order");
      }
      
      // Store order info for confirmation page
      setOrderDetails({
        orderId: orderResponse.orderId || "unknown",
        customerName: `${values.firstName} ${values.lastName}`,
        customerEmail: values.email,
        customerPhone: values.phone,
        shippingAddress: `${values.address}, ${values.city}, ${values.state} ${values.zipCode}`,
        shippingMethod: shippingMethodName,
        items: items,
        subtotal: cartTotals.subtotal,
        shipping: cartTotals.shippingCost,
        tax: cartTotals.tax,
        total: cartTotals.total
      });
      
      // Clear cart
      clearCart();
      
      // Redirect to confirmation
      navigate('/order-confirmation');
      
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container-wide">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          {submitError && (
            <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
              <p className="font-medium">Error submitting order</p>
              <p>{submitError}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitOrder)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormDescription>Optional</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City*</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State*</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code*</FormLabel>
                      <FormControl>
                        <Input placeholder="ZIP Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="shipping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Option*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a shipping option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shippingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="border rounded-md p-4">
                  <ul>
                    {items.map((item) => (
                      <li key={item.id} className="flex justify-between py-2">
                        <span>{item.name} ({item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between font-semibold py-2 border-t">
                    <span>Subtotal</span>
                    <span>${cartTotals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold py-2">
                    <span>Shipping</span>
                    <span>${cartTotals.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold py-2">
                    <span>Tax</span>
                    <span>${cartTotals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold py-2 border-t">
                    <span>Total</span>
                    <span>${cartTotals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full md:w-auto bg-red-600 hover:bg-red-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Place Order"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
