import Hero from "../Hero.jsx";
import { Services } from "../services/Services.jsx";
import { FeaturedWork } from "../featured-work/FeaturedWork.jsx";
import Testimonials from "../testimonials/Testimonials.jsx";
import { FinalCTA } from "../FinalCTA.jsx";
import { Footer } from "../Footer.jsx";
import Process from "../process/Process.jsx";

export default function Home() {
  return (
    <>
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
