import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceArea } from 'recharts';
import { Activity, TrendingDown, Zap, AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const CostSavingsChart = () => {
  // Daily data with fluctuations (30 days)
  const generateDailyData = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const progress = i / 30;
      const fluctuation = Math.sin(i * 0.5) * 8; // Daily fluctuations
      
      days.push({
        day: `Ziua ${i}`,
        dayNum: i,
        AWS: Math.min(95, 50 + (progress * 42) + fluctuation + Math.random() * 5),
        Kubernetes: Math.min(98, 55 + (progress * 43) + fluctuation * 1.2 + Math.random() * 4),
        Docker: Math.min(90, 45 + (progress * 40) + fluctuation * 0.8 + Math.random() * 6),
        Terraform: Math.min(95, 52 + (progress * 40) + fluctuation * 0.9 + Math.random() * 5),
        Jenkins: Math.min(92, 48 + (progress * 40) + fluctuation * 1.1 + Math.random() * 5),
        Python: Math.min(96, 58 + (progress * 38) + fluctuation + Math.random() * 4),
        Ansible: Math.min(90, 50 + (progress * 36) + fluctuation * 0.9 + Math.random() * 5),
        Prometheus: Math.min(88, 48 + (progress * 37) + fluctuation * 1.1 + Math.random() * 5),
      });
    }
    return days;
  };

  const baseData = generateDailyData();

  // Technology dependencies - stricter rules
  const dependencies: Record<string, { depends: string[], critical: boolean }> = {
    Kubernetes: { depends: ['Docker', 'AWS'], critical: true }, // K8s needs Docker and AWS - without them goes to ~5%
    Jenkins: { depends: ['Docker'], critical: true }, // Jenkins uses Docker - without it goes to ~5%
    Terraform: { depends: ['AWS'], critical: false }, // Terraform manages AWS - can work without but drops to 30%
    Prometheus: { depends: ['Kubernetes'], critical: true }, // Prometheus monitors K8s - without it goes to ~5%
    Ansible: { depends: ['Python'], critical: true }, // Ansible is built on Python - without it goes to ~5%
    Python: { depends: [], critical: false },
    Docker: { depends: [], critical: false },
    AWS: { depends: [], critical: false },
  };

  const technologies = [
    { key: 'Kubernetes', color: '#326CE5', name: 'Kubernetes' },
    { key: 'AWS', color: '#FF9900', name: 'AWS' },
    { key: 'Python', color: '#3776AB', name: 'Python' },
    { key: 'Terraform', color: '#7B42BC', name: 'Terraform' },
    { key: 'Docker', color: '#2496ED', name: 'Docker' },
    { key: 'Jenkins', color: '#D24939', name: 'Jenkins' },
    { key: 'Ansible', color: '#EE0000', name: 'Ansible' },
    { key: 'Prometheus', color: '#E6522C', name: 'Prometheus' },
  ];

  const [enabledTechs, setEnabledTechs] = useState<Record<string, boolean>>(
    technologies.reduce((acc, tech) => ({ ...acc, [tech.key]: true }), {})
  );

  // Calculate adjusted data based on dependencies
  const adjustedData = useMemo(() => {
    return baseData.map(day => {
      const adjustedDay: any = { day: day.day, dayNum: day.dayNum };
      
      technologies.forEach(tech => {
        let value = day[tech.key as keyof typeof day] as number;
        
        if (!enabledTechs[tech.key]) {
          adjustedDay[tech.key] = null; // Don't show disabled techs
          return;
        }
        
        // Check dependencies
        const deps = dependencies[tech.key];
        if (deps && deps.depends.length > 0) {
          const missingCriticalDep = deps.depends.some(depTech => !enabledTechs[depTech]);
          
          if (missingCriticalDep) {
            if (deps.critical) {
              // Critical dependency missing - drop to near 0
              value = Math.max(5, Math.random() * 5);
            } else {
              // Non-critical - drop significantly but not to 0
              value = Math.max(20, value * 0.3);
            }
          }
        }
        
        adjustedDay[tech.key] = Math.round(value);
      });
      
      return adjustedDay;
    });
  }, [enabledTechs, baseData]);

  const toggleTechnology = (techKey: string) => {
    setEnabledTechs(prev => ({
      ...prev,
      [techKey]: !prev[techKey]
    }));
  };

  const avgEfficiency = useMemo(() => {
    const enabledTechsList = technologies.filter(t => enabledTechs[t.key]);
    if (enabledTechsList.length === 0) return 0;
    
    const lastDay = adjustedData[adjustedData.length - 1];
    const sum = enabledTechsList.reduce((acc, tech) => acc + (lastDay[tech.key] || 0), 0);
    return Math.round(sum / enabledTechsList.length);
  }, [enabledTechs, adjustedData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border border-primary/20 rounded-lg shadow-neon max-w-xs">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload
            .filter((entry: any) => enabledTechs[entry.dataKey] && entry.value !== null)
            .map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4 text-sm">
                <span style={{ color: entry.color }}>{entry.name}:</span>
                <span className="font-bold">{entry.value}%</span>
              </div>
            ))}
        </div>
      );
    }
    return null;
  };

  const getMissingDependencies = (techKey: string): string[] => {
    const deps = dependencies[techKey];
    if (!deps || !enabledTechs[techKey]) return [];
    return deps.depends.filter(dep => !enabledTechs[dep]);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
            <Activity className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">Performance Metrics</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Evoluție Zilnică</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simulare detaliată pe 30 de zile - vezi impactul dependențelor critice
          </p>
        </div>

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
                <span className="text-primary font-bold">30</span>
              </div>
              <span className="text-sm text-muted-foreground">Zile</span>
            </div>
            <p className="text-3xl font-bold gradient-text">Monitorizate</p>
            <p className="text-xs text-muted-foreground mt-1">fluctuații zilnice</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Selectează Tehnologii</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {technologies.map((tech) => {
              const missingDeps = getMissingDependencies(tech.key);
              const hasWarning = enabledTechs[tech.key] && missingDeps.length > 0;
              const isCritical = dependencies[tech.key]?.critical;
              
              return (
                <div
                  key={tech.key}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                    enabledTechs[tech.key] 
                      ? 'bg-background/80 border border-primary/20' 
                      : 'bg-background/30 opacity-60'
                  } ${hasWarning ? 'border-red-500/50' : ''}`}
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
                        <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-500">
                          {isCritical ? '⚠️ CRITIC' : 'Afectat'}: fără {missingDeps.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl gradient-border shadow-neon hover-lift">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Performanță Zilnică cu Fluctuații
            </h3>
            <p className="text-muted-foreground">
              Zone colorate: 🔴 Critic (0-30%) | 🟡 Mediu (30-60%) | 🟢 Optim (60-100%)
            </p>
          </div>

          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={adjustedData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <defs>
                {technologies.map((tech) => (
                  <linearGradient key={tech.key} id={`gradient-${tech.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={tech.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={tech.color} stopOpacity={0.3} />
                  </linearGradient>
                ))}
              </defs>
              
              {/* Colored zones */}
              <ReferenceArea y1={0} y2={30} fill="#ef4444" fillOpacity={0.1} />
              <ReferenceArea y1={30} y2={60} fill="#eab308" fillOpacity={0.08} />
              <ReferenceArea y1={60} y2={100} fill="#22c55e" fillOpacity={0.06} />
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--primary))" 
                opacity={0.15}
                verticalPoints={[0, 5, 10, 15, 20, 25, 30]}
              />
              <XAxis
                dataKey="dayNum"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `Z${value}`}
                interval={2}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
                ticks={[0, 30, 60, 100]}
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
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: tech.color }}
                    animationDuration={2000}
                    animationBegin={index * 100}
                    connectNulls={false}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-8 pt-6 border-t border-primary/10">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Dependențe Critice:</strong> Debifează Docker sau AWS pentru a vedea cum Kubernetes, Jenkins și alte tehnologii cad dramatic (aproape de 0%). Sistemele critice depind unele de altele!
                </span>
              </p>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              *Simulare realistă: fluctuațiile zilnice reflectă variabilitatea reală a performanței sistemelor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostSavingsChart;
