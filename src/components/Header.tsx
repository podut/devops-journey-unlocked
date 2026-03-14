import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold font-mono text-primary-foreground">P</span>
            </div>
            <span className="text-xl font-semibold">petrupodut.dev</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#skills" className="text-foreground hover:text-primary transition-colors">Skills</a>
            <a href="#experience" className="text-foreground hover:text-primary transition-colors">Experience</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="w-5 h-5" />
            </Button>
            <a
              href="/Europass%20CV%20template-completat.doc"
              download
              className="hidden sm:flex items-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;