import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const EngineeringPrinciples = () => {
  const principles = [
    {
      title: "Automate Everything",
      description: "If you do it twice, automate it. Manual processes are bugs waiting to happen."
    },
    {
      title: "Infrastructure as Code",
      description: "Every piece of infrastructure should be versioned, reviewed, and reproducible."
    },
    {
      title: "Security First",
      description: "Shift security left. Integrate SAST, DAST, and compliance checks into every pipeline."
    },
    {
      title: "Observability Over Monitoring",
      description: "Build systems that tell you why they fail, not just that they failed."
    },
    {
      title: "Simple Over Clever",
      description: "Write maintainable, clean configurations. Complexity is the enemy of reliability."
    }
  ];

  return (
    <section id="principles" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">How I Work</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Engineering
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Principles</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The core beliefs that guide every infrastructure decision and every line of code I write.
            </p>
          </div>

          <div className="space-y-4">
            {principles.map((principle, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-1 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{principle.title}</h3>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringPrinciples;
