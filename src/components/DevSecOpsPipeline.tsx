import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck,
  ScanLine, 
  Lock,
  Eye,
  CheckCircle,
  XCircle,
  GitBranch,
  Cloud,
  Container,
  Settings,
  AlertTriangle,
  PlayCircle
} from "lucide-react";

const DevSecOpsPipeline = () => {
  const [activeStage, setActiveStage] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const pipelineStages = [
    {
      name: "Source Code",
      icon: <GitBranch className="w-5 h-5" />,
      tools: ["Git", "Pre-commit hooks", "GitLeaks"],
      status: "pending",
      description: "Code commit with security scanning",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "SAST Scan",
      icon: <ScanLine className="w-5 h-5" />,
      tools: ["SonarQube", "CodeQL", "Semgrep"],
      status: "pending", 
      description: "Static Application Security Testing",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Build & Test",
      icon: <Settings className="w-5 h-5" />,
      tools: ["Docker", "Jenkins", "Unit Tests"],
      status: "pending",
      description: "Secure build process",
      color: "from-green-500 to-green-600"
    },
    {
      name: "SCA Scan",
      icon: <ShieldCheck className="w-5 h-5" />,
      tools: ["Snyk", "OWASP Dependency Check", "Trivy"],
      status: "pending",
      description: "Software Composition Analysis",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Container Security",
      icon: <Container className="w-5 h-5" />,
      tools: ["Trivy", "Aqua Security", "Falco"],
      status: "pending",
      description: "Container image scanning",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      name: "DAST Scan",
      icon: <Eye className="w-5 h-5" />,
      tools: ["OWASP ZAP", "Burp Suite", "Nessus"],
      status: "pending",
      description: "Dynamic Application Security Testing",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Deploy to K8s",
      icon: <Cloud className="w-5 h-5" />,
      tools: ["Kubernetes", "OPA Gatekeeper", "Istio"],
      status: "pending",
      description: "Secure deployment with policies",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      name: "Security Monitoring",
      icon: <Lock className="w-5 h-5" />,
      tools: ["Prometheus", "Falco", "DefectDojo"],
      status: "pending",
      description: "Runtime security monitoring",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const [stages, setStages] = useState(pipelineStages);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  const runPipeline = () => {
    if (pipelineRunning) return;
    
    setPipelineRunning(true);
    setActiveStage(0);
    
    // Reset all stages
    setStages(prev => prev.map(stage => ({ ...stage, status: "pending" })));

    // Run each stage sequentially
    stages.forEach((_, index) => {
      setTimeout(() => {
        setActiveStage(index);
        setStages(prev => prev.map((stage, i) => {
          if (i === index) {
            return { ...stage, status: "running" };
          } else if (i < index) {
            return { ...stage, status: Math.random() > 0.1 ? "success" : "warning" };
          }
          return stage;
        }));
      }, index * 1500);

      setTimeout(() => {
        setStages(prev => prev.map((stage, i) => {
          if (i === index) {
            return { ...stage, status: Math.random() > 0.15 ? "success" : "warning" };
          }
          return stage;
        }));
        
        if (index === stages.length - 1) {
          setTimeout(() => {
            setPipelineRunning(false);
            setActiveStage(-1);
          }, 1000);
        }
      }, (index * 1500) + 1200);
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "running":
        return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />;
    }
  };

  const getStageStyles = (stage: any, index: number) => {
    let baseClasses = "relative p-4 rounded-lg border transition-all duration-500 transform";
    
    if (stage.status === "running" || activeStage === index) {
      baseClasses += ` bg-gradient-to-r ${stage.color} text-white shadow-lg scale-105 animate-pulse`;
    } else if (stage.status === "success") {
      baseClasses += " bg-green-500/10 border-green-500/30 text-green-600";
    } else if (stage.status === "warning") {
      baseClasses += " bg-yellow-500/10 border-yellow-500/30 text-yellow-600";
    } else {
      baseClasses += " bg-card/50 border-border text-muted-foreground hover:bg-card/80";
    }
    
    return baseClasses;
  };

  return (
    <div ref={sectionRef} className="mb-16">
      <Card className="border-border bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                DevSecOps Security Pipeline
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Integrated security scanning throughout the CI/CD pipeline
              </p>
            </div>
            <button
              onClick={runPipeline}
              disabled={pipelineRunning}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlayCircle className="w-4 h-4" />
              {pipelineRunning ? "Running..." : "Run Pipeline"}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={getStageStyles(stage, index)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {stage.icon}
                    <span className="font-medium text-sm">{stage.name}</span>
                  </div>
                  {getStatusIcon(stage.status)}
                </div>
                
                <p className="text-xs opacity-80 mb-3">
                  {stage.description}
                </p>
                
                <div className="space-y-1">
                  {stage.tools.map((tool, toolIndex) => (
                    <Badge 
                      key={toolIndex}
                      variant="outline" 
                      className="text-xs h-5 px-2"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>

                {/* Pipeline connector line */}
                {index < stages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-current to-transparent opacity-30 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              DevSecOps Key Benefits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div>
                <strong className="text-foreground">Shift-Left Security:</strong> Early vulnerability detection reduces fix costs by 100x
              </div>
              <div>
                <strong className="text-foreground">Automated Compliance:</strong> CIS benchmarks, OWASP Top 10, and regulatory standards
              </div>
              <div>
                <strong className="text-foreground">Zero-Trust Architecture:</strong> Every component verified and monitored continuously
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevSecOpsPipeline;