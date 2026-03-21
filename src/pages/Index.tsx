import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TerminalSection from "@/components/TerminalSection";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <TerminalSection />
      <Skills />
      <Experience />
      <Contact />
      <section className="py-20 bg-accent/5 flex justify-center">
        <Link to="/blog" className="text-primary hover:underline font-mono">
          view_all_blog_posts()
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
