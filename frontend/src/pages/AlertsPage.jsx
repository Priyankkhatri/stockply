import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCheck,
  ChevronDown,
  DollarSign,
  Eye,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";

const AlertItem = ({ alert }) => {
  const getColors = (type) => {
    switch (type) {
      case "critical":
        return {
          border: "border-red-500",
          iconBg: "bg-red-50 text-red-500",
          tag: "bg-red-50 text-red-500 border-red-100",
        };
      case "warning":
        return {
          border: "border-orange-500",
          iconBg: "bg-orange-50 text-orange-500",
          tag: "bg-orange-50 text-orange-500 border-orange-100",
        };
      case "info":
        return {
          border: "border-teal-500",
          iconBg: "bg-teal-50 text-teal-500",
          tag: "bg-teal-50 text-teal-500 border-teal-100",
        };
      default:
        return {
          border: "border-text/5",
          iconBg: "bg-background text-text/40",
          tag: "bg-background text-text/40 border-text/5",
        };
    }
  };

  const colors = getColors(alert.type);
  const Icon = alert.icon;

  return (
    <div
      className={`bg-white rounded-2xl border border-text/5 border-l-4 ${colors.border} shadow-sm p-5 flex items-center justify-between group transition-all hover:shadow-md`}
    >
      <div className="flex items-center gap-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
          <Icon size={22} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-bold text-text text-sm">{alert.title}</h4>
            <span
              className={`text-[8px] font-bold px-2 py-0.5 rounded border tracking-widest uppercase ${colors.tag}`}
            >
              {alert.tag}
            </span>
          </div>
          <p className="text-xs text-text/60 font-medium mb-1">{alert.description}</p>
          <div className="flex items-center gap-1.5 text-[10px] text-text/30 font-bold">
            <Calendar size={12} />
            <span>{alert.time}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {alert.action ? (
          <button
            className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
              alert.type === "critical"
                ? "bg-red-500 text-white border-transparent hover:bg-red-600"
                : "bg-white text-text/60 border-text/10 hover:border-primary hover:text-primary"
            }`}
            type="button"
          >
            {alert.action}
          </button>
        ) : null}
        <button className="p-2 text-text/20 hover:text-text transition-colors" type="button">
          <Eye size={18} />
        </button>
        <button className="p-2 text-text/20 hover:text-red-500 transition-colors" type="button">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const alerts = useMemo(
    () => ({
      Today: [
        {
          id: 1,
          type: "warning",
          icon: ShoppingCart,
          title: "Paracetamol 500mg",
          tag: "LOW STOCK",
          description: "Stock is low. 12 units remaining.",
          time: "2 hours ago",
          action: "Reorder",
        },
        {
          id: 2,
          type: "critical",
          icon: AlertTriangle,
          title: "Maggi Noodles",
          tag: "OUT OF STOCK",
          description: "Item is out of stock.",
          time: "4 hours ago",
          action: "Reorder",
        },
        {
          id: 3,
          type: "critical",
          icon: Calendar,
          title: "Ibuprofen 400mg",
          tag: "RETURN DEADLINE",
          description: "Return window closing in 2 days.",
          time: "5 hours ago",
          action: "Review Order",
        },
      ],
      Yesterday: [
        {
          id: 4,
          type: "info",
          icon: DollarSign,
          title: "Vitamin C Drops",
          tag: "PRICE CHANGE",
          description: "Price dropped by ₹2.",
          time: "1 day ago",
        },
        {
          id: 5,
          type: "warning",
          icon: Truck,
          title: "Amoxicillin",
          tag: "SUPPLIER DELAY",
          description: "Supplier delayed delivery by 2 days.",
          time: "1 day ago",
        },
      ],
    }),
    [],
  );

  return (
    <div className="max-w-[1600px] mx-auto px-10 py-10">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Alerts</h1>
          <p className="text-text/60 font-medium">Stay updated on stock, orders, and risks</p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-5 py-2.5 rounded-lg border border-text/5 bg-white text-text/60 font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-background transition-all"
            type="button"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
          <button
            className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-md shadow-primary/20"
            type="button"
          >
            <ShoppingCart size={16} />
            Reorder critical items
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center p-1 bg-white/50 border border-text/5 rounded-xl">
          {[
            { label: "All", count: null },
            { label: "Critical", count: 2 },
            { label: "Warnings", count: 2 },
            { label: "Info", count: null },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.label ? "bg-white text-text shadow-sm" : "text-text/30 hover:text-text"
              }`}
              type="button"
            >
              {tab.label}
              {tab.count ? (
                <span
                  className={`px-1.5 py-0.5 rounded text-[8px] ${
                    tab.label === "Critical" ? "bg-red-50 text-red-500" : "bg-orange-50 text-orange-500"
                  }`}
                >
                  {tab.count}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-between px-4 py-2.5 bg-white border border-text/5 rounded-xl text-[10px] font-bold text-text/40 hover:border-primary/20 transition-all w-48"
            type="button"
          >
            All Types
            <ChevronDown size={14} className="text-text/30" />
          </button>
          <button
            className="flex items-center justify-between px-4 py-2.5 bg-white border border-text/5 rounded-xl text-[10px] font-bold text-text/40 hover:border-primary/20 transition-all w-48"
            type="button"
          >
            Status: Unread
            <ChevronDown size={14} className="text-text/30" />
          </button>
        </div>
      </div>

      <div className="space-y-10">
        {Object.entries(alerts).map(([date, items]) => (
          <section key={date}>
            <h3 className="text-sm font-bold text-text mb-5 px-1">{date}</h3>
            <div className="space-y-3">
              {items.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

