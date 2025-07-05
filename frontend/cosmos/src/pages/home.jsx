import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import NewsSection from "../components/NewsSection";
import BlogSection from "../components/BlogSection";
import ExploreSection from "../components/ExploreSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection/>
      <NewsSection />
      <BlogSection />
      <ExploreSection />
      <ContactSection />
      <Footer />
    </div>
  );
}