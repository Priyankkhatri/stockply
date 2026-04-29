import React, { useState, useMemo } from 'react';
import { useSupplier } from '../context/SupplierContext';
import { 
  Plus, 
  Download, 
  Search, 
  Filter, 
  Check, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck,
  Package,
  ChevronRight,
  ChevronLeft,
  Calendar,
  IndianRupee,
  MoreHorizontal,
  X
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PremiumButton from '../components/PremiumButton';

const OrderCard = ({ order, isExpanded, onToggle, onUpdateStatus }) => {

  const paymentClasses = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Paid: 'bg-teal-50 text-teal-600 border-teal-100',
    Failed: 'bg-red-50 text-red-600 border-red-100',
  };

  const statusClasses = {
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Dispatched: 'bg-blue-50 text-blue-600 border-blue-100',
    Delivered: 'bg-teal-50 text-teal-600 border-teal-100',
    Cancelled: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  if (isExpanded) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-text/5 shadow-xl shadow-text/5 p-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-3xl font-bold text-text tracking-tight">{order.id}</h2>
                <span className={`text-[9px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest flex items-center gap-2 ${statusClasses[order.status]}`}>
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${order.status === 'Pending' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-text/40 text-xs font-bold">
                <Calendar size={14} />
                <span>Placed on {order.date}</span>
              </div>
            </div>
            <div className="flex gap-3">
              {order.status === 'Pending' && (
                <>
                  <button 
                    onClick={() => onUpdateStatus(order.id, 'Cancelled')}
                    className="px-6 py-3 rounded-2xl text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
                  >
                    Reject
                  </button>
                  <PremiumButton 
                    onClick={() => onUpdateStatus(order.id, 'Accepted')}
                    variant="primary" 
                    className="px-10"
                  >
                    Accept Order
                  </PremiumButton>
                </>
              )}
              {order.status === 'Accepted' && (
                <PremiumButton 
                  onClick={() => onUpdateStatus(order.id, 'Dispatched')}
                  variant="primary" 
                  className="px-10"
                >
                  Dispatch Order
                </PremiumButton>
              )}
            </div>

          </div>

          <div className="grid grid-cols-3 gap-8 mb-12 bg-[#FAF5F0] rounded-[32px] p-8 border border-[#F0E5D8]">
            <div className="space-y-3">
              <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em]">Shop Details</p>
              <h4 className="font-bold text-text text-base leading-tight">{order.shop}</h4>
              <div className="space-y-1.5">
                <p className="text-[11px] text-text/60 font-bold flex items-center gap-2"><MapPin size={12} className="text-primary" /> Mumbai, IND</p>
                <p className="text-[11px] text-text/60 font-bold flex items-center gap-2"><Phone size={12} className="text-primary" /> +91 98765 43210</p>
              </div>
            </div>
            <div className="space-y-3 border-x border-[#F0E5D8] px-8">
              <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em]">Financial Summary</p>
              <h4 className="font-bold text-text text-2xl tracking-tighter flex items-center"><IndianRupee size={20} className="mr-0.5" />{order.amount.replace('Rs. ', '')}</h4>
              <div className="flex items-center gap-3">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${paymentClasses[order.payment]}`}>{order.payment}</span>
                <span className="text-[10px] text-text/40 font-bold italic">via UPI</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em]">Logistics Trust</p>
              <p className="text-[11px] text-text font-bold">Window: <span className="font-medium text-text/60 underline decoration-primary/30 underline-offset-2">12 May</span></p>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-teal-600 font-bold italic">7 days left</span>
                <span className="bg-teal-50 text-teal-600 text-[8px] font-black px-2 py-0.5 rounded-full border border-teal-100 uppercase tracking-widest">● Safe</span>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.3em] text-center">Fulfillment Journey</p>
            <div className="relative flex justify-between items-start px-12">
              <div className="absolute top-[22px] left-[15%] right-[15%] h-[2px] bg-text/5">
                <div className={`h-full bg-primary shadow-[0_0_10px_rgba(192,133,82,0.4)] transition-all duration-1000 ${order.status === 'Dispatched' ? 'w-2/3' : 'w-1/3'}`}></div>
              </div>
              {[
                { label: 'Received', active: true, done: true },
                { label: 'Accepted', active: order.status !== 'Pending', done: order.status !== 'Pending' },
                { label: 'Dispatched', active: order.status === 'Dispatched', done: order.status === 'Dispatched' },
                { label: 'Delivered', active: false, done: false }
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center w-24">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-sm ${
                    step.done ? 'bg-primary border-primary text-white' : 
                    step.active ? 'bg-white border-primary text-primary' : 
                    'bg-white border-text/5 text-text/10'
                  }`}>
                    {step.done ? <Check size={20} /> : <div className={`w-2.5 h-2.5 rounded-full ${step.active ? 'bg-primary animate-pulse' : 'bg-text/5'}`}></div>}
                  </div>
                  <span className={`mt-4 text-[10px] font-black uppercase tracking-widest ${step.active || step.done ? 'text-text' : 'text-text/20'}`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={onToggle}
            className="mt-12 w-full py-3 border-t border-text/5 text-[10px] font-black uppercase tracking-widest text-text/30 hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <ChevronRight size={14} className="rotate-90" />
            Collapse Order View
          </button>
        </div>

        <div className="bg-text rounded-[40px] border border-black/10 shadow-2xl shadow-black/10 overflow-hidden flex flex-col text-white">
          <div className="p-10 border-b border-white/5 bg-black/10">
            <h3 className="text-2xl font-bold">Consignment</h3>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Itemized Manifest</p>
          </div>
          <div className="flex-1 overflow-y-auto p-10 space-y-8 max-h-[500px] scrollbar-hide">
            {order.items && order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-all">
                      <Package size={24} className="text-white/20" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-text">{item.qty}</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mt-1">ID: {item.sku}</p>
                  </div>
                </div>
                <span className="font-bold text-white/90 text-sm">Rs. {item.price}</span>
              </div>
            ))}
          </div>
          <div className="p-10 bg-black/20 border-t border-white/5">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Grand Total</p>
                <span className="text-3xl font-black text-white tracking-tighter">{order.amount}</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                <ShieldCheck size={14} /> Insured
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onToggle}
      className="bg-white rounded-[32px] border border-text/5 shadow-sm px-10 py-7 flex items-center justify-between cursor-pointer hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden mb-4"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
      <div className="flex-[0.8]">
        <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.2em] mb-1">{order.id}</p>
        <h4 className="font-bold text-text text-sm group-hover:text-primary transition-colors">{order.date}</h4>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-text text-base">{order.shop}</h4>
        <p className="text-[10px] text-text/30 font-black uppercase tracking-widest mt-1 italic">{order.itemsCount} Items • {order.totalQty || 'Bulk'} units</p>
      </div>
      <div className="flex-1 text-center">
        <p className="text-base font-bold text-text mb-2 tracking-tight">{order.amount}</p>
        <span className={`px-2.5 py-0.5 rounded-md border font-black text-[9px] uppercase tracking-widest ${paymentClasses[order.payment]}`}>
          {order.payment}
        </span>
      </div>
      <div className="flex-1 flex justify-center">
        <span className={`px-5 py-2 rounded-full border font-black text-[10px] uppercase tracking-[0.15em] flex items-center gap-3 transition-all ${
          order.status === 'Dispatched' ? 'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white' : 'bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-500 group-hover:text-white'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Dispatched' ? 'bg-teal-500' : 'bg-orange-500'} group-hover:bg-white`}></div>
          {order.status}
        </span>
      </div>
      <div className="w-12 flex justify-end">
        <button className="text-text/10 group-hover:text-text transition-all transform group-hover:rotate-90">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default function SupplierOrdersPage() {
  const { orders, updateOrderStatus } = useSupplier();
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleStatusUpdate = (id, newStatus) => {
    updateOrderStatus(id, newStatus);
  };


  const filtered = useMemo(() => {
    const norm = searchTerm.trim().toLowerCase();
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
        subtitle="Fulfilling the legacy of artisan retail partners worldwide."
        breadcrumbs={['Supplier', 'Orders']}
        actions={
          <div className="flex gap-4">
            <PremiumButton variant="secondary" icon={Download}>
              Export Batch
            </PremiumButton>
            <PremiumButton icon={Plus}>
              New Entry
            </PremiumButton>
          </div>
        }
      />

      <div className="mb-10 flex flex-wrap items-center justify-between gap-6 rounded-[32px] border border-text/5 bg-white p-3 shadow-sm">
        <div className="flex items-center rounded-[20px] bg-background/50 p-1.5">
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

      <div className="space-y-2">
        {filtered.map((order) => (
          <OrderCard 
            key={order.id} 
            order={order} 
            isExpanded={expandedId === order.id}
            onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
            onUpdateStatus={handleUpdateStatus}
          />

        ))}
      </div>

      <div className="mt-16 flex items-center justify-between">
        <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.2em]">
          Records <span className="text-text/60">1–3</span> of <span className="text-text/60">45</span>
        </p>
        <div className="flex gap-3">
          <button className="w-12 h-12 rounded-2xl border border-text/5 flex items-center justify-center text-text/20 cursor-not-allowed opacity-50 bg-background/30">
            <ChevronLeft size={20} />
          </button>
          <button className="w-12 h-12 rounded-2xl border border-text/5 bg-white flex items-center justify-center hover:shadow-md transition-all text-text/40 hover:text-primary">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
