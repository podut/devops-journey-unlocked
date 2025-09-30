import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, TrendingDown, Zap, AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const CostSavingsChart = () => {
  // Base data for each technology
  const baseData = [
    { week: 'W1', AWS: 65, Kubernetes: 72, Docker: 55, Terraform: 68, Jenkins: 58, Python: 70, Ansible: 62, Prometheus: 60 },
    { week: 'W2', AWS: 70, Kubernetes: 78, Docker: 62, Terraform: 72, Jenkins: 64, Python: 75, Ansible: 68, Prometheus: 65 },
    { week: 'W3', AWS: 75, Kubernetes: 82, Docker: 68, Terraform: 78, Jenkins: 70, Python: 80, Ansible: 72, Prometheus: 70 },
    { week: 'W4', AWS: 82, Kubernetes: 88, Docker: 75, Terraform: 82, Jenkins: 76, Python: 85, Ansible: 78, Prometheus: 75 },
    { week: 'W5', AWS: 88, Kubernetes: 92, Docker: 80, Terraform: 88, Jenkins: 82, Python: 88, Ansible: 82, Prometheus: 80 },
    { week: 'W6', AWS: 92, Kubernetes: 95, Docker: 85, Terraform: 92, Jenkins: 86, Python: 92, Ansible: 86, Prometheus: 85 },
  ];

  // Technology dependencies - which technologies depend on others
  const dependencies: Record<string, { depends: string[], impact: number }> = {
    Kubernetes: { depends: ['Docker', 'AWS'], impact: 30 }, // K8s needs Docker and runs on AWS
    Jenkins: { depends: ['Docker'], impact: 25 }, // Jenkins uses Docker containers
    Terraform: { depends: ['AWS'], impact: 20 }, // Terraform manages AWS resources
    Prometheus: { depends: ['Kubernetes'], impact: 15 }, // Prometheus monitors K8s
    Ansible: { depends: ['Python'], impact: 20 }, // Ansible is built on Python
    Python: { depends: [], impact: 0 },
    Docker: { depends: [], impact: 0 },
    AWS: { depends: [], impact: 0 },
  };

  const technologies = [
    { key: 'Kubernetes', color: 'hsl(var(--primary))', name: 'Kubernetes' },
    { key: 'AWS', color: '#FF9900', name: 'AWS' },
    { key: 'Python', color: 'hsl(var(--accent))', name: 'Python' },
    { key: 'Terraform', color: '#7B42BC', name: 'Terraform' },
    { key: 'Docker', color: '#2496ED', name: 'Docker' },
    { key: 'Jenkins', color: '#D24939', name: 'Jenkins' },
    { key: 'Ansible', color: '#EE0000', name: 'Ansible' },
    { key: 'Prometheus', color: '#E6522C', name: 'Prometheus' },
  ];

  // State to track which technologies are enabled
  const [enabledTechs, setEnabledTechs] = useState<Record<string, boolean>>(
    technologies.reduce((acc, tech) => ({ ...acc, [tech.key]: true }), {})
  );

  // Calculate adjusted data based on enabled technologies and dependencies
  const adjustedData = useMemo(() => {
    return baseData.map(week => {
      const adjustedWeek: any = { week: week.week };
      
      technologies.forEach(tech => {
        let value = week[tech.key as keyof typeof week] as number;
        
        // Check if this technology's dependencies are enabled
        const deps = dependencies[tech.key];
        if (deps && deps.depends.length > 0) {
          deps.depends.forEach(depTech => {
            if (!enabledTechs[depTech]) {
              // If a dependency is disabled, reduce the value
              value = Math.max(value - deps.impact, 30); // Don't go below 30%
            }
          });
        }
        
        adjustedWeek[tech.key] = value;
      });
      
      return adjustedWeek;
    });
  }, [enabledTechs, baseData]);

  const toggleTechnology = (techKey: string) => {
    setEnabledTechs(prev => ({
      ...prev,
      [techKey]: !prev[techKey]
    }));
  };

  // Calculate average efficiency
  const avgEfficiency = useMemo(() => {
    const enabledTechsList = technologies.filter(t => enabledTechs[t.key]);
    if (enabledTechsList.length === 0) return 0;
    
    const lastWeek = adjustedData[adjustedData.length - 1];
    const sum = enabledTechsList.reduce((acc, tech) => acc + (lastWeek[tech.key] || 0), 0);
    return Math.round(sum / enabledTechsList.length);
  }, [enabledTechs, adjustedData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border border-primary/20 rounded-lg shadow-neon max-w-xs">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload
            .filter((entry: any) => enabledTechs[entry.dataKey])
            .map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4 text-sm">
                <span style={{ color: entry.color }}>{entry.name}:</span>
                <span className="font-bold">{entry.value}% eficiență</span>
              </div>
            ))}
        </div>
      );
    }
    return null;
  };

  // Check if there are any missing dependencies
  const getMissingDependencies = (techKey: string): string[] => {
    const deps = dependencies[techKey];
    if (!deps || !enabledTechs[techKey]) return [];
    return deps.depends.filter(dep => !enabledTechs[dep]);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
            <Activity className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">Performance Metrics</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Evoluție Optimizare</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simulare interactivă - debifează tehnologii pentru a vedea impactul asupra stack-ului
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="glass-card p-6 rounded-xl hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Tehnologii Active</span>
            </div>
            <p className="text-3xl font-bold gradient-text">
              {Object.values(enabledTechs).filter(Boolean).length}/{technologies.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">în simulare</p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Eficiență Medie</span>
            </div>
            <p className="text-3xl font-bold text-accent">~{avgEfficiency}%</p>
            <p className="text-xs text-muted-foreground mt-1">cu stack-ul curent</p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
                <span className="text-primary font-bold">6</span>
              </div>
              <span className="text-sm text-muted-foreground">Săptămâni</span>
            </div>
            <p className="text-3xl font-bold gradient-text">Perioadă</p>
            <p className="text-xs text-muted-foreground mt-1">progres estimativ</p>
          </div>
        </div>

        {/* Technology Selector */}
        <div className="glass-card p-6 rounded-2xl mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Selectează Tehnologii</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {technologies.map((tech) => {
              const missingDeps = getMissingDependencies(tech.key);
              const hasWarning = enabledTechs[tech.key] && missingDeps.length > 0;
              
              return (
                <div
                  key={tech.key}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                    enabledTechs[tech.key] 
                      ? 'bg-background/80 border border-primary/20' 
                      : 'bg-background/30 opacity-60'
                  } ${hasWarning ? 'border-yellow-500/50' : ''}`}
                  onClick={() => toggleTechnology(tech.key)}
                >
                  <Checkbox
                    checked={enabledTechs[tech.key]}
                    onCheckedChange={() => toggleTechnology(tech.key)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: tech.color }}
                      ></div>
                      <p className="text-sm font-medium truncate">{tech.name}</p>
                    </div>
                    {hasWarning && (
                      <div className="flex items-start gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-500">
                          Lipsește: {missingDeps.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart */}
        <div className="glass-card p-8 rounded-2xl gradient-border shadow-neon hover-lift">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Comparație Performanță pe Săptămâni
            </h3>
            <p className="text-muted-foreground">
              Impactul tehnologiilor selectate asupra eficienței stack-ului (simulare cu dependențe)
            </p>
          </div>

          <ResponsiveContainer width="100%" height={450}>
            <LineChart
              data={adjustedData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary))" opacity={0.1} />
              <XAxis
                dataKey="week"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `${value}%`}
                domain={[20, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              
              {technologies.map((tech, index) => (
                enabledTechs[tech.key] && (
                  <Line
                    key={tech.key}
                    type="monotone"
                    dataKey={tech.key}
                    stroke={tech.color}
                    strokeWidth={3}
                    dot={{ fill: tech.color, r: 4 }}
                    activeDot={{ r: 6, fill: tech.color }}
                    animationDuration={1500}
                    animationBegin={index * 100}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>

          {/* Info */}
          <div className="mt-8 pt-6 border-t border-primary/10">
            <p className="text-sm text-muted-foreground text-center">
              *Simulare: Debifează tehnologii pentru a vedea impactul asupra celor dependente. De exemplu, fără Docker, Kubernetes și Jenkins scad în performanță.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostSavingsChart;
