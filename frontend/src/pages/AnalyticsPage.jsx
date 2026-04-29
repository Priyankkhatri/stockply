import React from 'react';
import { ArrowDownRight, ArrowUpRight, AlertTriangle, FileText, Package, Sparkles, Wallet, Zap } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';

const lineData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const pieData = [
  { name: 'In Stock', value: 75 },
  { name: 'Low Stock', value: 15 },
  { name: 'Out of Stock', value: 10 },
];

const COLORS = ['#10B981', '#F59E0B', '#F43F5E'];
const sparkBars = [52, 68, 44, 74, 58, 66, 92];

const stats = [
  { label: 'Inventory Health', value: '82%', trend: '+2.4%', up: true, icon: Zap },
  { label: 'Stockout Rate', value: '4.2%', trend: '+1.1%', up: false, icon: AlertTriangle },
  { label: 'Overstock Items', value: '15', trend: 'Static', up: null, icon: Package },
  { label: 'Monthly Spend', value: 'Rs. 4.2L', trend: '-5.2%', up: true, icon: Wallet },
];

const AnalyticsPage = () => {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader
        title="Performance Analytics"
        subtitle="Real-time visibility into stock health, procurement pressure, and spend trends."
        breadcrumbs={['Dashboard', 'Analytics']}
        actions={
          <PremiumButton variant="primary" icon={FileText}>
            Generate report
          </PremiumButton>
        }
      />

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="h-[220px] flex flex-col justify-between group">
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary shadow-inner-soft transition-transform duration-500 group-hover:scale-110">
                <stat.icon size={26} strokeWidth={2.5} />
              </div>
              {stat.up !== null && (
                <div
                  className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-black uppercase tracking-widest ${
                    stat.up
                      ? 'border-accent-emerald/10 bg-accent-emerald/5 text-accent-emerald'
                      : 'border-accent-rose/10 bg-accent-rose/5 text-accent-rose'
                  }`}
                >
                  {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.trend}
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{stat.label}</p>
              <p className="text-4xl font-display font-bold text-text">{stat.value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <GlassCard className="h-[500px] flex flex-col overflow-hidden p-0 xl:col-span-2" hover={false}>
          <div className="flex items-center justify-between border-b border-text/5 bg-white/50 px-10 py-8">
            <div>
              <h3 className="text-xl font-display font-bold text-text">Inventory Flux</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Movement trends across all categories</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text">Live Feed</span>
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="flex h-full flex-col rounded-[28px] border border-text/5 bg-background/30 p-6">
              <div className="mb-6 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                <span>Weekly trend</span>
                <span>7 day view</span>
              </div>
              <div className="relative flex flex-1 items-end gap-4">
                <div className="absolute inset-x-0 top-1/2 h-px bg-text/5" />
                {lineData.map((point, index) => (
                  <div key={point.name} className="relative z-10 flex flex-1 flex-col items-center gap-3">
                    <div
                      className="w-full rounded-t-2xl bg-primary/15 transition-all duration-300 hover:bg-primary/35"
                      style={{ height: `${sparkBars[index]}%` }}
                      title={`${point.name}: ${point.value}`}
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{point.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="flex h-[240px] items-center gap-6">
            <div className="flex h-full w-1/2 items-center justify-center">
              <div className="relative h-32 w-32 rounded-full" style={{ background: 'conic-gradient(#10B981 0 75%, #F59E0B 75% 90%, #F43F5E 90% 100%)' }}>
                <div className="absolute inset-5 rounded-full bg-white" />
              </div>
            </div>
            <div className="w-1/2 space-y-4">
              <h4 className="text-lg font-display font-bold text-text">Stock Health</h4>
              <div className="space-y-2">
                {pieData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-text">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="relative flex h-[235px] flex-col justify-between overflow-hidden border-accent-emerald/10 bg-accent-emerald/5">
            <div className="absolute -right-0 top-0 -mr-16 -mt-16 h-32 w-32 blur-3xl bg-accent-emerald/10" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-accent-emerald shadow-sm">
                  <Sparkles size={20} />
                </div>
                <h4 className="text-lg font-display font-bold text-text">AI Optimizer</h4>
              </div>
              <p className="text-xs font-medium leading-relaxed text-text-muted">
                You can save <span className="font-black text-accent-emerald">Rs. 24,500</span> this month by switching to a better supplier mix.
              </p>
            </div>
            <PremiumButton variant="primary" size="sm" className="w-full bg-accent-emerald hover:bg-accent-emerald/90 shadow-accent-emerald/20">
              Apply optimizer
            </PremiumButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
