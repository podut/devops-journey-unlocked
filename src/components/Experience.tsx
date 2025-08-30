import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase, GraduationCap, GitBranch, ExternalLink, Star } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior DevOps Engineer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      period: "2023 - Present",
      type: "Full-time",
      description: [
        "Designed and implemented scalable cloud infrastructure on AWS using Terraform and Ansible",
        "Managed Kubernetes clusters serving 100+ microservices with 99.9% uptime",
        "Built comprehensive CI/CD pipelines using Jenkins, reducing deployment time by 60%",
        "Implemented monitoring and alerting with Prometheus and Grafana across all environments"
      ],
      technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins", "Docker", "Prometheus", "Python"]
    },
    {
      title: "DevOps Engineer",
      company: "CloudFirst Systems",
      location: "Bucharest, Romania",
      period: "2022 - 2023",
      type: "Full-time",
      description: [
        "Migrated legacy applications to containerized environments using Docker and Kubernetes",
        "Automated infrastructure provisioning reducing manual setup time by 80%",
        "Developed Python scripts for automated backup and recovery processes",
        "Collaborated with development teams to optimize application performance and reliability"
      ],
      technologies: ["Docker", "Kubernetes", "AWS", "Python", "Ansible", "Git", "Linux"]
    },
    {
      title: "Junior DevOps Engineer",
      company: "StartupTech",
      location: "Cluj-Napoca, Romania",
      period: "2021 - 2022",
      type: "Full-time",
      description: [
        "Managed Linux servers and implemented basic automation scripts",
        "Set up and maintained CI/CD pipelines for web applications",
        "Worked with Docker containers and basic Kubernetes deployments",
        "Participated in 24/7 on-call rotation for production systems"
      ],
      technologies: ["Linux", "Docker", "Jenkins", "Git", "Bash", "AWS EC2", "Monitoring"]
    }
  ];

  const education = [
    {
      degree: "DevOps Professional Bootcamp",
      institution: "TechWorld Academy",
      period: "2024",
      description: "Comprehensive 265+ hour program covering all aspects of DevOps from Linux fundamentals to advanced Kubernetes and cloud automation"
    },
    {
      degree: "Bachelor's in Computer Science",
      institution: "Technical University",
      period: "2018 - 2021",
      description: "Focused on software engineering, system administration, and network technologies"
    }
  ];

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

  return (
    <section id="experience" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Professional Journey</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Work Experience &
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Education</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A track record of delivering robust DevOps solutions and continuous learning 
              in cutting-edge technologies.
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-primary" />
              Professional Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-card">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <span className="text-lg font-medium text-primary">{exp.company}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.period}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {exp.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* GitLab Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <GitBranch className="w-6 h-6 mr-3 text-primary" />
              GitLab Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {gitlabProjects.map((project, index) => (
                <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-card group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 flex items-center">
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors flex items-center group"
                          >
                            {project.name}
                            <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {project.stars}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {project.lastUpdated}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-primary" />
              Education & Training
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl">{edu.degree}</CardTitle>
                    <div className="flex items-center text-muted-foreground">
                      <span className="text-lg text-primary">{edu.institution}</span>
                      <span className="mx-2">•</span>
                      <span>{edu.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;