import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  MapPin,
  Phone,
  Plus,
  Settings as SettingsIcon,
  ShieldCheck,
  Store,
  User,
  Wallet,
  Save,
} from "lucide-react";
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

export default function SettingsPage() {
  const navigate = useNavigate();
  const [autoPay, setAutoPay] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const connectedSuppliers = [
    { name: "Oakwood Timber Co.", category: "Raw Materials", status: "Active", icon: Store },
    { name: "Cerulean Dyes Ltd.", category: "Finishing", status: "Active", icon: ShieldCheck },
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
            <span className="text-[10px] font-black text-text/30 uppercase tracking-[0.3em]">Settings</span>
          </div>
          <h1 className="text-4xl font-bold text-text tracking-tighter leading-none">System <span className="text-primary italic font-normal serif">Preferences.</span></h1>
          <p className="text-text/40 text-xs font-medium">Manage your store profile, financials, and system configurations.</p>
        </div>

        <div className="flex items-center gap-4">
          <PremiumButton variant="primary" icon={Save}>
            Save Preferences
          </PremiumButton>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <motion.div variants={rowAnim}>
            <GlassCard className="p-6" hover={false}>
              <div className="flex justify-between items-start mb-10 border-b border-text/5 pb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-text mb-1">Artisan Ledger Studio</h2>
                  <p className="text-text/40 text-sm font-medium">Primary Operations Center</p>
                </div>
                <button
                  className="bg-[#8C5A3C] hover:bg-[#8C5A3C]/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-[#8C5A3C]/10"
                  type="button"
                >
                  Edit Details
                </button>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest flex items-center gap-2">
                    <User size={12} /> Owner
                  </p>
                  <p className="font-bold text-text">Arthur Pendelton</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={12} /> Phone
                  </p>
                  <p className="font-bold text-text">+91 98765 43210</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={12} /> Pincode
                  </p>
                  <p className="font-bold text-text">560001</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest flex items-center gap-2">
                    <Store size={12} /> Shop Type
                  </p>
                  <span className="inline-block bg-white/50 text-text/60 text-[10px] font-bold px-3 py-1 rounded-full border border-text/5">
                    Premium Materials
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={rowAnim}>
            <GlassCard className="overflow-hidden p-0" hover={false}>
              <div className="p-6 flex justify-between items-center border-b border-text/5 bg-white/50">
                <h3 className="text-xl font-display font-bold text-text">Connected Suppliers</h3>
                <button className="text-primary hover:text-primary/80 font-bold text-sm flex items-center gap-1.5 transition-all" type="button">
                  <Plus size={18} />
                  Add New
                </button>
              </div>
              <div className="divide-y divide-text/5">
                {connectedSuppliers.map((supplier) => (
                  <div
                    key={supplier.name}
                    className="px-8 py-6 flex items-center justify-between hover:bg-white/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-text/20 group-hover:text-primary shadow-sm border border-text/5 transition-colors">
                        <supplier.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-text text-sm">{supplier.name}</h4>
                        <p className="text-[10px] text-text/30 font-bold uppercase tracking-widest">
                          {supplier.category} • {supplier.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <button className="text-[11px] font-bold text-text/40 hover:text-text transition-colors" type="button">
                        View
                      </button>
                      <button className="text-[11px] font-bold text-red-400 hover:text-red-500 transition-colors" type="button">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div variants={rowAnim}>
            <GlassCard className="p-6" hover={false}>
              <h3 className="text-sm font-bold text-text uppercase tracking-widest mb-8">Financials</h3>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 relative overflow-hidden mb-8">
                <div className="absolute -right-4 -top-4 opacity-10 text-primary">
                  <Wallet size={120} />
                </div>
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-1 relative z-10">Available Credit</p>
                <p className="text-3xl font-display font-bold text-[#8C5A3C] relative z-10">Rs. 20,000</p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-text/60">
                    <CreditCard size={16} />
                    <span className="text-xs font-bold">Payment Methods</span>
                  </div>
                  <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline" type="button">
                    Manage
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["UPI", "Net Banking", "Pay Later"].map((method) => (
                    <span
                      key={method}
                      className="px-3 py-1 bg-white/50 text-text/60 text-[9px] font-bold rounded-lg border border-text/5 shadow-sm"
                    >
                      {method}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-text/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-text">Auto-pay</p>
                    <p className="text-[10px] text-text/30 font-medium">Deduct automatically for trusted suppliers</p>
                  </div>
                  <button
                    onClick={() => setAutoPay(!autoPay)}
                    className={`w-10 h-5 rounded-full transition-all relative flex items-center px-1 ${autoPay ? "bg-primary shadow-sm" : "bg-text/10"}`}
                    type="button"
                  >
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-all ${autoPay ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={rowAnim}>
            <GlassCard className="p-8" hover={false}>
              <h3 className="text-sm font-bold text-text uppercase tracking-widest mb-8">System Preferences</h3>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest mb-4">Alert Channels</p>
                  <div className="flex items-center gap-6">
                    {["Push", "WhatsApp", "SMS"].map((channel) => (
                      <label key={channel} className="flex items-center gap-2 cursor-pointer group">
                        <div
                          className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center ${
                            channel !== "SMS" ? "bg-primary border-primary" : "border-text/10"
                          }`}
                        >
                          {channel !== "SMS" ? <div className="w-1.5 h-1.5 bg-white rounded-full" /> : null}
                        </div>
                        <span
                          className={`text-[11px] font-bold ${
                            channel !== "SMS" ? "text-text" : "text-text/30 group-hover:text-text/40"
                          }`}
                        >
                          {channel}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest mb-4">Reorder Logic</p>
                  <div className="relative">
                    <select className="w-full bg-white/50 border border-text/5 rounded-xl px-4 py-3 text-xs font-bold text-text focus:outline-none focus:border-primary/30 appearance-none cursor-pointer">
                      <option>AI Predictive (Recommended)</option>
                      <option>Fixed Threshold</option>
                      <option>Manual Review</option>
                    </select>
                    <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-text/20 rotate-90" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={rowAnim} className="space-y-3">
            <button className="w-full bg-white/40 border border-text/5 rounded-2xl p-6 flex items-center justify-between group hover:bg-white hover:border-primary/20 hover:shadow-sm transition-all" type="button">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-text/20 shadow-sm border border-text/5 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                  <HelpCircle size={18} />
                </div>
                <span className="text-sm font-bold text-text">Help & Support</span>
              </div>
              <ChevronRight size={18} className="text-text/20" />
            </button>

            <button 
              onClick={handleLogout}
              className="w-full bg-rose-50/50 border border-rose-100 rounded-2xl p-6 flex items-center justify-center gap-3 text-rose-500 hover:bg-rose-50 hover:border-rose-200 transition-all group" 
              type="button"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold">Sign Out Session</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

