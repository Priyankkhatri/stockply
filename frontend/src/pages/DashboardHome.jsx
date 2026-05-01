import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Filter,
  Loader2
} from 'lucide-react';
import { productAPI, alertAPI, orderAPI } from '../services/api';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';

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
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [prodRes, summaryRes] = await Promise.all([
        productAPI.getAll().catch(() => ({ data: { data: { products: [] } } })),
        alertAPI.getSummary().catch(() => ({ data: { data: { summary: {} } } })),
      ]);
      setProducts(prodRes.data?.data?.products ?? []);
      setSummary(summaryRes.data?.data?.summary ?? null);
    } catch (err) {
      console.error('Dashboard data fetch failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ─── Computed stats from real data ─────────────────────────
  const criticalInventory = useMemo(() => {
    return products
      .filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock')
      .slice(0, 5)
      .map(p => ({
        ...p,
        stock: `${p.stock} units`,
        price: `Rs. ${(p.price || 0).toFixed(2)}`,
        daysLeft: p.stock === 0 ? '0 days' : p.stock <= 5 ? `~${p.stock} days` : `~${Math.floor(p.stock / 3)} days`,
        velocity: p.stock === 0 ? 'High' : p.stock <= 10 ? 'Normal' : 'Slow',
      }));
  }, [products]);

  const stats = useMemo(() => {
    const totalValue = products.reduce((sum, p) => sum + (p.stock || 0) * (p.price || 0), 0);
    const lowStockCount = summary?.lowStockCount || products.filter(p => p.status === 'Low Stock').length;
    const outOfStockCount = summary?.outOfStockCount || products.filter(p => p.status === 'Out of Stock').length;
    const urgentCount = products.filter(p => p.stock === 0).length;

    return [
      { label: 'Asset Valuation', value: `Rs. ${totalValue >= 1000000 ? (totalValue / 1000000).toFixed(1) + 'M' : totalValue >= 1000 ? (totalValue / 1000).toFixed(1) + 'K' : totalValue.toFixed(0)}`, trend: products.length > 0 ? 'Live' : '—', icon: TrendingUp },
      { label: 'Low Stock SKU', value: String(lowStockCount), trend: urgentCount > 0 ? `${urgentCount} Urgent` : 'None', colorClass: lowStockCount > 0 ? 'text-primary' : '' },
      { label: 'Out of Stock', value: String(outOfStockCount), trend: outOfStockCount > 0 ? 'Critical' : 'Clear', colorClass: outOfStockCount > 0 ? 'text-red-500' : '' },
      { label: 'Total Products', value: String(products.length), trend: products.length > 0 ? 'Active' : 'Empty', icon: Clock },
    ];
  }, [products, summary]);

  const healthPct = useMemo(() => {
    if (products.length === 0) return 0;
    const inStock = products.filter(p => p.status === 'In Stock').length;
    return ((inStock / products.length) * 100).toFixed(0);
  }, [products]);

  const serviceLevelPct = useMemo(() => {
    if (products.length === 0) return 0;
    const healthy = products.filter(p => p.status !== 'Out of Stock').length;
    return ((healthy / products.length) * 100).toFixed(1);
  }, [products]);

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
            <span className="text-[10px] font-black text-text/80 uppercase tracking-[0.3em]">System Overview</span>
          </div>
          <h1 className="text-4xl font-bold text-text tracking-tighter leading-none">Command <span className="text-primary italic font-normal serif">Center.</span></h1>
          <p className="text-text/80 text-xs font-medium">Real-time intelligence for your retail ecosystem.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/inventory', { state: { filter: 'Low Stock' } })}
            className="px-6 py-3.5 bg-white border border-text/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text/80 hover:text-text hover:border-primary/20 transition-all flex items-center gap-3 group"
          >
            <Filter size={14} className="group-hover:text-primary transition-colors" /> Filter View
          </button>
          <button className="px-6 py-3.5 bg-text text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-xl shadow-text/10">
            Export Report <ArrowUpRight size={14} />
          </button>
        </div>
      </motion.div>

      {/* ─── Key Metrics ─── */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={28} className="animate-spin text-primary" />
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div key={stat.label} variants={itemAnim}>
            <GlassCard className="p-8 group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black text-text/80 uppercase tracking-[0.2em]">{stat.label}</p>
                {stat.icon && <stat.icon size={16} className="text-text/70 group-hover:text-primary transition-colors" />}
              </div>
              <div className="flex items-end justify-between">
                <span className={`text-2xl font-bold text-text tracking-tighter ${stat.colorClass || ''}`}>{stat.value}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend.includes('Urgent') || stat.trend === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      )}

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
                  <p className="text-[10px] font-bold text-text/80 uppercase tracking-widest mt-0.5">Urgent Procurement Required</p>
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
              {criticalInventory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                  <div className="w-16 h-16 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-500 mb-4">
                    <Package size={28} strokeWidth={1.5} />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-text/70 mb-2">
                    {products.length === 0 ? 'No Products Yet' : 'All Stock Healthy'}
                  </p>
                  <p className="text-xs text-text/70 font-medium leading-relaxed max-w-sm">
                    {products.length === 0
                      ? 'Add products from the Inventory page to see critical stock levels here.'
                      : 'No items require urgent reordering. Your inventory is in excellent shape!'}
                  </p>
                </div>
              ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-text/[0.02] border-b border-text/5">
                      <th className="px-8 py-5 text-[10px] font-black text-text/70 uppercase tracking-[0.2em]">Asset Details</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text/70 uppercase tracking-[0.2em]">Inventory</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text/70 uppercase tracking-[0.2em]">Valuation</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text/70 uppercase tracking-[0.2em]">Forecast</th>
                      <th className="px-8 py-5 text-[10px] font-black text-text/70 uppercase tracking-[0.2em] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-text/5">
                    {criticalInventory.map((item) => (
                      <tr key={item._id} className="group hover:bg-text/[0.01] transition-all">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-text text-sm tracking-tight">{item.name}</span>
                            <span className="text-[10px] font-bold text-text/80 mt-1 uppercase tracking-widest">{item.category}{item.supplier ? ` • ${item.supplier}` : ''}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold ${item.status === 'Out of Stock' ? 'text-red-500' : 'text-text'}`}>{item.stock}</span>
                            <StatusBadge status={item.status} className="mt-1" />
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-medium text-text/80">{item.price}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${item.status === 'In Stock' ? 'text-text/80' : 'text-primary'}`}>{item.daysLeft}</span>
                            <div className={`w-1 h-1 rounded-full ${item.velocity === 'High' ? 'bg-red-500' : item.velocity === 'Normal' ? 'bg-primary' : 'bg-teal-500'}`} title={`Velocity: ${item.velocity}`} />
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button
                            onClick={() => navigate('/dashboard/inventory')}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-text/10 text-text/70 hover:text-primary hover:border-primary/20 transition-all shadow-sm"
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
            
            {criticalInventory.length > 0 && (
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate('/dashboard/inventory', { state: { filter: 'Low Stock' } })}
              className="w-full mt-6 py-6 bg-primary text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl shadow-primary/20 hover:bg-primary-dark transition-all"
            >
              Reorder All Low Stock <ArrowUpRight size={16} />
            </motion.button>
            )}
          </GlassCard>
        </motion.div>

        {/* ─── Sidebar: Insights & Health ─── */}
        <motion.div variants={itemAnim} className="space-y-8">
          {/* Smart Insight Card */}
          <div className="rounded-[40px] p-8 relative overflow-hidden bg-text text-white border-none shadow-2xl shadow-text/20">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] -mr-24 -mt-24" />
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2.5 bg-white/10 backdrop-blur-xl rounded-xl text-primary">
                <Lightbulb size={20} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Strategic Insight</h3>
            </div>
            <p className="text-sm font-medium leading-relaxed text-white/80 mb-8 italic relative z-10">
              {products.length === 0
                ? '"Start adding products to your inventory to receive AI-powered strategic insights and optimization recommendations."'
                : `"You have ${products.length} products tracked. ${criticalInventory.length > 0 ? `${criticalInventory.length} items need attention.` : 'All stock levels are healthy.'} Consider reviewing your reorder points."`
              }
            </p>
            <button 
              className="w-full relative z-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3 group"
              onClick={() => navigate('/dashboard/analytics')}
            >
              Apply Optimization <Sparkles size={14} className="group-hover:animate-pulse" />
            </button>
          </div>

          {/* Health Gauge */}
          <GlassCard className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] font-black text-text/80 uppercase tracking-[0.2em] mb-2">Ecosystem Health</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-text tracking-tighter">{healthPct}%</span>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full border ${
                    healthPct >= 80 ? 'bg-teal-50 text-teal-600 border-teal-100' : healthPct >= 50 ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {healthPct >= 80 ? 'OPTIMAL' : healthPct >= 50 ? 'MODERATE' : 'CRITICAL'}
                  </span>
                </div>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-text/5" />
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * healthPct / 100)} className="text-primary" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-text/80 uppercase tracking-widest">Service Level</span>
                <span className="text-text">{serviceLevelPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-text/5 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full transition-all duration-1000" style={{ width: `${serviceLevelPct}%` }} />
              </div>
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <AlertCircle size={18} className="text-primary" />
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text">Quick Actions</h3>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/dashboard/inventory')}
                className="w-full py-4 border border-text/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text/70 hover:text-text hover:bg-text/[0.02] hover:border-primary/10 transition-all flex items-center justify-center gap-2"
              >
                <Package size={14} /> View Full Inventory
              </button>
              <button 
                onClick={() => navigate('/dashboard/inventory', { state: { filter: 'Out of Stock' } })}
                className="w-full py-4 border border-text/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text/70 hover:text-text hover:bg-text/[0.02] hover:border-primary/10 transition-all flex items-center justify-center gap-2"
              >
                <AlertCircle size={14} /> Out of Stock Items
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
      
    </motion.div>
  );
};

export default DashboardHome;
