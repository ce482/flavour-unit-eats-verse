
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Sparkles } from 'lucide-react';

const PetitDejeuner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Coming Soon Banner */}
        <div className="bg-flavour-gold text-center py-3 font-semibold text-flavour-black">
          <div className="container-wide">
            <p className="flex items-center justify-center gap-2">
              <Sparkles size={18} />
              Coming Soon - This product line is not yet available for purchase
            </p>
          </div>
        </div>

        {/* Simple Header */}
        <section className="pt-24 pb-20 bg-gray-50">
          <div className="container-wide">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-flavour-black">Petit Déjeuner</h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Our upcoming savory breakfast line, bringing international flavors to your morning routine.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PetitDejeuner;
