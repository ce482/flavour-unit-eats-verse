
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import EggRolls from "./pages/EggRolls";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Cookbook from "./pages/Cookbook";
import LegacyKitchen from "./pages/LegacyKitchen";
import Contact from "./pages/Contact";
import PetitDejeuner from "./pages/PetitDejeuner";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import PaymentSuccess from "./pages/PaymentSuccess";
import Wholesale from "./pages/Wholesale";
import AdminOrders from "./pages/AdminOrders";
import Cart from "./components/cart/Cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="">
          <Cart />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/egg-rolls" element={<EggRolls />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/cookbook" element={<Cookbook />} />
            <Route path="/legacy-kitchen" element={<LegacyKitchen />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/petit-dejeuner" element={<PetitDejeuner />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
