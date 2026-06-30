import HomeNavbar from "../components/HomeNavbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import MapPreview from "../components/MapPreview";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
function Home() {
  return (
    <>
      <HomeNavbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <MapPreview />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;