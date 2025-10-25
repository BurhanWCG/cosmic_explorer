import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import NewsSection from "../components/NewsSection";
import BlogSection from "../components/BlogSection";
import ExploreSection from "../components/ExploreSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navigation />

      <section id="home"><HeroSection /></section>
      <section id="news"><NewsSection /></section>
      <section id="blog"><BlogSection /></section>
      <section id="explore"><ExploreSection /></section>
      <section id="contact"><ContactSection /></section>

      <Footer />
    </div>
  );
}
