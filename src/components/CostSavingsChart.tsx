import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingDown } from 'lucide-react';

const CostSavingsChart = () => {
  const data = [
    { name: 'AWS', savings: 2800, month: 'Luna curentă' },
    { name: 'Kubernetes', savings: 3200, month: 'Luna curentă' },
    { name: 'Docker', savings: 1500, month: 'Luna curentă' },
    { name: 'Terraform', savings: 2100, month: 'Luna curentă' },
    { name: 'Jenkins', savings: 1800, month: 'Luna curentă' },
    { name: 'Python', savings: 2400, month: 'Luna curentă' },
    { name: 'Ansible', savings: 1900, month: 'Luna curentă' },
    { name: 'Prometheus', savings: 1600, month: 'Luna curentă' },
  ];

  const totalSavings = data.reduce((sum, item) => sum + item.savings, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border border-primary/20 rounded-lg shadow-neon">
          <p className="font-semibold text-foreground">{payload[0].payload.name}</p>
          <p className="text-primary font-bold">
            ${payload[0].value.toLocaleString()} / lună
          </p>
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
            <TrendingDown className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">Cost Optimization</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Reducere Costuri</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Economii lunare generate prin automatizare și optimizare infrastructure
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="glass-card p-6 rounded-xl hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Economii</span>
            </div>
            <p className="text-3xl font-bold gradient-text">
              ${totalSavings.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">pe lună</p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Reducere Medie</span>
            </div>
            <p className="text-3xl font-bold text-accent">45%</p>
            <p className="text-xs text-muted-foreground mt-1">costuri infrastructure</p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
                <span className="text-primary font-bold">8</span>
              </div>
              <span className="text-sm text-muted-foreground">Tehnologii</span>
            </div>
            <p className="text-3xl font-bold gradient-text">Optimizate</p>
            <p className="text-xs text-muted-foreground mt-1">pentru eficiență maximă</p>
          </div>
        </div>

        {/* Chart */}
        <div className="glass-card p-8 rounded-2xl gradient-border shadow-neon hover-lift">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Economii pe Tehnologie
            </h3>
            <p className="text-muted-foreground">
              Reducerea costurilor lunare prin implementare și automatizare
            </p>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary))" opacity={0.1} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="savings"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSavings)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Technology Legend */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {data.map((tech, index) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-all cursor-pointer group"
              >
                <div
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent"
                  style={{ opacity: 0.8 - (index * 0.1) }}
                ></div>
                <div>
                  <p className="text-xs font-medium group-hover:text-primary transition-colors">
                    {tech.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${tech.savings.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostSavingsChart;
