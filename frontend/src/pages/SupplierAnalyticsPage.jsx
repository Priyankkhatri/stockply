import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  Clock3,
  FileText,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import Logo from "../components/Logo";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useSupplier } from "../context/SupplierContext";
import PageHeader from "../components/PageHeader";

import GlassCard from "../components/GlassCard";
import PremiumButton from "../components/PremiumButton";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export default function SupplierAnalyticsPage() {
  const { products, orders } = useSupplier();

  const totalRevenue = orders.reduce((sum, o) => {
    return sum + (o.totalAmount || 0);
  }, 0);

  const fulfilledOrders = orders.filter(o => o.status === 'Dispatched').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  const stats = [
    { label: "Revenue Total", value: `Rs. ${(totalRevenue / 1000).toFixed(1)}k`, trend: "+8.2%", up: true, icon: IndianRupee },
    { label: "Orders Count", value: orders.length.toString(), trend: `+${orders.length}`, up: true, icon: Boxes },
    { label: "Fulfilled Rate", value: `${((fulfilledOrders / (orders.length || 1)) * 100).toFixed(0)}%`, trend: "-2 hrs", up: true, icon: Clock3 },
    { label: "Demand Intensity", value: pendingOrders > 0 ? "High" : "Stable", trend: "+11%", up: false, icon: TrendingUp },
  ];

  const fulfillmentMix = [
    { label: "On Time", value: fulfilledOrders > 0 ? 85 : 0, color: "#10B981" },
    { label: "Processing", value: pendingOrders > 0 ? 15 : 0, color: "#F59E0B" },
  ];

  const categoryVelocity = [
    { name: "Packaging", orders: products.filter(p => p.category === 'Packaging').length.toString(), change: "+12%" },
    { name: "Fabric", orders: products.filter(p => p.category === 'Fabric').length.toString(), change: "+8%" },
    { name: "Leather", orders: products.filter(p => p.category === 'Leather').length.toString(), change: "-3%" },
  ];

  const weeklyDemand = [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 58 },
    { label: "Wed", value: 51 },
    { label: "Thu", value: 68 },
    { label: "Fri", value: 64 },
    { label: "Sat", value: 79 },
    { label: "Sun", value: orders.length * 10 }, // Reflect live data influence
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="mx-auto max-w-[1600px] px-4 sm:px-10 py-6 sm:py-10"
    >
      <motion.div variants={rowAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/80 uppercase tracking-[0.3em]">Analytics</span>
          </div>
          <h1 className="text-5xl font-bold text-text tracking-tighter leading-none">Intelligence <span className="text-primary italic font-normal serif">Report.</span></h1>
          <p className="text-text/80 text-sm font-medium">Track fulfillment velocity, demand pressure, and revenue movement across your partner network.</p>
        </div>

        <div className="flex items-center gap-4">
          <PremiumButton variant="primary" icon={FileText}>
            Export insight pack
          </PremiumButton>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .serif { font-family: "Playfair Display", serif; }
        .shadow-premium { box-shadow: 0 20px 80px -20px rgba(0,0,0,0.06); }
      ` }} />

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="h-[200px] flex flex-col justify-between group border-b-4" style={{ borderBottomColor: stat.up ? '#10B981' : '#F43F5E' }}>
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-text text-white shadow-premium transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary">
                  <stat.icon size={22} strokeWidth={2} />
                </div>
                <div
                  className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${
                    stat.up
                      ? "border-teal-100 bg-teal-50 text-teal-600"
                      : "border-rose-100 bg-rose-50 text-rose-500"
                   }`}
                >
                  {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.trend}
                </div>
              </div>

              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-text/80">{stat.label}</p>
                <p className="text-4xl font-bold text-text tracking-tighter">{stat.value}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <motion.div
          className="xl:col-span-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="h-[400px] sm:h-[500px] flex flex-col overflow-hidden p-0" hover={false}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-text/5 bg-[#FAF5F0]/30 px-8 py-6 gap-4">
              <div>
                <h3 className="text-xl font-bold text-text tracking-tight">Demand Velocity</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-text/70">
                  Global order intensity (7-day window)
                </p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-text/5 shadow-sm">
                <div className="h-2 w-2 rounded-full animate-pulse bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-text">Predictive Sync</span>
              </div>
            </div>

            <div className="flex-1 p-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyDemand}>
                  <defs>
                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C08552" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#C08552" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#1A121108" />
                  <XAxis 
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#1A121170', fontSize: 10, fontWeight: 900 }} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#1A121170', fontSize: 10, fontWeight: 900 }}
                  />
                  <Tooltip 
                    cursor={{ stroke: '#C0855220', strokeWidth: 20 }}
                    contentStyle={{ 
                      borderRadius: '24px', 
                      border: '1px solid #1A121105', 
                      boxShadow: '0 20px 40px -10px rgba(75, 46, 43, 0.1)',
                      backgroundColor: '#FFF',
                      padding: '16px'
                    }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1A1211' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#C08552" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorDemand)" 
                    animationDuration={2000}
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
            <GlassCard className="flex flex-col sm:flex-row h-auto sm:h-[250px] items-center gap-6 p-6 sm:p-8">
              <div className="h-[180px] sm:h-full w-full sm:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fulfillmentMix}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {fulfillmentMix.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full sm:w-1/2 space-y-4">
                <h4 className="text-lg font-display font-bold text-text">Fulfillment Mix</h4>
                <div className="space-y-2">
                  {fulfillmentMix.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text/80">{item.label}</span>
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
            <GlassCard className="relative flex h-[242px] flex-col justify-between overflow-hidden border-accent-emerald/10 bg-accent-emerald/5">
              <div className="absolute -right-0 top-0 -mr-16 -mt-16 h-32 w-32 bg-accent-emerald/10 blur-3xl" />
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-accent-emerald shadow-sm">
                    <Logo size={20} />
                  </div>
                  <h4 className="text-lg font-display font-bold text-text">Dispatch Optimizer</h4>
                </div>
                <p className="text-xs font-medium leading-relaxed text-text/80">
                  Shift tomorrow&apos;s packaging batch forward and you can improve on-time fulfillment by
                  <span className="font-black text-accent-emerald"> 6% </span>
                  across top-demand stores.
                </p>
              </div>
              <PremiumButton variant="primary" size="sm" className="w-full bg-accent-emerald hover:bg-accent-emerald/90 shadow-accent-emerald/20">
                Apply recommendation
              </PremiumButton>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {categoryVelocity.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            <div className="rounded-[30px] border border-text/5 bg-white p-8 shadow-sm h-full">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-text/80">{item.name}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-display font-bold text-text">{item.orders}</p>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                  {item.change}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-text/80">Order velocity over the current week.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

