import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  MoreVertical, 
  Download, 
  Package, 
  Clock, 
  Filter, 
  ChevronRight,
  Search,
  IndianRupee,
  Calendar,
  Zap,
  MapPin,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../components/PremiumButton';
import OrderTimeline from '../components/OrderTimeline';
import CreateOrderModal from '../components/CreateOrderModal';
import StatusBadge from '../components/StatusBadge';
import GlassCard from '../components/GlassCard';
import { orderAPI } from '../services/api';

const tabs = ['All Orders', 'Active', 'Completed', 'Cancelled'];

const getJourneyStep = (status) => {
  switch (status) {
    case 'Pending': return 'submitted';
    case 'Processing': return 'confirmed';
    case 'Shipped': return 'shipped';
    case 'Delivered': return 'delivered';
    default: return 'submitted';
  }
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={rowAnim}
      className="mb-4 overflow-hidden rounded-[32px] border border-text/5 bg-white shadow-sm hover:shadow-premium transition-all group"
    >
      <div
        className="flex flex-col md:flex-row cursor-pointer items-stretch md:items-center justify-between px-6 lg:px-10 py-6 lg:py-8 hover:bg-[#FAF5F0]/30 transition-colors gap-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1 flex items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF5F0] text-primary/40 border border-text/5 group-hover:bg-white transition-colors shadow-sm">
            <Package size={22} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-text group-hover:text-primary transition-colors tracking-tight">{order.orderNumber}</h4>
            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-text/40 flex items-center gap-2">
              <span>{order.items?.length || 0} ITEMS</span>
              <span className="w-1 h-1 rounded-full bg-text/20" />
              <span>{order.shopName || order.supplierName || 'Unknown Supplier'}</span>
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:items-center justify-center border-y md:border-y-0 border-text/5 py-4 md:py-0">
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Order Value</p>
          <p className="font-bold text-text text-xl flex items-center gap-1 tracking-tight">
            <IndianRupee size={18} className="text-text/50" />
            {(order.totalAmount || 0).toLocaleString()}
          </p>
        </div>

        <div className="hidden md:flex flex-1 flex-col items-center justify-center">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Current State</p>
          <StatusBadge status={order.status || 'Pending'} />
        </div>

        <div className="flex-1 flex flex-col items-start md:items-center">
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Initiated</p>
          <p className="text-sm font-bold text-text/70 flex items-center gap-2">
            <Calendar size={14} className="text-text/40" />
            {new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 md:border-l border-text/5 pt-4 md:pt-0 md:pl-8">
          <div className="md:hidden">
             <StatusBadge status={order.status || 'Pending'} />
          </div>
          <div className="flex items-center gap-3">
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-background text-text/30 hover:bg-white hover:text-text hover:shadow-sm border border-transparent hover:border-text/5 transition-all">
              <MoreVertical size={18} />
            </button>
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-text/40 hover:text-primary hover:shadow-md border border-text/5 transition-all">
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronDown size={18} />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-text/5 bg-[#FAF5F0]/30"
          >
            <div className="px-6 lg:px-10 py-10">
              <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">
                <div className="space-y-10 xl:col-span-2">
                  <GlassCard className="p-8 shadow-sm">
                    <h5 className="mb-8 text-sm font-black uppercase tracking-[0.2em] text-text flex items-center gap-3">
                      <Zap size={18} className="text-primary" /> Fulfillment Journey
                    </h5>
                    <OrderTimeline currentStep={getJourneyStep(order.status)} />
                  </GlassCard>

                  <div>
                    <h5 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-text px-2">Manifest Breakdown</h5>
                    <div className="overflow-hidden rounded-3xl border border-text/5 bg-white shadow-sm">
                      {order.items && order.items.length > 0 ? (
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-[#FAF5F0] border-b border-[#F0E5D8]">
                              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/60">Item Description</th>
                              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-text/60">Qty</th>
                              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-text/60">Unit Price</th>
                              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-text/60">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-text/5">
                            {order.items.map((item, idx) => (
                              <tr key={idx} className="group hover:bg-background/20 transition-colors">
                                <td className="px-8 py-6">
                                  <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background text-text/20 group-hover:text-primary transition-colors">
                                      <Package size={18} />
                                    </div>
                                    <span className="font-bold text-text text-sm">{item.name || item.product?.name}</span>
                                  </div>
                                </td>
                                <td className="px-8 py-6 text-right font-black text-text/80 text-sm">{item.quantity}</td>
                                <td className="px-8 py-6 text-right font-medium text-text/60 text-sm">₹{item.price?.toLocaleString()}</td>
                                <td className="px-8 py-6 text-right font-bold text-text text-sm">₹{((item.price || 0) * (item.quantity || 0)).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="px-8 py-16 flex flex-col items-center justify-center text-center">
                          <Package size={32} className="text-text/10 mb-4" />
                          <p className="text-sm font-bold text-text/40">No items available in this manifest.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <GlassCard className="p-8 shadow-sm">
                    <div className="mb-8 flex items-center gap-3">
                      <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                        <Clock size={20} />
                      </div>
                      <div>
                        <h5 className="text-sm font-black uppercase tracking-[0.2em] text-text">Logistics Profile</h5>
                        <p className="text-[10px] font-bold text-text/60 mt-1">Delivery & Routing</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-text/5 pb-6">
                        <div className="flex items-center gap-2 text-text/40">
                          <Calendar size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Expected By</span>
                        </div>
                        <span className="font-bold text-sm text-text">
                          {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : 'TBD'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between border-b border-text/5 pb-6">
                        <div className="flex items-center gap-2 text-text/40">
                          <MapPin size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Destination</span>
                        </div>
                        <span className="font-bold text-sm text-text truncate max-w-[120px]">
                          Warehouse A
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-text/40">
                          <Zap size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Priority</span>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${order.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                          {order.priority || 'Standard'}
                        </span>
                      </div>
                    </div>
                  </GlassCard>

                  <PremiumButton variant="secondary" className="w-full flex justify-center py-5 rounded-2xl">
                    <span className="flex items-center gap-2">
                      <Download size={16} />
                      Download Invoice PDF
                    </span>
                  </PremiumButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderAPI.getAll();
      setOrders(res.data?.data?.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const normSearch = searchTerm.toLowerCase().trim();
      const matchesSearch = !normSearch || 
        order.orderNumber?.toLowerCase().includes(normSearch) || 
        order.shopName?.toLowerCase().includes(normSearch);

      if (!matchesSearch) return false;

      if (activeTab === 'All Orders') return true;
      if (activeTab === 'Active') return ['Pending', 'Processing', 'Shipped'].includes(order.status);
      if (activeTab === 'Completed') return order.status === 'Delivered';
      if (activeTab === 'Cancelled') return order.status === 'Cancelled';
      return true;
    });
  }, [orders, activeTab, searchTerm]);

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="mx-auto max-w-[1600px] px-6 py-10 pb-16"
    >
      {/* ─── Header Section ─── */}
      <motion.div variants={rowAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/60 uppercase tracking-[0.3em]">Purchase Orders</span>
          </div>
          <h1 className="text-4xl font-bold text-text tracking-tighter leading-none">The <span className="text-primary italic font-normal serif">Manifests.</span></h1>
          <p className="text-text/60 text-xs font-medium">Command center for incoming inventory, fulfillment logistics, and supplier transactions.</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-6 py-4 bg-white border border-text/5 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-text/60 hover:text-text transition-all flex items-center gap-3">
            <History size={16} /> Activity Log
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-text text-white rounded-[22px] text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-2xl shadow-text/10"
          >
            <Plus size={18} /> Draft New Order
          </motion.button>
        </div>
      </motion.div>

      {/* ─── Controls & Filters ─── */}
      <motion.div variants={rowAnim} className="bg-white rounded-[32px] border border-text/5 p-8 mb-10 shadow-sm flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
        <div className="relative w-full max-w-2xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text/20 group-focus-within:text-primary transition-colors" size={20} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH BY ORDER ID OR SUPPLIER..."
            className="w-full bg-background/50 border border-transparent rounded-[24px] py-5 pl-16 pr-6 text-[10px] font-black uppercase tracking-widest text-text placeholder:text-text/20 outline-none transition-all focus:bg-white focus:border-primary/20"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center p-1.5 bg-background rounded-[20px] border border-text/5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 rounded-[16px] text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeTab === tab
                    ? 'bg-white text-text shadow-sm border border-text/5'
                    : 'text-text/30 hover:text-text/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <button className="p-5 bg-background rounded-2xl border border-text/5 text-text/40 hover:text-text transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg shadow-primary/20" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text/30">Synchronizing Manifests...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard key={order._id || order.orderNumber} order={order} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 rounded-[40px] border border-dashed border-text/10 bg-[#FAF5F0]/30"
              >
                <div className="w-20 h-20 rounded-3xl bg-white border border-text/5 shadow-sm flex items-center justify-center mb-6 text-text/20">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">No manifests found</h3>
                <p className="text-sm font-medium text-text/40">Try adjusting your filters or search criteria.</p>
                <PremiumButton variant="secondary" className="mt-8" onClick={() => {setSearchTerm(''); setActiveTab('All Orders');}}>
                  Clear Filters
                </PremiumButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {showCreateModal && (
        <CreateOrderModal 
          onClose={() => setShowCreateModal(false)} 
          onSuccess={fetchOrders}
        />
      )}
      
    </motion.div>
  );
};

export default OrdersPage;

