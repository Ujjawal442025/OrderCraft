import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PageTransitionOverlay from "./animations/PageTransitionOverlay.jsx";
import Home from "./components/pages/Home.jsx";
import Work from "./components/pages/Work.jsx";
import ServicesPage from "./components/pages/ServicesPage.jsx";
import About from "./components/pages/About.jsx";
import Contact from "./components/pages/Contact.jsx";
import "./styles/hero.css";
import Pricing from "./components/pages/Pricing.jsx";

export default function App() {
  const location = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (location.pathname === displayedLocation.pathname) return;

    overlayRef.current?.play(() => {
      setDisplayedLocation(location);
      window.scrollTo(0, 0);
    });
  }, [location, displayedLocation]);

  return (
    <main className="bg-bg min-h-screen">
      <Navbar />

      <PageTransitionOverlay ref={overlayRef} contentRef={contentRef} />

      <div ref={contentRef}>
        <Routes location={displayedLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>
    </main>
  );
}
