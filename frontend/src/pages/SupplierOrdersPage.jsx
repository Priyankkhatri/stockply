import React, { useMemo, useState } from "react";
import { Download, Plus, Search, Filter, ChevronDown, MoreHorizontal } from "lucide-react";

const statusStyles = {
  Pending: "bg-orange-50 text-orange-600 border-orange-100",
  Dispatched: "bg-blue-50 text-blue-600 border-blue-100",
  Delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const StatusPill = ({ status }) => (
  <span
    className={`text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest ${
      statusStyles[status] ?? "bg-background text-text/40 border-text/5"
    }`}
  >
    {status}
  </span>
);

const OrderRow = ({ order }) => {
  return (
    <div className="bg-white rounded-3xl border border-text/5 shadow-sm px-10 py-7 flex items-center justify-between hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />

      <div className="flex items-center gap-10 min-w-0 flex-1">
        <div className="min-w-[170px]">
          <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.2em] mb-1">{order.id}</p>
          <h4 className="font-bold text-text text-sm group-hover:text-primary transition-colors">{order.shop}</h4>
          <p className="text-[11px] font-bold text-text/30 mt-1">{order.date}</p>
        </div>

        <div className="hidden lg:block min-w-[240px]">
          <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.2em] mb-1">Details</p>
          <p className="text-sm font-bold text-text">{order.details}</p>
        </div>

        <div className="hidden md:flex items-center gap-4 min-w-[220px]">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.2em] mb-1">Amount</p>
            <p className="text-sm font-black text-text tracking-tight">{order.amount}</p>
            <p className="text-[10px] font-bold text-text/30 mt-1">{order.payment}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <StatusPill status={order.status} />
        <button
          type="button"
          className="p-3 rounded-2xl border border-text/5 text-text/30 hover:text-text hover:border-primary/20 hover:bg-background transition-all"
          aria-label="More actions"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
};

export default function SupplierOrdersPage() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [query, setQuery] = useState("");

  const orders = useMemo(
    () => [
      {
        id: "#ORD-8920",
        date: "Oct 24 • 14:30",
        shop: "Artisan Goods Co.",
        details: "3 Items • 174 Qty",
        amount: "₹45,200",
        payment: "Paid",
        status: "Pending",
      },
      {
        id: "#ORD-8919",
        date: "Oct 23 • 09:10",
        shop: "The Craft Boutique",
        details: "4 Items • 120 Qty",
        amount: "₹18,500",
        payment: "Paid",
        status: "Dispatched",
      },
      {
        id: "#ORD-8918",
        date: "Oct 22 • 18:05",
        shop: "Urban Nest Decor",
        details: "2 Items • 15 Qty",
        amount: "₹4,200",
        payment: "Pending",
        status: "Pending",
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const norm = query.trim().toLowerCase();
    return orders.filter((order) => {
      if (activeTab !== "All" && order.status !== activeTab) return false;
      if (!norm) return true;
      return (
        order.id.toLowerCase().includes(norm) ||
        order.shop.toLowerCase().includes(norm) ||
        order.details.toLowerCase().includes(norm)
      );
    });
  }, [activeTab, orders, query]);

  return (
    <div className="max-w-[1600px] mx-auto px-10 pb-12 pt-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2 tracking-tight">Order Management</h1>
          <p className="text-text/60 font-medium italic">
            Fulfilling the legacy of artisan retail partners worldwide.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="px-6 py-3 rounded-2xl border border-text/10 bg-white text-text font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-background transition-all shadow-sm"
          >
            <Download size={16} />
            Export Batch
          </button>
          <button
            type="button"
            className="px-8 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-primary/20 border border-primary/20"
          >
            <Plus size={18} />
            New Entry
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-text/5 shadow-sm p-3 mb-10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center p-1.5 bg-background/50 rounded-[20px]">
          {[
            { name: "Pending", count: 12 },
            { name: "All", count: null },
            { name: "Dispatched", count: null },
            { name: "Delivered", count: null },
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-8 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                activeTab === tab.name
                  ? "bg-white text-text shadow-md shadow-text/5 border border-text/5"
                  : "text-text/30 hover:text-text"
              }`}
              type="button"
            >
              {tab.name}
              {tab.count ? (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[9px]">{tab.count}</span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 px-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text/20" size={16} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search orders, shops, or SKUs..."
              className="pl-12 pr-6 py-3 bg-background/30 border border-transparent rounded-2xl text-xs font-medium focus:outline-none focus:bg-white focus:border-primary/20 transition-all w-80 placeholder:text-text/20"
            />
          </div>

          <button
            type="button"
            className="px-5 py-3 rounded-2xl border border-text/10 bg-white text-text/60 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-primary/20 hover:text-text transition-all"
          >
            <Filter size={16} />
            Filters
            <ChevronDown size={14} className="text-text/30" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

