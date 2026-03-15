import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold font-mono text-primary-foreground">P</span>
                </div>
                <span className="text-xl font-semibold">petrupodut.dev</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                DevOps Engineer passionate about building scalable, reliable infrastructure 
                and automating complex systems.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <nav className="space-y-2">
                <a href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
                <a href="#skills" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </a>
                <a href="#experience" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Experience
                </a>
                <a href="#contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-2">
                <a 
                  href="mailto:contact@petrupodut.dev" 
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  contact@petrupodut.dev
                </a>
                <a 
                  href="tel:+40753863372" 
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +40 753 863 372
                </a>
                <div className="flex space-x-4 mt-4">
                  <a 
                    href="https://github.com/podut" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/petrupodut" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="mailto:contact@petrupodut.dev"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                © 2026 Petru Alexandru Podut. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;