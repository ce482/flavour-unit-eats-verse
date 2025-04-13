
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("general");

  const categories = [
    { id: "general", name: "General" },
    { id: "products", name: "Products" },
    { id: "shipping", name: "Shipping & Orders" },
    { id: "wholesale", name: "Wholesale" },
    { id: "other", name: "Other Questions" }
  ];

  const faqs = {
    general: [
      {
        question: "What is The Flavour Unit Corp?",
        answer: "The Flavour Unit Corporation is the parent company of Egg Rolls Etc. and Legacy Kitchen Solutions. We specialize in creating delicious frozen comfort foods and providing coaching and consulting for small food businesses."
      },
      {
        question: "Where are your products made?",
        answer: "All of our products are made in our production facility in Chicago, IL, following strict quality and safety standards."
      },
      {
        question: "Are your products available in stores?",
        answer: "Yes! Our products are available in select grocery stores in the Chicago area. Check our 'Where to Buy' section for specific locations. You can also order directly from our website for nationwide shipping."
      }
    ],
    products: [
      {
        question: "How do I prepare your egg rolls?",
        answer: "Our egg rolls can be prepared in multiple ways: 1) Air fryer: 390°F for 8-10 minutes, 2) Conventional oven: 375°F for 15-18 minutes, 3) Deep fryer: 350°F for 6-7 minutes. For best results, cook from frozen."
      },
      {
        question: "How long do your products stay fresh?",
        answer: "Our products stay fresh for up to 12 months when kept frozen at 0°F or below. Once thawed, they should be cooked immediately and consumed within 3 days."
      },
      {
        question: "What ingredients do you use?",
        answer: "We pride ourselves on using high-quality, authentic ingredients. Each product has a detailed ingredient list on its packaging and on our product pages. We avoid artificial preservatives whenever possible."
      },
      {
        question: "Do you have vegetarian or vegan options?",
        answer: "Yes! We offer vegetable egg rolls and vegetable potstickers that are vegetarian-friendly. Currently, we do not have vegan options, but we're developing some for future release."
      }
    ],
    shipping: [
      {
        question: "How do you ship frozen products?",
        answer: "We ship our products in specially designed insulated packaging with dry ice to ensure they stay frozen during transit. Standard shipping is 2-day delivery via FedEx to ensure products arrive in perfect condition."
      },
      {
        question: "Do you ship nationwide?",
        answer: "Yes, we ship to all states within the continental United States. Unfortunately, we currently do not ship to Alaska, Hawaii, or international destinations."
      },
      {
        question: "What is your shipping fee?",
        answer: "Standard 2-day shipping is $19 flat rate for small orders. For larger orders, shipping costs may vary. Subscribe & Save customers receive discounted or free shipping depending on their subscription plan."
      },
      {
        question: "What if my order arrives thawed?",
        answer: "If your order arrives thawed or in poor condition, please contact our customer service team immediately with photos of the package. We'll arrange for a replacement shipment as soon as possible."
      }
    ],
    wholesale: [
      {
        question: "Do you offer wholesale pricing?",
        answer: "Yes, we offer wholesale pricing for grocery stores, restaurants, catering companies, and other food service businesses. Please contact our wholesale department for pricing information."
      },
      {
        question: "What is your minimum order quantity for wholesale?",
        answer: "Our minimum wholesale order is 5 cases. Each case contains 12 packages of product."
      },
      {
        question: "Can I customize products for my business?",
        answer: "We offer some customization options for large wholesale accounts. Please contact us to discuss your specific needs."
      }
    ],
    other: [
      {
        question: "What is Legacy Kitchen Solutions?",
        answer: "Legacy Kitchen Solutions is our consulting division that provides coaching and consulting services for small food businesses. We help food entrepreneurs navigate challenges and scale their operations from concept to market."
      },
      {
        question: "Do you offer cooking classes or workshops?",
        answer: "Yes, we partner with various organizations to offer cooking demonstrations and workshops. Check our Events page for upcoming classes."
      },
      {
        question: "How can I book a consultation with Legacy Kitchen Solutions?",
        answer: "You can book a consultation through the Legacy Kitchen page on our website. We offer different packages tailored to the needs of your food business."
      }
    ]
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-600">
                Find answers to the most common questions about our products, shipping, and services.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Category Sidebar */}
              <div className="md:w-1/4">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                            activeCategory === category.id
                              ? 'bg-flavour-red text-white'
                              : 'text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  
                  {/* FAQ Illustration */}
                  <div className="mt-8 hidden md:block">
                    <img 
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                      alt="Customer support" 
                      className="rounded-lg"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Can't find what you're looking for? Contact our support team.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold mb-6">
                  {categories.find(c => c.id === activeCategory)?.name} Questions
                </h2>
                
                <Accordion type="single" collapsible className="w-full">
                  {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Contact CTA */}
                <div className="bg-flavour-cream p-6 rounded-lg mt-12">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                      <p className="text-gray-600 mb-4">
                        If you couldn't find the answer to your question, please reach out to our support team.
                      </p>
                      <Link
                        to="/contact"
                        className="btn-primary inline-block"
                      >
                        Contact Us
                      </Link>
                    </div>
                    <div className="md:w-1/3">
                      <img 
                        src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        alt="Customer support" 
                        className="rounded-lg"
                      />
                    </div>
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

export default FAQ;
