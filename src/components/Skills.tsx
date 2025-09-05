import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Wrench,
  ShieldCheck,
  ScanLine,
  Lock,
  Eye
} from "lucide-react";
import DevSecOpsPipeline from "./DevSecOpsPipeline";

const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud Platforms",
      icon: <Cloud className="w-8 h-8" />,
      skills: [
        "Amazon Web Services (AWS)",
        "AWS EC2, VPC, IAM",
        "AWS CLI & SDK",
        "DigitalOcean"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Containerization",
      icon: <Container className="w-8 h-8" />,
      skills: [
        "Docker",
        "Kubernetes",
        "Helm Charts",
        "Docker Compose"
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Infrastructure as Code",
      icon: <Settings className="w-8 h-8" />,
      skills: [
        "Terraform",
        "Ansible",
        "AWS CloudFormation",
        "Infrastructure Automation"
      ],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "CI/CD & Build Tools",
      icon: <Wrench className="w-8 h-8" />,
      skills: [
        "Jenkins",
        "GitLab CI/CD",
        "Maven & Gradle",
        "NPM & Build Tools"
      ],
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Programming & Scripting",
      icon: <Code className="w-8 h-8" />,
      skills: [
        "Python",
        "Bash/Shell Scripting",
        "AWS Boto3",
        "JavaScript/Node.js"
      ],
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "Version Control",
      icon: <GitBranch className="w-8 h-8" />,
      skills: [
        "Git",
        "GitHub/GitLab",
        "Branching Strategies",
        "Merge Conflicts Resolution"
      ],
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      title: "Operating Systems",
      icon: <Server className="w-8 h-8" />,
      skills: [
        "Linux Administration",
        "Ubuntu/CentOS",
        "System Security",
        "Networking"
      ],
      gradient: "from-slate-500 to-gray-500"
    },
    {
      title: "Monitoring & Observability",
      icon: <MonitorSpeaker className="w-8 h-8" />,
      skills: [
        "Prometheus",
        "Grafana",
        "AlertManager",
        "Application Monitoring"
      ],
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "DevSecOps & Security",
      icon: <ShieldCheck className="w-8 h-8" />,
      skills: [
        "SAST/DAST/SCA",
        "OWASP Top 10",
        "DefectDojo",
        "GitLeaks"
      ],
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Vulnerability Management",
      icon: <ScanLine className="w-8 h-8" />,
      skills: [
        "Static Application Security Testing",
        "Dynamic Application Security Testing",
        "Software Composition Analysis",
        "CI/CD Security Integration"
      ],
      gradient: "from-violet-500 to-purple-500"
    },
    {
      title: "Cloud Security",
      icon: <Lock className="w-8 h-8" />,
      skills: [
        "AWS IAM & Security",
        "AWS SSM & Secrets Manager",
        "CloudTrail & CloudWatch",
        "Compliance as Code"
      ],
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Kubernetes Security",
      icon: <Eye className="w-8 h-8" />,
      skills: [
        "RBAC & K8s Security",
        "OPA Gatekeeper",
        "Istio Service Mesh",
        "Vault & Secrets Management"
      ],
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  const certifications = [
    "DevOps Professional Bootcamp",
    "AWS Cloud Practitioner Track", 
    "Kubernetes Administration",
    "Terraform Infrastructure Automation",
    "Docker Containerization Expert",
    "Python for DevOps Automation",
    "DevSecOps Fundamentals",
    "OWASP Security Expert",
    "AWS Security Specialist",
    "Kubernetes Security Professional",
    "Vulnerability Management Expert"
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
              Comprehensive knowledge across the DevOps and DevSecOps toolchain, from infrastructure automation 
              to security monitoring and everything in between.
            </p>
          </div>

          <DevSecOpsPipeline />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl hover:from-background/90 hover:to-background/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5" />
                
                <CardHeader className="relative z-10 pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-center text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="flex items-center p-3 rounded-lg bg-background/20 backdrop-blur-sm border border-border/20 hover:bg-background/40 hover:border-primary/20 transition-all duration-300 group-hover:translate-x-1"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mr-3 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300" />
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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