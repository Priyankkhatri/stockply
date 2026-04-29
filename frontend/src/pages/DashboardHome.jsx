import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Package,
  ShoppingCart,
  Activity,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import PremiumButton from '../components/PremiumButton';

const criticalInventory = [
  {
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    supplier: 'MedTech Inc.',
    stock: '0 units',
    price: '$4.50',
    status: 'Out of Stock',
    forecast: 'Reorder needed today',
  },
  {
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    supplier: 'PharmaCorp',
    stock: '12 units',
    price: '$6.20',
    status: 'Low Stock',
    forecast: '3 days left',
  },
  {
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    supplier: 'BioHealth',
    stock: '145 units',
    price: '$12.00',
    status: 'In Stock',
    forecast: 'Healthy supply',
  },
];

const stats = [
  { label: 'TOTAL PRODUCTS', value: '1,248', icon: Package },
  { label: 'LOW STOCK', value: '42', colorClass: 'text-[#C08552]', icon: AlertTriangle },
  { label: 'OUT OF STOCK', value: '7', colorClass: 'text-accent-rose', icon: Activity },
  { label: 'ORDERS PENDING', value: '18', icon: ShoppingCart },
];

const insightCards = [
  {
    title: 'Smart Recommendations',
    body: 'Paracetamol 500mg is projected to stock out in 3 days based on current sales velocity.',
    value: '60 units',
    cta: 'Review suppliers',
  },
  {
    title: 'Inventory Health',
    body: 'Overall health is stable. 15 items still need attention this week.',
    value: '82%',
    cta: 'Open analytics',
  },
];

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your inventory, stock risks, and active orders."
        breadcrumbs={['Dashboard']}
        actions={
          <PremiumButton
            variant="primary"
            icon={ArrowRight}
            onClick={() => navigate('/dashboard/inventory')}
          >
            Review inventory
          </PremiumButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            colorClass={stat.colorClass}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <GlassCard className="p-0 overflow-hidden h-full">
            <div className="flex items-center justify-between border-b border-text/5 px-8 py-6">
              <div>
                <h2 className="text-xl font-display font-bold text-text">Critical Inventory</h2>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mt-1">
                  Items that need attention now
                </p>
              </div>
              <PremiumButton
                variant="secondary"
                size="sm"
                onClick={() => navigate('/dashboard/orders')}
              >
                Bulk reorder
              </PremiumButton>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background/40 border-b border-text/5">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Product</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Stock</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Price</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Forecast</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-text/5">
                  {criticalInventory.map((item) => (
                    <tr key={item.name} className="hover:bg-background/30 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-text text-sm">{item.name}</p>
                        <p className="text-[10px] text-text-muted uppercase tracking-[0.18em] mt-1">
                          {item.category} - {item.supplier}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-text">{item.stock}</td>
                      <td className="px-8 py-5 text-sm text-text-muted">{item.price}</td>
                      <td className="px-8 py-5">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-8 py-5 text-sm text-text-muted">{item.forecast}</td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => navigate('/dashboard/inventory')}
                          className="inline-flex items-center gap-1 rounded-full border border-text/10 px-3 py-1.5 text-xs font-bold text-text/50 transition-colors hover:border-primary/20 hover:text-primary"
                        >
                          Reorder
                          <ChevronRight size={14} />
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
          {insightCards.map((card) => (
            <div key={card.title}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={18} className="text-primary" />
                  <h3 className="font-bold text-text">{card.title}</h3>
                </div>
                <p className="text-sm leading-6 text-text-muted">{card.body}</p>
                <div className="mt-5 flex items-center justify-between rounded-2xl border border-text/5 bg-background/50 px-4 py-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                    Suggested action
                  </span>
                  <span className="text-sm font-bold text-text">{card.value}</span>
                </div>
                <button
                  onClick={() => navigate('/dashboard/analytics')}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-text/10 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-text transition-all hover:border-primary/20 hover:text-primary"
                >
                  {card.cta}
                </button>
              </GlassCard>
            </div>
          ))}

          <GlassCard className="bg-white/90">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">System status</p>
                <h3 className="text-lg font-display font-bold text-text mt-1">Inventory Health</h3>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-accent-emerald border-t-transparent animate-spin-slow" />
            </div>
            <p className="text-sm leading-6 text-text-muted">
              The stock profile is stable. Fifteen items need attention, but the core assortment is healthy.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
