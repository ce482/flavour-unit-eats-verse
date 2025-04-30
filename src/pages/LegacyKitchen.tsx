
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LegacyKitchen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      </main>
      <Footer />
    </>
  );
};

export default LegacyKitchen;
