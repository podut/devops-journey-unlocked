import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, CloudCog, Code2, Shield, Zap, Users } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: <Server className="w-6 h-6" />,
      title: "Infrastructure",
      description: "Expert in cloud infrastructure design and automation"
    },
    {
      icon: <CloudCog className="w-6 h-6" />,
      title: "Cloud Native",
      description: "Kubernetes, Docker, and microservices architecture"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Automation",
      description: "Python scripting and CI/CD pipeline development"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security",
      description: "DevSecOps practices and infrastructure security"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance",
      description: "Monitoring, alerting, and system optimization"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "Cross-functional team collaboration and mentoring"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">About Me</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              DevOps Engineer & 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Cloud Architect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              With extensive experience in DevOps practices and cloud technologies, I specialize in building 
              robust, scalable infrastructure solutions. My expertise spans from traditional server management 
              to modern containerized applications and cloud-native architectures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {highlights.map((item, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border bg-card/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Professional Journey</h3>
              <div className="prose prose-invert max-w-none text-center">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My journey in DevOps has been driven by a passion for automation, efficiency, and reliability. 
                  I've worked with cutting-edge technologies to implement CI/CD pipelines, container orchestration, 
                  infrastructure as code, and monitoring solutions that enable teams to deliver software faster and more reliably.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  From Linux system administration to modern cloud platforms like AWS, from traditional deployment 
                  methods to Kubernetes orchestration, I've embraced the evolution of technology to deliver 
                  exceptional results in every project.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;