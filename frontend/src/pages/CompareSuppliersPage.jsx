import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Sparkles,
  Star,
  Tag,
  Truck,
  Undo2,
  Zap,
  ShieldCheck,
  CheckCircle2,
  History,
  XCircle as XCircleIcon
} from "lucide-react";
import Logo from "../components/Logo";
import GlassCard from "../components/GlassCard";
import PremiumButton from "../components/PremiumButton";

const XCircle = ({ size, className }) => (
  <XCircleIcon size={size} className={className} strokeWidth={2.5} />
);

const suppliers = [
  {
    name: "MedTech Inc.",
    tag: "RECOMMENDED",
    tagColor: "bg-orange-50 text-orange-600 border-orange-100",
    available: "500 units",
    price: "₹ 4.50",
    delivery: "2 days",
    deliveryIcon: Truck,
    reliability: [
      { icon: Undo2, text: "7 days return" },
      { icon: Star, text: "4.5/5 Rating" },
    ],
    moq: "MOQ: 20 UNITS",
    isRecommended: true,
  },
  {
    name: "Global Pharma",
    tag: "CHEAPEST",
    tagColor: "bg-teal-50 text-teal-600 border-teal-100",
    available: "1000 units",
    price: "₹ 4.20",
    delivery: "4 days",
    deliveryIcon: Clock,
    reliability: [
      { icon: XCircle, text: "No return", isNegative: true },
      { icon: Star, text: "4.2/5 Rating" },
    ],
    moq: "MOQ: 50 UNITS",
  },
  {
    name: "Rapid Care",
    tag: "FASTEST",
    tagColor: "bg-blue-50 text-blue-600 border-blue-100",
    available: "200 units",
    price: "₹ 5.10",
    delivery: "Same day",
    deliveryIcon: Zap,
    reliability: [
      { icon: Undo2, text: "15 days return" },
      { icon: Star, text: "4.8/5 Rating" },
    ],
    moq: "MOQ: 10 UNITS",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function CompareSuppliersPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-[1600px] mx-auto px-6 py-10"
    >
      {/* ─── Header Section ─── */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/60 uppercase tracking-[0.3em]">Supplier Intelligence</span>
          </div>
          <h1 className="text-5xl font-bold text-text tracking-tighter leading-none">Compare <span className="text-primary italic font-normal serif">Suppliers.</span></h1>
          <p className="text-text/60 text-sm font-medium">Analyze supplier intelligence and fulfill restock requirements with confidence.</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-6 py-4 bg-white border border-text/5 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-text/60 hover:text-text transition-all flex items-center gap-3">
            <History size={16} /> History
          </button>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 xl:grid-cols-4 gap-10"
        variants={containerVariants}
      >
        <div className="xl:col-span-3 space-y-6 lg:space-y-8">
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-[32px] border border-text/5 shadow-premium p-6 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 blur-[80px] -mr-32 -mt-32" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4 lg:gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-text">Paracetamol 500mg</h2>
                      <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm">
                        Pharmacy
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text/60 font-bold">
                      <ShieldCheck size={16} className="text-primary" strokeWidth={2.5} />
                      <span>
                        Current Stock: <span className="text-rose-600 font-black">12 units left</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto bg-rose-50/80 border border-rose-100 rounded-[20px] p-5 lg:p-6 text-center shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
                    <p className="text-[10px] font-black text-rose-500/70 uppercase tracking-[0.2em] mb-1.5">Deficit</p>
                    <p className="text-2xl lg:text-3xl font-black text-rose-600 whitespace-nowrap tracking-tight">60 units</p>
                  </div>
                </div>

                <div className="bg-[#FAF5F0]/80 backdrop-blur-sm rounded-[20px] p-5 border border-[#F0E5D8] flex items-center gap-4 text-[10px] lg:text-xs text-[#C08552] shadow-sm">
                  <div className="p-2 bg-[#C08552]/10 rounded-xl">
                    <Logo size={20} />
                  </div>
                  <p className="font-bold tracking-tight leading-relaxed">Intelligence matrix generated based on regional demand and your historical fulfillment velocity.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between bg-white rounded-[24px] border border-text/5 shadow-premium p-3 gap-4">
              <div className="flex items-center gap-4 lg:gap-6 px-4">
                <span className="text-[10px] lg:text-xs font-black text-text/60 uppercase tracking-[0.2em]">Sort:</span>
                <div className="flex gap-2">
                  {["Price", "Delivery", "Rating"].map((sort) => (
                    <button
                      key={sort}
                      type="button"
                      className={`text-[11px] font-bold px-5 py-2.5 rounded-xl transition-all duration-300 ${
                        sort === "Price" ? "bg-text/5 text-text shadow-sm border border-text/10" : "text-text/50 hover:bg-background hover:text-text border border-transparent"
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6 px-4 py-3 md:py-0 border-t md:border-t-0 md:border-l border-text/5">
                <label className="flex items-center gap-2.5 text-[11px] font-bold text-text/60 cursor-pointer hover:text-text group transition-colors">
                  <div className="w-5 h-5 border-2 border-text/20 rounded-md bg-white group-hover:border-primary transition-colors flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-primary opacity-0" />
                  </div>
                  Returnable
                </label>
                <label className="flex items-center gap-2.5 text-[11px] font-bold text-text/60 cursor-pointer hover:text-text group transition-colors">
                  <div className="w-5 h-5 border-2 border-text/20 rounded-md bg-white group-hover:border-primary transition-colors flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-primary opacity-0" />
                  </div>
                  Fast Delivery
                </label>
              </div>
            </section>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            {/* Table Header - Desktop Only */}
            <div className="hidden lg:grid grid-cols-6 px-8 py-2 text-[10px] font-black text-text/60 uppercase tracking-[0.2em]">
              <span className="col-span-2">Supplier Profile</span>
              <span>Price/Unit</span>
              <span>Logistics</span>
              <span className="col-span-2">Terms & Reliability</span>
            </div>

            <div className="space-y-5">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.name}
                  className={`bg-white rounded-[32px] p-6 lg:p-8 flex flex-col lg:grid lg:grid-cols-6 gap-6 items-start lg:items-center transition-all duration-500 hover:shadow-premium group ${
                    supplier.isRecommended ? "border-primary/30 ring-2 ring-primary/10 shadow-[0_10px_40px_rgba(192,133,82,0.1)]" : "border border-text/5"
                  }`}
                >
                  <div className="col-span-2 flex items-start gap-5 w-full">
                    <div className={`w-1.5 h-12 rounded-full flex-shrink-0 transition-all duration-500 ${supplier.isRecommended ? "bg-primary shadow-[0_0_10px_rgba(192,133,82,0.5)]" : "bg-text/10 group-hover:bg-primary/40"}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between lg:justify-start gap-3 mb-1.5">
                        <h4 className="text-lg font-bold text-text group-hover:text-primary transition-colors">{supplier.name}</h4>
                        <span className={`text-[9px] font-black px-2.5 py-1 rounded-md border tracking-widest ${supplier.tagColor}`}>
                          {supplier.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-text/60 font-bold">Capacity: <span className="text-text/80">{supplier.available}</span></p>
                    </div>
                  </div>

                  <div className="flex lg:block items-baseline gap-3 w-full lg:w-auto py-3 lg:py-0 border-y lg:border-0 border-text/5 lg:border-none">
                    <span className="lg:hidden text-[10px] font-black text-text/60 uppercase tracking-widest mr-auto">Price:</span>
                    <div className="text-2xl font-bold text-text tracking-tight">{supplier.price}</div>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm font-bold text-text/70 w-full lg:w-auto bg-background/50 lg:bg-transparent p-3 lg:p-0 rounded-xl">
                    <span className="lg:hidden text-[10px] font-black text-text/60 uppercase tracking-widest mr-auto">Shipping:</span>
                    <div className="w-10 h-10 rounded-xl bg-white lg:bg-background flex items-center justify-center border border-text/5 lg:border-transparent shadow-sm lg:shadow-none">
                      <supplier.deliveryIcon size={18} className="text-primary" strokeWidth={2.5} />
                    </div>
                    {supplier.delivery}
                  </div>

                  <div className="col-span-2 flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center lg:items-center justify-between gap-6 w-full">
                    <div className="space-y-2.5 bg-background/50 lg:bg-transparent p-4 lg:p-0 rounded-xl">
                      <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-6">
                        {supplier.reliability.map((item, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-2 text-[11px] font-bold ${item.isNegative ? "text-rose-500" : "text-text/50"}`}
                          >
                            <item.icon size={16} strokeWidth={2.5} />
                            {item.text}
                          </div>
                        ))}
                      </div>
                      <div className="text-[9px] font-black text-text/60 uppercase tracking-[0.2em]">{supplier.moq}</div>
                    </div>

                    <button
                      className={`w-full sm:w-auto px-8 py-4 lg:py-3.5 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                        supplier.isRecommended 
                          ? "bg-text text-white hover:bg-primary shadow-[0_10px_30px_rgb(0,0,0,0.15)]" 
                          : "bg-white border border-text/10 text-text/60 hover:border-text hover:text-text hover:shadow-sm"
                      }`}
                    >
                      Select Partner
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-white rounded-[40px] border border-text/5 shadow-premium p-8 lg:p-10 flex flex-col h-fit sticky top-32 overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary opacity-5 blur-[60px] -mr-24 -mt-24 group-hover:opacity-10 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20 shadow-sm">
                  <Sparkles size={24} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-text">Intelligence</h3>
              </div>

              <div className="mb-10">
                <p className="text-sm font-bold text-text/60 leading-relaxed">
                  <span className="font-black text-primary">MedTech Inc.</span> is recommended. Optimal balance of pricing economics and
                  fulfillment velocity for this volume tier.
                </p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="bg-background/80 p-5 rounded-[24px] border border-text/5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-[16px] flex items-center justify-center border border-teal-100 flex-shrink-0">
                    <Tag size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-text tracking-tight">Saves ₹ 120</p>
                    <p className="text-[11px] font-bold text-text/60 mt-0.5">vs. Rapid Care premium</p>
                  </div>
                </div>
                
                <div className="bg-background/80 p-5 rounded-[24px] border border-text/5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-[16px] flex items-center justify-center border border-blue-100 flex-shrink-0">
                    <Clock size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-text tracking-tight">48hr Dispatch</p>
                    <p className="text-[11px] font-bold text-text/60 mt-0.5">Matches SLA requirements</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-widest py-5 rounded-[24px] flex items-center justify-center gap-3 transition-all shadow-[0_8px_25px_rgb(192,133,82,0.3)] hover:shadow-[0_8px_30px_rgb(192,133,82,0.4)] group/btn">
                Execute Order <ArrowRight size={18} strokeWidth={2.5} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <p className="mt-8 text-[9px] text-center font-black uppercase tracking-[0.2em] text-text/30 flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} /> Cryptographically Audited
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .serif { font-family: "Playfair Display", serif; }
        .shadow-premium { box-shadow: 0 20px 80px -20px rgba(0,0,0,0.06); }
      ` }} />
    </motion.div>
  );
}

