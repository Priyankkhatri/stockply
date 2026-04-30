import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Tag,
} from 'lucide-react';
import { useSupplier } from '../context/SupplierContext';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../components/PremiumButton';
import GlassCard from '../components/GlassCard';

const behaviorStyles = {
  'On-time': 'bg-teal-50 text-teal-600 border-teal-100',
  Delayed: 'bg-orange-50 text-orange-600 border-orange-100',
  'N/A': 'bg-gray-50 text-gray-400 border-gray-100',
};

const filters = ['All Partners', 'High Volume', 'Frequent', 'New'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const SupplierShopsPage = () => {
  const navigate = useNavigate();
  const { partners, loading, addPartner } = useSupplier();
  const [activeFilter, setActiveFilter] = useState('All Partners');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newPartner, setNewPartner] = useState({
    name: '',
    category: 'Electronics',
    location: '',
    status: 'Active'
  });

  const handleAddPartner = async () => {
    if (!newPartner.name || !newPartner.location) return;
    
    await addPartner({
      ...newPartner,
      revenue: 'Rs. 0',
      totalOrders: '0',
      behavior: 'On-time'
    });

    setIsAddModalOpen(false);
    setNewPartner({
      name: '',
      category: 'Electronics',
      location: '',
      status: 'Active'
    });
  };

  const visibleShops = useMemo(() => {
    return partners.filter((shop) => {
      const matchesSearch =
        shop.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.location?.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeFilter === 'High Volume') {
        return matchesSearch && Number(String(shop.totalOrders || '0').replace(',', '')) > 100;
      }
      if (activeFilter === 'Frequent') {
        return matchesSearch && shop.behavior === 'On-time';
      }
      if (activeFilter === 'New') {
        const createdAt = new Date(shop.createdAt);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return matchesSearch && createdAt > thirtyDaysAgo;
      }
      return matchesSearch;
    });
  }, [activeFilter, searchTerm, partners]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-xs font-black uppercase tracking-widest text-text/60">Syncing Network Directory...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="mx-auto max-w-[1600px] px-4 sm:px-10 py-6 sm:py-10"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .serif { font-family: "Playfair Display", serif; }
        .shadow-premium { box-shadow: 0 20px 80px -20px rgba(0,0,0,0.06); }
      ` }} />

      {/* ─── Header ─── */}
      <motion.div variants={rowAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/50 uppercase tracking-[0.3em]">Supplier / Shops</span>
          </div>
          <h1 className="text-5xl font-bold text-text tracking-tighter leading-none">Retail <span className="text-primary italic font-normal serif">Partners.</span></h1>
          <p className="text-text/60 text-sm font-medium">Manage your connected shop network, order volume, geography, and trust signals.</p>
        </div>
        <PremiumButton onClick={() => setIsAddModalOpen(true)} icon={Plus}>
          Add partner
        </PremiumButton>
      </motion.div>

      {/* ─── Search & Filters ─── */}
      <motion.div variants={rowAnim}>
        <GlassCard className="p-6 mb-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between" hover={false}>
          <div className="relative w-full max-w-2xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text/40 group-focus-within:text-primary transition-colors" size={18} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              type="text"
              placeholder="Find a partner by name, category, or city..."
              className="w-full rounded-2xl border border-transparent bg-background/50 py-4 pl-14 pr-6 text-sm font-bold text-text placeholder:text-text/50 focus:border-primary/20 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="flex items-center gap-3 rounded-2xl border border-text/5 bg-white/80 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-text/60 transition-all hover:border-primary/20 hover:text-text">
              <Tag size={14} className="text-primary" />
              Categories
              <ChevronDown size={14} />
            </button>
            <button className="rounded-2xl border border-text/5 bg-white/80 p-4 text-text/50 transition-all hover:text-primary hover:border-primary/20">
              <Filter size={18} />
            </button>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={rowAnim} className="mb-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] transition-all ${
              activeFilter === filter
                ? 'border-primary/20 bg-primary/10 text-primary shadow-sm'
                : 'border-text/5 bg-white text-text/60 hover:border-primary/20 hover:text-primary'
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* ─── Desktop Table ─── */}
      <motion.div variants={rowAnim}>
        <GlassCard className="hidden lg:block overflow-hidden p-0" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#F0E5D8] bg-[#FAF5F0]/80">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Partner Identity</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Industry</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Geography</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Financials</th>
                  <th className="px-10 py-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Trust Metric</th>
                  <th className="px-10 py-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Status</th>
                  <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-text/30" />
                </tr>
              </thead>
              <tbody className="divide-y divide-text/5">
                {visibleShops.map((shop) => {
                  const initials = shop.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                  return (
                    <tr
                      key={shop._id || shop.name}
                      onClick={() => navigate(`/supplier/shops/${shop.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      className="group cursor-pointer transition-all hover:bg-white/60"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-black/5 text-sm font-black shadow-sm bg-teal-50 text-teal-600`}>
                            {initials}
                          </div>
                          <div>
                            <span className="block text-base font-bold text-text transition-colors group-hover:text-primary">{shop.name}</span>
                            <span className="mt-1 block text-[10px] font-black uppercase tracking-widest text-text/50">Partner since {new Date(shop.createdAt).getFullYear() || 2024}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="rounded-lg border border-text/5 bg-white px-3 py-1 text-[9px] font-black uppercase tracking-widest text-text/60 shadow-sm">
                          {shop.category || 'General'}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2 text-sm font-medium text-text/60">
                          <MapPin size={14} className="text-primary" />
                          {shop.location}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <p className="text-sm font-black tracking-tight text-text">{shop.revenue || 'Rs. 0'}</p>
                        <p className="text-[10px] font-bold tracking-widest text-text/50">{shop.totalOrders || 0} Orders</p>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <span className={`rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-widest ${behaviorStyles[shop.behavior] || behaviorStyles['On-time']}`}>
                          {shop.behavior || 'On-time'}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`h-2 w-2 rounded-full ${shop.status === 'Active' ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)] animate-pulse' : 'bg-orange-400'}`} />
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${shop.status === 'Active' ? 'text-teal-600' : 'text-orange-400'}`}>
                            {shop.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="text-text/10 transition-all group-hover:text-primary">
                          <MoreHorizontal size={24} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-text/5 bg-[#FAF5F0]/40 px-10 py-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/40">
              Showing <span className="font-black text-text">{visibleShops.length}</span> of <span className="font-black text-text">{partners.length}</span> partners
            </p>
            <div className="flex items-center gap-4">
              <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-text/5 bg-white/50 text-text/40 transition-all hover:bg-white hover:text-primary hover:shadow-md">
                <ChevronLeft size={20} />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-text/5 bg-white text-text/40 shadow-sm transition-all hover:text-primary hover:shadow-md">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ─── Mobile Card List ─── */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {visibleShops.map((shop) => {
          const initials = shop.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
          return (
            <motion.div
              key={shop._id || shop.name}
              variants={rowAnim}
              onClick={() => navigate(`/supplier/shops/${shop.name.toLowerCase().replace(/\s+/g, '-')}`)}
              className="group overflow-hidden rounded-3xl border border-text/5 bg-white/70 backdrop-blur-sm p-6 shadow-sm active:scale-[0.98] transition-all hover:shadow-premium"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-black/5 text-xs font-black bg-teal-50 text-teal-600`}>
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text group-hover:text-primary transition-colors">{shop.name}</h3>
                    <p className="text-[9px] font-black uppercase tracking-widest text-text/50">Partner since {new Date(shop.createdAt).getFullYear() || 2024}</p>
                  </div>
                </div>
                <div className={`flex flex-col items-end gap-1`}>
                  <div className={`h-1.5 w-1.5 rounded-full ${shop.status === 'Active' ? 'bg-teal-500 animate-pulse' : 'bg-orange-400'}`} />
                  <span className={`text-[8px] font-black uppercase tracking-widest ${shop.status === 'Active' ? 'text-teal-600' : 'text-orange-400'}`}>
                    {shop.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-text/50">Industry</p>
                  <p className="text-xs font-bold text-text">{shop.category || 'General'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-text/50">Financials</p>
                  <p className="text-xs font-black text-text">{shop.revenue || 'Rs. 0'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-text/50">Location</p>
                  <p className="flex items-center gap-1 text-xs font-bold text-text">
                    <MapPin size={10} className="text-primary" />
                    {shop.location}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-text/50">Total Orders</p>
                  <p className="text-xs font-bold text-text">{shop.totalOrders || 0} Units</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-text/5 pt-4">
                <span className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-widest ${behaviorStyles[shop.behavior] || behaviorStyles['On-time']}`}>
                  {shop.behavior || 'On-time'}
                </span>
                <ChevronRight size={16} className="text-text/20 group-hover:text-primary transition-all" />
              </div>
            </motion.div>
          );
        })}
        {visibleShops.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-text/20 mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-base font-bold text-text">No partners found</h3>
            <p className="text-xs text-text/60 mt-2">Try refining your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* ─── Growth Banner ─── */}
      <motion.div variants={rowAnim} className="relative mt-10 overflow-hidden rounded-[36px] bg-text p-10 text-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary" />
        </div>
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="mb-2 text-2xl font-display font-bold tracking-tight">Partner Network Growth</h3>
            <p className="text-sm text-white/50">You expanded supplier reach to 2 new cities this quarter.</p>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Network Reach</p>
              <p className="flex items-center gap-3 text-4xl font-black text-white">
                12 Cities <ArrowUpRight className="text-primary" size={24} />
              </p>
            </div>
            <button className="rounded-2xl bg-white px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text shadow-xl shadow-black/10 transition-all hover:bg-primary hover:text-white">
              Expand Network
            </button>
          </div>
        </div>
      </motion.div>

      {/* ─── Add Partner Modal ─── */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-10 border-b border-text/5 flex justify-between items-center bg-background/50">
                <div>
                  <h2 className="text-2xl font-display font-bold text-text">New Partner Entry</h2>
                  <p className="text-[10px] font-black text-text/50 uppercase tracking-[0.2em] mt-1">Establishing shop connection</p>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text/40 hover:text-text transition-colors shadow-sm"
                >
                  <Plus className="rotate-45" size={20} />
                </button>
              </div>

              <div className="p-10 grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-widest ml-1">Shop Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Urban Boutique" 
                    value={newPartner.name}
                    onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-widest ml-1">Geography (City)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mumbai, IND" 
                    value={newPartner.location}
                    onChange={(e) => setNewPartner({...newPartner, location: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-widest ml-1">Industry Category</label>
                  <select 
                    value={newPartner.category}
                    onChange={(e) => setNewPartner({...newPartner, category: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all appearance-none"
                  >
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Food &amp; Beverage</option>
                    <option>Home Decor</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-widest ml-1">Initial Status</label>
                  <select 
                    value={newPartner.status}
                    onChange={(e) => setNewPartner({...newPartner, status: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all appearance-none"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="px-10 py-8 bg-background/50 border-t border-text/5 flex items-center justify-end gap-4">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-8 py-4 text-xs font-black uppercase tracking-widest text-text/60 hover:text-text transition-colors"
                >
                  Discard
                </button>
                <PremiumButton onClick={handleAddPartner} className="px-10">
                  Connect Partner
                </PremiumButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SupplierShopsPage;
