import React from 'react';
import { Bell, Search, HelpCircle, ChevronDown } from 'lucide-react';

const Topbar = ({ role }) => {
  return (
    <header className="sticky top-0 z-10 flex h-28 items-center justify-between border-b border-text/5 bg-transparent px-12 backdrop-blur-md">
      <div className="flex-1 max-w-2xl">
        <div className="group relative">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-text-light transition-colors group-focus-within:text-primary"
            size={20}
          />
          <input
            type="text"
            placeholder="Search SKU, Product name or shop..."
            className="w-full rounded-3xl border border-transparent bg-white/50 py-4.5 pl-16 pr-8 text-sm font-bold placeholder:text-text-light shadow-inner-soft transition-all focus:border-primary/20 focus:bg-white focus:outline-none focus:ring-8 focus:ring-primary/5"
          />
          <div className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-lg border border-text/5 bg-background px-2 py-1">
            <span className="text-[10px] font-black tracking-tighter text-text-light">⌘</span>
            <span className="text-[10px] font-black tracking-tighter text-text-light">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-8 border-r border-text/10 pr-10">
          <button className="text-text-light transition-all hover:scale-110 hover:text-primary">
            <HelpCircle size={22} />
          </button>
          <button className="relative text-text-light transition-all hover:scale-110 hover:text-primary">
            <Bell size={22} />
            <span className="absolute -right-1 -top-1 h-3.5 w-3.5 animate-bounce rounded-full border-2 border-white bg-accent-rose" />
          </button>
        </div>

        <div className="group flex cursor-pointer items-center gap-4">
          <div className="mr-1 flex flex-col items-end">
            <span className="text-sm font-black leading-tight tracking-tight text-text">Master Artisan</span>
            <span className="mt-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
              {role === 'supplier' ? 'Premium Supplier' : 'Store Manager'}
            </span>
          </div>
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-text/5 bg-white p-0.5 text-text/60 shadow-premium transition-all group-hover:border-primary/30">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=100&auto=format&fit=crop"
              alt="Profile"
              className="h-full w-full rounded-xl object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-accent-emerald" />
          </div>
          <ChevronDown size={16} className="text-text-light transition-colors group-hover:text-text" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
