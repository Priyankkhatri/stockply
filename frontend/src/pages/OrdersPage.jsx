import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, MoreVertical, Download, Package, Clock, Filter, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PremiumButton from '../components/PremiumButton';
import OrderTimeline from '../components/OrderTimeline';

const orders = [
  {
    id: '#ORD-10234',
    supplier: 'MedTech Inc.',
    itemsCount: 3,
    amount: '$4,500',
    payment: 'Pending',
    status: 'Confirmed',
    expected: '12 May 2024',
    journeyStep: 'confirmed',
    items: [{ name: 'Paracetamol 500mg', sku: 'MED-500-P', qty: 60, price: '75.00' }],
  },
  {
    id: '#ORD-10233',
    supplier: 'PharmaCorp',
    itemsCount: 12,
    amount: '$24,150',
    payment: 'Paid',
    status: 'Delivered',
    expected: '05 May 2024',
    journeyStep: 'delivered',
    items: [],
  },
  {
    id: '#ORD-10232',
    supplier: 'SurgiSupplies',
    itemsCount: 1,
    amount: '$1,200',
    payment: 'Failed',
    status: 'Cancelled',
    expected: null,
    journeyStep: 'submitted',
    items: [],
  },
];

const tabs = ['All Orders', 'Active', 'Completed', 'Cancelled'];

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(order.id === '#ORD-10234');

  const paymentClasses = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Paid: 'bg-teal-50 text-teal-600 border-teal-100',
    Failed: 'bg-red-50 text-red-600 border-red-100',
  };

  const statusClasses = {
    Confirmed: 'bg-blue-50 text-blue-600 border-blue-100',
    Delivered: 'bg-teal-50 text-teal-600 border-teal-100',
    Cancelled: 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <div className="mb-4 overflow-hidden rounded-[28px] border border-text/5 bg-white shadow-sm">
      <div
        className="flex cursor-pointer items-center justify-between px-8 py-6 hover:bg-background/10"
        onClick={() => setIsExpanded((value) => !value)}
      >
        <div className="flex-1">
          <h4 className="text-base font-bold text-text">{order.id}</h4>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-text/40">
            {order.supplier} - {order.itemsCount} items
          </p>
        </div>

        <div className="flex-1 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text/30">Amount</p>
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
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text/30">Expected</p>
          <p className={`text-xs font-bold ${order.status === 'Cancelled' ? 'text-text/20' : 'text-text/60'}`}>
            {order.expected || '-'}
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
                <h5 className="mb-4 text-sm font-bold text-text">Order Journey</h5>
                <OrderTimeline currentStep={order.journeyStep} />
              </div>

              <div>
                <h5 className="mb-4 text-sm font-bold text-text">Item Breakdown</h5>
                <div className="overflow-hidden rounded-xl border border-text/5 bg-white">
                  {order.items.length > 0 ? (
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
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text/30">₹{item.price} / unit</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-10 text-sm text-text-muted">No item breakdown available for this order.</div>
                  )}
                  <button className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-background/50">
                    + 2 more items
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-text/5 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <Clock size={18} />
                  </div>
                  <h5 className="text-sm font-bold text-text">Return Policy</h5>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-widest text-text/40">Return allowed till</span>
                    <span className="font-bold text-text">12 May</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-widest text-text/40">Time remaining</span>
                    <span className="font-bold text-text">7 days left</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-widest text-text/40">Status</span>
                    <span className="rounded border border-teal-100 bg-teal-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-teal-600">
                      Safe
                    </span>
                  </div>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-text/10 bg-white py-4 text-sm font-bold text-text transition-all hover:bg-background">
                <Download size={18} />
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All Orders');

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader
        title="Orders"
        subtitle="Track and manage every purchase order with status, payment, and return context."
        breadcrumbs={['Dashboard', 'Orders']}
        actions={
          <PremiumButton icon={Plus}>
            Create order
          </PremiumButton>
        }
      />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-text/5 bg-white p-2 shadow-sm">
        <div className="flex items-center rounded-xl bg-background/50 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-6 py-2 text-xs font-bold transition-all ${
                activeTab === tab ? 'bg-white text-text shadow-sm' : 'text-text/30 hover:text-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 px-2">
          {['All Suppliers', 'Payment Status', 'Order Status'].map((label) => (
            <button
              key={label}
              className="flex items-center gap-2 rounded-xl border border-text/5 px-3 py-2 text-[10px] font-bold text-text/40 transition-all hover:border-primary/20"
            >
              <span>{label}</span>
              <ChevronDown size={14} />
            </button>
          ))}
          <button className="rounded-xl border border-text/5 p-2 text-text/30 transition-colors hover:text-primary">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <p className="text-xs font-bold text-text/30">
          Showing <span className="text-text/60">1</span> to <span className="text-text/60">3</span> of <span className="text-text/60">45</span> orders
        </p>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-text/40 transition-colors hover:text-text">
            <ChevronRight size={16} className="rotate-180" /> Previous
          </button>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 rounded-lg bg-primary/10 text-xs font-bold text-primary">1</button>
            <button className="h-8 w-8 rounded-lg text-xs font-bold text-text/40 transition-colors hover:bg-background">2</button>
            <button className="h-8 w-8 rounded-lg text-xs font-bold text-text/40 transition-colors hover:bg-background">3</button>
            <span className="px-2 font-bold text-text/20">...</span>
          </div>
          <button className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-text/40 transition-colors hover:text-primary">
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
