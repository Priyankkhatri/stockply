import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Truck,
  Upload,
} from "lucide-react";

const statusStyles = {
  "In Stock": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Low Stock": "bg-orange-50 text-orange-600 border-orange-100",
};

const alertStyles = {
  rose: "bg-rose-50 text-rose-600 border-rose-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
};

const AlertCard = ({ category, name, value, threshold, color, type }) => (
  <div className="bg-white rounded-[28px] border border-text/5 p-7 shadow-sm">
    <div className="flex items-center justify-between mb-5">
      <span
        className={`text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest ${
          alertStyles[color]
        }`}
      >
        {type}
      </span>
      <AlertTriangle size={18} className="text-text/20" />
    </div>
    <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.2em] mb-2">{category}</p>
    <h4 className="font-bold text-text text-lg mb-2">{name}</h4>
    <p className="text-sm font-black text-text mb-1">{value}</p>
    <p className="text-xs text-text/50 font-medium">{threshold}</p>
  </div>
);

const InventoryRow = ({ product }) => (
  <tr className="group hover:bg-background/20 transition-all">
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-text/5 bg-background">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-bold text-text text-sm">{product.name}</p>
          <p className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] mt-1">{product.sku}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-6 text-sm font-bold text-text">{product.category}</td>
    <td className="px-8 py-6">
      <p className="text-sm font-black text-text">
        {product.stock} <span className="text-text/40">{product.unit}</span>
      </p>
    </td>
    <td className="px-8 py-6 text-sm font-bold text-text">Rs. {product.price}</td>
    <td className="px-8 py-6 text-sm font-bold text-text">{product.moq}</td>
    <td className="px-8 py-6 text-sm font-bold text-text">{product.leadTime}</td>
    <td className="px-8 py-6">
      <span
        className={`text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest ${
          statusStyles[product.status] ?? "bg-background text-text/40 border-text/5"
        }`}
      >
        {product.status}
      </span>
    </td>
    <td className="px-8 py-6 text-right">
      <button
        type="button"
        className="p-3 rounded-2xl border border-text/5 text-text/30 hover:text-text hover:border-primary/20 hover:bg-white transition-all"
      >
        <MoreHorizontal size={18} />
      </button>
    </td>
  </tr>
);

