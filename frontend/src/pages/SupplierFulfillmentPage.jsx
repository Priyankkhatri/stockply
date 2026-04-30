import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, PackageCheck, Truck } from "lucide-react";
import { useSupplier } from "../context/SupplierContext";
import GlassCard from "../components/GlassCard";
import PremiumButton from "../components/PremiumButton";

const statusClasses = {
  Accepted: "bg-blue-50 text-blue-600 border-blue-100",
  Ready: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Packing: "bg-blue-50 text-blue-600 border-blue-100",
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

export default function SupplierFulfillmentPage() {
  const { orders } = useSupplier();

  const acceptedOrders = orders.filter(o => o.status === 'Accepted');
  const dispatchedOrders = orders.filter(o => o.status === 'Dispatched');

  const stages = [
    { label: "Ready to pack", count: acceptedOrders.length.toString(), icon: PackageCheck, tone: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "Awaiting pickup", count: "03", icon: Truck, tone: "bg-orange-50 text-orange-600 border-orange-100" },
    { label: "Delivered today", count: dispatchedOrders.length.toString(), icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  ];

  const queue = acceptedOrders.slice(0, 5).map(o => ({
    id: o.id,
    shop: o.shop,
    window: "Dispatch by 5:00 PM",
    items: `${o.itemsCount} units`,
    status: "Packing"
  }));

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
            <span className="text-[10px] font-black text-text/30 uppercase tracking-[0.3em]">Supplier / Fulfillment</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-text leading-none">Order <span className="text-primary italic font-normal serif">Fulfillment.</span></h1>
          <p className="text-text/40 text-xs font-medium">Process outbound orders, monitor dispatch windows, and keep the queue moving.</p>
        </div>
        <PremiumButton variant="primary" icon={PackageCheck}>
          Create dispatch batch
        </PremiumButton>
      </motion.div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {stages.map((stage) => (
          <motion.div key={stage.label} variants={rowAnim}>
            <GlassCard className="p-4 group hover:shadow-premium transition-all duration-500">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 ${stage.tone}`}>
                <stage.icon size={20} />
              </div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-text/30">{stage.label}</p>
              <p className="text-3xl font-display font-bold text-text">{stage.count}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.3fr_0.8fr]">
        <motion.div variants={rowAnim}>
          <GlassCard className="overflow-hidden p-0" hover={false}>
            <div className="flex items-center justify-between border-b border-text/5 bg-white/50 px-8 py-6">
              <div>
                <h2 className="text-xl font-display font-bold text-text">Today&apos;s Queue</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Dispatch operations</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text/40">
                <Clock3 size={14} />
                Live board
              </div>
            </div>

            <div className="divide-y divide-text/5">
              {queue.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-6 px-8 py-6 transition-all hover:bg-white/50">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/25">{item.id}</p>
                    <h3 className="mt-1 text-sm font-display font-bold text-text">{item.shop}</h3>
                    <p className="mt-1 text-xs font-medium text-text/50">{item.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-text">{item.window}</p>
                    <span
                      className={`mt-2 inline-flex rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                        statusClasses[item.status] || "bg-blue-50 text-blue-600 border-blue-100"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
              {queue.length === 0 && (
                <div className="px-8 py-12 text-center text-[10px] font-black text-text/20 uppercase tracking-[0.3em]">
                  No pending fulfillment tasks
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={rowAnim}>
          <GlassCard className="border-primary/10 bg-primary/5 p-8" hover={false}>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
              <Truck size={22} />
            </div>
            <h2 className="text-2xl font-display font-bold text-text">Dispatch Insight</h2>
            <p className="mt-3 text-sm leading-7 text-text/60">
              Prioritizing the Fresh Mart batch first keeps two high-volume accounts on schedule and clears the next pickup window.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-text/5 bg-white/80 px-5 py-4 backdrop-blur-md">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Batches on track</p>
                <p className="mt-2 text-2xl font-display font-bold text-text">84%</p>
              </div>
              <div className="rounded-2xl border border-text/5 bg-white/80 px-5 py-4 backdrop-blur-md">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Next carrier cutoff</p>
                <p className="mt-2 text-2xl font-display font-bold text-text">4:30 PM</p>
              </div>
            </div>

            <PremiumButton variant="primary" className="w-full mt-8" icon={ArrowRight}>
              Open shipping tools
            </PremiumButton>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}

