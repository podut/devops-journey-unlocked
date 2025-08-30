import { Button } from "@/components/ui/button";
import { ArrowDown, Code, Cloud, Settings } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-grid-pattern animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Floating Icons */}
          <div className="flex justify-center space-x-8 mb-8 opacity-60">
            <div className="animate-bounce delay-0">
              <Cloud className="w-8 h-8 text-primary" />
            </div>
            <div className="animate-bounce delay-100">
              <Code className="w-8 h-8 text-accent" />
            </div>
            <div className="animate-bounce delay-200">
              <Settings className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Petru Alexandru
            <br />
            <span className="text-5xl md:text-7xl">Podut</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-mono">
            &lt; DevOps Engineer /&gt;
          </p>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Specialized in Cloud Infrastructure, Kubernetes, AWS, Terraform, Docker, Jenkins, 
            and Python automation. Building scalable, reliable systems that power modern applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="min-w-[180px] shadow-glow">
              Get In Touch
            </Button>
            <Button variant="outline" size="lg" className="min-w-[180px]">
              View My Work
            </Button>
          </div>

          {/* Tech Stack Preview */}
          <div className="flex flex-wrap justify-center gap-4 opacity-70">
            {['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Python', 'Ansible', 'Prometheus'].map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 text-sm bg-card border border-border rounded-full text-card-foreground hover:bg-accent/20 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;