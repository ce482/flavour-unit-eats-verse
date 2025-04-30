
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { CheckCircle, Calendar, TrendingUp, Building, Users, Star, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegacyKitchen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Accelerator Program",
      description: "A comprehensive program designed to help food entrepreneurs scale their businesses through hands-on guidance and strategic planning.",
      icon: <TrendingUp className="text-flavour-red" size={36} />,
    },
    {
      title: "Mentorship",
      description: "One-on-one coaching with experienced industry professionals to navigate the complexities of the food business landscape.",
      icon: <Users className="text-flavour-red" size={36} />,
    },
    {
      title: "Production Scaling",
      description: "Learn how to efficiently scale your food production while maintaining product quality and consistency.",
      icon: <Building className="text-flavour-red" size={36} />,
    },
    {
      title: "Resource Access",
      description: "Gain access to our extensive network of industry contacts, from suppliers to distributors and retail partners.",
      icon: <Star className="text-flavour-red" size={36} />,
    }
  ];

  const acceleratorBenefits = [
    "Comprehensive business assessment and strategy development",
    "Production scaling guidance and support",
    "Marketing and branding expertise",
    "Access to our expansive network of industry contacts",
    "Product optimization and refinement",
    "Guidance on regulatory compliance and food safety",
    "Financial modeling and funding strategy support",
    "Retail and distribution roadmap creation"
  ];

  const testimonials = [
    {
      quote: "Legacy Kitchen Solutions helped me transform my family's secret sauce recipe into a successful product line. Their guidance on scaling production and navigating regulatory requirements was invaluable.",
      author: "Marcus W.",
      business: "Sweet Heat Sauces"
    },
    {
      quote: "As a first-time food entrepreneur, I had so many questions. The accelerator program gave me clear direction and helped me avoid costly mistakes. Now my bakery is thriving!",
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
                  We empower food entrepreneurs to transform their recipes into successful businesses through our accelerator program, 
                  mentorship, and industry expertise. Let us help you navigate the journey from concept to sustainable growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#accelerator" className="btn-primary">
                    Our Accelerator Program
                  </a>
                  <a href="#contact-form" className="btn-outline">
                    Apply Now
                  </a>
                </div>
              </div>
              <div>
                <img 
                  src="/lovable-uploads/our_story.jpg" 
                  alt="Legacy Kitchen Solutions" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="section-title">How We Help Food Entrepreneurs</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive support tailored to the unique challenges of bringing food products to market successfully.
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

        {/* Accelerator Program */}
        <section id="accelerator" className="py-20 bg-flavour-cream">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Accelerator Program</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Legacy Kitchen Solutions Accelerator is a comprehensive program designed to guide food entrepreneurs 
                  from idea to market-ready products. Our hands-on approach combines industry expertise with practical 
                  guidance to help you avoid common pitfalls and accelerate growth.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Calendar className="text-flavour-red mr-2" />
                    Program Details
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={18} />
                      <span><strong>Duration:</strong> 6-month intensive program</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={18} />
                      <span><strong>Format:</strong> Combination of group sessions and one-on-one mentoring</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={18} />
                      <span><strong>Cohort Size:</strong> Limited to 5-8 businesses per cohort</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={18} />
                      <span><strong>Location:</strong> Chicago-based with virtual options available</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Award className="text-flavour-red mr-2" />
                    Program Benefits
                  </h3>
                  <ul className="space-y-3">
                    {acceleratorBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Approach</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We follow a proven methodology to help food entrepreneurs build sustainable, profitable businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm relative h-full">
                <div className="w-12 h-12 bg-flavour-red text-white rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Assessment</h3>
                <p className="text-gray-600">
                  Comprehensive evaluation of your product, business model, and goals to identify strengths and opportunities.
                </p>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-flavour-gold rounded-full"></div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm relative h-full">
                <div className="w-12 h-12 bg-flavour-red text-white rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Strategic Planning</h3>
                <p className="text-gray-600">
                  Development of a customized roadmap addressing your specific challenges and marketplace opportunities.
                </p>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-flavour-gold rounded-full"></div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm relative h-full">
                <div className="w-12 h-12 bg-flavour-red text-white rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Implementation</h3>
                <p className="text-gray-600">
                  Hands-on guidance as you implement your strategy, with continuous support and problem-solving.
                </p>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-flavour-gold rounded-full"></div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
                <div className="w-12 h-12 bg-flavour-red text-white rounded-full flex items-center justify-center mb-6 font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3">Growth & Scaling</h3>
                <p className="text-gray-600">
                  Ongoing mentorship as your business grows, with access to resources and networks for sustainable success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
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

        {/* Program Tracks */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="section-title">Program Tracks</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the path that best matches your business stage and goals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Track 1 */}
              <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full">
                <div className="p-6 bg-flavour-red text-white text-center">
                  <h3 className="text-2xl font-bold">Start-Up Track</h3>
                  <p className="mt-2">For new food entrepreneurs</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Product concept validation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Initial recipe scaling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Business model development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Market testing guidance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Regulatory compliance basics</span>
                    </li>
                  </ul>
                  <a href="#contact-form" className="btn-outline w-full block text-center">
                    Apply Now
                  </a>
                </div>
              </div>
              
              {/* Track 2 */}
              <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border-2 border-flavour-gold transform scale-105 relative z-10 h-full">
                <div className="absolute top-0 right-0 bg-flavour-gold text-white px-4 py-1 text-sm font-bold uppercase">
                  Most Popular
                </div>
                <div className="p-6 bg-flavour-red text-white text-center">
                  <h3 className="text-2xl font-bold">Scale-Up Track</h3>
                  <p className="mt-2">For established businesses ready to grow</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Production scaling strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Distribution channel development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Brand refinement and marketing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Operational efficiency improvements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Growth funding strategies</span>
                    </li>
                  </ul>
                  <a href="#contact-form" className="btn-primary w-full block text-center">
                    Apply Now
                  </a>
                </div>
              </div>
              
              {/* Track 3 */}
              <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full">
                <div className="p-6 bg-flavour-red text-white text-center">
                  <h3 className="text-2xl font-bold">Market Expansion</h3>
                  <p className="mt-2">For growing businesses seeking new markets</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>New market entry strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Retail partnership development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Product line expansion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Supply chain optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-flavour-red mr-2 shrink-0 mt-1" size={20} />
                      <span>Scaling team and culture</span>
                    </li>
                  </ul>
                  <a href="#contact-form" className="btn-outline w-full block text-center">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Industry Resources & Connections</h2>
                <p className="text-lg text-gray-700 mb-6">
                  As part of our accelerator program, you'll gain access to our extensive network of industry resources 
                  and connections that can help propel your business forward.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <BookOpen className="text-flavour-red mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">Production Partners</h3>
                    <p className="text-gray-600">
                      Connect with trusted co-packers, commercial kitchens, and production facilities.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <BookOpen className="text-flavour-red mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">Distributor Network</h3>
                    <p className="text-gray-600">
                      Introductions to distributors specializing in specialty and artisanal food products.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <BookOpen className="text-flavour-red mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">Funding Sources</h3>
                    <p className="text-gray-600">
                      Information on grants, investors, and financing options for food businesses.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <BookOpen className="text-flavour-red mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">Retail Connections</h3>
                    <p className="text-gray-600">
                      Relationships with retailers looking for innovative food products.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1556911261-6bd341186b2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                  alt="Food business networking" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Apply Form */}
        <section id="contact-form" className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="section-title">Apply to Our Accelerator</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Ready to take your food business to the next level? Fill out the application form, and we'll contact you 
                  to schedule an initial consultation to discuss your eligibility and how our program can help your business grow.
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
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="business"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Stage
                    </label>
                    <select
                      id="stage"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                    >
                      <option value="">Select your business stage</option>
                      <option value="idea">Concept/Idea Stage</option>
                      <option value="testing">Product Testing</option>
                      <option value="early-sales">Early Sales (Under $100k annual)</option>
                      <option value="growth">Growth Phase ($100k-$500k annual)</option>
                      <option value="established">Established ($500k+ annual)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="track" className="block text-sm font-medium text-gray-700 mb-1">
                      Interested In
                    </label>
                    <select
                      id="track"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                    >
                      <option value="">Select a program track</option>
                      <option value="startup">Start-Up Track</option>
                      <option value="scaleup">Scale-Up Track</option>
                      <option value="expansion">Market Expansion Track</option>
                      <option value="unsure">Not Sure Yet</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Tell us about your product and business goals
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-flavour-red focus:border-flavour-red"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary w-full">
                    Submit Application
                  </button>
                </form>
              </div>
              
              <div className="flex items-center">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                    alt="Food entrepreneur success" 
                    className="rounded-lg shadow-lg mb-8"
                  />
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Why Apply to Our Program?</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                        <span>Guidance from successful food industry entrepreneurs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                        <span>Hands-on support tailored to your specific business challenges</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                        <span>Access to our extensive network of industry connections</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-flavour-red mr-3 shrink-0 mt-1" size={20} />
                        <span>Potential for retail placement and distribution opportunities</span>
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
