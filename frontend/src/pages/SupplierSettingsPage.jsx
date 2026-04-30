import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  Building2,
  Check,
  CreditCard,
  LogOut,
  RefreshCcw,
  Save,
  ShieldCheck,
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

export default function SupplierSettingsPage() {
  const navigate = useNavigate();
  const [syncMethod, setSyncMethod] = useState("api");
  const [alerts, setAlerts] = useState({
    push: true,
    email: false,
    whatsapp: true,
  });

  const toggleAlert = (key) => {
    setAlerts((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            <span className="text-[10px] font-black text-text/50 uppercase tracking-[0.3em]">Settings</span>
          </div>
          <h1 className="text-5xl font-bold text-text tracking-tighter leading-none">Portal <span className="text-primary italic font-normal serif">Configuration.</span></h1>
          <p className="text-text/60 text-sm font-medium">Configure your business profile, financial routing, and system synchronization.</p>
        </div>

        <div className="flex items-center gap-4">
          <PremiumButton variant="primary" icon={Save}>
            Save Configuration
          </PremiumButton>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .serif { font-family: "Playfair Display", serif; }
        .shadow-premium { box-shadow: 0 20px 80px -20px rgba(0,0,0,0.06); }
      ` }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <motion.div variants={rowAnim}>
            <GlassCard className="p-10" hover={false}>
              <div className="flex items-center gap-3 mb-10 border-b border-text/5 pb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary">
                  <Building2 size={20} />
                </div>
                <h3 className="text-xl font-display font-bold text-text">Business Profile</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-[0.2em] block mb-3">
                    Company Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Acme Apothecary Supplies"
                    className="w-full px-6 py-4 bg-white/50 border border-text/5 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-black text-text/60 uppercase tracking-[0.2em] block mb-3">
                      GST Number
                    </label>
                    <input
                      type="text"
                      defaultValue="22AAAAA0000A1Z5"
                      className="w-full px-6 py-4 bg-white/50 border border-text/5 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-text/60 uppercase tracking-[0.2em] block mb-3">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      defaultValue="billing@acmeapothecary.com"
                      className="w-full px-6 py-4 bg-white/50 border border-text/5 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-[0.2em] block mb-3">
                    Street Address
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="124 Artisan Alley, Historic District, Cityville, 10012"
                    className="w-full px-6 py-4 bg-white/50 border border-text/5 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                  />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={rowAnim}>
            <GlassCard className="p-10 relative overflow-hidden bg-accent-emerald/5 border-accent-emerald/10" hover={false}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-emerald/10 rounded-full blur-3xl -mr-32 -mt-32" />

              <div className="flex items-center gap-3 mb-10 relative z-10 border-b border-accent-emerald/10 pb-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-accent-emerald shadow-sm border border-accent-emerald/20">
                  <CreditCard size={20} />
                </div>
                <h3 className="text-xl font-display font-bold text-text">Financial Routing</h3>
              </div>

              <div className="space-y-8 relative z-10">
                <div>
                  <label className="text-[10px] font-black text-accent-emerald/70 uppercase tracking-[0.2em] block mb-3">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    defaultValue="First National Mercantile Bank"
                    className="w-full px-6 py-4 bg-white border border-accent-emerald/20 rounded-2xl text-sm font-bold focus:outline-none focus:border-accent-emerald/40 focus:ring-4 focus:ring-accent-emerald/10 transition-all shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-black text-accent-emerald/70 uppercase tracking-[0.2em] block mb-3">
                      Account Number
                    </label>
                    <input
                      type="text"
                      defaultValue="1234567890"
                      className="w-full px-6 py-4 bg-white border border-accent-emerald/20 rounded-2xl text-sm font-bold focus:outline-none focus:border-accent-emerald/40 focus:ring-4 focus:ring-accent-emerald/10 transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-accent-emerald/70 uppercase tracking-[0.2em] block mb-3">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      defaultValue="FNMB0001234"
                      className="w-full px-6 py-4 bg-white border border-accent-emerald/20 rounded-2xl text-sm font-bold focus:outline-none focus:border-accent-emerald/40 focus:ring-4 focus:ring-accent-emerald/10 transition-all shadow-sm uppercase"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="space-y-10">
          <motion.div variants={rowAnim}>
            <GlassCard className="p-10 border-primary/10 bg-primary/5" hover={false}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-primary/20">
                  <RefreshCcw size={20} />
                </div>
                <h3 className="text-xl font-display font-bold text-text">Sync Method</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: "api",
                    label: "API Integration",
                    desc: "Real-time sync via REST endpoints. Recommended for high volume.",
                  },
                  {
                    id: "bulk",
                    label: "Bulk CSV Upload",
                    desc: "Daily manual imports via secure FTP or dashboard drop zone.",
                  },
                  {
                    id: "manual",
                    label: "Manual Entry",
                    desc: "Update quantities directly within the portal interface.",
                  },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSyncMethod(method.id)}
                    className={`w-full p-6 rounded-3xl border text-left transition-all group ${
                      syncMethod === method.id
                        ? "bg-white border-primary shadow-sm"
                        : "bg-white/50 border-text/5 hover:border-primary/20 hover:bg-white"
                    }`}
                    type="button"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          syncMethod === method.id ? "border-primary bg-primary" : "border-text/10"
                        }`}
                      >
                        {syncMethod === method.id ? <Check size={12} className="text-white" /> : null}
                      </div>
                      <span className="font-bold font-display text-text text-sm">{method.label}</span>
                    </div>
                    <p className="text-[10px] text-text/60 font-medium leading-relaxed pl-9">{method.desc}</p>
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={rowAnim}>
            <GlassCard className="p-10" hover={false}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 border border-orange-100">
                  <Bell size={20} />
                </div>
                <h3 className="text-xl font-display font-bold text-text">Alerts</h3>
              </div>

              <div className="space-y-6">
                {[
                  { id: "push", label: "Push Notifications", desc: "In-app vital alerts." },
                  { id: "email", label: "Email Updates", desc: "Daily digest reports." },
                  { id: "whatsapp", label: "WhatsApp Alerts", desc: "Urgent low-stock pings." },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/50 transition-all border border-transparent hover:border-text/5">
                    <div>
                      <p className="font-bold font-display text-text text-sm">{item.label}</p>
                      <p className="text-[10px] text-text/60 font-medium">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleAlert(item.id)}
                      className={`w-12 h-6 rounded-full transition-all relative ${
                        alerts[item.id] ? "bg-primary shadow-sm" : "bg-text/10"
                      }`}
                      type="button"
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${
                          alerts[item.id] ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white/50 rounded-2xl border border-text/5 flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-text/20 shadow-sm shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <p className="text-[10px] text-text/60 italic leading-relaxed">
                  Sample: "Paracetamol low stock (SKU: PARA-500). Reorder now to maintain SLA."
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <motion.div variants={rowAnim} className="mt-12 flex justify-end items-center gap-6">
        <button className="text-[10px] font-black text-text/50 uppercase tracking-[0.2em] hover:text-text transition-all" type="button">
          Discard Changes
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userRole");
            navigate("/login");
          }}
          className="px-6 py-3 hover:bg-rose-50 text-rose-500 font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center gap-3 transition-all border border-transparent hover:border-rose-100"
          type="button"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </motion.div>
    </motion.div>
  );
}

