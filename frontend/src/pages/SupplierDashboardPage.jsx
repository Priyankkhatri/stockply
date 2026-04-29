import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  AlertCircle,
  ChevronRight,
  IndianRupee,
  Activity
} from 'lucide-react';
import { useSupplier } from '../context/SupplierContext';
import PageHeader from '../components/PageHeader';
import PremiumButton from '../components/PremiumButton';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }) => (
  <div className="bg-white rounded-[40px] border border-text/5 p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-40 h-40 -mr-10 -mt-10 rounded-full opacity-[0.04] group-hover:scale-110 transition-transform ${colorClass}`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClass} bg-opacity-10`}>
        <Icon size={26} />
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-teal-600' : 'text-rose-500'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trendValue}
      </div>
    </div>
    <p className="text-[10px] font-black text-text/30 uppercase tracking-[0.2em] mb-1">{title}</p>
    <h3 className="text-3xl font-black text-text tracking-tighter">{value}</h3>
  </div>
);

const SupplierDashboardPage = () => {
  const navigate = useNavigate();
  const { products, orders, partners, loading, summary } = useSupplier();

  const trendHeights = [45, 60, 40, 75, 50, 90, 65];
  const trendDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Low stock items derived from products
  const lowStockItems = useMemo(() =>
    products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock').slice(0, 3),
    [products]
  );

  const totalRevenue = useMemo(() =>
    orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    [orders]
  );

  const activeOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-xs font-black uppercase tracking-widest text-text/40">Syncing Warehouse Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-10 pb-12 pt-10">
      <PageHeader
        title="Supplier Overview"
        subtitle="Global logistics and supply chain intelligence dashboard."
        breadcrumbs={['Supplier', 'Dashboard']}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatCard
          title="Total Revenue"
          value={`Rs. ${totalRevenue.toLocaleString()}`}
          icon={IndianRupee}
          trend="up"
          trendValue="12.5%"
          colorClass="bg-amber-500 text-amber-500"
        />
        <StatCard
          title="Active Orders"
          value={activeOrdersCount}
          icon={ShoppingCart}
          trend="up"
          trendValue="8.2%"
          colorClass="bg-teal-500 text-teal-500"
        />
        <StatCard
          title="Stock Items"
          value={summary?.totalProducts ?? products.length}
          icon={Package}
          trend="down"
          trendValue="2.1%"
          colorClass="bg-blue-500 text-blue-500"
        />
        <StatCard
          title="Retail Partners"
          value={partners.length}
          icon={Users}
          trend="up"
          trendValue="5.4%"
          colorClass="bg-purple-500 text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-10">

          {/* Demand Chart */}
          <div className="rounded-[40px] border border-text/5 bg-white p-10 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-text">Demand Trend</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-text/30">Weekly order volume</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-teal-600">
                <ArrowUpRight size={14} /> 12%
              </div>
            </div>
            <div className="h-48 flex items-end justify-between gap-4 px-2">
              {trendHeights.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div
                    className={`w-full rounded-2xl transition-all duration-700 ${i === 5 ? 'bg-primary shadow-[0_0_20px_rgba(192,133,82,0.3)]' : 'bg-primary/10 group-hover:bg-primary/30'}`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-text/20 group-hover:text-text transition-colors">{trendDays[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-[40px] border border-text/5 bg-white p-10 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-text">Recent Orders</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-text/30">Live fulfillment queue</p>
              </div>
              <PremiumButton variant="secondary" onClick={() => navigate('/supplier/orders')} className="px-6">
                View All
              </PremiumButton>
            </div>

            <div className="space-y-3">
              {orders && orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <div
                    key={order._id}
                    onClick={() => navigate('/supplier/orders')}
                    className="flex items-center justify-between p-5 rounded-3xl hover:bg-background/60 transition-all border border-transparent hover:border-text/5 group cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                        <ShoppingCart size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text group-hover:text-primary transition-colors">{order.shopName}</p>
                        <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.2em] mt-0.5">{order.orderNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-text tracking-tight">Rs. {(order.totalAmount || 0).toLocaleString()}</p>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border mt-1 inline-block ${
                        order.status === 'Pending' ? 'bg-orange-50 text-orange-500 border-orange-100' :
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        order.status === 'Shipped' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                        'bg-teal-50 text-teal-600 border-teal-100'
                      }`}>{order.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4 text-text/10">
                    <Clock size={32} />
                  </div>
                  <p className="text-xs font-bold text-text/20 uppercase tracking-widest">No Active Orders</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-10">

          {/* Logistics Hub Card */}
          <div className="bg-text rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 blur-[80px] -mr-32 -mt-32 group-hover:opacity-20 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/10">
                <Activity size={28} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Logistics Hub</h3>
              <p className="text-white/40 text-xs font-medium leading-relaxed mb-8">
                Your supply chain is operating at <span className="text-primary font-black">94% efficiency</span>. Next dispatch window opens in 4 hours.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-white/30">Warehouse Capacity</span>
                  <span className="text-primary">78%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[78%] rounded-full shadow-[0_0_10px_rgba(192,133,82,0.4)]" />
                </div>
              </div>
              <PremiumButton variant="primary" className="w-full py-4 rounded-2xl" onClick={() => navigate('/supplier/inventory')}>
                Manage Inventory
              </PremiumButton>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="rounded-[40px] border border-text/5 bg-white p-10 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-text">Critical Alerts</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-text/30">Action Required</p>
              </div>
            </div>

            <div className="space-y-5">
              {lowStockItems.length > 0 ? (
                lowStockItems.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => navigate('/supplier/inventory')}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'Out of Stock' ? 'bg-rose-500 animate-pulse' : 'bg-orange-400 animate-pulse'}`} />
                      <div>
                        <p className="text-sm font-bold text-text group-hover:text-primary transition-colors">{item.name}</p>
                        <p className="text-[10px] font-black text-rose-500/70 uppercase tracking-widest">{item.status}: {item.stock} units</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-text/10 group-hover:text-primary transition-all" />
                  </div>
                ))
              ) : (
                <div className="py-6 text-center">
                  <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">✓ All Systems Healthy</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboardPage;
