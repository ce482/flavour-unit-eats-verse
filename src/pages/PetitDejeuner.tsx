
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PetitDejeuner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Add padding to push content below navbar */}
        <div className="pt-16 md:pt-20">
          {/* Coming Soon Banner */}
          <div className="bg-flavour-gold text-center py-3 font-semibold text-flavour-black">
            <div className="container-wide">
              <p className="flex items-center justify-center gap-2">
                <Sparkles size={18} />
                Coming Soon - This product line is not yet available for purchase
              </p>
            </div>
          </div>

          {/* Product Information - Centered text */}
          <section className="py-20">
            <div className="container-wide">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-flavour-black">Petit Déjeuner</h1>
                <p className="text-xl text-gray-700 mb-8">
                  Introducing our upcoming savory breakfast line, bringing
                  international flavors to your morning routine. Convenient,
                  delicious, and ready in minutes.
                </p>
                <div className="flex justify-center">
                  <Button variant="destructive" className="bg-flavour-red hover:bg-flavour-red/90">
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PetitDejeuner;
