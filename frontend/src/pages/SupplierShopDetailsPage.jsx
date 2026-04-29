import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Clock,
  Gift,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
  Store,
  Zap,
} from 'lucide-react';
import { useSupplier } from '../context/SupplierContext';
import PageHeader from '../components/PageHeader';

import PremiumButton from '../components/PremiumButton';

const SupplierShopDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { partners, orders } = useSupplier();

  const shop = useMemo(() => {
    // Find by slugified name or ID
    return partners.find((candidate) => 
      candidate.name.toLowerCase().replace(/\s+/g, '-') === id || 
      candidate.initials.toLowerCase() === id
    ) || partners[0];
  }, [id, partners]);

  const shopOrders = useMemo(() => {
    return orders.filter(o => o.shop === shop.name);
  }, [orders, shop]);

  const totalShopRevenue = shopOrders.reduce((sum, o) => {
    const val = parseInt(o.amount.replace(/[^0-9]/g, '')) || 0;
    return sum + val;
  }, 0);


  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8 pb-12">
      <PageHeader
        title={shop.name}
        subtitle="Shop profile, recent activity, and operational insights for supplier planning."
        breadcrumbs={['Supplier', 'Shops', shop.name]}
        actions={
          <>
            <PremiumButton variant="secondary" icon={MessageSquare}>
              Contact shop
            </PremiumButton>
            <PremiumButton variant="secondary" icon={Zap}>
              Prioritize orders
            </PremiumButton>
            <PremiumButton variant="primary" icon={Gift}>
              Send offer
            </PremiumButton>
          </>
        }
      />

      <div className="mb-10 flex flex-wrap items-center gap-4 rounded-[28px] border border-text/5 bg-white px-8 py-6 shadow-sm">
        <div className="flex items-center gap-3 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-teal-600">
          <span className="h-2 w-2 rounded-full bg-teal-500" />
          Active
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-text/50">
          <span className="flex items-center gap-1.5">
            <Store size={14} /> {shop.category}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} /> {shop.location || shop.city}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone size={14} /> {shop.phone || '+91 90000 00000'}
          </span>

        </div>
        <button
          onClick={() => navigate('/supplier/shops')}
          className="ml-auto text-[10px] font-black uppercase tracking-[0.2em] text-text/40 transition-colors hover:text-primary"
        >
          Back to partners
        </button>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Orders', value: shopOrders.length.toString(), trend: '+12% this month', accent: 'text-teal-600' },
          { label: 'Revenue Generated', value: `Rs. ${totalShopRevenue.toLocaleString()}`, trend: '+5.4% this month', accent: 'text-teal-600' },
          { label: 'Avg Order Value', value: `Rs. ${(totalShopRevenue / (shopOrders.length || 1)).toFixed(0)}`, trend: 'Stable', accent: 'text-text/30' },
          { label: 'Status', value: shop.status, trend: 'Operational', accent: 'text-text/30' },
        ].map((stat) => (

          <div key={stat.label} className="relative overflow-hidden rounded-[28px] border border-text/5 bg-white p-6 shadow-sm">
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/5" />
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-text/30">{stat.label}</p>
            <h3 className="mb-1 text-2xl font-bold text-text">{stat.value}</h3>
            <p className={`text-[10px] font-bold ${stat.accent}`}>{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="h-fit overflow-hidden rounded-[28px] border border-text/5 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-text/5 p-8">
            <h3 className="text-xl font-bold text-text">Recent Orders</h3>
            <button className="text-[11px] font-bold uppercase tracking-widest text-primary hover:underline">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-widest text-text/30">
                  <th className="px-8 py-5">Order ID</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Items</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-text/5">
                {shopOrders.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-background/10">
                    <td className="px-8 py-5 text-sm font-bold text-text/80">{order.id}</td>
                    <td className="px-8 py-5 text-sm font-medium text-text/40">{order.date}</td>
                    <td className="px-8 py-5 text-sm font-bold text-text/60">{order.itemsCount} units</td>
                    <td className="px-8 py-5 text-sm font-bold text-text">{order.amount}</td>
                    <td className="px-8 py-5">
                      <span className={`rounded-lg border px-2 py-0.5 text-[9px] font-bold uppercase tracking-tighter ${
                        order.status === 'Pending' ? 'bg-orange-50 text-orange-500 border-orange-100' : 
                        order.status === 'Dispatched' ? 'bg-blue-50 text-blue-500 border-blue-100' :
                        'bg-teal-50 text-teal-500 border-teal-100'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {shopOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-10 text-center text-xs font-bold text-text/20 uppercase tracking-widest">
                      No order history found for this partner
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[28px] border border-teal-100 bg-[#F4F9F8] p-8">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-teal-500/5" />
            <div className="mb-6 flex items-center gap-2 text-teal-600">
              <Sparkles size={18} />
              <h3 className="text-sm font-bold">AI Insights</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white p-2 text-teal-600 shadow-sm">
                  <Clock size={14} />
                </div>
                <p className="pt-1 text-xs leading-relaxed text-text/70">
                  This shop usually orders every <span className="font-bold text-teal-600">3 days</span>.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white p-2 text-teal-600 shadow-sm">
                  <Zap size={14} />
                </div>
                <p className="pt-1 text-xs leading-relaxed text-text/70">
                  Next order expected <span className="font-bold text-teal-600">tomorrow</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-text/5 bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-sm font-bold text-text">Demand Insights</h3>
            <p className="mb-4 text-[9px] font-bold uppercase tracking-widest text-text/30">Top 3 Products</p>
            <div className="mb-8 space-y-4">
              {[
                { id: 1, name: 'Artisan Sourdough', percent: 42, color: 'bg-orange-100 text-orange-600' },
                { id: 2, name: 'Organic Honey', percent: 28, color: 'bg-teal-100 text-teal-600' },
                { id: 3, name: 'Premium Almonds', percent: 15, color: 'bg-blue-100 text-blue-600' },
              ].map((item) => (
                <div key={item.id} className="group flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-5 w-5 items-center justify-center rounded text-[9px] font-bold ${item.color}`}>
                      {item.id}
                    </span>
                    <span className="text-xs font-bold text-text/60 transition-colors group-hover:text-text">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-text/30">{item.percent}%</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-text/5 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text/30">Avg. Order Quantity</span>
              <span className="font-bold text-text">45 units</span>
            </div>
          </div>

          <div className="rounded-[28px] border border-text/5 bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-sm font-bold text-text">Payment Behavior</h3>
            <div className="mb-8 flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-teal-500 border-t-transparent">
                <span className="text-[10px] font-black text-teal-600">92%</span>
              </div>
              <div>
                <p className="text-xs font-bold text-text">Excellent Standing</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-text/30">Low risk customer</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'On-time payments', value: '92%', color: 'bg-teal-500' },
                { label: 'Late payments', value: '8%', color: 'bg-red-400' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${row.color}`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text/40">{row.label}</span>
                  </div>
                  <span className="text-xs font-bold text-text/60">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierShopDetailsPage;
