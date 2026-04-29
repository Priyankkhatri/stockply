import React from 'react';
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
import PageHeader from '../components/PageHeader';
import PremiumButton from '../components/PremiumButton';

const connectedShops = [
  {
    name: 'The Organic Pantry',
    status: 'Active',
    tag: 'Frequent buyer',
    lastOrder: 'Today, 10:30 AM',
    monthlyRev: 'Rs. 45,000',
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=100&auto=format&fit=crop',
  },
  {
    name: 'Urban Crust Cafe',
    status: 'Active',
    tag: 'High demand',
    lastOrder: 'Yesterday',
    monthlyRev: 'Rs. 62,000',
    avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=100&auto=format&fit=crop',
  },
];

const incomingOrders = [
  { id: '#ORD-092', shop: 'The Organic Pantry', items: '4 items', value: 'Rs. 4,200', status: 'Pending' },
  { id: '#ORD-091', shop: 'Daily Fresh Supermarket', items: '12 items', value: 'Rs. 12,800', status: 'Accepted' },
  { id: '#ORD-090', shop: 'Urban Crust Cafe', items: '2 items', value: 'Rs. 1,500', status: 'Pending' },
];

const stockOverview = [
  { name: 'Artisan Sourdough Flour', detail: '25kg bags', stock: '12 units', status: 'Low stock' },
  { name: 'Organic Honey Jar', detail: '500ml', stock: '45 units', status: 'Selling fast' },
  { name: 'Premium Almonds', detail: '1kg pack', stock: '8 units', status: 'Low stock' },
  { name: 'Cold Pressed Olive Oil', detail: '1L bottle', stock: '120 units', status: 'Stable' },
];

const stats = [
  { label: 'CONNECTED SHOPS', value: '5', trend: '+1 new', icon: Store, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'ORDERS TODAY', value: '18', trend: '+12%', icon: ShoppingCart, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'REVENUE TODAY', value: 'Rs. 12,500', trend: '+5.4%', icon: Wallet, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'STOCK ALERTS', value: '6', trend: 'Critical', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
];

const trendHeights = [30, 45, 60, 40, 70, 55, 90];
const trendDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const SupplierDashboardPage = () => {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8 pb-12">
      <PageHeader
        title="Supplier Dashboard"
        subtitle="Monitor shop demand, active orders, and warehouse pressure from one supplier workspace."
        breadcrumbs={['Supplier', 'Dashboard']}
        actions={
          <PremiumButton icon={Package}>
            Prep inventory
          </PremiumButton>
        }
      />

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex h-[220px] flex-col justify-between rounded-[32px] border border-text/5 bg-white p-8 shadow-sm transition-all hover:shadow-premium">
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}>
                <stat.icon size={22} />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-teal-600">
                <ArrowUpRight size={14} />
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-text/30">{stat.label}</p>
              <p className="text-4xl font-bold text-text">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10 grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text">Connected Shops</h2>
            <button className="flex items-center gap-2 text-xs font-bold text-primary">
              View shop directory <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {connectedShops.map((shop) => (
              <div key={shop.name} className="rounded-[32px] border border-text/5 bg-white p-8 shadow-sm transition-all hover:border-b-primary hover:shadow-premium">
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

                <button className="mt-8 w-full rounded-2xl border border-text/5 bg-background py-4 text-xs font-bold text-text shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-white">
                  Open Channel
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-[36px] bg-text p-10 text-white">
            <div className="relative z-10 mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-bold">Supply Intelligence</h3>
            </div>
            <p className="relative z-10 mb-10 text-base leading-relaxed text-white/70">
              Three shops are likely to reorder <span className="font-bold text-primary">Sourdough Flour</span> in the next 48 hours.
            </p>
            <button className="relative z-10 w-full rounded-2xl bg-white py-4 text-xs font-black uppercase tracking-widest text-text shadow-lg transition-all hover:bg-primary hover:text-white">
              Prep Inventory
            </button>
          </div>

          <div className="rounded-[36px] border border-text/5 bg-white p-10 shadow-sm">
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
                <div key={`${trendDays[index]}-${height}`} className="flex flex-1 flex-col items-center gap-3">
                  <div className={`w-full rounded-t-xl transition-all duration-500 ${index === 6 ? 'bg-primary' : 'bg-primary/10 hover:bg-primary/30'}`} style={{ height: `${height}%` }} />
                  <span className="text-[9px] font-black uppercase text-text/20">{trendDays[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <div className="rounded-[36px] border border-text/5 bg-white p-10 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-text">Recent Orders</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-text/30">Active queue</p>
            </div>
            <button className="rounded-xl bg-background px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-text transition-all hover:bg-text hover:text-white">
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
                      <span className={`rounded-lg border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${
                        order.status === 'Pending'
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

        <div className="rounded-[36px] border border-[#F0E5D8] bg-[#FAF5F0] p-10 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-text">Stock Status</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-text/30">Inventory focus</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Manage ledger</button>
          </div>
          <div className="space-y-4">
            {stockOverview.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-3xl border border-text/5 bg-white p-5 transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-text/20">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">{item.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text/30">{item.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-sm font-black ${item.status === 'Low stock' ? 'text-red-500' : 'text-text'}`}>{item.stock}</span>
                  <span className={`rounded-lg border px-2.5 py-1 text-[8px] font-black uppercase tracking-widest ${
                    item.status === 'Low stock'
                      ? 'border-red-100 bg-red-50 text-red-500'
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
          <button className="mt-8 w-full rounded-2xl border border-text/5 bg-white py-4 text-[10px] font-black uppercase tracking-widest text-text transition-all hover:shadow-md">
            Run Full Audit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboardPage;
