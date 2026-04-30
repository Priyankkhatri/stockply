import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  Gift,
  MapPin,
  MessageSquare,
  Phone,
  Store,
  Zap,
} from 'lucide-react';
import Logo from '../components/Logo';
import { useSupplier } from '../context/SupplierContext';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const SupplierShopDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { partners, orders } = useSupplier();

  const shop = useMemo(() => {
    // Find by slugified name or ID
    return partners.find((candidate) => 
      candidate.name.toLowerCase().replace(/\s+/g, '-') === id || 
      candidate._id === id
    ) || partners[0];
  }, [id, partners]);

  const shopOrders = useMemo(() => {
    return orders.filter(o => o.shop === shop.name);
  }, [orders, shop]);

  const totalShopRevenue = shopOrders.reduce((sum, o) => {
    const val = o.totalAmount || 0;
    return sum + val;
  }, 0);


  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="mx-auto max-w-[1600px] px-4 sm:px-10 py-6 sm:py-10"
    >
      <motion.div variants={rowAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/30 uppercase tracking-[0.3em]">Supplier / Shops</span>
          </div>
          <h1 className="text-5xl font-bold text-text tracking-tighter leading-none">{shop.name.split(' ')[0]} <span className="text-primary italic font-normal serif">{shop.name.split(' ').slice(1).join(' ')}.</span></h1>
          <p className="text-text/40 text-sm font-medium">Shop profile, recent activity, and operational insights for supplier planning.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <PremiumButton variant="secondary" icon={MessageSquare}>
            Contact shop
          </PremiumButton>
          <PremiumButton variant="secondary" icon={Zap}>
            Prioritize orders
          </PremiumButton>
          <PremiumButton variant="primary" icon={Gift}>
            Send offer
          </PremiumButton>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .serif { font-family: "Playfair Display", serif; }
        .shadow-premium { box-shadow: 0 20px 80px -20px rgba(0,0,0,0.06); }
      ` }} />

      <motion.div variants={rowAnim} className="mb-10 flex flex-wrap items-center gap-4 rounded-3xl border border-text/5 bg-white/50 px-8 py-6 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-teal-600">
          <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
          Active
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-text/50">
          <span className="flex items-center gap-1.5">
            <Store size={14} className="text-text/30" /> {shop.category}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-text/30" /> {shop.location || shop.city}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone size={14} className="text-text/30" /> {shop.phone || '+91 90000 00000'}
          </span>
        </div>
        <button
          onClick={() => navigate('/supplier/shops')}
          className="ml-auto text-[10px] font-black uppercase tracking-[0.2em] text-text/40 transition-colors hover:text-primary"
        >
          Back to partners
        </button>
      </motion.div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Orders', value: shopOrders.length.toString(), trend: '+12% this month', accent: 'text-teal-600' },
          { label: 'Revenue Generated', value: `Rs. ${totalShopRevenue.toLocaleString()}`, trend: '+5.4% this month', accent: 'text-teal-600' },
          { label: 'Avg Order Value', value: `Rs. ${(totalShopRevenue / (shopOrders.length || 1)).toFixed(0)}`, trend: 'Stable', accent: 'text-text/30' },
          { label: 'Status', value: shop.status, trend: 'Operational', accent: 'text-text/30' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={rowAnim}>
            <GlassCard className="relative overflow-hidden p-6 group hover:shadow-premium transition-all duration-500">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-text/30">{stat.label}</p>
              <h3 className="mb-1 text-2xl font-display font-bold text-text">{stat.value}</h3>
              <p className={`text-[10px] font-bold ${stat.accent}`}>{stat.trend}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <motion.div variants={rowAnim} className="xl:col-span-2">
          <GlassCard className="h-fit overflow-hidden p-0" hover={false}>
            <div className="flex items-center justify-between border-b border-text/5 bg-white/50 p-8">
              <h3 className="text-xl font-display font-bold text-text">Recent Orders</h3>
              <button className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                View all
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-widest text-text/30 border-b border-text/5 bg-white/30">
                    <th className="px-8 py-5">Order ID</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5">Items</th>
                    <th className="px-8 py-5">Amount</th>
                    <th className="px-8 py-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-text/5">
                  {shopOrders.map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-white/50">
                      <td className="px-8 py-5 text-sm font-bold text-text/80">{order.orderNumber}</td>
                      <td className="px-8 py-5 text-sm font-medium text-text/40">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-8 py-5 text-sm font-bold text-text/60">{order.items?.length || 0} items</td>
                      <td className="px-8 py-5 text-sm font-bold text-text">Rs. {order.totalAmount.toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <span className={`rounded-lg border px-2 py-0.5 text-[9px] font-bold uppercase tracking-tighter ${
                          order.status === 'Pending' ? 'bg-orange-50 text-orange-500 border-orange-100' : 
                          order.status === 'Dispatched' ? 'bg-blue-50 text-blue-500 border-blue-100' :
                          'bg-teal-50 text-teal-500 border-teal-100'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {shopOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-10 text-center text-xs font-bold text-text/20 uppercase tracking-widest">
                        No order history found for this partner
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        <div className="space-y-6">
          <motion.div variants={rowAnim}>
            <GlassCard className="relative overflow-hidden border-teal-100 bg-[#F4F9F8] p-8" hover={false}>
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-teal-500/5" />
              <div className="mb-6 flex items-center gap-2 text-teal-600">
                <Logo size={18} />
                <h3 className="text-sm font-display font-bold">AI Insights</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-white p-2.5 text-teal-600 shadow-sm border border-teal-100">
                    <Clock size={16} />
                  </div>
                  <p className="pt-1.5 text-xs leading-relaxed text-text/70">
                    This shop usually orders every <span className="font-bold text-teal-600">3 days</span>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-white p-2.5 text-teal-600 shadow-sm border border-teal-100">
                    <Zap size={16} />
                  </div>
                  <p className="pt-1.5 text-xs leading-relaxed text-text/70">
                    Next order expected <span className="font-bold text-teal-600">tomorrow</span>.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={rowAnim}>
            <GlassCard className="p-8" hover={false}>
              <h3 className="mb-6 text-sm font-display font-bold text-text">Demand Insights</h3>
              <p className="mb-4 text-[9px] font-black uppercase tracking-widest text-text/30">Top 3 Products</p>
              <div className="mb-8 space-y-4">
                {[
                  { id: 1, name: 'Artisan Sourdough', percent: 42, color: 'bg-orange-100 text-orange-600' },
                  { id: 2, name: 'Organic Honey', percent: 28, color: 'bg-teal-100 text-teal-600' },
                  { id: 3, name: 'Premium Almonds', percent: 15, color: 'bg-blue-100 text-blue-600' },
                ].map((item) => (
                  <div key={item.id} className="group flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-bold ${item.color}`}>
                        {item.id}
                      </span>
                      <span className="text-xs font-bold text-text/60 transition-colors group-hover:text-text">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-text/30">{item.percent}%</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-text/5 pt-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-text/30">Avg. Order Quantity</span>
                <span className="font-bold text-text">45 units</span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={rowAnim}>
            <GlassCard className="p-8" hover={false}>
              <h3 className="mb-6 text-sm font-display font-bold text-text">Payment Behavior</h3>
              <div className="mb-8 flex items-center gap-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-teal-500 border-t-transparent shadow-sm">
                  <span className="text-xs font-black text-teal-600">92%</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text">Excellent Standing</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-text/30">Low risk customer</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'On-time payments', value: '92%', color: 'bg-teal-500' },
                  { label: 'Late payments', value: '8%', color: 'bg-red-400' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${row.color}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-text/40">{row.label}</span>
                    </div>
                    <span className="text-xs font-bold text-text/60">{row.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SupplierShopDetailsPage;
