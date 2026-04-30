import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Lightbulb, 
  MessageSquare, 
  ArrowUpRight, 
  TrendingUp, 
  AlertCircle, 
  Package, 
  Clock,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';

const criticalInventory = [
  {
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    supplier: 'MedTech Inc.',
    stock: '0 units',
    price: 'Rs. 4.50',
    status: 'Out of Stock',
    daysLeft: '0 days',
    velocity: 'High',
  },
  {
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    supplier: 'PharmaCorp',
    stock: '12 units',
    price: 'Rs. 6.20',
    status: 'Low Stock',
    daysLeft: '3 days',
    velocity: 'Normal',
  },
  {
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    supplier: 'BioHealth',
    stock: '145 units',
    price: 'Rs. 12.00',
    status: 'In Stock',
    daysLeft: '45 days',
    velocity: 'Slow',
  },
];

const stats = [
  { label: 'Asset Valuation', value: 'Rs. 1.2M', trend: '+12.5%', icon: TrendingUp },
  { label: 'Low Stock SKU', value: '42', trend: '7 Urgent', colorClass: 'text-primary' },
  { label: 'Out of Stock', value: '7', trend: 'Critical', colorClass: 'text-red-500' },
  { label: 'Active Orders', value: '18', trend: '4 In Transit', icon: Clock },
];

const expiringSoon = [
  { name: 'Vitamin C Drops', days: '12 days left', severity: 'high' },
  { name: 'Cough Syrup (Adult)', days: '28 days left', severity: 'medium' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-[1600px] mx-auto px-6 py-10"
    >
      {/* ─── Header ─── */}
      <motion.div variants={itemAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black text-text/30 uppercase tracking-[0.3em]">System Overview</span>
          </div>
          <h1 className="text-4xl font-bold text-text tracking-tighter leading-none">Command <span className="text-primary italic font-normal serif">Center.</span></h1>
          <p className="text-text/40 text-xs font-medium">Real-time intelligence for your retail ecosystem.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-3.5 bg-white border border-text/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text/60 hover:text-text transition-all flex items-center gap-3">
            <Filter size={14} /> Filter View
          </button>
          <button className="px-6 py-3.5 bg-text text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-xl shadow-text/10">
            Export Report <ArrowUpRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* ─── Key Metrics ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div key={stat.label} variants={itemAnim}>
            <GlassCard className="p-8 group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em]">{stat.label}</p>
                {stat.icon && <stat.icon size={16} className="text-text/20 group-hover:text-primary transition-colors" />}
              </div>
              <div className="flex items-end justify-between">
                <span className={`text-2xl font-bold text-text tracking-tighter ${stat.colorClass || ''}`}>{stat.value}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend.includes('+') || stat.trend.includes('In Transit') ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* ─── Main Content: Critical Inventory ─── */}
        <motion.div variants={itemAnim} className="xl:col-span-2">
          <GlassCard className="p-0 overflow-hidden border-none shadow-none bg-transparent">
            <div className="flex justify-between items-center mb-8 px-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-text/5 flex items-center justify-center text-text">
                  <Package size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text tracking-tight">Critical Inventory</h2>
                  <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest mt-0.5">Urgent Procurement Required</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/dashboard/inventory')}
                className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary hover:text-text transition-colors"
              >
                View Ledger <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="bg-white rounded-[32px] border border-text/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-text/[0.02] border-b border-text/5">
                      <th className="px-8 py-5 text-[10px] font-black text-text/30 uppercase tracking-[0.2em]">Asset Details</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text/30 uppercase tracking-[0.2em]">Inventory</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text/30 uppercase tracking-[0.2em]">Valuation</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text/30 uppercase tracking-[0.2em]">Forecast</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text/30 uppercase tracking-[0.2em] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-text/5">
                    {criticalInventory.map((item) => (
                      <tr key={item.name} className="group hover:bg-text/[0.01] transition-all">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-text text-sm tracking-tight">{item.name}</span>
                            <span className="text-[10px] font-medium text-text/40 mt-1 uppercase tracking-widest">{item.category} • {item.supplier}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold ${item.status === 'Out of Stock' ? 'text-red-500' : 'text-text'}`}>{item.stock}</span>
                            <StatusBadge status={item.status} className="mt-1" />
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-medium text-text/60">{item.price}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${item.status === 'In Stock' ? 'text-text/60' : 'text-primary'}`}>{item.daysLeft}</span>
                            <div className={`w-1 h-1 rounded-full ${item.velocity === 'High' ? 'bg-red-500' : item.velocity === 'Normal' ? 'bg-primary' : 'bg-teal-500'}`} title={`Velocity: ${item.velocity}`} />
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button
                            onClick={() => navigate('/dashboard/inventory/compare')}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-text/5 text-text/20 hover:text-primary hover:border-primary/20 transition-all"
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate('/dashboard/inventory')}
              className="w-full mt-6 py-6 bg-primary text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl shadow-primary/20 hover:bg-primary-dark transition-all"
            >
              Reorder All Low Stock <ArrowUpRight size={16} />
            </motion.button>
          </GlassCard>
        </motion.div>

        {/* ─── Sidebar: Insights & Health ─── */}
        <motion.div variants={itemAnim} className="space-y-8">
          {/* Smart Insight Card */}
          <GlassCard className="p-8 relative overflow-hidden bg-text text-white border-none shadow-2xl shadow-text/20">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] -mr-24 -mt-24" />
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-white/10 backdrop-blur-xl rounded-xl text-primary">
                <Lightbulb size={20} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/90">Strategic Insight</h3>
            </div>
            <p className="text-sm font-medium leading-relaxed text-white/60 mb-8 italic">
              "Inventory velocity for <span className="text-white font-bold">Pain Relief</span> categories has increased by 24% this week. Consider adjusting reorder points for Paracetamol."
            </p>
            <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3">
              Apply Optimization <Sparkles size={14} />
            </button>
          </GlassCard>

          {/* Health Gauge */}
          <GlassCard className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] mb-2">Ecosystem Health</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-text tracking-tighter">82%</span>
                  <span className="text-teal-500 text-[10px] font-black bg-teal-50 px-2 py-1 rounded-full">OPTIMAL</span>
                </div>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-text/5" />
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray="175.9" strokeDashoffset="31.6" className="text-primary" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-text/40 uppercase tracking-widest">Service Level</span>
                <span className="text-text">94.2%</span>
              </div>
              <div className="w-full h-1.5 bg-text/5 rounded-full overflow-hidden">
                <div className="w-[94%] h-full bg-teal-500 rounded-full" />
              </div>
            </div>
          </GlassCard>

          {/* Expiring Soon */}
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <AlertCircle size={18} className="text-primary" />
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text">Expiring Soon</h3>
            </div>
            <div className="space-y-6">
              {expiringSoon.map((item) => (
                <div key={item.name} className="flex justify-between items-center group cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text group-hover:text-primary transition-colors">{item.name}</span>
                    <span className="text-[9px] font-medium text-text/30 uppercase tracking-widest mt-1">{item.days}</span>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full ${item.severity === 'high' ? 'bg-red-500' : 'bg-primary'}`} />
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border border-text/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text/40 hover:text-text hover:bg-text/[0.02] transition-all">
              Manage Expirations
            </button>
          </GlassCard>
        </motion.div>
      </div>
      
    </motion.div>
  );
};

export default DashboardHome;
