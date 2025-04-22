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
      name: "Egg Rolls Etc on ABC Windy City Live 2018",
      description: "Featured on ABC's Windy City Live show",
      videoUrl: "https://youtu.be/-GNzE8iIdco",
      date: "2018"
    },
    {
      name: "Egg Rolls Etc Chicago, IL",
      description: "A look into our Chicago operations",
      videoUrl: "https://www.youtube.com/watch?v=5xFOyaJ1qE4",
      date: "2022"
    },
    {
      name: "How to make 'comfort-filled' egg rolls",
      description: "Learn how to make our signature comfort-filled egg rolls",
      videoUrl: "https://www.youtube.com/watch?v=r4fPaVk-s9s",
      date: "2023"
    },
    {
      name: "Influential Women in Food: Javon Nicholas",
      description: "Podcast featuring our founder discussing Egg Rolls Etc.",
      videoUrl: "https://www.youtube.com/watch?v=13zpYEcxwHQ",
      date: "2023"
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
                <div className="space-y-6 text-lg text-gray-700">
                  <p>
                    At The Flavour Unit Corporation, we believe great food does more than nourish — it brings people together, 
                    tells stories, and uplifts communities. We are the proud parent company of two purpose-driven brands: 
                    Egg Rolls Etc. and Legacy Kitchen Solutions, each blending culinary creativity with cultural celebration.
                  </p>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                      🍳 Egg Rolls Etc.
                    </h2>
                    <p className="mb-4">
                      Our flagship frozen food line features bold, comfort-filled classics: egg rolls, potstickers, and Rangoon. 
                      Designed to satisfy and inspire, these crowd-pleasers are available through:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li>Local grocery stores & catering companies</li>
                      <li>Ghost kitchens & online retailers</li>
                      <li>B2B & B2C wholesale platforms</li>
                      <li>Community partnerships and pop-ups</li>
                    </ul>
                    <p>
                      We're more than just food — we're flavor with a mission. Through youth workshops, nonprofit collaborations, 
                      and cultural cooking demos, Egg Rolls Etc. teaches self-love, entrepreneurship, and cultural pride.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-3">
                      🥣 Legacy Kitchen Solutions
                    </h2>
                    <p>
                      Through one-on-one coaching and strategic consulting, we help small food businesses scale with soul. 
                      Whether you're launching a pop-up, navigating operations, or dreaming up the next big thing — we're 
                      your kitchen confidantes.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-3">
                      🍴 Coming Soon: Petit Déjeuner
                    </h2>
                    <p>
                      Stay tuned for our savory spin on the most important meal of the day. Our Petit Déjeuner breakfast 
                      line will bring globally-inspired comfort foods to your morning routine — one crave-worthy bite at a time.
                    </p>
                  </div>
                </div>
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

        {/* Media Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <h2 className="section-title text-center mb-4">As Seen On</h2>
            <p className="text-center text-lg text-gray-600 mb-12">
              The Great Food Truck Race | WGN Chicago's Best | Chicago's Very Own | ABC7 Windy City Live
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mediaAppearances.map((video, index) => (
                <div key={index} className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${video.videoUrl.split('=')[1] || video.videoUrl.split('/').pop()}`}
                    title={video.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
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
      </main>
      <Footer />
    </>
  );
};

export default About;
