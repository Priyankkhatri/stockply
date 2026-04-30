import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Plus, 
  Search, 
  Filter, 
  Package, 
  ArrowRight, 
  ArrowUpRight, 
  Layers, 
  ShoppingBag,
  MoreVertical,
  History,
  TrendingUp,
  X
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ProductDetailPanel from '../components/ProductDetailPanel';
import PremiumButton from '../components/PremiumButton';
import GlassCard from '../components/GlassCard';

const products = [
  { id: '1', name: 'Paracetamol 500mg', supplier: 'PharmaCorp Inc.', category: 'Analgesics', stock: '12 units', status: 'Low Stock', action: 'Reorder', price: 'Rs. 4.50', code: 'SKU-001' },
  { id: '2', name: 'Ibuprofen 400mg', supplier: 'BioHealth Labs', category: 'Analgesics', stock: '450 units', status: 'In Stock', action: 'Manage', price: 'Rs. 6.20', code: 'SKU-002' },
  { id: '3', name: 'Amoxicillin 250mg', supplier: 'PharmaCorp Inc.', category: 'Antibiotics', stock: '85 units', status: 'In Stock', action: 'Manage', price: 'Rs. 12.00', code: 'SKU-003' },
  { id: '4', name: 'Vitamin C Drops', supplier: 'NatureWell', category: 'Supplements', stock: '0 units', status: 'Out of Stock', action: 'Urgent Reorder', price: 'Rs. 8.40', code: 'SKU-004' },
  { id: '5', name: 'Cough Syrup Adult', supplier: 'MediCore', category: 'Respiratory', stock: '28 units', status: 'Low Stock', action: 'Reorder', price: 'Rs. 5.90', code: 'SKU-005' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const InventoryPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = activeStatus === 'All' || product.status === activeStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, activeStatus]);

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-[1600px] mx-auto px-6 py-10"
    >
      {/* ─── Header Section ─── */}
      <motion.div variants={rowAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/60 uppercase tracking-[0.3em]">Stock Intelligence</span>
          </div>
          <h1 className="text-4xl font-bold text-text tracking-tighter leading-none">The <span className="text-primary italic font-normal serif">Ledger.</span></h1>
          <p className="text-text/60 text-xs font-medium">Precision tracking for your entire inventory ecosystem.</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-6 py-4 bg-white border border-text/5 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-text/60 hover:text-text transition-all flex items-center gap-3">
            <History size={16} /> Activity Log
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-text text-white rounded-[22px] text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-2xl shadow-text/10"
          >
            <Plus size={18} /> Register Asset
          </motion.button>
        </div>
      </motion.div>

      {/* ─── Stats & Highlights ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Total Inventory SKU', value: '1,248', icon: Layers, trend: '↑ 4 new' },
          { label: 'Asset Valuation', value: 'Rs. 4.2M', icon: TrendingUp, trend: '↑ 12%' },
          { label: 'Stock Health', value: '92.4%', icon: Package, trend: 'Stable' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={rowAnim}>
            <GlassCard className="p-6 flex items-center justify-between group hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-text/5 rounded-2xl flex items-center justify-center text-text/40 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg">
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-text/50 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-text tracking-tight">{stat.value}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* ─── Controls & Filters ─── */}
      <motion.div variants={rowAnim} className="bg-white rounded-[32px] border border-text/5 p-8 mb-10 shadow-sm flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
        <div className="relative w-full max-w-2xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text/20 group-focus-within:text-primary transition-colors" size={20} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH BY SKU, PRODUCT, OR SUPPLIER..."
            className="w-full bg-background/50 border border-transparent rounded-[24px] py-5 pl-16 pr-6 text-[10px] font-black uppercase tracking-widest text-text placeholder:text-text/20 outline-none transition-all focus:bg-white focus:border-primary/20"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center p-1.5 bg-background rounded-[20px] border border-text/5">
            {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-6 py-3.5 rounded-[16px] text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeStatus === status
                    ? 'bg-white text-text shadow-sm border border-text/10'
                    : 'text-text/50 hover:text-text/80'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <button className="p-5 bg-background rounded-2xl border border-text/5 text-text/40 hover:text-text transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </motion.div>

      {/* ─── Main Ledger ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-10 items-start">
        <motion.div variants={rowAnim} className="bg-white rounded-[40px] border border-text/5 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-text/[0.02] border-b border-text/5">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Product Details</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Category</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Inventory</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/50">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-text/5">
                <AnimatePresence mode="popLayout">
                  {visibleProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedProduct(product)}
                      className={`group cursor-pointer transition-all duration-500 hover:bg-text/[0.01] ${
                        selectedProduct?.id === product.id ? 'bg-text/[0.02]' : ''
                      }`}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-1 h-10 rounded-full transition-all duration-500 ${selectedProduct?.id === product.id ? 'bg-primary' : 'bg-text/5 group-hover:bg-text/10'}`} />
                          <div className="flex flex-col">
                            <span className="font-bold text-text text-sm tracking-tight">{product.name}</span>
                            <span className="text-[10px] font-bold text-text/60 mt-1 uppercase tracking-widest">{product.code} • {product.supplier}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-text/60 uppercase tracking-widest">{product.category}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-text tracking-tight">{product.stock}</span>
                          <span className="text-[9px] font-black text-text/50 uppercase tracking-widest mt-1">Valuation: {product.price}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-3 text-text/20 hover:text-primary transition-colors">
                            <ShoppingBag size={18} />
                          </button>
                          <button className="p-3 text-text/20 hover:text-text transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ─── Detail Panel ─── */}
        <AnimatePresence mode="wait">
          {selectedProduct && (
            <motion.div 
              key={selectedProduct.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="sticky top-32"
            >
              <GlassCard className="p-0 overflow-hidden border-none shadow-2xl shadow-text/10 relative">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 z-10 p-2 bg-text/5 hover:bg-text/10 rounded-full transition-colors xl:hidden"
                >
                  <X size={16} className="text-text/40" />
                </button>
                <ProductDetailPanel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </motion.div>
  );
};

export default InventoryPage;
