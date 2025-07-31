import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Maximize2, Minimize2, X, Terminal } from "lucide-react";

const TerminalSection = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const commands = [
    {
      tech: "AWS",
      command: "aws ec2 describe-instances --region eu-west-1",
      output: [
        "✓ Connected to AWS Console",
        "📊 Running 12 EC2 instances",
        "🌍 Multi-region deployment active",
        "💰 Cost optimization: 34% savings"
      ],
      color: "text-orange-400"
    },
    {
      tech: "Kubernetes",
      command: "kubectl get pods --all-namespaces",
      output: [
        "✓ Cluster status: Healthy",
        "🚀 150+ pods running",
        "⚖️ Auto-scaling enabled",
        "🔄 Zero-downtime deployments"
      ],
      color: "text-blue-400"
    },
    {
      tech: "Docker",
      command: "docker ps --format 'table {{.Names}}\\t{{.Status}}'",
      output: [
        "✓ 25 containers running",
        "📦 Multi-stage builds optimized",
        "🏗️ Custom base images",
        "🔒 Security scanning passed"
      ],
      color: "text-cyan-400"
    },
    {
      tech: "Terraform",
      command: "terraform plan -var-file=prod.tfvars",
      output: [
        "✓ Infrastructure as Code",
        "🏗️ 45 resources managed",
        "🔄 State management: Remote",
        "📋 Modules: 12 custom modules"
      ],
      color: "text-purple-400"
    },
    {
      tech: "Jenkins",
      command: "jenkins-cli build DevOps-Pipeline -p ENVIRONMENT=prod",
      output: [
        "✓ Pipeline triggered successfully",
        "🔄 CI/CD: 150+ deployments/month",
        "⚡ Build time: 3.2 minutes",
        "🎯 Success rate: 98.5%"
      ],
      color: "text-red-400"
    },
    {
      tech: "Python",
      command: "python automation_scripts/deploy.py --env production",
      output: [
        "✓ Automation scripts running",
        "🐍 50+ Python utilities",
        "📊 Data processing pipelines",
        "🤖 Infrastructure monitoring"
      ],
      color: "text-green-400"
    },
    {
      tech: "Ansible",
      command: "ansible-playbook -i inventory/prod deploy.yml",
      output: [
        "✓ Configuration management",
        "🎯 100+ servers managed",
        "📜 50+ playbooks active",
        "🔧 Zero-touch provisioning"
      ],
      color: "text-yellow-400"
    },
    {
      tech: "Prometheus",
      command: "promtool query instant 'up{job=\"kubernetes-pods\"}'",
      output: [
        "✓ Monitoring 500+ metrics",
        "📈 99.9% uptime tracking",
        "🚨 Real-time alerting",
        "📊 Custom dashboards: 25+"
      ],
      color: "text-orange-500"
    }
  ];

  const typeText = async (text: string) => {
    setIsTyping(true);
    setDisplayText("");
    
    for (let i = 0; i <= text.length; i++) {
      setDisplayText(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 30));
    }
    
    setIsTyping(false);
    
    // Wait before showing output
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentCommand((prev) => (prev + 1) % commands.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    
    const current = commands[currentCommand];
    typeText(`${current.tech.toLowerCase()}@devops:~$ ${current.command}`);
  }, [currentCommand, isVisible]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const current = commands[currentCommand];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-secondary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Terminal className="w-4 h-4 mr-2" />
              Terminal Experience
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              DevOps in
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Action</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Watch real-time DevOps workflows and commands that power modern infrastructure
            </p>
          </div>

          {/* Terminal Window */}
          <Card className="border-border bg-black/90 backdrop-blur-sm shadow-2xl max-w-5xl mx-auto">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Terminal className="w-4 h-4" />
                <span className="font-mono">DevOps Terminal</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Minimize2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                <X className="w-4 h-4 hover:text-red-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm min-h-[400px]">
              {/* Command Line */}
              <div className="mb-4">
                <span className={`${current.color} font-bold`}>
                  {displayText}
                  {showCursor && <span className="animate-pulse">|</span>}
                </span>
              </div>

              {/* Output */}
              {!isTyping && (
                <div className="space-y-2 animate-fade-in">
                  {current.output.map((line, index) => (
                    <div 
                      key={index}
                      className="text-green-400 animate-fade-in"
                      style={{ 
                        animationDelay: `${index * 200}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      {line}
                    </div>
                  ))}
                  
                  {/* Progress Bar */}
                  <div className="mt-4 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
                    <div className="text-cyan-400 mb-2">Progress: [{current.tech} Deployment]</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full animate-pulse"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">85% Complete - ETA: 2m 30s</div>
                  </div>

                  {/* System Stats */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '1200ms', animationFillMode: 'both' }}>
                    <div className="text-center">
                      <div className="text-yellow-400 font-bold">CPU</div>
                      <div className="text-white">23%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">RAM</div>
                      <div className="text-white">45%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-bold">Disk</div>
                      <div className="text-white">67%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold">Network</div>
                      <div className="text-white">12MB/s</div>
                    </div>
                  </div>

                  {/* Next Command Preview */}
                  <div className="mt-6 text-gray-500 animate-fade-in" style={{ animationDelay: '1600ms', animationFillMode: 'both' }}>
                    <span className="animate-pulse">Next: {commands[(currentCommand + 1) % commands.length].tech} operations...</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Technology Indicators */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {commands.map((cmd, index) => (
              <Badge
                key={index}
                variant={index === currentCommand ? "default" : "outline"}
                className={`
                  ${index === currentCommand ? 'shadow-glow animate-pulse' : 'opacity-60'}
                  transition-all duration-300 cursor-pointer hover:opacity-100
                  ${cmd.color}
                `}
                onClick={() => setCurrentCommand(index)}
              >
                {cmd.tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Background Grid Animation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-grid-pattern animate-pulse"></div>
      </div>
    </section>
  );
};

export default TerminalSection;