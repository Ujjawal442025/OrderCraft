import Hero from "../Hero.jsx";
import { Services } from "../Services.jsx";
import { FeaturedWork } from "../featured-work/FeaturedWork.jsx";
import Testimonials from "../testimonials/Testimonials.jsx";
import { FinalCTA } from "../FinalCTA.jsx";
import { Footer } from "../Footer.jsx";
import Process from "../process/Process.jsx";
import SEO from "../SEO.jsx";

export default function Home() {
  return (
    <>
      <SEO
        title="Premium Web Design & AI Automation Agency"
        description="OrderCraft builds premium websites, AI-powered digital products and unforgettable digital experiences that help ambitious businesses grow."
        path="/"
      />
      <Hero />
      <Services />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  );
}
