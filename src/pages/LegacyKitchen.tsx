
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { CheckCircle } from 'lucide-react';

const LegacyKitchen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gray-50">
          <div className="container-wide">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-flavour-black">Legacy Kitchen Solutions</h1>
              <h3 className="text-2xl mb-6">CULINARY INDUSTRY SOLUTIONS</h3>
            </div>
          </div>
        </section>

        {/* Company Background */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">COMPANY BACKGROUND AND DESCRIPTION</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Legacy Kitchen Solutions provide training, coaching and experienced guidance
                within the food industry sector. Our 23 years of expertise in food safety, food
                quality assurance, food production, and facilitating restaurant/foodservice
                operations advise food industry businesses and professionals on the
                development and improvement of their food service operations. We consult with
                restaurants, food producers, schools or any other food service facility within the
                Chicagoland area.
              </p>
            </div>
          </div>
        </section>

        {/* Project Description */}
        <section className="py-20 bg-flavour-cream">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">PROJECT DESCRIPTION</h2>
              <p className="text-lg mb-6">Legacy Kitchen Solutions capabilities include:</p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                  <span>Early to Advance stage Food Industry Entrepreneurs Cohort</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                  <span>Identifying your competitive advantage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                  <span>Cost and Pricing (Wholesale and Product based Entrepreneurs)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                  <span>Creating Your Pitch</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                  <span>Licensing, Certifications and Trademarking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                  <span>Food Industry Trends</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                  <span>Brand Identity vs The Business or Product</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                  <span>Go to market strategy or for advanced businesses Scale up market strategy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                  <span>Legal and Finance (Book keeping, accounting)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services And Cost */}
        <section id="services" className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">SERVICES AND COST</h2>
                <ul className="space-y-6 text-lg">
                  <li className="flex items-start">
                    <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                    <span>Full Semester Instructor - $7,700 (8 hours per student)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                    <span>Includes, Cohort promotion, Recruitment, Orientation for up to 22 students</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                    <span>4 weeks (2 hour) guided food industry Entrepreneur curriculum</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                    <span>Assistance with Cohort recruitment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                    <span>1 (2 hour) guided in-person activity TBD</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                    <span>Graded homework if required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                    <span>Certificate of Completion ceremony</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-8">PAYMENT</h2>
                <ul className="space-y-6 text-lg">
                  <li className="flex items-start">
                    <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                    <span>Payment- Bi- Weekly via check, Square, Quickbooks payable to The Flavour Unit Corp or Javon McCain Nicholas.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-10 bg-gray-100">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-center md:text-left">
              <div>
                <span className="font-bold">Javon Nicholas</span>
              </div>
              <div className="mx-2 hidden md:block">|</div>
              <div>
                <span className="font-bold">Legacy Kitchen Solutions</span>
              </div>
              <div className="mx-2 hidden md:block">|</div>
              <div>
                <span className="font-bold">844.434.4765</span>
              </div>
              <div className="mx-2 hidden md:block">|</div>
              <div>
                <span className="font-bold">
                  <a href="mailto:Legacykitchensolutions@gmail.com" className="hover:underline hover:text-flavour-red transition-colors">
                    Legacykitchensolutions@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LegacyKitchen;
