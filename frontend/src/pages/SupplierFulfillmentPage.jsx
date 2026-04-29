import React from "react";
import { ArrowRight, CheckCircle2, Clock3, PackageCheck, Truck } from "lucide-react";

const stages = [
  { label: "Ready to pack", count: "12", icon: PackageCheck, tone: "bg-blue-50 text-blue-600 border-blue-100" },
  { label: "Awaiting pickup", count: "08", icon: Truck, tone: "bg-orange-50 text-orange-600 border-orange-100" },
  { label: "Delivered today", count: "21", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600 border-emerald-100" },
];

const queue = [
  { id: "#FUL-2091", shop: "Fresh Mart", window: "Pickup in 45 min", items: "32 cartons", status: "Ready" },
  { id: "#FUL-2088", shop: "Urban Nest Decor", window: "Dispatch by 3:00 PM", items: "14 cartons", status: "Packing" },
  { id: "#FUL-2083", shop: "The Craft Boutique", window: "Carrier delayed", items: "9 cartons", status: "At Risk" },
];

const statusClasses = {
  Ready: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Packing: "bg-blue-50 text-blue-600 border-blue-100",
  "At Risk": "bg-red-50 text-red-500 border-red-100",
};

export default function SupplierFulfillmentPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-10 py-10">
      <div className="mb-10 flex items-end justify-between gap-8">
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-text/30">Supplier / Fulfillment</p>
          <h1 className="text-4xl font-bold tracking-tight text-text">Fulfillment</h1>
          <p className="mt-2 max-w-2xl text-text/60 font-medium">
            Process outbound partner orders, monitor dispatch windows, and keep today&apos;s shipment queue moving.
          </p>
        </div>
        <button
          type="button"
          className="rounded-2xl bg-primary px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-dark"
        >
          Create dispatch batch
        </button>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.label} className="rounded-[30px] border border-text/5 bg-white p-8 shadow-sm">
            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border ${stage.tone}`}>
              <stage.icon size={24} />
            </div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-text/30">{stage.label}</p>
            <p className="text-4xl font-bold text-text">{stage.count}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.3fr_0.8fr]">
        <section className="rounded-[36px] border border-text/5 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-text/5 px-8 py-6">
            <div>
              <h2 className="text-xl font-bold text-text">Today&apos;s Queue</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Dispatch operations</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text/40">
              <Clock3 size={14} />
              Live board
            </div>
          </div>

          <div className="divide-y divide-text/5">
            {queue.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-6 px-8 py-6 transition-all hover:bg-background/20">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/25">{item.id}</p>
                  <h3 className="mt-1 text-sm font-bold text-text">{item.shop}</h3>
                  <p className="mt-1 text-xs font-medium text-text/50">{item.items}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-text">{item.window}</p>
                  <span
                    className={`mt-2 inline-flex rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                      statusClasses[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[36px] border border-primary/10 bg-primary/5 p-8 shadow-sm">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
            <Truck size={22} />
          </div>
          <h2 className="text-2xl font-bold text-text">Dispatch Insight</h2>
          <p className="mt-3 text-sm leading-7 text-text/60">
            Prioritizing the Fresh Mart batch first keeps two high-volume accounts on schedule and clears the next pickup window.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-text/5 bg-white px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Batches on track</p>
              <p className="mt-2 text-2xl font-bold text-text">84%</p>
            </div>
            <div className="rounded-2xl border border-text/5 bg-white px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Next carrier cutoff</p>
              <p className="mt-2 text-2xl font-bold text-text">4:30 PM</p>
            </div>
          </div>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-dark"
          >
            Open shipping tools
            <ArrowRight size={16} />
          </button>
        </section>
      </div>
    </div>
  );
}

