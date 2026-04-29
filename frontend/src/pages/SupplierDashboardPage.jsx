import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  Package,
  ShoppingCart,
  Sparkles,
  Store,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useSupplier } from '../context/SupplierContext';
import PageHeader from '../components/PageHeader';

import PremiumButton from '../components/PremiumButton';

const trendHeights = [30, 45, 60, 40, 70, 55, 90];
const trendDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];


const SupplierDashboardPage = () => {
  const navigate = useNavigate();
  const { partners, orders, products } = useSupplier();

  const activePartnersCount = partners.filter(p => p.status === 'Active').length;
  const ordersTodayCount = orders.length; // Simplified for mock
  
  const revenueToday = orders.reduce((sum, o) => {
    const val = parseInt(o.amount.replace(/[^0-9]/g, '')) || 0;
    return sum + val;
  }, 0);

  const stockAlertsCount = products.filter(p => p.status === 'Low Stock').length;

  const stats = [
    { label: 'CONNECTED SHOPS', value: activePartnersCount.toString(), trend: '+1 new', icon: Store, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'ORDERS TODAY', value: ordersTodayCount.toString(), trend: '+12%', icon: ShoppingCart, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'REVENUE TODAY', value: `Rs. ${(revenueToday / 1000).toFixed(1)}k`, trend: '+5.4%', icon: Wallet, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'STOCK ALERTS', value: stockAlertsCount.toString(), trend: 'Critical', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  const incomingOrders = orders.slice(0, 3).map(o => ({
    id: o.id,
    shop: o.shop,
    items: `${o.itemsCount} items`,
    value: o.amount,
    status: o.status
  }));

  const stockOverview = products.slice(0, 4).map(p => ({
    name: p.name,
    detail: p.unit,
    stock: `${p.stock} units`,
    status: p.status
  }));

  const connectedShops = partners.filter(p => p.status === 'Active').slice(0, 2).map(p => ({
    name: p.name,
    status: p.status,
    tag: p.behavior === 'On-time' ? 'Frequent buyer' : 'High demand',
    lastOrder: 'Today, 10:30 AM',
    monthlyRev: p.revenue,
    avatar: `https://ui-avatars.com/api/?name=${p.name}&background=random&color=fff`,
  }));


  return (
    <div className="mx-auto max-w-[1600px] px-10 py-10 pb-12">
      <PageHeader
        title="Supplier Dashboard"
        subtitle="Welcome back, Master Artisan. Monitor shop demand, active orders, and warehouse pressure."
        breadcrumbs={['Supplier', 'Dashboard']}
        actions={
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white rounded-xl border border-text/5 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-text/40 uppercase tracking-widest">System Live</span>
            </div>
            <PremiumButton icon={Package} onClick={() => navigate('/supplier/inventory')}>
              Prep inventory
            </PremiumButton>
          </div>
        }
      />

      <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex h-[220px] flex-col justify-between rounded-[32px] border border-text/5 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary/20 group">
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-teal-600">
                <ArrowUpRight size={14} />
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-text/30">{stat.label}</p>
              <p className="text-4xl font-bold text-text tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10 grid grid-cols-1 gap-10 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text">Connected Shops</h2>
            <button className="flex items-center gap-2 text-xs font-bold text-primary group" onClick={() => navigate('/supplier/shops')} type="button">
              View shop directory <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {connectedShops.map((shop) => (
              <div key={shop.name} className="rounded-[32px] border border-text/5 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-b-primary border-b-transparent border-b-4">
                <div className="mb-6 flex items-center gap-5">
                  <div className="relative">
                    <img src={shop.avatar} alt={shop.name} className="h-16 w-16 rounded-2xl object-cover shadow-md" />
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-white bg-teal-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-text">{shop.name}</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="rounded border border-teal-100 bg-teal-50 px-2 py-0.5 text-[9px] font-black uppercase text-teal-600">
                        {shop.status}
                      </span>
                      <span className="rounded border border-orange-100 bg-orange-50 px-2 py-0.5 text-[9px] font-black uppercase text-orange-600">
                        {shop.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-text/5 pt-6 text-[10px]">
                  <div>
                    <p className="mb-2 font-black uppercase tracking-[0.2em] text-text/30">Last interaction</p>
                    <p className="text-sm font-bold text-text">{shop.lastOrder}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-black uppercase tracking-[0.2em] text-text/30">Monthly volume</p>
                    <p className="text-sm font-bold text-text">{shop.monthlyRev}</p>
                  </div>
                </div>

                <button
                  className="mt-8 w-full rounded-2xl border border-text/5 bg-background py-4 text-xs font-bold text-text shadow-sm transition-all hover:bg-primary hover:text-white hover:border-primary"
                  onClick={() => navigate('/supplier/shops')}
                  type="button"
                >
                  Open Channel
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="relative overflow-hidden rounded-[40px] bg-text p-10 text-white group shadow-2xl shadow-text/20">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-bold">Artisan Intelligence</h3>
            </div>
            <p className="relative z-10 mb-10 text-base leading-relaxed text-white/70">
              <span className="font-black text-white italic">Prediction:</span> 3 shops are likely to reorder <span className="font-bold text-primary">Sourdough Flour</span> in the next 48 hours.
            </p>
            <button
              className="relative z-10 w-full rounded-2xl bg-white py-4 text-xs font-black uppercase tracking-widest text-text shadow-lg transition-all hover:bg-primary hover:text-white"
              onClick={() => navigate('/supplier/inventory')}
              type="button"
            >
              Prep Inventory
            </button>
          </div>

          <div className="rounded-[40px] border border-text/5 bg-white p-10 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-10 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text">Demand Trend</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text/30">Weekly analytics</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-teal-600">
                <ArrowUpRight size={14} /> 12%
              </div>
            </div>
            <div className="flex h-32 items-end justify-between gap-3">
              {trendHeights.map((height, index) => (
                <div key={`${trendDays[index]}-${height}`} className="flex flex-1 flex-col items-center gap-3 group">
                  <div className={`w-full rounded-t-xl transition-all duration-500 ${index === 6 ? 'bg-primary' : 'bg-primary/10 group-hover:bg-primary/30'}`} style={{ height: `${height}%` }} />
                  <span className="text-[9px] font-black uppercase text-text/20 tracking-tighter">{trendDays[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
        <div className="rounded-[40px] border border-text/5 bg-white p-10 shadow-sm hover:shadow-lg transition-all">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-text">Recent Orders</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-text/30">Active queue</p>
            </div>
            <button
              className="rounded-xl bg-background px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-text transition-all hover:bg-text hover:text-white"
              onClick={() => navigate('/supplier/orders')}
              type="button"
            >
              Full history
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-text/5 text-[10px] font-black uppercase tracking-[0.2em] text-text/20">
                  <th className="pb-6">ID</th>
                  <th className="pb-6">Shop</th>
                  <th className="pb-6">Value</th>
                  <th className="pb-6">Status</th>
                  <th className="pb-6 text-right" />
                </tr>
              </thead>
              <tbody className="divide-y divide-text/5">
                {incomingOrders.map((order) => (
                  <tr key={order.id} className="group cursor-pointer transition-all hover:bg-background/20">
                    <td className="py-6 text-sm font-bold text-primary">{order.id}</td>
                    <td className="py-6">
                      <p className="text-sm font-bold text-text">{order.shop}</p>
                      <p className="text-[10px] font-medium text-text/40">{order.items}</p>
                    </td>
                    <td className="py-6 text-sm font-bold text-text">{order.value}</td>
                    <td className="py-6">
                      <span className={`rounded-lg border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${order.status === 'Pending'
                          ? 'border-orange-100 bg-orange-50 text-orange-500'
                          : 'border-teal-100 bg-teal-50 text-teal-500'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-background transition-all group-hover:bg-primary group-hover:text-white">
                        <ChevronRight size={18} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[40px] border border-[#F0E5D8] bg-[#FAF5F0] p-10 shadow-sm hover:shadow-lg transition-all">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-text">Stock Status</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-text/30">Inventory focus</p>
            </div>
            <button
              className="text-[10px] font-black uppercase tracking-[0.2em] text-primary"
              onClick={() => navigate('/supplier/inventory')}
              type="button"
            >
              Manage ledger
            </button>
          </div>
          <div className="space-y-4">
            {stockOverview.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-3xl border border-text/5 bg-white p-5 transition-all hover:shadow-md group">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-text/20 group-hover:text-primary transition-all">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">{item.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text/30">{item.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-sm font-black ${item.status === 'Low stock' ? 'text-rose-500' : 'text-text'}`}>{item.stock}</span>
                  <span className={`rounded-lg border px-2.5 py-1 text-[8px] font-black uppercase tracking-widest ${item.status === 'Low stock'
                      ? 'border-rose-100 bg-rose-50 text-rose-500'
                      : item.status === 'Selling fast'
                        ? 'border-blue-100 bg-blue-50 text-blue-500'
                        : 'border-teal-100 bg-teal-50 text-teal-500'
                    }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-8 w-full rounded-2xl border border-text/5 bg-white py-4 text-[10px] font-black uppercase tracking-widest text-text transition-all hover:shadow-md"
            onClick={() => navigate('/supplier/inventory')}
            type="button"
          >
            Run Full Audit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboardPage;
