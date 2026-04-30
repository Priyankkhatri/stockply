import React from "react";
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
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Logo from "../components/Logo";

const XCircle = ({ size, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const suppliers = [
  {
    name: "MedTech Inc.",
    tag: "RECOMMENDED",
    tagColor: "bg-orange-50 text-orange-600 border-orange-100",
    available: "500 units",
    price: "Rs. 4.50",
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
    price: "Rs. 4.20",
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
    price: "Rs. 5.10",
    delivery: "Same day",
    deliveryIcon: Zap,
    reliability: [
      { icon: Undo2, text: "15 days return" },
      { icon: Star, text: "4.8/5 Rating" },
    ],
    moq: "MOQ: 10 UNITS",
  },
];

export default function CompareSuppliersPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-10 py-10">
      <PageHeader
        title="Compare Suppliers"
        subtitle="Choose the best supplier for this restock based on pricing, delivery speed, and reliability signals."
        breadcrumbs={["Dashboard", "Inventory", "Compare Suppliers"]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6 lg:space-y-8">
          <section className="bg-white rounded-2xl border border-text/5 shadow-sm p-4 lg:p-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4 lg:gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl lg:text-2xl font-bold text-text">Paracetamol 500mg</h2>
                  <span className="bg-background text-text/40 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">
                    Pharmacy
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text/40 font-medium">
                  <ShieldCheck size={14} className="text-primary" />
                  <span>
                    Current Stock: <span className="text-text font-bold">12 units left</span>
                  </span>
                </div>
              </div>
              <div className="w-full sm:w-auto bg-red-50 border border-red-100 rounded-xl p-3 lg:p-4 text-center">
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Requirement</p>
                <p className="text-lg lg:text-xl font-bold text-red-600 whitespace-nowrap">Need: 60 units</p>
              </div>
            </div>

            <div className="bg-[#FAF5F0] rounded-xl p-4 border border-[#F0E5D8] flex items-center gap-3 text-[10px] lg:text-xs text-[#C08552]">
              <Logo size={16} />
              <p>Analysis based on recommendation scoring and previous purchasing patterns.</p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between bg-white/50 p-2 rounded-xl border border-text/5 gap-4">
            <div className="flex items-center gap-4 lg:gap-6 px-4">
              <span className="text-[10px] lg:text-xs font-bold text-text/40 uppercase tracking-widest">Sort:</span>
              <div className="flex gap-2 lg:gap-4">
                {["Price", "Delivery", "Rating"].map((sort) => (
                  <button
                    key={sort}
                    type="button"
                    className={`text-[10px] lg:text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                      sort === "Price" ? "bg-white text-text shadow-sm" : "text-text/40 hover:text-text"
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 lg:gap-6 px-4 py-2 md:py-0 border-t md:border-t-0 md:border-l border-text/10">
              <label className="flex items-center gap-2 text-[10px] lg:text-xs font-bold text-text/40 cursor-pointer hover:text-text">
                <div className="w-4 h-4 border-2 border-text/10 rounded bg-white" />
                Returnable
              </label>
              <label className="flex items-center gap-2 text-[10px] lg:text-xs font-bold text-text/40 cursor-pointer hover:text-text">
                <div className="w-4 h-4 border-2 border-text/10 rounded bg-white" />
                Fast Delivery
              </label>
            </div>
          </section>

          <section className="space-y-4">
            {/* Table Header - Desktop Only */}
            <div className="hidden lg:grid grid-cols-6 px-8 text-[10px] font-bold text-text/30 uppercase tracking-widest">
              <span className="col-span-2">Supplier Name</span>
              <span>Price/Unit</span>
              <span>Delivery</span>
              <span className="col-span-2">Terms & Reliability</span>
            </div>

            {suppliers.map((supplier) => (
              <div
                key={supplier.name}
                className={`bg-white rounded-2xl border shadow-sm p-5 lg:p-6 flex flex-col lg:grid lg:grid-cols-6 gap-4 lg:gap-4 items-start lg:items-center transition-all hover:shadow-md ${
                  supplier.isRecommended ? "border-primary/30 ring-1 ring-primary/10" : "border-text/5"
                }`}
              >
                <div className="col-span-2 flex items-start gap-4 w-full">
                  <div className={`w-1 h-12 rounded-full flex-shrink-0 ${supplier.isRecommended ? "bg-primary" : "bg-text/5"}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between lg:justify-start gap-2 mb-1">
                      <h4 className="font-bold text-text">{supplier.name}</h4>
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded border tracking-widest ${supplier.tagColor}`}>
                        {supplier.tag}
                      </span>
                    </div>
                    <p className="text-[10px] text-text/40 font-medium">Available: {supplier.available}</p>
                  </div>
                </div>

                <div className="flex lg:block items-baseline gap-2 w-full lg:w-auto py-2 lg:py-0 border-y lg:border-0 border-text/5 lg:border-none">
                  <span className="lg:hidden text-[10px] font-bold text-text/20 uppercase tracking-widest mr-auto">Price:</span>
                  <div className="text-xl font-bold text-text">{supplier.price}</div>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-text/60 w-full lg:w-auto">
                  <span className="lg:hidden text-[10px] font-bold text-text/20 uppercase tracking-widest mr-auto">Shipping:</span>
                  <supplier.deliveryIcon size={16} className="text-primary/40" />
                  {supplier.delivery}
                </div>

                <div className="col-span-2 flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center lg:items-center justify-between gap-6 w-full">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-6">
                      {supplier.reliability.map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 text-[10px] font-bold ${item.isNegative ? "text-red-400" : "text-text/40"}`}
                        >
                          <item.icon size={12} />
                          {item.text}
                        </div>
                      ))}
                    </div>
                    <div className="text-[8px] font-bold text-text/20 uppercase tracking-widest">{supplier.moq}</div>
                  </div>

                  <button
                    type="button"
                    className={`w-full sm:w-auto px-8 py-3 lg:py-2 rounded-xl lg:rounded-lg text-xs font-bold transition-all ${
                      supplier.isRecommended
                        ? "bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20"
                        : "border border-text/10 text-text/40 hover:border-primary hover:text-primary"
                    }`}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-text/5 shadow-sm p-6 flex flex-col h-fit sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Logo size={18} />
              </div>
              <h3 className="font-bold text-text">Smart Suggestion</h3>
            </div>

            <div className="mb-6">
              <p className="text-sm text-text/70 leading-relaxed">
                <span className="font-bold text-primary">MedTech Inc.</span> is recommended. Best balance of price and
                delivery for your required volume.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-background/50 p-4 rounded-xl border border-text/5 flex items-start gap-3">
                <div className="p-1.5 bg-teal-50 text-teal-600 rounded-md">
                  <Tag size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text">Saves Rs. 120</p>
                  <p className="text-[10px] text-text/40">compared to Rapid Care</p>
                </div>
              </div>
              <div className="bg-background/50 p-4 rounded-xl border border-text/5 flex items-start gap-3">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                  <Clock size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text">Delivers in 2 days</p>
                  <p className="text-[10px] text-text/40">Meets your required timeline</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 mb-4"
            >
              Select Recommended <ArrowRight size={18} />
            </button>

            <p className="text-[10px] text-center text-text/30 font-medium">Decision logged for compliance auditing.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