export default function SupplierInventoryPage() {
  const [activeTab, setActiveTab] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");

  const products = useMemo(
    () => [
      {
        name: "European Linen - Natural",
        sku: "LNN-NAT-01",
        category: "Fabric",
        stock: "340",
        unit: "mtrs",
        price: "850.00",
        moq: "100",
        leadTime: "14 Days",
        status: "In Stock",
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=100&auto=format&fit=crop",
      },
      {
        name: "Full Grain Leather - Cognac",
        sku: "LTH-COG-05",
        category: "Leather",
        stock: "45",
        unit: "sqft",
        price: "1250.00",
        moq: "50",
        leadTime: "21 Days",
        status: "Low Stock",
        img: "https://images.unsplash.com/photo-1524292332709-b33366a7f139?q=80&w=100&auto=format&fit=crop",
      },
      {
        name: "Corrugated Boxes (Medium)",
        sku: "PKG-BOX-M",
        category: "Packaging",
        stock: "1,200",
        unit: "pcs",
        price: "45.00",
        moq: "500",
        leadTime: "5 Days",
        status: "In Stock",
        img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=100&auto=format&fit=crop",
      },
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      if (activeTab !== "All Items") {
        if (activeTab === "Raw Materials" && !["Fabric", "Leather"].includes(product.category)) return false;
        if (activeTab === "Packaging" && product.category !== "Packaging") return false;
        if (activeTab === "Finished Goods") return false;
      }

      if (!normalized) return true;

      return (
        product.name.toLowerCase().includes(normalized) ||
        product.sku.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized)
      );
    });
  }, [activeTab, products, searchQuery]);

  return (
    <div className="max-w-[1600px] mx-auto pb-10 px-10 pt-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-[10px] font-black text-text/30 uppercase tracking-[0.28em] mb-3">Inventory / Ledger</p>
          <h1 className="text-4xl font-bold text-text mb-2 tracking-tight">Inventory Ledger</h1>
          <p className="text-text/60 font-medium italic">
            Manage and track your raw materials with real-time visibility.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="px-6 py-3 rounded-2xl border border-text/10 bg-white text-text font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-background transition-all shadow-sm"
          >
            <Upload size={16} />
            Export Data
          </button>
          <button
            type="button"
            className="px-8 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-primary/20 border border-primary/20"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <section className="bg-primary/5 rounded-[40px] p-10 mb-12 border border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -mr-32 -mt-32" />

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-rose-500 shadow-sm border border-rose-100">
              <AlertTriangle size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-text text-2xl">Critical Alerts</h3>
              <p className="text-[10px] font-black text-text/40 uppercase tracking-[0.2em]">
                3 items require immediate replenishment
              </p>
            </div>
          </div>
          <button type="button" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <AlertCard
            type="Critical"
            category="Fabric"
            name="Raw Silk - 200TC"
            value="12 mtrs"
            threshold="Below MOQ (50)"
            color="rose"
          />
          <AlertCard
            type="Warning"
            category="Hardware"
            name="Brass Findings"
            value="45 units"
            threshold="Resupply in 2 days"
            color="orange"
          />
          <div className="bg-white rounded-[28px] border border-text/5 p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-background rounded-3xl flex items-center justify-center mb-5 text-text/20">
                <Truck size={28} />
              </div>
              <h4 className="font-bold text-text text-lg mb-2">Delayed Shipment</h4>
              <p className="text-xs text-text/50 font-medium max-w-[220px]">
                PO #4029 from Linen Co. is overdue by 3 days.
              </p>
            </div>
            <button
              type="button"
              className="mt-6 py-3 rounded-2xl border border-text/10 text-text font-black text-[10px] uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all"
            >
              Track ID
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[40px] border border-text/5 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-text/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/50">
          <div className="flex items-center gap-8 flex-wrap">
            {["All Items", "Raw Materials", "Packaging", "Finished Goods"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-black uppercase tracking-widest transition-all relative py-2 ${
                  activeTab === tab ? "text-text" : "text-text/40 hover:text-text"
                }`}
                type="button"
              >
                {tab}
                {activeTab === tab ? <span className="absolute -bottom-8 left-0 right-0 h-1.5 bg-primary rounded-t-full" /> : null}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text/30" />
              <input
                type="text"
                placeholder="Search by SKU or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3.5 bg-background border border-transparent rounded-2xl text-xs font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all w-full lg:w-72"
              />
            </div>
            <button
              type="button"
              className="p-3.5 text-text/40 hover:text-primary transition-all bg-background rounded-2xl border border-transparent hover:border-primary/10 hover:shadow-sm"
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-text/30 uppercase tracking-[0.25em] bg-background/30">
                <th className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    Product <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Stock Level</th>
                <th className="px-8 py-6">Price</th>
                <th className="px-8 py-6">MOQ</th>
                <th className="px-8 py-6">Lead Time</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text/5">
              {filteredProducts.map((product) => (
                <InventoryRow key={product.sku} product={product} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-10 py-8 border-t border-text/5 flex items-center justify-between bg-white/50">
          <p className="text-[10px] font-black text-text/40 uppercase tracking-[0.2em]">Showing 1-3 of 124 items</p>
          <div className="flex items-center gap-6">
            <button type="button" className="p-2.5 rounded-xl text-text/20 transition-all" disabled>
              <ChevronLeft size={22} />
            </button>
            <div className="flex gap-3">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                    page === 1
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                      : "bg-white text-text/40 hover:text-text hover:bg-background border border-text/5"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button type="button" className="p-2.5 rounded-xl text-text hover:text-primary transition-all hover:bg-background">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {[
          { label: "Warehouses synced", value: "08", icon: Package },
          { label: "Low stock SKUs", value: "14", icon: AlertTriangle },
          { label: "Inbound shipments", value: "05", icon: Truck },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-[28px] border border-text/5 p-7 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center text-primary mb-6">
              <card.icon size={22} />
            </div>
            <p className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] mb-2">{card.label}</p>
            <p className="text-3xl font-bold text-text">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

