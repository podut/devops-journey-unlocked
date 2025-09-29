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

      {/* Lightning Effects - Responsive */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Lightning bolts - scaled for different screens */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-0.5 sm:w-1 h-16 sm:h-32 bg-gradient-to-b from-primary via-accent to-transparent opacity-60 animate-pulse transform rotate-12 shadow-lg shadow-primary/50"></div>
        <div className="absolute top-20 sm:top-40 right-8 sm:right-20 w-0.5 sm:w-1 h-12 sm:h-24 bg-gradient-to-b from-accent via-primary to-transparent opacity-40 animate-pulse transform -rotate-45 shadow-lg shadow-accent/50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 sm:bottom-40 left-1/4 w-0.5 sm:w-1 h-10 sm:h-20 bg-gradient-to-b from-primary via-accent to-transparent opacity-50 animate-pulse transform rotate-75 shadow-lg shadow-primary/50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-30 sm:top-60 right-1/3 w-0.5 sm:w-1 h-14 sm:h-28 bg-gradient-to-b from-accent via-primary to-transparent opacity-30 animate-pulse transform -rotate-30 shadow-lg shadow-accent/50" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Electric sparks - responsive sizes */}
        <div className="absolute top-16 sm:top-32 left-1/3 w-1 sm:w-2 h-1 sm:h-2 bg-primary rounded-full animate-ping shadow-lg shadow-primary/80" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-16 sm:bottom-32 right-1/4 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-accent rounded-full animate-ping shadow-lg shadow-accent/80" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-24 sm:top-48 left-2/3 w-1 sm:w-2 h-1 sm:h-2 bg-primary rounded-full animate-ping shadow-lg shadow-primary/80" style={{ animationDelay: '2.2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Floating Icons - Responsive */}
          <div className="flex justify-center space-x-4 sm:space-x-6 lg:space-x-8 mb-6 sm:mb-8 opacity-60">
            <div className="animate-bounce delay-0">
              <Cloud className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
            </div>
            <div className="animate-bounce delay-100">
              <Code className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent" />
            </div>
            <div className="animate-bounce delay-200">
              <Settings className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
            </div>
          </div>

          <h1 className="relative text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
            {/* Name with proper visibility */}
            <div className="relative text-center">
              {/* Petru Alexandru */}
              <span className="relative inline-block bg-gradient-primary bg-clip-text text-transparent">
                <span className="absolute inset-0 bg-gradient-primary bg-clip-text text-transparent blur-sm opacity-50"></span>
                <span className="relative z-10">Petru Alexandru</span>
              </span>
              
              <br />
              
              {/* Podut */}
              <span className="relative inline-block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent blur-sm opacity-40"></span>
                <span className="relative z-10">Podut</span>
              </span>
            </div>
            
            {/* Electric aura */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-xl opacity-60 animate-pulse pointer-events-none"></div>
          </h1>
          
          {/* DevOps Engineer */}
          <p className="relative text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-3 sm:mb-4 font-mono text-center px-2">
            <span className="relative inline-block">
              <span className="absolute inset-0 text-primary/50 blur-sm">&lt; DevOps Engineer /&gt;</span>
              <span className="relative z-10">&lt; DevOps Engineer /&gt;</span>
            </span>
            <span className="ml-1 text-primary animate-ping">|</span>
          </p>
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 mb-6 sm:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed text-center px-4">
            Specialized in Cloud Infrastructure, Kubernetes, AWS, Terraform, Docker, Jenkins, 
            and Python automation. Building scalable, reliable systems that power modern applications.
          </p>
          

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 lg:mb-12 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto min-w-[160px] sm:min-w-[180px] shadow-glow hover:shadow-neon hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto min-w-[160px] sm:min-w-[180px] glass hover:shadow-glow hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
          </div>

          {/* Tech Stack Bubbles - Responsive Grid */}
          <div className="relative flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 opacity-70 min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] overflow-hidden px-2">
            {['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Python', 'Ansible', 'Prometheus'].map((tech, index) => (
              <div
                key={tech}
                className={`
                  group relative px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base 
                  bg-gradient-to-br from-primary/20 to-accent/20 
                  border border-primary/30 rounded-full text-foreground
                  cursor-pointer transition-all duration-300 ease-out
                  hover:scale-105 sm:hover:scale-110 hover:shadow-lg hover:shadow-primary/25
                  animate-bounce hover:animate-none
                  backdrop-blur-sm
                  max-w-[120px] sm:max-w-none truncate sm:text-clip
                `}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '3s'
                }}
                onMouseEnter={(e) => {
                  const element = e.currentTarget;
                  const isMobile = window.innerWidth < 640;
                  const maxMovement = isMobile ? 100 : 200;
                  const randomX = (Math.random() - 0.5) * maxMovement;
                  const randomY = (Math.random() - 0.5) * (isMobile ? 50 : 100);
                  const scale = isMobile ? 1.1 : 1.2;
                  element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg) scale(${scale})`;
                  element.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  const element = e.currentTarget;
                  element.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
                  element.style.opacity = '0.7';
                }}
              >
                {/* Rotating glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-20 animate-spin" 
                     style={{ animationDuration: '4s' }}></div>
                
                {/* Bubble shine effect */}
                <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-1 sm:w-2 h-1 sm:h-2 bg-white/40 rounded-full animate-pulse"></div>
                
                {/* Text */}
                <span className="relative z-10 font-medium">{tech}</span>
                
                {/* Floating particles */}
                <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-primary rounded-full animate-ping" 
                     style={{ animationDelay: `${index * 0.3}s` }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - Responsive */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;