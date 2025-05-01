
import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LegacyKitchen = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePayment = async () => {
    if (!customerName || !customerEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!customerEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          service: 'Legacy Kitchen Solutions - Full Semester',
          customerName,
          customerEmail,
          amount: 770000, // $7,700.00 in cents
        },
      });

      if (error) {
        console.error('Payment error:', error);
        toast.error('Payment could not be processed');
        setIsProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error('Payment could not be processed');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment could not be processed');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-wide">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-flavour-black animate-fade-in">
                Legacy Kitchen Solutions
              </h1>
              <div className="w-32 h-1 bg-flavour-red mx-auto mb-8"></div>
              <h3 className="text-xl md:text-2xl text-flavour-brown font-medium">
                CULINARY INDUSTRY SOLUTIONS
              </h3>
            </div>
          </div>
        </section>

        {/* Company Background */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">
                <span className="relative inline-block pb-2 border-b-2 border-flavour-gold px-4">
                  COMPANY BACKGROUND
                </span>
              </h2>
              <Card className="bg-gray-50 shadow-md overflow-hidden border-t-4 border-t-flavour-red">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Legacy Kitchen Solutions provide training, coaching and experienced guidance
                    within the food industry sector. Our 23 years of expertise in food safety, food
                    quality assurance, food production, and facilitating restaurant/foodservice
                    operations advise food industry businesses and professionals on the
                    development and improvement of their food service operations. We consult with
                    restaurants, food producers, schools or any other food service facility within the
                    Chicagoland area.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20 bg-flavour-cream">
          <div className="container-wide">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="relative inline-block pb-2 border-b-2 border-flavour-red px-4">
                  CAPABILITIES
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {[
                    "Early to Advance stage Food Industry Entrepreneurs Cohort",
                    "Identifying your competitive advantage",
                    "Cost and Pricing (Wholesale and Product based Entrepreneurs)",
                    "Creating Your Pitch",
                    "Licensing, Certifications and Trademarking"
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start bg-white p-5 rounded-lg shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
                    >
                      <CheckCircle className="text-flavour-red mr-4 shrink-0 mt-1" size={22} />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[
                    "Food Industry Trends",
                    "Brand Identity vs The Business or Product",
                    "Go to market strategy or for advanced businesses Scale up market strategy",
                    "Legal and Finance (Book keeping, accounting)"
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start bg-white p-5 rounded-lg shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
                    >
                      <CheckCircle className="text-flavour-red mr-4 shrink-0 mt-1" size={22} />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services And Cost */}
        <section id="services" className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="relative inline-block pb-2 border-b-2 border-flavour-gold px-4">
                  OUR SERVICES
                </span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Card className="border-t-4 border-t-flavour-red shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center text-flavour-black">
                      SERVICES AND COST
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Full Semester Instructor - $7,700 (8 hours per student)",
                        "Includes, Cohort promotion, Recruitment, Orientation for up to 22 students",
                        "4 weeks (2 hour) guided food industry Entrepreneur curriculum",
                        "Assistance with Cohort recruitment",
                        "1 (2 hour) guided in-person activity TBD",
                        "Graded homework if required",
                        "Certificate of Completion ceremony"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Pay Now button removed */}
                  </CardContent>
                </Card>
                
                <Card className="border-t-4 border-t-flavour-gold shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center text-flavour-black">
                      PAYMENT DETAILS
                    </h3>
                    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="text-flavour-gold mr-3 shrink-0 mt-1" size={20} />
                      <p className="text-lg">
                        Payment- Bi- Weekly via check, Square, Quickbooks payable to The Flavour Unit Corp or Javon McCain Nicholas.
                      </p>
                    </div>
                    
                    <div className="mt-8 p-4 border border-dashed border-gray-300 rounded-lg">
                      <h4 className="font-bold mb-2">Secure Online Payment</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        You can now pay securely online with credit card. All payments are processed through Stripe, a secure payment processor.
                      </p>
                      {/* Add to Cart button instead of direct payment */}
                      <Button 
                        onClick={() => {
                          // Create Legacy Kitchen Solutions as a product and add to cart
                          const legacyKitchenProduct = {
                            id: 999, // Use a unique ID that won't conflict with other products
                            name: "Legacy Kitchen Solutions - Full Semester",
                            price: 7700, // $7,700
                            image: "/lovable-uploads/7007a267-bc2e-4f8b-a678-0bf4225fbc9c.png" // Use a generic image
                          };
                          
                          import('@/contexts/CartContext').then(module => {
                            const { useCart } = module;
                            const { addItem, openCart } = useCart();
                            
                            addItem(legacyKitchenProduct);
                            openCart();
                            toast.success('Legacy Kitchen Solutions added to cart');
                          }).catch(err => {
                            console.error('Error importing cart context:', err);
                            toast.error('Could not add to cart');
                          });
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-gray-100">
          <div className="container-wide">
            <Card className="max-w-4xl mx-auto shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                  <div>
                    <p className="font-bold text-lg">Javon Nicholas</p>
                    <p className="text-gray-500">Legacy Kitchen Solutions</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                    <p className="font-bold text-lg">844.434.4765</p>
                    <div className="hidden md:block w-1 h-6 bg-gray-300"></div>
                    <a 
                      href="mailto:Legacykitchensolutions@gmail.com" 
                      className="text-flavour-red hover:underline font-bold text-lg"
                    >
                      Legacykitchensolutions@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Payment Modal */}
        <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Complete Your Payment</DialogTitle>
              <DialogDescription>
                Enter your details below to proceed with the payment of $7,700 for Legacy Kitchen Solutions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsPaymentModalOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePayment}
                className="bg-flavour-red hover:bg-red-700"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </>
  );
};

export default LegacyKitchen;
