import React from 'react';
import { Bell, Search, User, HelpCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Topbar = ({ role }) => {
  return (
    <header className="h-28 bg-transparent flex items-center justify-between px-12 sticky top-0 z-10 backdrop-blur-md border-b border-text/5">
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-light group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search SKU, Product name or shop..." 
            className="w-full pl-16 pr-8 py-4.5 bg-white/50 border border-transparent rounded-3xl text-sm font-bold focus:outline-none focus:ring-8 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all placeholder:text-text-light shadow-inner-soft"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-background rounded-lg border border-text/5">
            <span className="text-[10px] font-black text-text-light tracking-tighter">⌘</span>
            <span className="text-[10px] font-black text-text-light tracking-tighter">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-8 pr-10 border-r border-text/10">
          <button className="text-text-light hover:text-primary transition-all hover:scale-110">
            <HelpCircle size={22} />
          </button>
          <button className="relative text-text-light hover:text-primary transition-all hover:scale-110">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent-rose rounded-full border-2 border-white animate-bounce"></span>
          </button>
        </div>
        
        <motion.div 
          whileHover={{ x: -5 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="flex flex-col items-end mr-1">
            <span className="text-sm font-black text-text leading-tight tracking-tight">Master Artisan</span>
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-0.5">
              {role === 'supplier' ? 'Premium Supplier' : 'Store Manager'}
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white border border-text/5 flex items-center justify-center text-text/60 group-hover:border-primary/30 transition-all shadow-premium overflow-hidden p-0.5 relative">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=100&auto=format&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" 
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-emerald border-2 border-white rounded-full"></div>
          </div>
          <ChevronDown size={16} className="text-text-light group-hover:text-text transition-colors" />
        </motion.div>
      </div>
    </header>
  );
};

export default Topbar;
