import React, { useState } from "react";
import {
  Bell,
  Building2,
  Check,
  CreditCard,
  RefreshCcw,
  Save,
  ShieldCheck,
} from "lucide-react";

export default function SupplierSettingsPage() {
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
    <div className="max-w-[1600px] mx-auto px-10 pb-12 pt-10">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2 tracking-tight">Portal Settings</h1>
          <p className="text-text/60 font-medium italic">
            Configure your business profile, financial routing, and system synchronization.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white rounded-[40px] border border-text/5 shadow-xl shadow-text/5 p-10">
            <div className="flex items-center gap-3 mb-10 border-b border-text/5 pb-6">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary">
                <Building2 size={20} />
              </div>
              <h3 className="text-xl font-bold text-text">Business Profile</h3>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] block mb-3">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="Acme Apothecary Supplies"
                  className="w-full px-6 py-4 bg-background/50 border border-text/5 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] block mb-3">
                    GST Number
                  </label>
                  <input
                    type="text"
                    defaultValue="22AAAAA0000A1Z5"
                    className="w-full px-6 py-4 bg-background/50 border border-text/5 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/20 transition-all uppercase"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] block mb-3">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    defaultValue="billing@acmeapothecary.com"
                    className="w-full px-6 py-4 bg-background/50 border border-text/5 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] block mb-3">
                  Street Address
                </label>
                <textarea
                  rows={3}
                  defaultValue="124 Artisan Alley, Historic District, Cityville, 10012"
                  className="w-full px-6 py-4 bg-background/50 border border-text/5 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/20 transition-all resize-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-[#E4F8ED] rounded-[40px] border border-teal-100 p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -mr-32 -mt-32" />

            <div className="flex items-center gap-3 mb-10 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-600 shadow-sm border border-teal-100">
                <CreditCard size={20} />
              </div>
              <h3 className="text-xl font-bold text-text">Financial Routing</h3>
            </div>

            <div className="space-y-8 relative z-10">
              <div>
                <label className="text-[10px] font-black text-teal-700/40 uppercase tracking-[0.2em] block mb-3">
                  Bank Name
                </label>
                <input
                  type="text"
                  defaultValue="First National Mercantile Bank"
                  className="w-full px-6 py-4 bg-white border border-teal-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-teal-500/20 transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-black text-teal-700/40 uppercase tracking-[0.2em] block mb-3">
                    Account Number
                  </label>
                  <input
                    type="text"
                    defaultValue="1234567890"
                    className="w-full px-6 py-4 bg-white border border-teal-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-teal-500/20 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-teal-700/40 uppercase tracking-[0.2em] block mb-3">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    defaultValue="FNMB0001234"
                    className="w-full px-6 py-4 bg-white border border-teal-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-teal-500/20 transition-all shadow-sm uppercase"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <section className="bg-[#FAF5F0] rounded-[40px] border border-[#F0E5D8] p-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-[#F0E5D8]">
                <RefreshCcw size={20} />
              </div>
              <h3 className="text-xl font-bold text-text">Sync Method</h3>
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
                      ? "bg-white border-primary shadow-md"
                      : "bg-white/50 border-text/5 hover:border-primary/20"
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
                    <span className="font-bold text-text text-sm">{method.label}</span>
                  </div>
                  <p className="text-[10px] text-text/40 font-medium leading-relaxed pl-9">{method.desc}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-[40px] border border-text/5 shadow-sm p-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 border border-orange-100">
                <Bell size={20} />
              </div>
              <h3 className="text-xl font-bold text-text">Alerts</h3>
            </div>

            <div className="space-y-6">
              {[
                { id: "push", label: "Push Notifications", desc: "In-app vital alerts." },
                { id: "email", label: "Email Updates", desc: "Daily digest reports." },
                { id: "whatsapp", label: "WhatsApp Alerts", desc: "Urgent low-stock pings." },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-background/30 transition-all">
                  <div>
                    <p className="font-bold text-text text-sm">{item.label}</p>
                    <p className="text-[10px] text-text/40 font-medium">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleAlert(item.id)}
                    className={`w-12 h-6 rounded-full transition-all relative ${
                      alerts[item.id] ? "bg-primary shadow-[0_0_12px_rgba(192,133,82,0.3)]" : "bg-text/10"
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

            <div className="mt-8 p-6 bg-background/50 rounded-2xl border border-text/5 flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-text/20 shadow-sm shrink-0">
                <ShieldCheck size={16} />
              </div>
              <p className="text-[10px] text-text/40 italic leading-relaxed">
                Sample: &quot;Paracetamol low stock (SKU: PARA-500). Reorder now to maintain SLA.&quot;
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-12 flex justify-end items-center gap-6">
        <button className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] hover:text-red-500 transition-all" type="button">
          Discard Changes
        </button>
        <button
          className="px-12 py-4 bg-[#4B2E2B] hover:bg-black text-white font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-black/10 border border-black/20"
          type="button"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}

