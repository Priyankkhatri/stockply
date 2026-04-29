import React, { useMemo, useState } from 'react';
import { ChevronDown, Plus, Search, Filter, Package, ArrowRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ProductDetailPanel from '../components/ProductDetailPanel';
import PremiumButton from '../components/PremiumButton';

const products = [
  { name: 'Paracetamol 500mg', supplier: 'PharmaCorp Inc.', category: 'Analgesics', stock: '12 units', status: 'Low Stock', action: 'Reorder', price: '$4.50' },
  { name: 'Ibuprofen 400mg', supplier: 'BioHealth Labs', category: 'Analgesics', stock: '450 units', status: 'In Stock', action: 'Manage', price: '$6.20' },
  { name: 'Amoxicillin 250mg', supplier: 'PharmaCorp Inc.', category: 'Antibiotics', stock: '85 units', status: 'In Stock', action: 'Manage', price: '$12.00' },
  { name: 'Vitamin C Drops', supplier: 'NatureWell', category: 'Supplements', stock: '0 units', status: 'Out of Stock', action: 'Urgent Reorder', price: '$8.40' },
  { name: 'Cough Syrup Adult', supplier: 'MediCore', category: 'Respiratory', stock: '28 units', status: 'Low Stock', action: 'Reorder', price: '$5.90' },
];

const InventoryPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = activeStatus === 'All' || product.status === activeStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, activeStatus]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">Inventory</p>
            <h1 className="text-4xl font-display font-bold text-text mb-3">Current Stock</h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Manage stock levels, monitor supplier coverage, and jump into reorder actions from a single table.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <PremiumButton variant="secondary" icon={ArrowRight}>
              Bulk reorder
            </PremiumButton>
            <PremiumButton variant="primary" icon={Plus}>
              Add product
            </PremiumButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr_0.8fr] gap-4">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-light" size={18} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search SKU, product name, or supplier..."
              className="w-full rounded-2xl border border-text/5 bg-white px-12 py-4 text-sm font-medium text-text shadow-sm outline-none transition-all placeholder:text-text-light focus:border-primary/20 focus:ring-4 focus:ring-primary/5"
            />
          </div>

          <button className="flex items-center justify-between rounded-2xl border border-text/5 bg-white px-4 py-4 text-sm font-bold text-text hover:border-primary/20 transition-all">
            All Categories
            <ChevronDown size={16} className="text-text-light" />
          </button>

          <button className="flex items-center justify-between rounded-2xl border border-text/5 bg-white px-4 py-4 text-sm font-bold text-text hover:border-primary/20 transition-all">
            Stock Status
            <ChevronDown size={16} className="text-text-light" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.2em] transition-all ${
                activeStatus === status
                  ? 'border-primary/20 bg-primary/10 text-primary'
                  : 'border-text/5 bg-white text-text-muted hover:border-primary/20 hover:text-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 items-start">
        <div className="bg-white rounded-[32px] border border-text/5 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-text/5 flex items-center justify-between bg-background/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Package size={18} />
              </div>
              <div>
                <h2 className="font-bold text-text">Inventory Table</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-text-muted">
                  {visibleProducts.length} products visible
                </p>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-black text-text-muted flex items-center gap-2">
              <Filter size={14} />
              Live filters
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background/40 border-b border-text/5">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Product</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Current Stock</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-text/5">
                {visibleProducts.map((product) => (
                  <tr
                    key={product.name}
                    onClick={() => setSelectedProduct(product)}
                    className={`group cursor-pointer transition-colors hover:bg-background/30 ${
                      selectedProduct?.name === product.name ? 'bg-background/20' : ''
                    }`}
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-1 rounded-full bg-primary/20 transition-colors group-hover:bg-primary" />
                        <div>
                          <p className="font-bold text-text text-sm">{product.name}</p>
                          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-text-muted mt-1">
                            {product.supplier}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-text-muted">{product.category}</td>
                    <td className="px-8 py-5 text-sm font-bold text-text">{product.stock}</td>
                    <td className="px-8 py-5">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className={`text-xs font-bold transition-colors ${product.status === 'Out of Stock' ? 'text-red-500 hover:text-red-600' : 'text-text/40 hover:text-primary'}`}>
                        {product.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sticky top-32">
          <ProductDetailPanel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
