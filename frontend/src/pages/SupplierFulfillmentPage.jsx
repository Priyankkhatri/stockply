import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock3, 
  PackageCheck, 
  Truck, 
  X, 
  ChevronRight, 
  Box, 
  Barcode, 
  Navigation,
  History
} from "lucide-react";
import { useSupplier } from "../context/SupplierContext";
import GlassCard from "../components/GlassCard";
import PremiumButton from "../components/PremiumButton";
import StatusBadge from "../components/StatusBadge";

const statusClasses = {
  Accepted: "bg-blue-50 text-blue-600 border-blue-100",
  Ready: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Packing: "bg-orange-50 text-orange-600 border-orange-100",
  Dispatched: "bg-teal-50 text-teal-600 border-teal-100",
  "At Risk": "bg-red-50 text-red-500 border-red-100",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const FulfillmentDetailPanel = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  const [isUpdating, setIsUpdating] = useState(false);

  const handleAction = async (newStatus) => {
    setIsUpdating(true);
    try {
      await onUpdateStatus(order._id, newStatus);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-8 border-b border-text/5">
        <div className="flex justify-between items-start mb-6">
          <StatusBadge status={order.status} />
          <button onClick={onClose} className="p-2 hover:bg-background rounded-full transition-colors text-text/70 xl:hidden">
            <X size={20} />
          </button>
        </div>
        
        <h2 className="text-3xl font-bold text-text tracking-tighter leading-tight mb-2">Order {order.orderNumber}</h2>
        <p className="text-[10px] text-text/70 font-black uppercase tracking-widest flex items-center gap-2">
          <Navigation size={10} /> {order.shop}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {/* Fulfillment Progress */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-text uppercase tracking-[0.2em]">Workflow Progress</h3>
          <div className="space-y-6">
            {[
              { label: 'Order Received', date: 'Oct 12, 10:30 AM', done: true },
              { label: 'Payment Verified', date: 'Oct 12, 11:15 AM', done: true },
              { label: 'Packing & QA', date: 'In Progress', done: order.status !== 'Accepted' },
              { label: 'Handover to Logistics', date: '--', done: order.status === 'Dispatched' },
            ].map((step, i) => (
              <div key={step.label} className="flex gap-4 relative">
                {i < 3 && <div className={`absolute left-2.5 top-6 w-0.5 h-10 ${step.done ? 'bg-primary' : 'bg-text/5'}`} />}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center relative z-10 ${step.done ? 'bg-primary text-white' : 'bg-background border border-text/5 text-text/70'}`}>
                  {step.done ? <CheckCircle2 size={10} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${step.done ? 'text-text' : 'text-text/80'}`}>{step.label}</span>
                  <span className="text-[10px] text-text/80">{step.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Item Breakdown */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-text uppercase tracking-[0.2em]">Package Inventory</h3>
          <div className="space-y-3">
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-text/5 group hover:bg-white hover:shadow-premium transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-text/70 group-hover:text-primary transition-colors">
                    <Box size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text">{item.name}</p>
                    <p className="text-[10px] font-medium text-text/70">{item.quantity} units • SKU-{i}01</p>
                  </div>
                </div>
                <Barcode size={16} className="text-text/10" />
              </div>
            ))}
          </div>
        </section>

        {/* Shipping Insight */}
        <section className="p-6 bg-[#F4F9F8] rounded-[28px] border border-teal-100/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-teal-600 shadow-sm">
              <Truck size={16} />
            </div>
            <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Carrier Recommended</span>
          </div>
          <p className="text-xs leading-relaxed text-text/80">
            Based on the volume of this order, <span className="font-bold text-text">BlueDart Express</span> is recommended for today's pickup window to ensure next-day arrival.
          </p>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-8 bg-background/50 border-t border-text/5 space-y-3">
        {order.status === 'Accepted' && (
          <button 
            disabled={isUpdating}
            onClick={() => handleAction('Packing')}
            className="w-full py-4 bg-text text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl shadow-text/10 disabled:opacity-50"
          >
            {isUpdating ? 'Processing...' : 'Start Packing'}
            <PackageCheck size={18} />
          </button>
        )}
        {order.status === 'Packing' && (
          <button 
            disabled={isUpdating}
            onClick={() => handleAction('Dispatched')}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/10 disabled:opacity-50"
          >
            {isUpdating ? 'Dispatching...' : 'Ready for Pickup'}
            <Truck size={18} />
          </button>
        )}
        <button 
          onClick={() => alert(`Generating high-resolution shipping manifest for Order ${order.orderNumber}...`)}
          className="w-full py-4 bg-white border border-text/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text/70 hover:text-text hover:border-text/20 transition-all flex items-center justify-center gap-2"
        >
          Print Shipping Label
        </button>
      </div>
    </div>
  );
};

export default function SupplierFulfillmentPage() {
  const { orders, updateOrderStatus, loading } = useSupplier();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fulfillmentQueue = useMemo(() => {
    return orders.filter(o => ['Accepted', 'Packing'].includes(o.status));
  }, [orders]);

  const stats = [
    { label: "Awaiting fulfillment", count: fulfillmentQueue.length.toString(), icon: PackageCheck, tone: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "In packing stage", count: orders.filter(o => o.status === 'Packing').length.toString(), icon: Box, tone: "bg-orange-50 text-orange-600 border-orange-100" },
    { label: "Successful Dispatches", count: orders.filter(o => o.status === 'Dispatched').length.toString(), icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="mx-auto max-w-[1600px] px-4 sm:px-10 py-6 sm:py-10"
    >
      <motion.div variants={rowAnim} className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/80 uppercase tracking-[0.3em]">Supply Chain / Operations</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-text leading-none">Order <span className="text-primary italic font-normal serif">Fulfillment.</span></h1>
          <p className="text-text/80 text-xs font-medium">Global dispatch queue and logistics coordination.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => alert("Loading full fulfillment audit trail...")}
            className="px-6 py-4 bg-white border border-text/5 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-text/80 hover:text-text hover:border-primary/20 transition-all flex items-center gap-3 group"
          >
            <History size={16} className="group-hover:text-primary transition-colors" /> Fulfillment Logs
          </button>
          <PremiumButton 
            variant="primary" 
            icon={PackageCheck}
            onClick={() => alert(`Processing batch dispatch for ${fulfillmentQueue.length} orders...`)}
          >
            Batch Dispatch
          </PremiumButton>
        </div>
      </motion.div>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stage) => (
          <motion.div key={stage.label} variants={rowAnim}>
            <GlassCard className="p-6 group hover:shadow-premium transition-all duration-500">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 ${stage.tone}`}>
                <stage.icon size={20} />
              </div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-text/80">{stage.label}</p>
              <p className="text-3xl font-display font-bold text-text">{stage.count}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-10 items-start">
        <motion.div variants={rowAnim} className="bg-white rounded-[40px] border border-text/5 shadow-premium overflow-hidden">
          <div className="flex items-center justify-between border-b border-text/5 bg-white/50 px-8 py-6">
            <div>
              <h2 className="text-xl font-display font-bold text-text">Dispatch Queue</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/80">Ready for processing</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text/80">
              <Clock3 size={14} className="text-primary" />
              Live board
            </div>
          </div>

          <div className="divide-y divide-text/5">
            <AnimatePresence mode="popLayout">
              {fulfillmentQueue.map((item) => (
                <motion.div 
                  key={item._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedOrder(item)}
                  className={`flex items-center justify-between gap-6 px-8 py-6 cursor-pointer transition-all duration-500 hover:bg-text/[0.01] ${
                    selectedOrder?._id === item._id ? 'bg-text/[0.02]' : ''
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-1 h-12 rounded-full transition-all duration-500 ${selectedOrder?._id === item._id ? 'bg-primary' : 'bg-text/5'}`} />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/70">{item.orderNumber}</p>
                      <h3 className="mt-1 text-sm font-display font-bold text-text">{item.shop}</h3>
                      <p className="mt-1 text-xs font-medium text-text/70">{item.items?.length || 0} items • Rs. {item.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text/80 mb-2">EOD DISPATCH</p>
                    <span
                      className={`inline-flex rounded-lg border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${
                        statusClasses[item.status] || "bg-blue-50 text-blue-600 border-blue-100"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {fulfillmentQueue.length === 0 && (
              <div className="px-8 py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-text/5 rounded-3xl flex items-center justify-center text-text/70 mb-6">
                  <CheckCircle2 size={32} strokeWidth={1} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-text/70 mb-2">Queue Clear</p>
                <p className="text-xs text-text/70 font-medium leading-relaxed">All outbound orders have been processed and dispatched.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* ─── Detail Side Panel ─── */}
        <AnimatePresence mode="wait">
          {selectedOrder ? (
            <motion.div 
              key={selectedOrder._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="sticky top-32"
            >
              <GlassCard className="p-0 overflow-hidden border-none shadow-2xl shadow-text/10 relative h-[calc(100vh-160px)]">
                <FulfillmentDetailPanel 
                  order={selectedOrder} 
                  onClose={() => setSelectedOrder(null)} 
                  onUpdateStatus={updateOrderStatus}
                />
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="sticky top-32 h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center p-10 bg-white/40 rounded-[40px] border border-dashed border-text/10"
            >
              <div className="w-16 h-16 bg-text/5 rounded-3xl flex items-center justify-center text-text/70 mb-6">
                <Truck size={32} strokeWidth={1} />
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-text/70 mb-2">Awaiting Selection</p>
              <p className="text-xs text-text/70 font-medium leading-relaxed">Select an order from the queue to begin the fulfillment and dispatch workflow.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .serif { font-family: "Playfair Display", serif; }
        .shadow-premium { box-shadow: 0 20px 80px -20px rgba(0,0,0,0.06); }
      ` }} />
    </motion.div>
  );
}
