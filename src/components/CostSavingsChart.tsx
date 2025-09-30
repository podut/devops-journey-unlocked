import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, TrendingDown, Zap } from 'lucide-react';

const CostSavingsChart = () => {
  // Granular weekly data comparing technologies
  const data = [
    { week: 'W1', AWS: 65, Kubernetes: 72, Docker: 55, Terraform: 68, Jenkins: 58, Python: 70, Ansible: 62, Prometheus: 60 },
    { week: 'W2', AWS: 70, Kubernetes: 78, Docker: 62, Terraform: 72, Jenkins: 64, Python: 75, Ansible: 68, Prometheus: 65 },
    { week: 'W3', AWS: 75, Kubernetes: 82, Docker: 68, Terraform: 78, Jenkins: 70, Python: 80, Ansible: 72, Prometheus: 70 },
    { week: 'W4', AWS: 82, Kubernetes: 88, Docker: 75, Terraform: 82, Jenkins: 76, Python: 85, Ansible: 78, Prometheus: 75 },
    { week: 'W5', AWS: 88, Kubernetes: 92, Docker: 80, Terraform: 88, Jenkins: 82, Python: 88, Ansible: 82, Prometheus: 80 },
    { week: 'W6', AWS: 92, Kubernetes: 95, Docker: 85, Terraform: 92, Jenkins: 86, Python: 92, Ansible: 86, Prometheus: 85 },
  ];

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border border-primary/20 rounded-lg shadow-neon">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
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
            Comparație estimativă a eficienței tehnologiilor pe parcursul implementării
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="glass-card p-6 rounded-xl hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Perioadă Analiză</span>
            </div>
            <p className="text-3xl font-bold gradient-text">6 Săptămâni</p>
            <p className="text-xs text-muted-foreground mt-1">progres estimativ</p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Eficiență Medie</span>
            </div>
            <p className="text-3xl font-bold text-accent">~85%</p>
            <p className="text-xs text-muted-foreground mt-1">la finalul perioadei</p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
                <span className="text-primary font-bold">8</span>
              </div>
              <span className="text-sm text-muted-foreground">Tehnologii</span>
            </div>
            <p className="text-3xl font-bold gradient-text">Monitorizate</p>
            <p className="text-xs text-muted-foreground mt-1">în timp real</p>
          </div>
        </div>

        {/* Chart */}
        <div className="glass-card p-8 rounded-2xl gradient-border shadow-neon hover-lift">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Comparație Performanță pe Săptămâni
            </h3>
            <p className="text-muted-foreground">
              Nivel estimativ de optimizare și eficiență pentru fiecare tehnologie (date comparative)
            </p>
          </div>

          <ResponsiveContainer width="100%" height={450}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <defs>
                {technologies.map((tech) => (
                  <linearGradient key={tech.key} id={`gradient-${tech.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={tech.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={tech.color} stopOpacity={0.2} />
                  </linearGradient>
                ))}
              </defs>
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
                domain={[40, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              
              {technologies.map((tech, index) => (
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
              ))}
            </LineChart>
          </ResponsiveContainer>

          {/* Technology Legend Details */}
          <div className="mt-8 pt-6 border-t border-primary/10">
            <p className="text-sm text-muted-foreground text-center mb-4">
              *Datele reprezintă estimări comparative ale nivelului de optimizare și eficiență, nu valori financiare exacte
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.key}
                  className="flex items-center gap-2 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-all cursor-pointer group"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  ></div>
                  <div>
                    <p className="text-xs font-medium group-hover:text-primary transition-colors">
                      {tech.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ~{data[data.length - 1][tech.key]}% final
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostSavingsChart;
