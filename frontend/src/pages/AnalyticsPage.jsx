import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, AlertTriangle, FileText, Package, Wallet, Zap } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';
import Logo from '../components/Logo';

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
        title={
          <>
            Performance <span className="text-primary italic font-normal serif">Analytics.</span>
          </>
        }
        subtitle="Real-time visibility into stock health, procurement pressure, and spend trends."
        breadcrumbs={['Dashboard', 'Analytics']}
        actions={
          <PremiumButton variant="primary" icon={FileText}>
            Generate report
          </PremiumButton>
        }
      />

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="h-[220px] flex flex-col justify-between group">
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
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <motion.div
          className="xl:col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="h-[500px] flex flex-col overflow-hidden p-0" hover={false}>
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
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C08552" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C08552" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4B2E2B10" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#BAADAC', fontSize: 10, fontWeight: 900 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#BAADAC', fontSize: 10, fontWeight: 900 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 40px -10px rgba(75, 46, 43, 0.1)',
                      backgroundColor: '#FFF' 
                    }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#C08552" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="flex h-[240px] items-center gap-6">
              <div className="h-full w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard className="relative flex h-[235px] flex-col justify-between overflow-hidden border-accent-emerald/10 bg-accent-emerald/5">
              <div className="absolute -right-0 top-0 -mr-16 -mt-16 h-32 w-32 blur-3xl bg-accent-emerald/10" />
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-accent-emerald shadow-sm">
                    <Logo size={20} />
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
