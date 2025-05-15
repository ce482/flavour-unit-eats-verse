
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { createSquareCustomer, createSquareOrder } from "@/integrations/square/client";

// Form validation schema
const formSchema = z.object({
  business_name: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  business_type: z.string().min(2, { message: "Please specify your business type." }),
  contact_name: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  contact_email: z.string().email({ message: "Please enter a valid email address." }),
  contact_phone: z.string().optional(),
  daily_weekly_volume: z.string().min(1, { message: "Please specify your volume." }),
  expected_ordering_volume: z.string().min(1, { message: "Please specify your expected ordering volume." }),
  interested_product_line: z.string().min(1, { message: "Please specify which product line you're interested in." }),
  accepts_minimum_order: z.boolean(),
  pickup_issue: z.boolean(),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Wholesale = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: "",
      business_type: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      daily_weekly_volume: "",
      expected_ordering_volume: "",
      interested_product_line: "",
      accepts_minimum_order: false,
      pickup_issue: false,
      comments: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      console.log("Submitting form data:", data);
      
      // First, create a customer in Square
      const customerResult = await createSquareCustomer({
        businessName: data.business_name,
        contactEmail: data.contact_email,
        contactName: data.contact_name,
        contactPhone: data.contact_phone || undefined,
      });
      
      if (!customerResult.success || !customerResult.customerId) {
        console.error("Customer creation failed:", customerResult);
        throw new Error(customerResult.error?.message || "Failed to create customer in Square");
      }
      
      console.log("Customer created successfully:", customerResult);
      
      // Then, create an order with the wholesale inquiry details
      const orderResult = await createSquareOrder({
        customerId: customerResult.customerId,
        businessName: data.business_name,
        businessType: data.business_type,
        interestedProductLine: data.interested_product_line,
        acceptsMinimumOrder: data.accepts_minimum_order,
        pickupIssue: data.pickup_issue,
        dailyWeeklyVolume: data.daily_weekly_volume,
        expectedOrderingVolume: data.expected_ordering_volume,
        comments: data.comments || "",
      });
      
      if (!orderResult.success) {
        console.error("Order creation failed:", orderResult);
        throw new Error(orderResult.error?.message || "Failed to create order in Square");
      }
      
      console.log("Order created successfully:", orderResult);
      
      // Show success message
      toast.success("Thank you for your interest! We'll be in touch soon with wholesale pricing information.");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error instanceof Error ? error.message : "Failed to submit form. Please try again or contact us directly.");
      toast.error("Failed to submit form. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Wholesale Partnership</h1>
              <p className="text-lg text-gray-600">
                Interested in carrying our products in your business? Fill out the form below to receive 
                wholesale pricing and partnership information.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
                {submitError && (
                  <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
                    <p className="font-medium">Error submitting form</p>
                    <p>{submitError}</p>
                    <p className="mt-2">If this error persists, please contact us directly at <a href="mailto:info@yourcompany.com" className="underline">info@yourcompany.com</a>.</p>
                  </div>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="business_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Your business name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="business_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Type*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Restaurant, Retail, Catering" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contact_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contact_email"
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
                    </div>

                    <FormField
                      control={form.control}
                      name="contact_phone"
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
                      name="daily_weekly_volume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Daily or Weekly Volume*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 50 units daily" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expected_ordering_volume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Ordering Volume*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 10 cases per week" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interested_product_line"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Line Interested In*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Egg Rolls, Le Petit Déjeuner" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accepts_minimum_order"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              There is a 4 case minimum order, would that be ok?*
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pickup_issue"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              We do not deliver, our location is at 5801 W Dickens Ave, would pickup be an issue?*
                            </FormLabel>
                            <FormDescription>
                              Check if pickup would be an issue for your business
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Comments</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any additional information or questions" 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 space-y-2">
                      <p>* All wholesale orders must be placed at least 48 hours prior to pickup, late order fees could be applied.</p>
                      <p>* All flavors/product names are trademarked and cannot be altered.</p>
                      <p>* We reserve the right to end or not operate a wholesale partnership at any time.</p>
                      <p>* Prices are subject to change without prior or further notice.</p>
                      <p>* Wholesale partnerships are intended for approved vendors only.</p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-red-600 hover:bg-red-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Wholesale Inquiry"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Wholesale;
