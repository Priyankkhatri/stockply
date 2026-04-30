import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, HelpCircle, ChevronDown, Clock, Package, Menu } from 'lucide-react';
import { notificationAPI } from '../services/api';

const Topbar = ({ role, onMenuClick }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notificationAPI.getAll();
        setNotifications(res.data?.data?.notifications || []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Poll every minute
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = async () => {
    try {
      await notificationAPI.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error('Error marking read:', err);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 lg:h-28 items-center justify-between border-b border-text/5 bg-white/70 px-6 lg:px-12 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-text/60 hover:text-primary transition-colors"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

        <div className="group relative flex-1">
          <Search
            className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 text-text/30 transition-colors group-focus-within:text-primary"
            size={18}
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Search SKU, Product..."
            className="w-full rounded-2xl lg:rounded-[32px] border border-text/5 bg-white/40 py-3 lg:py-4 pl-12 lg:pl-16 pr-4 lg:pr-8 text-xs lg:text-sm font-bold text-text placeholder:text-text/30 transition-all focus:border-primary/20 focus:bg-white focus:shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none"
          />
          <div className="absolute right-4 top-1/2 hidden lg:flex -translate-y-1/2 items-center gap-1.5 rounded-lg border border-text/5 bg-background/50 px-2 py-1">
            <span className="text-[10px] font-black tracking-widest uppercase text-text/30">Ctrl</span>
            <span className="text-[10px] font-black tracking-widest uppercase text-text/30">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-10">
        <div className="flex items-center gap-4 lg:gap-8 border-r border-text/5 pr-4 lg:pr-10">
          <button
            className="hidden md:block text-text/40 transition-all hover:scale-110 hover:text-primary"
            onClick={() => navigate('/support')}
            type="button"
          >
            <HelpCircle size={22} strokeWidth={1.5} />
          </button>
          
          <div className="relative">
            <button 
              className="relative text-text/40 transition-all hover:scale-110 hover:text-primary" 
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications && unreadCount > 0) handleMarkAsRead();
              }}
            >
              <Bell size={22} strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-rose-500 text-[8px] font-black text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute right-0 mt-6 w-96 rounded-[32px] border border-text/5 bg-white/90 backdrop-blur-2xl shadow-2xl overflow-hidden origin-top-right"
                >
                  <div className="p-6 border-b border-text/5 flex items-center justify-between">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-text">Live Alerts</h4>
                    <span className="text-[10px] font-black tracking-widest text-primary/60 bg-primary/10 px-2 py-0.5 rounded-full">{unreadCount} New</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                    {notifications.length === 0 ? (
                      <div className="p-12 text-center">
                        <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4 border border-text/5">
                          <Bell size={20} className="text-text/20" strokeWidth={1.5} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-text/30">No Intelligence Yet</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div key={n._id} className="p-5 border-b border-text/5 hover:bg-background/50 transition-colors flex gap-4 items-start group cursor-pointer">
                          <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 transition-all ${n.isRead ? 'bg-text/10' : 'bg-primary shadow-[0_0_10px_rgba(192,133,82,0.4)]'}`} />
                          <div className="flex-1">
                            <p className={`text-xs font-bold leading-relaxed ${n.isRead ? 'text-text/50' : 'text-text group-hover:text-primary transition-colors'}`}>
                              {n.message}
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                              <span className="text-[9px] font-black text-text/30 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                <Clock size={10} strokeWidth={2} /> {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span className="text-[9px] font-black text-primary/60 uppercase tracking-[0.2em] flex items-center gap-1.5 bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10">
                                <Package size={10} strokeWidth={2} /> Order Alert
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-4 bg-background/30 text-center border-t border-text/5 hover:bg-background/50 transition-colors cursor-pointer">
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-text/40 hover:text-primary transition-colors">
                      Open Command Center
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="group flex cursor-pointer items-center gap-3 lg:gap-5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[13px] font-black leading-tight tracking-tight text-text group-hover:text-primary transition-colors">Master Artisan</span>
            <span className="mt-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-text/40">
              {role === 'supplier' ? 'Premium Supplier' : 'Store Manager'}
            </span>
          </div>
          <div className="relative flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center overflow-hidden rounded-[14px] lg:rounded-2xl border border-text/5 bg-white p-0.5 shadow-sm transition-all group-hover:shadow-md group-hover:scale-105">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=100&auto=format&fit=crop"
              alt="Profile"
              className="h-full w-full rounded-[10px] lg:rounded-xl object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-teal-500 shadow-sm" />
          </div>
          <ChevronDown size={14} strokeWidth={3} className="hidden lg:block text-text/20 transition-all group-hover:text-primary group-hover:translate-y-0.5" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;

