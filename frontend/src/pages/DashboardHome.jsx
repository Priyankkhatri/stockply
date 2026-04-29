import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Lightbulb, MessageSquare } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';

const criticalInventory = [
  {
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    supplier: 'MedTech Inc.',
    stock: '0 units',
    price: '$4.50',
    status: 'Out of Stock',
    daysLeft: '0 days left',
  },
  {
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    supplier: 'PharmaCorp',
    stock: '12 units',
    price: '$6.20',
    status: 'Low Stock',
    daysLeft: '3 days left',
  },
  {
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    supplier: 'BioHealth',
    stock: '145 units',
    price: '$12.00',
    status: 'In Stock',
    daysLeft: '45 days left',
  },
];

const stats = [
  { label: 'TOTAL PRODUCTS', value: '1,248' },
  { label: 'LOW STOCK', value: '42', colorClass: 'text-[#C08552]' },
  { label: 'OUT OF STOCK', value: '7', colorClass: 'text-red-500' },
  { label: 'ORDERS PENDING', value: '18' },
];

const expiringSoon = [
  { name: 'Vitamin C Drops', days: '12 days left', color: 'text-red-500' },
  { name: 'Cough Syrup (Adult)', days: '28 days left', color: 'text-orange-500' },
];

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-2">Dashboard</h1>
        <p className="text-text/60">Overview of your inventory and orders</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                colorClass={stat.colorClass}
              />
            ))}
          </div>

          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-text/5">
              <h2 className="text-xl font-bold text-text">Critical Inventory</h2>
              <button
                onClick={() => navigate('/dashboard/inventory')}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
              >
                <ShoppingCart size={16} />
                Reorder All Low Stock
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background/30 border-b border-text/5">
                    <th className="px-6 py-4 text-[10px] font-bold text-text/40 uppercase tracking-widest">Product</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text/40 uppercase tracking-widest">Stock</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text/40 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text/40 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text/40 uppercase tracking-widest">Forecast</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text/40 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-text/5">
                  {criticalInventory.map((item) => (
                    <tr key={item.name} className="hover:bg-background/10 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-text text-sm">{item.name}</p>
                        <p className="text-[10px] text-text/40">{item.category} • {item.supplier}</p>
                      </td>
                      <td
                        className={`px-6 py-4 text-sm font-bold ${
                          item.status === 'Out of Stock'
                            ? 'text-red-500'
                            : item.status === 'Low Stock'
                              ? 'text-orange-500'
                              : 'text-teal-600'
                        }`}
                      >
                        {item.stock}
                      </td>
                      <td className="px-6 py-4 text-sm text-text/60">{item.price}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td
                        className={`px-6 py-4 text-sm font-bold ${
                          item.status === 'In Stock' ? 'text-text/60' : 'text-orange-500'
                        }`}
                      >
                        {item.daysLeft}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => navigate('/dashboard/inventory/compare')}
                          className="text-xs font-bold text-text/40 hover:text-primary transition-colors border border-text/10 px-3 py-1.5 rounded-md"
                        >
                          Reorder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} className="text-primary" />
              <h3 className="font-bold text-text">Smart Recommendations</h3>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-text/5 mb-4">
              <p className="text-xs text-text/80 leading-relaxed mb-4">
                <span className="font-bold text-text">Paracetamol 500mg</span> is projected to stock out in{' '}
                <span className="text-red-500 font-bold">3 days</span> based on current sales velocity.
              </p>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-text/40 uppercase tracking-widest">Suggested Order:</span>
                <span className="text-text">60 units</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard/inventory/compare')}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md shadow-secondary/10"
            >
              Reorder Now
            </button>
          </GlassCard>

          <GlassCard>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mb-1">Inventory Health</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-text">82%</span>
                  <span className="text-teal-500 text-xs">↑</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-teal-500 border-t-transparent animate-spin-slow"></div>
            </div>
            <p className="text-[10px] text-text/40 font-bold leading-tight">Optimal range. 15 items need attention.</p>
          </GlassCard>

          <GlassCard className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <MessageSquare size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-text">WhatsApp Alerts</p>
                <p className="text-[10px] text-text/40">Receive urgent stockout notices</p>
              </div>
            </div>
            <div className="w-10 h-5 bg-secondary rounded-full relative flex items-center px-1">
              <div className="w-3 h-3 bg-white rounded-full absolute right-1"></div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-text text-sm">Expiring Soon</h3>
              <span className="text-text/20">!</span>
            </div>
            <div className="space-y-4">
              {expiringSoon.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-xs font-bold">
                  <span className="text-text/60">{item.name}</span>
                  <span className={item.color}>{item.days}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
