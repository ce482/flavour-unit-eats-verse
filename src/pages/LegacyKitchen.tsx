
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { CheckCircle, Users, TrendingUp, Building, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegacyKitchen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Business Strategy",
      description: "Develop a solid foundation for your food business with strategic planning, market analysis, and growth roadmaps.",
      icon: <TrendingUp className="text-flavour-red" size={36} />,
    },
    {
      title: "Recipe Development",
      description: "Create scalable recipes that maintain quality while increasing production volume for commercial applications.",
      icon: <CheckCircle className="text-flavour-red" size={36} />,
    },
    {
      title: "Production Scaling",
      description: "Learn how to scale your food production from kitchen to commercial facilities while maintaining quality and efficiency.",
      icon: <Building className="text-flavour-red" size={36} />,
    },
    {
      title: "Food Business Mentorship",
      description: "One-on-one coaching to navigate the challenges of starting and growing a successful food business.",
      icon: <Users className="text-flavour-red" size={36} />,
    }
  ];

  const testimonials = [
    {
      quote: "Legacy Kitchen Solutions helped me transform my family's secret sauce recipe into a successful product line. Their guidance on scaling production and navigating regulatory requirements was invaluable.",
      author: "Marcus W.",
      business: "Sweet Heat Sauces"
    },
    {
      quote: "As a first-time food entrepreneur, I had so many questions. The mentorship program gave me clear direction and helped me avoid costly mistakes. Now my bakery is thriving!",
      author: "Tara L.",
      business: "Cloud Nine Pastries"
    },
    {
      quote: "The team at Legacy Kitchen Solutions understands the unique challenges of the food industry. Their practical advice and hands-on approach made all the difference for my business.",
      author: "David R.",
      business: "Farm Fresh Meals"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gray-50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-flavour-black">Legacy Kitchen Solutions</h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Expert coaching and consulting for small food businesses. We help entrepreneurs navigate challenges and scale their operations from concept to market.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#services" className="btn-primary">
                    Our Services
                  </a>
                  <a href="#contact-form" className="btn-outline">
                    Schedule a Consultation
                  </a>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Food business consulting" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From concept development to market launch, we provide comprehensive support for food entrepreneurs at every stage of their journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg flex">
                  <div className="mr-6 mt-1">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-flavour-cream">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Approach</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We use a proven methodology to help food entrepreneurs build sustainable, profitable businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white p-8 rounded-lg h-full shadow-sm">
                  <div className="w-12 h-12 bg-flavour-red text-white rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Assessment</h3>
                  <p className="text-gray-600 mb-4">
                    We begin with a comprehensive evaluation of your business concept, current operations, target market, and goals to identify strengths and areas for improvement.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight size={32} className="text-flavour-gold" />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white p-8 rounded-lg h-full shadow-sm">
                  <div className="w-12 h-12 bg-flavour-red text-white rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Strategy Development</h3>
                  <p className="text-gray-600 mb-4">
                    Based on our assessment, we create a customized strategy that addresses your specific challenges and leverages your unique advantages in the marketplace.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight size={32} className="text-flavour-gold" />
                </div>
              </div>
              
              {/* Step 3 */}
              <div>
                <div className="bg-white p-8 rounded-lg h-full shadow-sm">
                  <div className="w-12 h-12 bg-flavour-red text-white rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Implementation & Growth</h3>
                  <p className="text-gray-600 mb-4">
                    We work alongside you to implement the strategy, providing ongoing support, adjustments, and mentorship as your business grows and evolves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm">
                  <svg className="w-12 h-12 text-flavour-gold mb-6" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6667 12.6667C10.6667 11.2 9.46666 10 8.00001 10C6.53334 10 5.33334 11.2 5.33334 12.6667C5.33334 14.1333 6.53334 15.3333 8.00001 15.3333C8.26667 15.3333 8.53334 15.2933 8.78001 15.2133C8.63334 16.48 7.83334 17.6267 6.66668 18.2533C6.20001 18.5067 6.00001 19.08 6.25334 19.5467C6.50668 20.0133 7.08001 20.2133 7.54668 19.96C9.61334 18.8533 10.9467 16.6133 10.6667 14.1733V12.6667ZM21.3333 12.6667C21.3333 11.2 20.1333 10 18.6667 10C17.2 10 16 11.2 16 12.6667C16 14.1333 17.2 15.3333 18.6667 15.3333C18.9333 15.3333 19.2 15.2933 19.4467 15.2133C19.3 16.48 18.5 17.6267 17.3333 18.2533C16.8667 18.5067 16.6667 19.08 16.92 19.5467C17.1733 20.0133 17.7467 20.2133 18.2133 19.96C20.28 18.8533 21.6133 16.6133 21.3333 14.1733V12.6667Z"></path>
                  </svg>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-gray-500">{testimonial.business}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consulting Packages */}
        <section className="py-20 bg-gray-50">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="section-title">Consulting Packages</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the level of support that's right for your business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Package 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6 bg-flavour-red text-white text-center">
                  <h3 className="text-2xl font-bold">Starter Package</h3>
                  <p className="mt-2">For new food entrepreneurs</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>2-hour initial consultation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Business concept evaluation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Basic market analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>30-day email support</span>
                    </li>
                  </ul>
                  <a href="#contact-form" className="btn-outline w-full block text-center">
                    Get Started
                  </a>
                </div>
              </div>
              
              {/* Package 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border-2 border-flavour-gold transform scale-105 relative z-10">
                <div className="absolute top-0 right-0 bg-flavour-gold text-white px-4 py-1 text-sm font-bold uppercase">
                  Most Popular
                </div>
                <div className="p-6 bg-flavour-red text-white text-center">
                  <h3 className="text-2xl font-bold">Growth Package</h3>
                  <p className="mt-2">For established businesses looking to expand</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Comprehensive business assessment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Customized growth strategy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>3 monthly strategy sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Production scaling guidance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>90-day email & phone support</span>
                    </li>
                  </ul>
                  <a href="#contact-form" className="btn-primary w-full block text-center">
                    Get Started
                  </a>
                </div>
              </div>
              
              {/* Package 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6 bg-flavour-red text-white text-center">
                  <h3 className="text-2xl font-bold">Executive Package</h3>
                  <p className="mt-2">For comprehensive business transformation</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>All Growth Package features</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>6-month partnership</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Bi-weekly strategy sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Access to industry network</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Priority access to new resources</span>
                    </li>
                  </ul>
                  <a href="#contact-form" className="btn-outline w-full block text-center">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="section-title">Schedule a Consultation</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Ready to take your food business to the next level? Fill out the form below, and we'll get back to you within 24 hours to schedule your consultation.
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name (if applicable)
                    </label>
                    <input
                      type="text"
                      id="business"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">
                      Interested In
                    </label>
                    <select
                      id="package"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                    >
                      <option value="">Select a package</option>
                      <option value="starter">Starter Package</option>
                      <option value="growth">Growth Package</option>
                      <option value="executive">Executive Package</option>
                      <option value="other">Other/Not Sure Yet</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Tell us about your business and goals
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary w-full">
                    Submit Request
                  </button>
                </form>
              </div>
              
              <div className="flex items-center">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" 
                    alt="Food business consulting" 
                    className="rounded-lg shadow-lg mb-8"
                  />
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Why Work With Us?</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                        <span>Real-world experience in the food industry</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                        <span>Proven track record of helping businesses grow</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                        <span>Tailored strategies for your specific goals</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                        <span>Network of industry contacts and resources</span>
                      </li>
                    </ul>
                  </div>
                </div>
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
