
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EggRolls from "./pages/EggRolls";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Cookbook from "./pages/Cookbook";
import LegacyKitchen from "./pages/LegacyKitchen";
import Contact from "./pages/Contact";
import PetitDejeuner from "./pages/PetitDejeuner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Determine the correct basename based on the environment
const getBasename = () => {
  // For Lovable deployments or GitHub Pages
  if (import.meta.env.PROD) {
    // Extract from the current location to support both Lovable and GitHub Pages
    const pathSegments = window.location.pathname.split('/');
    if (pathSegments.length > 1 && pathSegments[1]) {
      return `/${pathSegments[1]}`;
    }
  }
  // Default for local development
  return "/";
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getBasename()}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/egg-rolls" element={<EggRolls />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="/legacy-kitchen" element={<LegacyKitchen />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/petit-dejeuner" element={<PetitDejeuner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
