
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
import { createCheckout } from "@/integrations/square/client";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
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

// Updated shipping options based on the SHIPPING_METHODS from utils
const shippingOptions = [
  { value: "standard", label: `${SHIPPING_METHODS.standard.name} - ${SHIPPING_METHODS.standard.description}` },
  { value: "fedex_2day", label: `${SHIPPING_METHODS.fedex_2day.name} - ${SHIPPING_METHODS.fedex_2day.description}` },
];

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart, calculateTotals } = useCart();
  const cartTotals = calculateTotals();
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      shipping: "",
    },
  });

  // Submit order function
  const submitOrder = async (values: CheckoutFormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      // Verify cart has items
      if (items.length === 0) {
        throw new Error("Your cart is empty");
      }
      
      console.log("Processing checkout with values:", values);
      
      // Create checkout - note the call to createCheckout with no arguments
      const checkoutResponse = await createCheckout();
      
      if (!checkoutResponse.success) {
        console.error("Failed to create checkout:", checkoutResponse);
        throw new Error(checkoutResponse.error || "Unknown error occurred during checkout");
      }
      
      console.log("Checkout created successfully:", checkoutResponse);
      
      // Clear cart
      clearCart();
      
      // Show message instead of redirecting since checkout is disabled
      toast.success("Order submitted", { 
        description: "Order processing is currently disabled."
      });
      
      // Redirect to confirmation page
      navigate("/order-confirmation");
      
    } catch (error) {
      console.error('Error submitting order:', error);
      
      // More descriptive error message
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setSubmitError(errorMessage);
      
      toast.error("Checkout Error", {
        description: errorMessage
      });
      
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
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
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
                  <div className="flex justify-between font-semibold py-2 border-b">
                    <span>Shipping</span>
                    <span>${cartTotals.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold py-2">
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
                {isSubmitting ? "Processing..." : "Place Order"}
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
