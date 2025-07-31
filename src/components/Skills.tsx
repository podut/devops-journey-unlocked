import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Cloud, 
  Container, 
  Settings, 
  Code, 
  Database, 
  Shield, 
  MonitorSpeaker,
  GitBranch,
  Server,
  Wrench
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud Platforms",
      icon: <Cloud className="w-6 h-6" />,
      skills: [
        { name: "Amazon Web Services (AWS)", level: 95 },
        { name: "AWS EC2, VPC, IAM", level: 90 },
        { name: "AWS CLI & SDK", level: 85 },
        { name: "DigitalOcean", level: 80 }
      ]
    },
    {
      title: "Containerization",
      icon: <Container className="w-6 h-6" />,
      skills: [
        { name: "Docker", level: 95 },
        { name: "Kubernetes", level: 90 },
        { name: "Helm Charts", level: 85 },
        { name: "Docker Compose", level: 90 }
      ]
    },
    {
      title: "Infrastructure as Code",
      icon: <Settings className="w-6 h-6" />,
      skills: [
        { name: "Terraform", level: 90 },
        { name: "Ansible", level: 85 },
        { name: "AWS CloudFormation", level: 75 },
        { name: "Infrastructure Automation", level: 88 }
      ]
    },
    {
      title: "CI/CD & Build Tools",
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        { name: "Jenkins", level: 90 },
        { name: "GitLab CI/CD", level: 85 },
        { name: "Maven & Gradle", level: 80 },
        { name: "NPM & Build Tools", level: 85 }
      ]
    },
    {
      title: "Programming & Scripting",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "Python", level: 90 },
        { name: "Bash/Shell Scripting", level: 95 },
        { name: "AWS Boto3", level: 85 },
        { name: "JavaScript/Node.js", level: 80 }
      ]
    },
    {
      title: "Version Control",
      icon: <GitBranch className="w-6 h-6" />,
      skills: [
        { name: "Git", level: 95 },
        { name: "GitHub/GitLab", level: 90 },
        { name: "Branching Strategies", level: 85 },
        { name: "Merge Conflicts Resolution", level: 90 }
      ]
    },
    {
      title: "Operating Systems",
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: "Linux Administration", level: 95 },
        { name: "Ubuntu/CentOS", level: 90 },
        { name: "System Security", level: 85 },
        { name: "Networking", level: 80 }
      ]
    },
    {
      title: "Monitoring & Observability",
      icon: <MonitorSpeaker className="w-6 h-6" />,
      skills: [
        { name: "Prometheus", level: 85 },
        { name: "Grafana", level: 85 },
        { name: "AlertManager", level: 80 },
        { name: "Application Monitoring", level: 83 }
      ]
    }
  ];

  const certifications = [
    "DevOps Professional Bootcamp",
    "AWS Cloud Practitioner Track",
    "Kubernetes Administration",
    "Terraform Infrastructure Automation",
    "Docker Containerization Expert",
    "Python for DevOps Automation"
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Technical Skills</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technology
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive knowledge across the DevOps toolchain, from infrastructure automation 
              to monitoring and everything in between.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {skillCategories.map((category, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary mr-3">
                      {category.icon}
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-foreground">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border bg-card/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Certifications & Training</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                {certifications.map((cert, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-sm py-2 px-4 bg-secondary/50 hover:bg-secondary/80 transition-colors"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;