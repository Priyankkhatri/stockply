import React, { useState, useMemo } from 'react';
import { useSupplier } from '../context/SupplierContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Download, 
  Search, 
  Filter, 
  Check, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck,
  Package,
  ChevronRight,
  ChevronLeft,
  Calendar,
  IndianRupee,
  MoreHorizontal,
  X,
  ExternalLink
} from 'lucide-react';
import PremiumButton from '../components/PremiumButton';
import GlassCard from '../components/GlassCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const OrderDetailPanel = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  const paymentClasses = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Paid: 'bg-teal-50 text-teal-600 border-teal-100',
    Failed: 'bg-red-50 text-red-600 border-red-100',
  };

  const statusClasses = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Processing: 'bg-blue-50 text-blue-600 border-blue-100',
    Shipped: 'bg-purple-50 text-purple-600 border-purple-100',
    Delivered: 'bg-teal-50 text-teal-600 border-teal-100',
    Cancelled: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl z-[60] flex flex-col border-l border-text/5"
    >
      {/* Header */}
      <div className="p-8 border-b border-text/5 flex justify-between items-start bg-background/30 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${statusClasses[order.status] || statusClasses.Pending}`}>
              {order.status}
            </span>
            <span className="text-[10px] font-black text-text/70 uppercase tracking-widest">
              #{order.orderNumber}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-text tracking-tight">{order.shopName}</h2>
          <p className="text-xs text-text/80 font-medium flex items-center gap-2 mt-1">
            <Calendar size={12} /> Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-all text-text/70">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
        {/* Logistics Journey */}
        <div className="space-y-6">
          <p className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em]">Fulfillment Progress</p>
          <div className="relative flex justify-between items-start px-4">
            <div className="absolute top-[18px] left-10 right-10 h-[2px] bg-text/5">
              <div 
                className="h-full bg-primary shadow-[0_0_10px_rgba(192,133,82,0.4)] transition-all duration-1000"
                style={{ 
                  width: order.status === 'Pending' ? '0%' : 
                         order.status === 'Processing' ? '33%' : 
                         order.status === 'Shipped' ? '66%' : '100%' 
                }}
              ></div>
            </div>
            {[
              { label: 'Recd', done: true },
              { label: 'Proc', done: ['Processing', 'Shipped', 'Delivered'].includes(order.status) },
              { label: 'Ship', done: ['Shipped', 'Delivered'].includes(order.status) },
              { label: 'Dlvrd', done: order.status === 'Delivered' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                  step.done ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 
                  'bg-white border-text/5 text-text/20'
                }`}>
                  {step.done ? <Check size={16} /> : <div className="w-1.5 h-1.5 rounded-full bg-text/10" />}
                </div>
                <span className={`mt-3 text-[8px] font-black uppercase tracking-widest ${step.done ? 'text-text' : 'text-text/70'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Overview */}
        <div className="bg-[#FAF5F0] rounded-3xl p-6 border border-[#F0E5D8]">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-[9px] font-black text-[#C08552] uppercase tracking-[0.2em] mb-1">Total Receivable</p>
              <h3 className="text-3xl font-black text-text tracking-tighter">₹ {order.totalAmount.toLocaleString()}</h3>
            </div>
            <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-widest ${paymentClasses[order.paymentStatus] || paymentClasses.Pending}`}>
              {order.paymentStatus || 'Unpaid'}
            </span>
          </div>
          <div className="pt-4 border-t border-[#F0E5D8] flex items-center justify-between text-[10px] font-bold text-text/70">
            <span>Payment Method</span>
            <span className="text-text tracking-tight uppercase">Bank Transfer</span>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em]">Consignment Manifest</p>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
              {order.items?.length || 0} Products
            </span>
          </div>
          <div className="space-y-4">
            {order.items && order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between group p-4 rounded-2xl hover:bg-background transition-all border border-transparent hover:border-text/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-text/20 border border-text/5 group-hover:bg-white transition-all">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text text-sm">{item.name}</h4>
                    <p className="text-[9px] text-text/70 font-black uppercase tracking-widest mt-0.5">QTY: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-text tracking-tight">₹ {(item.price * item.quantity).toLocaleString()}</p>
                  <p className="text-[9px] text-text/70 font-bold uppercase tracking-widest mt-0.5">₹ {item.price}/unit</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logistics Details */}
        <div className="space-y-6">
          <p className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em]">Logistics Intelligence</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-text/5 bg-background/50">
              <p className="text-[9px] font-black text-text/70 uppercase tracking-widest mb-2">Priority</p>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${order.priority === 'High' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-primary'}`} />
                <span className="text-xs font-bold text-text">{order.priority || 'Standard'}</span>
              </div>
            </div>
            <div className="p-5 rounded-2xl border border-text/5 bg-background/50">
              <p className="text-[9px] font-black text-text/70 uppercase tracking-widest mb-2">Carrier Sync</p>
              <span className="text-xs font-bold text-text">Safe Express</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-8 bg-[#F9F6F2] border-t border-text/5 mt-auto">
        <div className="flex gap-4">
          {order.status === 'Pending' && (
            <>
              <button 
                onClick={() => onUpdateStatus(order._id, 'Cancelled')}
                className="flex-1 py-4 rounded-2xl text-rose-500 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
              >
                Reject Order
              </button>
              <PremiumButton 
                onClick={() => onUpdateStatus(order._id, 'Processing')}
                variant="primary" 
                className="flex-[2] py-4 rounded-2xl shadow-xl shadow-primary/20"
              >
                Accept Order
              </PremiumButton>
            </>
          )}
          {order.status === 'Processing' && (
            <PremiumButton 
              onClick={() => onUpdateStatus(order._id, 'Shipped')}
              variant="primary" 
              className="w-full py-4 rounded-2xl shadow-xl shadow-primary/20"
            >
              Dispatch Consignment
            </PremiumButton>
          )}
          {order.status === 'Shipped' && (
            <PremiumButton 
              onClick={() => onUpdateStatus(order._id, 'Delivered')}
              variant="primary" 
              className="w-full py-4 rounded-2xl shadow-xl shadow-primary/20"
            >
              Confirm Delivery
            </PremiumButton>
          )}
          {order.status === 'Delivered' && (
            <div className="w-full text-center py-4 bg-teal-50 text-teal-600 rounded-2xl border border-teal-100 text-[10px] font-black uppercase tracking-widest">
              Order Fulfilled Successfully
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const OrderRow = ({ order, isActive, onClick }) => {
  const paymentClasses = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Paid: 'bg-teal-50 text-teal-600 border-teal-100',
    Failed: 'bg-red-50 text-red-600 border-red-100',
  };

  const statusClasses = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Processing: 'bg-blue-50 text-blue-600 border-blue-100',
    Shipped: 'bg-purple-50 text-purple-600 border-purple-100',
    Delivered: 'bg-teal-50 text-teal-600 border-teal-100',
    Cancelled: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <motion.div
      variants={rowAnim}
      onClick={onClick}
      className={`group mb-3 overflow-hidden rounded-[20px] sm:rounded-[28px] border transition-all duration-500 px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer relative ${
        isActive 
          ? 'bg-white border-primary/20 shadow-xl shadow-primary/5 ring-1 ring-primary/5' 
          : 'bg-white/50 border-text/5 hover:border-text/10 hover:bg-white hover:shadow-premium'
      }`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-primary transition-transform origin-top rounded-l-full ${isActive ? 'scale-y-100' : 'scale-y-0'}`}></div>
      
      <div className="flex-[0.6] flex items-center gap-4 sm:gap-6 mb-3 sm:mb-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-primary text-white' : 'bg-background text-text/20 group-hover:bg-primary/10 group-hover:text-primary'}`}>
          <Package size={18} />
        </div>
        <div>
          <p className="text-[9px] font-black text-text/70 uppercase tracking-[0.2em] mb-0.5">{order.orderNumber}</p>
          <h4 className="font-bold text-text text-sm transition-colors group-hover:text-primary">{order.shopName}</h4>
        </div>
      </div>

      <div className="hidden md:block flex-1 px-4">
        <p className="text-[10px] text-text/70 font-black uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
        <p className="text-[9px] text-text/70 font-bold uppercase tracking-widest mt-0.5">{order.items?.length || 0} Products • {order.items?.reduce((acc, curr) => acc + curr.quantity, 0) || 0} units</p>
      </div>

      <div className="hidden sm:block flex-1 text-center">
        <p className="text-sm font-bold text-text tracking-tight mb-1">₹ {order.totalAmount.toLocaleString()}</p>
        <span className={`px-2 py-0.5 rounded-md border font-black text-[8px] uppercase tracking-widest ${paymentClasses[order.paymentStatus] || paymentClasses.Pending}`}>
          {order.paymentStatus || 'Pending'}
        </span>
      </div>

      <div className="flex-1 flex justify-end sm:justify-end items-center gap-4 sm:gap-6">
        <span className={`px-4 py-2 rounded-full border font-black text-[9px] uppercase tracking-[0.1em] flex items-center gap-2.5 transition-all ${
          order.status === 'Shipped' || order.status === 'Delivered' 
            ? 'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white' 
            : 'bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-500 group-hover:text-white'
        }`}>
          <div className={`w-1 h-1 rounded-full ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-teal-500' : 'bg-orange-500'} group-hover:bg-white`}></div>
          {order.status}
        </span>
        <div className={`w-8 h-8 rounded-full border border-text/5 flex items-center justify-center text-text/20 group-hover:text-primary group-hover:border-primary/20 transition-all ${isActive ? 'bg-primary text-white border-primary' : ''}`}>
          <ChevronRight size={14} className={isActive ? 'rotate-90' : ''} />
        </div>
      </div>
    </motion.div>
  );
};

export default function SupplierOrdersPage() {
  const { orders, loading, updateOrderStatus } = useSupplier();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = useMemo(() => {
    const norm = searchTerm.trim().toLowerCase();
    return (orders || []).filter((order) => {
      const matchesTab = activeTab === 'All' || order.status === activeTab;
      if (!matchesTab) return false;
      
      if (!norm) return true;
      return (
        order.orderNumber?.toLowerCase().includes(norm) ||
        order.shopName?.toLowerCase().includes(norm)
      );
    });
  }, [activeTab, orders, searchTerm]);

  const handleStatusUpdate = (id, newStatus) => {
    updateOrderStatus(id, newStatus);
    // Keep selection if it was the updated one
    if (selectedOrder && selectedOrder._id === id) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 relative">
            <div className="absolute inset-0 rounded-2xl border-4 border-primary/20 border-t-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black italic serif text-primary">S.</div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text/70 animate-pulse">Syncing Order Manifests...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-[1600px] mx-auto px-4 sm:px-10 pb-12 pt-6 sm:pt-10"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .serif { font-family: "Playfair Display", serif; }
        .shadow-premium { box-shadow: 0 20px 80px -20px rgba(0,0,0,0.06); }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      ` }} />

      {/* Header */}
      <motion.div variants={rowAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-6 sm:gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(192,133,82,0.5)]" />
            <span className="text-[10px] font-black text-text/70 uppercase tracking-[0.3em]">Supplier / Fulfillment Queue</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-text tracking-tighter leading-none">Order <span className="text-primary italic font-normal serif">Logistics.</span></h1>
          <p className="text-text/70 text-sm font-medium">Coordinate restock fulfillment and manage global retail partner requests.</p>
        </div>

        <div className="flex items-center gap-4">
          <PremiumButton 
            variant="secondary" 
            icon={Download}
            onClick={() => alert("Exporting order manifest batch...")}
          >
            Export Batch
          </PremiumButton>
          <PremiumButton 
            icon={Plus}
            onClick={() => alert("Opening Manual Entry terminal...")}
          >
            New Manual Entry
          </PremiumButton>
        </div>
      </motion.div>

      {/* Control Bar */}
      <motion.div variants={rowAnim}>
        <GlassCard className="mb-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 border-text/5 shadow-premium" hover={false}>
          <div className="flex items-center rounded-2xl bg-background/50 p-1 overflow-x-auto w-full sm:w-auto scrollbar-hide">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white text-text shadow-md shadow-text/5 border border-text/5'
                    : 'text-text/70 hover:text-text hover:bg-white/30'
                }`}
              >
                {tab}
                {tab === 'Pending' && orders.filter(o => o.status === 'Pending').length > 0 && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[8px] animate-pulse">
                    {orders.filter(o => o.status === 'Pending').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 px-2 flex-1 max-w-md w-full sm:w-auto">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text/70 group-focus-within:text-primary transition-colors" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find orders, shops or items..."
                className="w-full pl-12 pr-6 py-3.5 bg-background border border-text/5 rounded-2xl text-[11px] font-bold focus:outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-text/20 shadow-inner-soft"
              />
            </div>
            <button className="p-3.5 text-text/70 hover:text-primary transition-all bg-background rounded-2xl border border-text/5 hover:border-primary/10 hover:shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        <div className={`flex-1 transition-all duration-500 ${selectedOrder ? 'lg:pr-[520px]' : ''}`}>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-40 rounded-[48px] border border-dashed border-text/10 bg-[#FAF5F0]/30"
              >
                <div className="w-24 h-24 rounded-3xl bg-white border border-text/5 shadow-premium flex items-center justify-center mb-8 text-text/10">
                  <Package size={40} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-display font-bold text-text mb-3">No Orders Tracked</h3>
                <p className="text-text/70 text-sm max-w-xs text-center font-medium">Your current filter parameters yielded zero results from the live queue.</p>
                <button onClick={() => {setActiveTab('All'); setSearchTerm('');}} className="mt-8 text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Reset Intelligence Filters</button>
              </motion.div>
            ) : (
              filtered.map((order) => (
                <OrderRow 
                  key={order._id || order.orderNumber} 
                  order={order} 
                  isActive={selectedOrder?._id === order._id}
                  onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                />
              ))
            )}
          </AnimatePresence>

          {/* Pagination */}
          {filtered.length > 0 && (
            <motion.div variants={rowAnim} className="mt-16 flex items-center justify-between px-4">
              <p className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em]">
                Live Board <span className="text-text/70">1–{filtered.length}</span> of <span className="text-text/70">{orders.length}</span>
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => alert("Loading previous manifests...")}
                  className="w-12 h-12 rounded-2xl border border-text/5 flex items-center justify-center text-text/10 cursor-not-allowed bg-background/30 transition-all hover:bg-background/50"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => alert("Loading next manifests...")}
                  className="w-12 h-12 rounded-2xl border border-text/5 bg-white shadow-sm flex items-center justify-center text-text/70 hover:text-primary hover:border-primary/20 hover:shadow-md transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Side Detail Overlay */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-text/20 backdrop-blur-sm z-[55] lg:bg-transparent lg:backdrop-blur-none"
            />
            <OrderDetailPanel 
              order={selectedOrder} 
              onClose={() => setSelectedOrder(null)}
              onUpdateStatus={handleStatusUpdate}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
