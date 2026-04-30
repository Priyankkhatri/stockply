import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <header className="sticky top-0 z-40 flex h-20 lg:h-28 items-center justify-between border-b border-text/5 bg-white/50 px-6 lg:px-12 backdrop-blur-md">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-text/60 hover:text-text transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="group relative flex-1">
          <Search
            className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 text-text-light transition-colors group-focus-within:text-primary"
            size={18}
          />
          <input
            type="text"
            placeholder="Search SKU, Product..."
            className="w-full rounded-2xl lg:rounded-3xl border border-transparent bg-background/50 py-3 lg:py-4.5 pl-12 lg:pl-16 pr-4 lg:pr-8 text-xs lg:text-sm font-bold placeholder:text-text-light transition-all focus:border-primary/20 focus:bg-white focus:outline-none"
          />
        <div className="absolute right-6 top-1/2 hidden lg:flex -translate-y-1/2 items-center gap-1.5 rounded-lg border border-text/5 bg-background px-2 py-1">
          <span className="text-[10px] font-black tracking-tighter text-text-light">Ctrl</span>
          <span className="text-[10px] font-black tracking-tighter text-text-light">K</span>
        </div>
      </div>
    </div>

      <div className="flex items-center gap-4 lg:gap-10">
        <div className="flex items-center gap-4 lg:gap-8 border-r border-text/10 pr-4 lg:pr-10">
          <button
            className="hidden md:block text-text-light transition-all hover:scale-110 hover:text-primary"
            onClick={() => navigate('/support')}
            type="button"
          >
            <HelpCircle size={22} />
          </button>
          
          <div className="relative">
            <button 
              className="relative text-text-light transition-all hover:scale-110 hover:text-primary" 
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications && unreadCount > 0) handleMarkAsRead();
              }}
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 h-3.5 w-3.5 animate-bounce rounded-full border-2 border-white bg-accent-rose flex items-center justify-center text-[8px] text-white font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-6 w-96 rounded-[32px] border border-text/5 bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="p-6 border-b border-text/5 bg-background/50 flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase tracking-widest text-text">Live Alerts</h4>
                  <span className="text-[10px] font-bold text-text/40">{unreadCount} New</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                  {notifications.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell size={20} className="text-text/10" />
                      </div>
                      <p className="text-xs font-bold text-text/30">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n._id} className="p-5 border-b border-text/5 hover:bg-background/30 transition-colors flex gap-4 items-start group">
                        <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${n.isRead ? 'bg-text/5' : 'bg-primary shadow-[0_0_8px_rgba(192,133,82,0.4)]'}`} />
                        <div className="flex-1">
                          <p className={`text-[11px] font-bold leading-relaxed ${n.isRead ? 'text-text/40' : 'text-text'}`}>
                            {n.message}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <span className="text-[9px] font-black text-text/20 uppercase tracking-widest flex items-center gap-1.5">
                              <Clock size={10} /> {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest flex items-center gap-1.5">
                              <Package size={10} /> Order Alert
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 bg-background/50 text-center border-t border-text/5">
                  <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="group flex cursor-pointer items-center gap-3 lg:gap-4">
          <div className="mr-1 hidden sm:flex flex-col items-end">
            <span className="text-sm font-black leading-tight tracking-tight text-text">Master Artisan</span>
            <span className="mt-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
              {role === 'supplier' ? 'Premium Supplier' : 'Store Manager'}
            </span>
          </div>
          <div className="relative flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center overflow-hidden rounded-xl lg:rounded-2xl border border-text/5 bg-white p-0.5 text-text/60 shadow-premium transition-all">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=100&auto=format&fit=crop"
              alt="Profile"
              className="h-full w-full rounded-lg lg:rounded-xl object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 lg:h-4 lg:w-4 rounded-full border-2 border-white bg-accent-emerald" />
          </div>
          <ChevronDown size={14} className="hidden lg:block text-text-light transition-colors group-hover:text-text" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
