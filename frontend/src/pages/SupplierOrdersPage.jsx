import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  MoreVertical, 
  Download, 
  Package, 
  Clock, 
  Filter, 
  ChevronRight,
  Search
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PremiumButton from '../components/PremiumButton';
import OrderTimeline from '../components/OrderTimeline';

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(order.id === '#ORD-8920');

  const paymentClasses = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Paid: 'bg-teal-50 text-teal-600 border-teal-100',
    Failed: 'bg-red-50 text-red-600 border-red-100',
  };

  const statusClasses = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Dispatched: 'bg-blue-50 text-blue-600 border-blue-100',
    Delivered: 'bg-teal-50 text-teal-600 border-teal-100',
    Cancelled: 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <div className="mb-4 overflow-hidden rounded-[28px] border border-text/5 bg-white shadow-sm transition-all hover:shadow-md">
      <div
        className="flex cursor-pointer items-center justify-between px-8 py-6 hover:bg-background/10"
        onClick={() => setIsExpanded((value) => !value)}
      >
        <div className="flex-1">
          <h4 className="text-base font-bold text-text group-hover:text-primary transition-colors">{order.id}</h4>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-text/40">
            {order.shop} • {order.itemsCount} items
          </p>
        </div>

        <div className="flex-1 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text/30">Value</p>
          <p className="font-bold text-text">{order.amount}</p>
        </div>

        <div className="flex-1 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text/30">Payment</p>
          <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${paymentClasses[order.payment]}`}>
            {order.payment}
          </span>
        </div>

        <div className="flex-1 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text/30">Status</p>
          <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${statusClasses[order.status]}`}>
            {order.status}
          </span>
        </div>

        <div className="flex-1 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text/30">Ordered</p>
          <p className="text-xs font-bold text-text/60">
            {order.date.split(' • ')[0]}
          </p>
        </div>

        <div className="flex items-center gap-4 border-l border-text/5 pl-4">
          <button className="text-text/20 transition-colors hover:text-text">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <button className="text-text/20 transition-colors hover:text-text">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-text/5 bg-[#FAF9F6]/50 px-8 pb-8 pt-2">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h5 className="mb-4 text-sm font-bold text-text">Fulfillment Journey</h5>
                <OrderTimeline currentStep={order.journeyStep} />
              </div>

              <div>
                <h5 className="mb-4 text-sm font-bold text-text">Item Breakdown</h5>
                <div className="overflow-hidden rounded-xl border border-text/5 bg-white">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <div key={item.sku} className="flex items-center justify-between border-b border-text/5 px-6 py-4 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-text/30">
                            <Package size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text">{item.name}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text/30">SKU: {item.sku}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-text">{item.qty} units</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text/30">Rs. {item.price} / unit</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-10 text-sm text-text/40 italic">No detailed item breakdown available.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-text/5 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <Clock size={18} />
                  </div>
                  <h5 className="text-sm font-bold text-text">Dispatch Timeline</h5>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-widest text-text/40">SLA Deadline</span>
                    <span className="font-bold text-text">Within 24h</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-widest text-text/40">Priority</span>
                    <span className="rounded border border-teal-100 bg-teal-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-teal-600">
                      Standard
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-4 bg-white border border-text/10 rounded-xl font-bold text-text text-sm hover:bg-background transition-all flex items-center justify-center gap-2 shadow-sm">
                  <Download size={18} />
                  Label
                </button>
                <PremiumButton variant="primary" className="flex-1">
                  Accept Order
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function SupplierOrdersPage() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [query, setQuery] = useState('');

  const orders = useMemo(() => [
    {
      id: '#ORD-8920',
      date: 'Oct 24 • 14:30',
      shop: 'Artisan Goods Co.',
      itemsCount: 3,
      amount: 'Rs. 45,200',
      payment: 'Paid',
      status: 'Pending',
      journeyStep: 'submitted',
      items: [
        { name: 'European Linen - Natural', sku: 'LNN-NAT-01', qty: 150, price: '850.00' },
        { name: 'Brass Findings', sku: 'HW-BRS-09', qty: 24, price: '45.00' }
      ]
    },
    {
      id: '#ORD-8919',
      date: 'Oct 23 • 09:10',
      shop: 'The Craft Boutique',
      itemsCount: 4,
      amount: 'Rs. 18,500',
      payment: 'Paid',
      status: 'Dispatched',
      journeyStep: 'dispatched',
      items: []
    },
    {
      id: '#ORD-8918',
      date: 'Oct 22 • 18:05',
      shop: 'Urban Nest Decor',
      itemsCount: 2,
      amount: 'Rs. 4,200',
      payment: 'Pending',
      status: 'Pending',
      journeyStep: 'submitted',
      items: []
    }
  ], []);

  const filtered = useMemo(() => {
    const norm = query.trim().toLowerCase();
    return orders.filter((order) => {
      if (activeTab !== 'All' && order.status !== activeTab) return false;
      if (!norm) return true;
      return (
        order.id.toLowerCase().includes(norm) ||
        order.shop.toLowerCase().includes(norm)
      );
    });
  }, [activeTab, orders, query]);

  return (
    <div className="max-w-[1600px] mx-auto px-10 pb-12 pt-10">
      <PageHeader 
        title="Order Management"
        subtitle="Review, accept, and fulfill incoming orders from your retail partner network."
        breadcrumbs={['Supplier', 'Orders']}
        actions={
          <>
            <PremiumButton variant="secondary" icon={Download}>
              Export Batch
            </PremiumButton>
            <PremiumButton icon={Plus}>
              New Entry
            </PremiumButton>
          </>
        }
      />

      <div className="mb-10 flex flex-wrap items-center justify-between gap-6 rounded-[32px] border border-text/5 bg-white p-2 shadow-sm">
        <div className="flex items-center rounded-xl bg-background/50 p-1">
          {['Pending', 'All', 'Dispatched', 'Delivered'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                activeTab === tab
                  ? 'bg-white text-text shadow-md shadow-text/5 border border-text/5'
                  : 'text-text/30 hover:text-text'
              }`}
            >
              {tab}
              {tab === 'Pending' && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[9px]">12</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 px-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text/20 group-focus-within:text-primary transition-colors" size={16} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search orders or shops..."
              className="pl-12 pr-6 py-3 bg-background border border-transparent rounded-2xl text-xs font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all w-80 placeholder:text-text/20"
            />
          </div>

          <button className="p-3.5 text-text/40 hover:text-primary transition-all bg-background rounded-2xl border border-transparent hover:border-primary/10 hover:shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <p className="text-xs font-bold text-text/30 uppercase tracking-widest">
          Showing <span className="text-text/60">{filtered.length}</span> of <span className="text-text/60">45</span> orders
        </p>
        <div className="flex items-center gap-4">
          <button className="p-3 rounded-xl text-text/20 transition-all" disabled>
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-xl bg-primary text-white text-xs font-black shadow-lg shadow-primary/20">1</button>
            <button className="w-9 h-9 rounded-xl text-xs font-black text-text/40 hover:text-text transition-all border border-text/5">2</button>
          </div>
          <button className="p-3 rounded-xl text-text/40 hover:text-primary transition-all bg-background border border-transparent hover:border-primary/10">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
