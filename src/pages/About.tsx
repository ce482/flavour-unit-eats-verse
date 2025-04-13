
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Play } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mediaAppearances = [
    {
      name: "Good Morning Chicago",
      description: "Interview about Egg Rolls Etc. and food entrepreneurship",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      date: "June 15, 2023"
    },
    {
      name: "Food Network Spotlight",
      description: "Feature on unique comfort foods across America",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      date: "March 3, 2023"
    },
    {
      name: "Entrepreneur Today",
      description: "How The Flavour Unit Corp is changing the frozen food industry",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      date: "November 12, 2022"
    },
    {
      name: "Chicago Food Festival",
      description: "Live cooking demonstration",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      date: "July 22, 2022"
    }
  ];

  const workshops = [
    {
      name: "Youth Cooking Workshop",
      description: "Teaching young people about culinary arts and entrepreneurship",
      image: "https://images.unsplash.com/photo-1577301656513-3d379a29614c?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Cultural Food Showcase",
      description: "Celebrating diverse culinary traditions",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Business Development Seminar",
      description: "Helping food entrepreneurs navigate challenges",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gray-50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-flavour-black">Our Story</h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  The Flavour Unit Corporation was born from a passion for creating delicious, comforting food that brings people together. As the parent company of Egg Rolls Etc. and Legacy Kitchen Solutions, we're dedicated to sharing our love of food through innovative products and supporting other food entrepreneurs.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our journey began in Chicago, where we first introduced our comfort-filled egg rolls. The enthusiastic response inspired us to expand our offerings and share our knowledge with others in the food industry.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Today, we're proud to offer a range of delicious frozen foods while also providing coaching and consulting services to help other small food businesses grow and thrive.
                </p>
              </div>
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden shadow-xl h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1590330297626-d7b6477c3c69?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" 
                    alt="Kitchen preparation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-flavour-gold p-6 rounded-lg shadow-lg max-w-xs">
                  <p className="text-flavour-black font-serif text-lg font-bold">
                    "Food is our love language. Every product we create is made with passion and care."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="section-title">Our Mission</h2>
              <p className="text-xl text-gray-600">
                To create delicious comfort foods that bring joy to people's lives while empowering food entrepreneurs to build successful businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="text-flavour-red mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Community</h3>
                <p className="text-gray-600">
                  We partner with local organizations to conduct cooking workshops and educational programs, teaching young people about self-love, cultural sensitivity, and entrepreneurship through food.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="text-flavour-red mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Passion</h3>
                <p className="text-gray-600">
                  Our love for food drives everything we do. We're committed to creating products that bring joy and comfort to our customers, using high-quality ingredients and authentic recipes.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="text-flavour-red mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Mentorship</h3>
                <p className="text-gray-600">
                  Through Legacy Kitchen Solutions, we provide coaching and consulting to help small food businesses navigate challenges and grow their operations from concept to market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Media Appearances */}
        <section className="py-20 bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Media & Press</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mediaAppearances.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                  <a 
                    href={item.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-flavour-red font-medium hover:underline"
                  >
                    <Play size={16} className="mr-1" />
                    Watch Video
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Engagement */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="section-title">Community Engagement</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We partner with non-profit organizations to conduct cooking demonstrations, workshops, and sponsorships.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workshops.map((workshop, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden rounded-lg shadow-md group"
                >
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={workshop.image} 
                      alt={workshop.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold mb-2">{workshop.name}</h3>
                    <p className="text-gray-600">{workshop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
