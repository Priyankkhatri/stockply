import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  Clock3,
  FileText,
  IndianRupee,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import GlassCard from "../components/GlassCard";
import PremiumButton from "../components/PremiumButton";

const weeklyDemand = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 58 },
  { label: "Wed", value: 51 },
  { label: "Thu", value: 68 },
  { label: "Fri", value: 64 },
  { label: "Sat", value: 79 },
  { label: "Sun", value: 72 },
];

const fulfillmentMix = [
  { label: "On Time", value: "78%", color: "#10B981" },
  { label: "At Risk", value: "14%", color: "#F59E0B" },
  { label: "Delayed", value: "8%", color: "#F43F5E" },
];

const categoryVelocity = [
  { name: "Packaging", orders: "128", change: "+12%" },
  { name: "Raw Materials", orders: "94", change: "+8%" },
  { name: "Finished Goods", orders: "63", change: "-3%" },
];

const stats = [
  { label: "Revenue This Week", value: "Rs. 3.8L", trend: "+8.2%", up: true, icon: IndianRupee },
  { label: "Orders Fulfilled", value: "186", trend: "+14%", up: true, icon: Boxes },
  { label: "Avg. Dispatch Time", value: "18 hrs", trend: "-2 hrs", up: true, icon: Clock3 },
  { label: "Demand Forecast", value: "High", trend: "+11%", up: false, icon: TrendingUp },
];

export default function SupplierAnalyticsPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-10 py-10">
      <PageHeader
        title="Supplier Analytics"
        subtitle="Track fulfillment velocity, demand pressure, and revenue movement across your partner network."
        breadcrumbs={["Supplier", "Analytics"]}
        actions={
          <PremiumButton variant="primary" icon={FileText}>
            Export insight pack
          </PremiumButton>
        }
      />

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="h-[220px] flex flex-col justify-between group">
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary shadow-inner-soft transition-transform duration-500 group-hover:scale-110">
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
              <div
                className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-black uppercase tracking-widest ${
                  stat.up
                    ? "border-accent-emerald/10 bg-accent-emerald/5 text-accent-emerald"
                    : "border-accent-rose/10 bg-accent-rose/5 text-accent-rose"
                }`}
              >
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{stat.label}</p>
              <p className="text-4xl font-display font-bold text-text">{stat.value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <GlassCard className="h-[520px] flex flex-col overflow-hidden p-0 xl:col-span-2" hover={false}>
          <div className="flex items-center justify-between border-b border-text/5 bg-white/50 px-10 py-8">
            <div>
              <h3 className="text-xl font-display font-bold text-text">Demand Momentum</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                Weekly order pull across connected shops
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full animate-pulse bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text">Live forecast</span>
            </div>
          </div>

          <div className="flex-1 p-8">
            <div className="flex h-full flex-col rounded-[28px] border border-text/5 bg-background/30 p-6">
              <div className="mb-6 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                <span>Partner demand</span>
                <span>7 day window</span>
              </div>
              <div className="relative flex flex-1 items-end gap-4">
                <div className="absolute inset-x-0 bottom-[20%] h-px bg-text/5" />
                <div className="absolute inset-x-0 bottom-[50%] h-px bg-text/5" />
                {weeklyDemand.map((item, index) => (
                  <div key={item.label} className="relative z-10 flex flex-1 flex-col items-center gap-3">
                    <div
                      className={`w-full rounded-t-[20px] transition-all duration-300 ${
                        index >= 5 ? "bg-primary/70" : "bg-primary/20 hover:bg-primary/35"
                      }`}
                      style={{ height: `${item.value}%` }}
                      title={`${item.label}: ${item.value}`}
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="flex h-[250px] flex-col justify-between">
            <div>
              <h4 className="mb-5 text-lg font-display font-bold text-text">Fulfillment Mix</h4>
              <div className="mb-8 h-4 overflow-hidden rounded-full bg-background">
                <div className="flex h-full w-full">
                  <div className="h-full" style={{ width: "78%", backgroundColor: "#10B981" }} />
                  <div className="h-full" style={{ width: "14%", backgroundColor: "#F59E0B" }} />
                  <div className="h-full" style={{ width: "8%", backgroundColor: "#F43F5E" }} />
                </div>
              </div>
              <div className="space-y-3">
                {fulfillmentMix.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{item.label}</span>
                    </div>
                    <span className="text-xs font-black text-text">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="relative flex h-[242px] flex-col justify-between overflow-hidden border-accent-emerald/10 bg-accent-emerald/5">
            <div className="absolute -right-0 top-0 -mr-16 -mt-16 h-32 w-32 bg-accent-emerald/10 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-accent-emerald shadow-sm">
                  <Sparkles size={20} />
                </div>
                <h4 className="text-lg font-display font-bold text-text">Dispatch Optimizer</h4>
              </div>
              <p className="text-xs font-medium leading-relaxed text-text-muted">
                Shift tomorrow&apos;s packaging batch forward and you can improve on-time fulfillment by
                <span className="font-black text-accent-emerald"> 6% </span>
                across top-demand stores.
              </p>
            </div>
            <PremiumButton variant="primary" size="sm" className="w-full bg-accent-emerald hover:bg-accent-emerald/90 shadow-accent-emerald/20">
              Apply recommendation
            </PremiumButton>
          </GlassCard>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {categoryVelocity.map((item) => (
          <div key={item.name} className="rounded-[30px] border border-text/5 bg-white p-8 shadow-sm">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-text/30">{item.name}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-display font-bold text-text">{item.orders}</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                {item.change}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-text/55">Order velocity over the current week.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

