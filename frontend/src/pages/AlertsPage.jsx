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
  Bell
} from "lucide-react";
import { motion } from 'framer-motion';
import PremiumButton from '../components/PremiumButton';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const AlertItem = ({ alert, onRemove }) => {
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
    <motion.div
      variants={rowAnim}
      className={`bg-white rounded-[24px] border border-text/5 border-l-4 ${colors.border} shadow-sm p-6 flex items-center justify-between group transition-all hover:shadow-premium`}
    >
      <div className="flex items-center gap-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors.iconBg}`}>
          <Icon size={24} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h4 className="font-bold text-text text-lg tracking-tight">{alert.title}</h4>
            <span
              className={`text-[9px] font-black px-2.5 py-1 rounded-full border tracking-widest uppercase ${colors.tag}`}
            >
              {alert.tag}
            </span>
          </div>
          <p className="text-sm text-text/60 font-medium mb-2">{alert.description}</p>
          <div className="flex items-center gap-2 text-[10px] text-text/30 font-black uppercase tracking-widest">
            <Calendar size={12} />
            <span>{alert.time}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {alert.action ? (
          <button
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
              alert.type === "critical"
                ? "bg-red-500 text-white border-transparent hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20"
                : "bg-white text-text/60 border-text/10 hover:border-primary hover:text-primary"
            }`}
            type="button"
          >
            {alert.action}
          </button>
        ) : null}
        <button className="p-3 bg-background rounded-full text-text/20 hover:text-text hover:bg-white border border-transparent hover:border-text/5 hover:shadow-sm transition-all" type="button">
          <Eye size={18} />
        </button>
        <button 
          onClick={onRemove}
          className="p-3 bg-background rounded-full text-text/20 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all" 
          type="button"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const initialAlerts = [
    {
      id: 1,
      type: "warning",
      icon: ShoppingCart,
      title: "Paracetamol 500mg",
      tag: "LOW STOCK",
      description: "Stock is low. 12 units remaining.",
      time: "2 hours ago",
      action: "Reorder",
      date: "Today",
      read: false,
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
      date: "Today",
      read: false,
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
      date: "Today",
      read: false,
    },
    {
      id: 4,
      type: "info",
      icon: DollarSign,
      title: "Vitamin C Drops",
      tag: "PRICE CHANGE",
      description: "Price dropped by ₹2.",
      time: "1 day ago",
      date: "Yesterday",
      read: true,
    },
    {
      id: 5,
      type: "warning",
      icon: Truck,
      title: "Amoxicillin",
      tag: "SUPPLIER DELAY",
      description: "Supplier delayed delivery by 2 days.",
      time: "1 day ago",
      date: "Yesterday",
      read: true,
    },
  ];

  const [alertList, setAlertList] = useState(initialAlerts);

  const filteredAlerts = useMemo(() => {
    return alertList.filter((alert) => {
      if (activeTab === "All") return true;
      if (activeTab === "Critical") return alert.type === "critical";
      if (activeTab === "Warnings") return alert.type === "warning";
      if (activeTab === "Info") return alert.type === "info";
      return true;
    });
  }, [activeTab, alertList]);

  const groupedAlerts = useMemo(() => {
    return filteredAlerts.reduce((acc, alert) => {
      if (!acc[alert.date]) acc[alert.date] = [];
      acc[alert.date].push(alert);
      return acc;
    }, {});
  }, [filteredAlerts]);

  const handleMarkAllRead = () => {
    setAlertList(alertList.map(a => ({ ...a, read: true })));
  };

  const handleRemoveAlert = (id) => {
    setAlertList(alertList.filter(a => a.id !== id));
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-[1600px] mx-auto px-10 pb-12 pt-10"
    >
      <motion.div variants={rowAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/30 uppercase tracking-[0.3em]">Notifications</span>
          </div>
          <h1 className="text-5xl font-bold text-text tracking-tighter leading-none">System <span className="text-primary italic font-normal serif">Alerts.</span></h1>
          <p className="text-text/40 text-sm font-medium">Stay updated on stock, orders, and operational risks.</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleMarkAllRead}
            className="px-6 py-4 rounded-[20px] border border-text/5 bg-white text-text/60 font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-background hover:text-text transition-all"
            type="button"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-[22px] bg-text hover:bg-primary text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all shadow-2xl shadow-text/10"
            type="button"
          >
            <ShoppingCart size={18} />
            Reorder critical
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={rowAnim} className="bg-white rounded-[32px] border border-text/5 p-8 mb-10 shadow-sm flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
        <div className="flex items-center p-1.5 bg-background border border-text/5 rounded-[20px]">
          {[
            { label: "All", count: null },
            { label: "Critical", count: alertList.filter(a => a.type === 'critical' && !a.read).length },
            { label: "Warnings", count: alertList.filter(a => a.type === 'warning' && !a.read).length },
            { label: "Info", count: alertList.filter(a => a.type === 'info' && !a.read).length },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-6 py-3.5 rounded-[16px] text-[9px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-2 ${
                activeTab === tab.label ? "bg-white text-text shadow-sm border border-text/5" : "text-text/30 hover:text-text/60"
              }`}
              type="button"
            >
              {tab.label}
              {tab.count > 0 ? (
                <span
                  className={`px-2 py-0.5 rounded-full text-[8px] ${
                    tab.label === "Critical" ? "bg-red-50 text-red-500 border border-red-100" : 
                    tab.label === "Warnings" ? "bg-orange-50 text-orange-500 border border-orange-100" :
                    "bg-teal-50 text-teal-500 border border-teal-100"
                  }`}
                >
                  {tab.count}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            className="flex items-center justify-between px-6 py-4 bg-background border border-text/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-text/40 hover:text-text hover:bg-white hover:shadow-sm transition-all w-48"
            type="button"
          >
            All Types
            <ChevronDown size={14} className="text-text/30" />
          </button>
          <button
            className="flex items-center justify-between px-6 py-4 bg-background border border-text/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-text/40 hover:text-text hover:bg-white hover:shadow-sm transition-all w-48"
            type="button"
          >
            Status: Unread
            <ChevronDown size={14} className="text-text/30" />
          </button>
        </div>
      </motion.div>

      <div className="space-y-12">
        {Object.entries(groupedAlerts).map(([date, items]) => (
          <motion.section variants={rowAnim} key={date}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text/40 mb-6 px-2 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              {date}
            </h3>
            <div className="space-y-4">
              {items.map((alert) => (
                <AlertItem key={alert.id} alert={alert} onRemove={() => handleRemoveAlert(alert.id)} />
              ))}
            </div>
          </motion.section>
        ))}
        {Object.keys(groupedAlerts).length === 0 && (
          <motion.div variants={rowAnim} className="py-32 flex flex-col items-center justify-center rounded-[40px] border border-dashed border-text/10 bg-[#FAF5F0]/30">
            <div className="w-20 h-20 rounded-3xl bg-white border border-text/5 shadow-sm flex items-center justify-center mb-6 text-text/20">
              <Bell size={32} />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">No alerts found</h3>
            <p className="text-sm font-medium text-text/40">You're all caught up. No active notifications.</p>
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}

