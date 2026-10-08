import React, { useState, useEffect } from "react";
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DisclaimerModal from "./components/DisclaimerModal";
import SearchOverlay from "./components/SearchOverlay";

// Page imports
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesList from "./pages/ServicesList";
import ServiceDetail from "./pages/ServiceDetail";
import People from "./pages/People";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import Legal from "./pages/Legal";
import ErrorPages from "./pages/ErrorPages";

import "./App.css";
import Seo from "./seo/Seo.jsx";

// Utility Component to scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App({ initialPath }) {
  const Router = initialPath ? MemoryRouter : BrowserRouter;
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Router initialEntries={initialPath ? [initialPath] : undefined}>
      <Seo />
      <ScrollToTop />
      
      {/* Disclaimer Modal (BCI Compliance Gate) */}
      <DisclaimerModal />

      {/* Main Page Layout Wrapper */}
      <div className="app-viewport-wrapper">
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
        
        <main className="main-content-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesList />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/people" element={<People />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/cookies" element={<Legal />} />
            <Route path="/error" element={<ErrorPages />} />
            <Route path="*" element={<ErrorPages />} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* Global Categorized Search Panel Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </Router>
  );
}
