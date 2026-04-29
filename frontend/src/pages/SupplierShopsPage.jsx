import React, { useMemo, useState } from 'react';
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
import PageHeader from '../components/PageHeader';
import PremiumButton from '../components/PremiumButton';

const shops = [
  {
    name: 'Tech Emporium',
    initials: 'TE',
    initialsBg: 'bg-teal-50 text-teal-600',
    category: 'Electronics',
    location: 'Mumbai, IND',
    totalOrders: '1,245',
    revenue: '$450,000',
    behavior: 'On-time',
    status: 'Active',
  },
  {
    name: 'Style Factory',
    initials: 'SF',
    initialsBg: 'bg-red-50 text-red-600',
    category: 'Clothing',
    location: 'Delhi, IND',
    totalOrders: '890',
    revenue: '$215,500',
    behavior: 'Delayed',
    status: 'Active',
  },
  {
    name: 'Fresh Mart',
    initials: 'FM',
    initialsBg: 'bg-teal-50 text-teal-600',
    category: 'Food & Beverage',
    location: 'Bengaluru, IND',
    totalOrders: '3,450',
    revenue: '$890,000',
    behavior: 'On-time',
    status: 'Active',
  },
  {
    name: 'City Grocers',
    initials: 'CG',
    initialsBg: 'bg-gray-100 text-gray-400',
    category: 'Food & Beverage',
    location: 'Pune, IND',
    totalOrders: '120',
    revenue: '$45,000',
    behavior: 'N/A',
    status: 'Inactive',
  },
];

const filters = ['All Partners', 'High Volume', 'Frequent', 'New'];

const behaviorStyles = {
  'On-time': 'bg-teal-50 text-teal-600 border-teal-100',
  Delayed: 'bg-orange-50 text-orange-600 border-orange-100',
  'N/A': 'bg-gray-50 text-gray-400 border-gray-100',
};

const SupplierShopsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Partners');
  const [searchTerm, setSearchTerm] = useState('');

  const visibleShops = useMemo(() => {
    return shops.filter((shop) => {
      const matchesSearch =
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.location.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeFilter === 'High Volume') {
        return matchesSearch && Number(shop.totalOrders.replace(',', '')) > 1000;
      }

      if (activeFilter === 'Frequent') {
        return matchesSearch && shop.behavior === 'On-time';
      }

      if (activeFilter === 'New') {
        return matchesSearch && shop.totalOrders === '120';
      }

      return matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8 pb-12">
      <PageHeader
        title="Retail Partners"
        subtitle="Manage your connected shop network, order volume, geography, and trust signals."
        breadcrumbs={['Supplier', 'Shops']}
        actions={
          <PremiumButton icon={Plus}>
            Add partner
          </PremiumButton>
        }
      />

      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-light" size={18} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            type="text"
            placeholder="Find a partner by name, category, or city..."
            className="w-full rounded-2xl border border-text/5 bg-white py-4 pl-12 pr-6 text-sm font-medium text-text shadow-sm transition-all placeholder:text-text-light focus:border-primary/20 focus:outline-none focus:ring-4 focus:ring-primary/5"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-3 rounded-2xl border border-text/5 bg-white px-5 py-4 text-[10px] font-black uppercase tracking-widest text-text/50 transition-all hover:border-primary/20 hover:text-text">
            <Tag size={14} className="text-primary" />
            Categories
            <ChevronDown size={14} />
          </button>
          <button className="rounded-2xl border border-text/5 bg-white p-4 text-text/30 transition-all hover:bg-primary/5 hover:text-primary">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.2em] transition-all ${
              activeFilter === filter
                ? 'border-primary/20 bg-primary/10 text-primary'
                : 'border-text/5 bg-white text-text-muted hover:border-primary/20 hover:text-primary'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[36px] border border-text/5 bg-white shadow-xl shadow-text/5">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#F0E5D8] bg-[#FAF5F0]">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Partner Identity</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Industry</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Geography</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Financials</th>
                <th className="px-10 py-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Trust Metric</th>
                <th className="px-10 py-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Status</th>
                <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-text/30" />
              </tr>
            </thead>
            <tbody className="divide-y divide-text/5">
              {visibleShops.map((shop) => (
                <tr key={shop.name} className="group cursor-pointer transition-all hover:bg-background/20">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-black/5 text-sm font-black shadow-sm ${shop.initialsBg}`}>
                        {shop.initials}
                      </div>
                      <div>
                        <span className="block text-base font-bold text-text transition-colors group-hover:text-primary">{shop.name}</span>
                        <span className="mt-1 block text-[10px] font-black uppercase tracking-widest text-text/30">Partner since 2022</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="rounded-lg border border-text/5 bg-white px-3 py-1 text-[9px] font-black uppercase tracking-widest text-text/60 shadow-sm">
                      {shop.category}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2 text-sm font-medium text-text/60">
                      <MapPin size={14} className="text-primary" />
                      {shop.location}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-black tracking-tight text-text">{shop.revenue}</p>
                    <p className="text-[10px] font-bold tracking-widest text-text/30">{shop.totalOrders} Orders</p>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className={`rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-widest ${behaviorStyles[shop.behavior]}`}>
                      {shop.behavior}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`h-2 w-2 rounded-full ${shop.status === 'Active' ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]'}`} />
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${shop.status === 'Active' ? 'text-teal-600' : 'text-orange-400'}`}>
                        {shop.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="text-text/10 transition-all group-hover:text-text">
                      <MoreHorizontal size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-text/5 bg-[#FAF5F0]/30 px-10 py-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/20">
            Showing <span className="font-black text-text">{visibleShops.length}</span> of <span className="font-black text-text">45</span> partners
          </p>
          <div className="flex items-center gap-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-text/5 bg-background/30 text-text/20 transition-all hover:bg-white hover:text-primary hover:shadow-md">
              <ChevronLeft size={20} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-text/5 bg-white text-text/20 shadow-sm transition-all hover:bg-white hover:text-primary hover:shadow-md">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-[36px] bg-text p-10 text-white">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="mb-2 text-2xl font-bold tracking-tight">Partner Network Growth</h3>
            <p className="text-sm text-white/50">You expanded supplier reach to 2 new cities this quarter.</p>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Network Reach</p>
              <p className="flex items-center gap-3 text-4xl font-black text-white">
                12 Cities <ArrowUpRight className="text-primary" size={24} />
              </p>
            </div>
            <button className="rounded-2xl bg-white px-8 py-4 text-[10px] font-black uppercase tracking-widest text-text shadow-xl shadow-black/10 transition-all hover:bg-primary hover:text-white">
              Expand Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierShopsPage;
