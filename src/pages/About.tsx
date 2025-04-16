
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

  // Adding workshops data that was missing
  const workshops = [
    {
      name: "Community Garden Workshop",
      description: "Teaching children about healthy eating and entrepreneurship through egg roll making.",
      image: "https://images.unsplash.com/photo-1464638681273-0962e9b53566?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Cultural Exchange Program",
      description: "Introducing children to diverse foods and teaching Mandarin words through cooking.",
      image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Youth Entrepreneurship",
      description: "Mentoring young food entrepreneurs on building successful businesses.",
      image: "https://images.unsplash.com/photo-1577041677443-8bbdfd8cce62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
                  From living abroad in Taiwan and combining my expertise as a Clinical Nutritionist and caterer, I have created a product that is not only delicious but unites cultures and differences inside of a warm wonton - My Egg Rolls!
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Egg Rolls Etc is available for wholesale partnerships with other small businesses such as cafes and coffee shops throughout the Chicagoland area. We also partner with many community organizations to teach youth the value and importance of self-love, entrepreneurship and cultural sensitivity.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  After only 1 year in business I have created an initiative for children called "It's What's Inside That Counts!" During the summer months I create workshops in community gardens and teach the children the importance of loving themselves by incorporating healthy foods into their diets (like our Egg Rolls which can be baked), Entrepreneurship by creating fillings and sauces for their creations and diversity by teaching them Mandarin words and exposing them to different fruits, veggies and treats from around the world.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I look forward to delighting your taste buds with over 64 varieties of specialty flavored Egg Rolls that are sweet, savory and vegan! We partner with community organizations to teach youth the importance of self-love, cultural sensitivity and entrepreneurship while being proud of the "skin you're in". So just like an Egg Roll, it's what's inside that counts.
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

        {/* Media Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Media Coverage</h2>
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
