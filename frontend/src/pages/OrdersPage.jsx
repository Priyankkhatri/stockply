import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus, MoreVertical, Download, Package, Clock, Filter, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PremiumButton from '../components/PremiumButton';
import OrderTimeline from '../components/OrderTimeline';
import CreateOrderModal from '../components/CreateOrderModal';
import { orderAPI } from '../services/api';

const tabs = ['All Orders', 'Active', 'Completed', 'Cancelled'];
// ... (OrderCard remains the same)

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusClasses = {
    'Pending': 'bg-orange-50 text-orange-600 border-orange-100',
    'Processing': 'bg-blue-50 text-blue-600 border-blue-100',
    'Shipped': 'bg-purple-50 text-purple-600 border-purple-100',
    'Delivered': 'bg-teal-50 text-teal-600 border-teal-100',
    'Cancelled': 'bg-red-50 text-red-600 border-red-100',
  };

  const getJourneyStep = (status) => {
    switch (status) {
      case 'Pending': return 'submitted';
      case 'Processing': return 'confirmed';
      case 'Shipped': return 'shipped';
      case 'Delivered': return 'delivered';
      default: return 'submitted';
    }
  };

  const StatusBadge = ({ status }) => (
    <span className={`rounded-full border px-4 py-1 text-[9px] font-black uppercase tracking-widest ${statusClasses[status] || statusClasses['Pending']}`}>
      {status}
    </span>
  );

  return (
    <div className="mb-4 overflow-hidden rounded-[28px] border border-text/5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div
        className="flex flex-col md:flex-row cursor-pointer items-stretch md:items-center justify-between px-6 lg:px-8 py-5 lg:py-6 hover:bg-background/10 gap-4"
        onClick={() => setIsExpanded((value) => !value)}
      >
        <div className="flex-1">
          <h4 className="text-base font-bold text-text">{order.orderNumber}</h4>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-text/40">
            {order.shopName} - {order.items?.length || 0} items
          </p>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-center justify-between md:justify-center flex-1 border-y md:border-y-0 border-text/5 py-3 md:py-0">
          <div className="text-left md:text-center">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text/30">Amount</p>
            <p className="font-bold text-text text-sm lg:text-base">Rs. {order.totalAmount?.toLocaleString()}</p>
          </div>
          <div className="md:hidden">
             <StatusBadge status={order.status} />
          </div>
        </div>

        <div className="hidden md:block flex-1 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text/30">Status</p>
          <StatusBadge status={order.status} />
        </div>

        <div className="flex-1 text-left md:text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text/30">Created At</p>
          <p className="text-xs font-bold text-text/60">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 md:border-l border-text/5 pt-4 md:pt-0 md:pl-4">
          <p className="md:hidden text-[10px] font-bold text-text/30 uppercase tracking-widest">Tap to view details</p>
          <div className="flex items-center gap-4">
            <button className="text-text/20 transition-colors hover:text-text">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <button className="text-text/20 transition-colors hover:text-text">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-text/5 bg-[#FAF9F6]/50 px-8 pb-8 pt-2">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h5 className="mb-4 text-sm font-bold text-text">Order Journey</h5>
                <OrderTimeline currentStep={getJourneyStep(order.status)} />
              </div>

              <div>
                <h5 className="mb-4 text-sm font-bold text-text">Item Breakdown</h5>
                <div className="overflow-hidden rounded-xl border border-text/5 bg-white">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-text/5 px-6 py-4 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-text/30">
                            <Package size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text">{item.name}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text/30">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-text">₹{(item.price * item.quantity).toLocaleString()}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text/30">₹{item.price} / unit</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-10 text-sm text-text-muted">No item breakdown available for this order.</div>
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
                  <h5 className="text-sm font-bold text-text">Logistics</h5>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-widest text-text/40">Expected By</span>
                    <span className="font-bold text-text">{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'TBD'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-widest text-text/40">Priority</span>
                    <span className={`rounded border px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${order.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                      {order.priority}
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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderAPI.getAll();
      setOrders(res.data?.data?.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'All Orders') return true;
    if (activeTab === 'Active') return ['Pending', 'Processing', 'Shipped'].includes(order.status);
    if (activeTab === 'Completed') return order.status === 'Delivered';
    if (activeTab === 'Cancelled') return order.status === 'Cancelled';
    return true;
  });

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader
        title="Orders"
        subtitle="Track and manage every purchase order with status, payment, and return context."
        breadcrumbs={['Dashboard', 'Orders']}
        actions={
          <PremiumButton icon={Plus} onClick={() => setShowCreateModal(true)}>
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
          <button className="flex items-center gap-2 rounded-xl border border-text/5 px-3 py-2 text-[10px] font-bold text-text/40 transition-all hover:border-primary/20">
            <span>Filter</span>
            <ChevronDown size={14} />
          </button>
          <button className="rounded-xl border border-text/5 p-2 text-text/30 transition-colors hover:text-primary">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-[10px] font-black uppercase tracking-widest text-text/30">Loading your orders...</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-text/10 rounded-[40px]">
              <Package size={40} className="text-text/10 mb-4" />
              <p className="text-sm font-bold text-text/30">No orders found in this category.</p>
            </div>
          )}
        </div>
      )}

      {showCreateModal && (
        <CreateOrderModal 
          onClose={() => setShowCreateModal(false)} 
          onSuccess={fetchOrders}
        />
      )}
    </div>
  );
};

export default OrdersPage;
