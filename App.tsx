
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import MenuCategories from "./pages/MenuCategories";
import FoodItems from "./pages/FoodItems";
import FeaturedProducts from "./pages/FeaturedProducts";
import PopupProducts from "./pages/PopupProducts";
import Reservations from "./pages/Reservations";
import Reviews from "./pages/Reviews";
import ContactRequests from "./pages/ContactRequests";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const App = () => {
  // Move QueryClient creation inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu-categories" element={<MenuCategories />} />
            <Route path="/food-items" element={<FoodItems />} />
            <Route path="/featured-products" element={<FeaturedProducts />} />
            <Route path="/popup-products" element={<PopupProducts />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact-requests" element={<ContactRequests />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
