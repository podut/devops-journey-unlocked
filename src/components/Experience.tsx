import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, ExternalLink, Star, Calendar } from "lucide-react";

const Experience = () => {
  const gitlabProjects = [
    {
      name: "infra-automation",
      description: "Infrastructure automation using Terraform and Ansible for scalable cloud deployments",
      stars: 5,
      lastUpdated: "5 days ago",
      technologies: ["Terraform", "Ansible", "AWS", "Docker", "CI/CD"],
      url: "https://gitlab.com/your-username/infra-automation"
    },
    {
      name: "infra-automation-eks",
      description: "EKS cluster automation and management with Infrastructure as Code",
      stars: 0,
      lastUpdated: "1 day ago",
      technologies: ["EKS", "Kubernetes", "Terraform", "AWS", "Helm"],
      url: "https://gitlab.com/your-username/infra-automation-eks"
    },
    {
      name: "juice-shop",
      description: "OWASP Juice Shop security testing and vulnerability assessment pipeline",
      stars: 9,
      lastUpdated: "10 hours ago",
      technologies: ["Security Testing", "OWASP", "CI/CD", "SAST", "DAST"],
      url: "https://gitlab.com/your-username/juice-shop"
    },
    {
      name: "online-boutique",
      description: "Microservices deployment and monitoring for Google's Online Boutique demo",
      stars: 0,
      lastUpdated: "Mar 25, 2024",
      technologies: ["Microservices", "Kubernetes", "Istio", "Monitoring"],
      url: "https://gitlab.com/your-username/online-boutique"
    },
    {
      name: "online-boutique-gitops",
      description: "GitOps implementation for Online Boutique using ArgoCD and Flux",
      stars: 2,
      lastUpdated: "2 weeks ago",
      technologies: ["GitOps", "ArgoCD", "Flux", "Kubernetes", "Helm"],
      url: "https://gitlab.com/your-username/online-boutique-gitops"
    }
  ];

  // Generate floating bubbles with random properties
  const bubbles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
    left: Math.random() * 100,
    opacity: Math.random() * 0.3 + 0.1
  }));

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>
      
      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm animate-pulse"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              opacity: bubble.opacity,
              animation: `float ${bubble.duration}s infinite ease-in-out ${bubble.delay}s, pulse 3s infinite ease-in-out`,
              animationDirection: 'alternate'
            }}
          />
        ))}
      </div>

      {/* Mesh Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 px-6 py-2 text-sm border-primary/30 bg-primary/5 backdrop-blur-sm">
              GitLab Projects
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Featured
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Explore my latest DevOps and DevSecOps projects showcasing infrastructure automation, 
              security testing, and modern deployment practices.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {gitlabProjects.map((project, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-2xl hover:from-background/90 hover:via-background/80 hover:to-background/60 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 group-hover:opacity-40 transition-opacity duration-500" 
                     style={{ 
                       background: `conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))`,
                       padding: '2px',
                       borderRadius: '12px'
                     }}>
                  <div className="w-full h-full bg-background/95 rounded-[10px]" />
                </div>

                {/* Floating Tech Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="absolute w-8 h-8 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center text-xs font-medium text-primary/70 group-hover:bg-primary/20 transition-all duration-500"
                      style={{
                        top: `${20 + techIndex * 15}%`,
                        right: `${10 + techIndex * 8}%`,
                        animation: `float 4s infinite ease-in-out ${techIndex * 0.5}s`,
                        transform: `rotate(${techIndex * 45}deg)`
                      }}
                    >
                      {tech.substring(0, 2)}
                    </div>
                  ))}
                </div>

                <CardHeader className="relative z-10 pb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-4 group-hover:text-primary transition-colors duration-300">
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center group-hover:translate-x-2 transition-transform duration-300"
                        >
                          <GitBranch className="w-6 h-6 mr-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                          {project.name}
                          <ExternalLink className="w-5 h-5 ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0" />
                        </a>
                      </CardTitle>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center bg-background/30 rounded-full px-3 py-1 backdrop-blur-sm">
                          <Star className="w-4 h-4 mr-2 text-yellow-500 group-hover:animate-pulse" />
                          <span className="font-medium">{project.stars}</span>
                        </div>
                        <div className="flex items-center bg-background/30 rounded-full px-3 py-1 backdrop-blur-sm">
                          <Calendar className="w-4 h-4 mr-2 text-green-500" />
                          <span>{project.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="text-sm py-2 px-4 bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/20 hover:from-secondary/30 hover:to-secondary/20 hover:border-secondary/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                        style={{
                          animationDelay: `${techIndex * 0.1}s`
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                {/* Bottom Glow Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
              </Card>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Experience;