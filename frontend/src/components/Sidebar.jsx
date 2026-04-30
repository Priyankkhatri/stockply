import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Truck,
  Settings,
  Plus,
  HelpCircle,
  LogOut,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const Sidebar = ({ role, isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('authToken');
      navigate('/login');
    };

    const links = role === 'supplier' 
      ? [
          { name: 'Dashboard', icon: LayoutDashboard, path: '/supplier/dashboard', detail: 'Overview' },
          { name: 'Shops', icon: Users, path: '/supplier/shops', detail: 'Retail Partners' },
          { name: 'Orders', icon: ShoppingCart, path: '/supplier/orders', detail: 'Fulfillment' },
          { name: 'Fulfillment', icon: Truck, path: '/supplier/fulfillment', detail: 'Logistics' },
          { name: 'Inventory', icon: Package, path: '/supplier/inventory', detail: 'Stock Control' },
          { name: 'Analytics', icon: BarChart3, path: '/supplier/analytics', detail: 'Performance' },
          { name: 'Settings', icon: Settings, path: '/supplier/settings', detail: 'System' },
        ]
      : [
          { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', detail: 'Command Center' },
          { name: 'Inventory', icon: Package, path: '/dashboard/inventory', detail: 'Stock Ledger' },
          { name: 'Orders', icon: ShoppingCart, path: '/dashboard/orders', detail: 'Procurement' },
          { name: 'Alerts', icon: Users, path: '/dashboard/alerts', detail: 'Risk Monitor' },
          { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics', detail: 'Market Insights' },
          { name: 'Settings', icon: Settings, path: '/dashboard/settings', detail: 'Preferences' },
        ];
  
    return (
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 bg-[#FDFCFB]/80 backdrop-blur-3xl border-r border-text/5 flex flex-col transition-all duration-700 ease-[0.22,1,0.36,1]
        lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full shadow-none'}
        ${isOpen ? 'shadow-[40px_0_80px_-20px_rgba(0,0,0,0.1)]' : ''}
      `}>
        {/* ─── Header: Brand Identity ─── */}
        <div className="p-8 pt-10 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3.5 group cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-12 h-12 bg-text rounded-[18px] flex items-center justify-center text-white shadow-2xl shadow-text/20 group-hover:bg-primary transition-all duration-500 transform group-hover:rotate-6">
              <Logo size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-text font-bold text-lg tracking-tighter uppercase leading-none">Stockply</span>
              <span className="text-[7px] font-black text-text/50 tracking-[0.4em] uppercase mt-1.5 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                Atelier v2
              </span>
            </div>
          </motion.div>
          
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-text/40 hover:text-text transition-colors bg-text/5 rounded-xl"
          >
            <X size={20} />
          </button>
        </div>

        {/* ─── Navigation: Core Links ─── */}
        <nav className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {links.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`group relative flex items-center justify-between px-5 py-3.5 rounded-[20px] transition-all duration-500 ${
                    isActive
                       ? 'text-text'
                      : 'text-text/50 hover:text-text/80 hover:bg-text/[0.02]'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-text/5 rounded-[20px] z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`p-2.5 rounded-14 transition-all duration-500 ${isActive ? 'bg-primary/10 text-primary' : 'text-text/40 group-hover:text-text/60'}`}>
                      <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest">{link.name}</span>
                      <span className={`text-[8px] font-bold italic transition-all duration-500 ${isActive ? 'text-text/60 opacity-100' : 'opacity-0 -translate-y-1 group-hover:opacity-60 group-hover:translate-y-0'}`}>
                        {link.detail}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative z-10 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                    />
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ─── Footer: Actions & System ─── */}
        <div className="p-6 space-y-4">
          <div className="p-5 bg-text rounded-[28px] relative overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-text/20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Plus size={16} />
                </div>
                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">New Action</span>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1" />
            </div>
          </div>

          <div className="pt-4 border-t border-text/5 space-y-1">
            <NavLink
              to="/support"
              className="flex items-center gap-4 px-5 py-3.5 rounded-[18px] text-[10px] font-black uppercase tracking-widest text-text/50 hover:text-text hover:bg-text/[0.02] transition-all"
            >
              <div className="p-2 bg-background rounded-xl">
                <HelpCircle size={16} />
              </div>
              Support Hub
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-3.5 rounded-[18px] text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all text-left"
            >
              <div className="p-2 bg-red-50/50 rounded-xl text-red-400">
                <LogOut size={16} />
              </div>
              Terminate Session
            </button>
          </div>

          {/* System Badge */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <ShieldCheck size={12} className="text-teal-500/40" />
            <span className="text-[8px] font-bold text-text/30 uppercase tracking-[0.3em]">Secure Atelier System</span>
          </div>
        </div>
      </aside>
    );
};

export default Sidebar;
