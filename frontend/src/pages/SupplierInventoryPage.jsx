import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Package, 
  Layers, 
  MoreVertical,
  History,
  TrendingUp,
  X,
  ChevronRight,
  Edit3,
  Trash2,
  AlertCircle,
  Clock,
  Tag,
  ArrowRight,
  ShoppingBag,
  Store
} from 'lucide-react';
import { useSupplier } from '../context/SupplierContext';
import StatusBadge from '../components/StatusBadge';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const SupplierProductDetailPanel = ({ product, onClose, onUpdateStock }) => {
  const [adjustmentValue, setAdjustmentValue] = useState(1);
  if (!product) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-8 border-b border-text/5">
        <div className="flex justify-between items-start mb-6">
          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black border uppercase tracking-widest ${
            product.category === 'Fabric' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
            product.category === 'Leather' ? 'bg-orange-50 text-orange-600 border-orange-100' :
            'bg-blue-50 text-blue-600 border-blue-100'
          }`}>
            {product.category}
          </span>
          <button onClick={onClose} className="p-2 hover:bg-background rounded-full transition-colors text-text/70 xl:hidden">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-5 mb-6">
          <img 
            src={product.img || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=100&auto=format&fit=crop'} 
            alt={product.name} 
            className="w-20 h-20 rounded-2xl object-cover border border-text/5 shadow-premium" 
          />
          <div>
            <h2 className="text-2xl font-bold text-text tracking-tighter leading-tight mb-1">{product.name}</h2>
            <p className="text-[10px] text-text/80 font-black uppercase tracking-widest">{product.sku}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/50 p-4 rounded-2xl border border-text/5">
            <p className="text-[9px] font-black text-text/70 uppercase tracking-widest mb-1">Current Stock</p>
            <p className="text-xl font-bold text-text tracking-tight">{product.stock} <span className="text-[10px] font-medium text-text/70">{product.unit || 'units'}</span></p>
          </div>
          <div className="bg-background/50 p-4 rounded-2xl border border-text/5">
            <p className="text-[9px] font-black text-text/70 uppercase tracking-widest mb-1">Unit Price</p>
            <p className="text-xl font-bold text-text tracking-tight">Rs. {product.price}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {/* Quick Inventory Adjustment */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-text uppercase tracking-[0.2em]">Stock Control</h3>
            <span className="text-[10px] font-black text-primary uppercase italic serif">Quick Actions</span>
          </div>
          
          <div className="bg-[#FAF5F0] rounded-[24px] p-6 border border-[#F0E5D8] space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-black text-text/70 uppercase tracking-widest ml-1">Adjustment Amount</label>
              <input 
                type="number" 
                value={adjustmentValue}
                onChange={(e) => setAdjustmentValue(parseInt(e.target.value) || 0)}
                className="w-full px-5 py-4 bg-white border border-[#E8D9C5] rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onUpdateStock(product._id, adjustmentValue, 'IN')}
                className="py-4 bg-white border border-[#E8D9C5] rounded-xl text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Add Stock
              </button>
              <button 
                onClick={() => onUpdateStock(product._id, adjustmentValue, 'OUT')}
                className="py-4 bg-white border border-[#E8D9C5] rounded-xl text-[10px] font-black text-rose-600 uppercase tracking-widest hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
              >
                <X size={14} /> Remove
              </button>
            </div>
          </div>
        </section>

        {/* Product Specs */}
        <section className="space-y-6">
          <h3 className="text-[10px] font-black text-text uppercase tracking-[0.2em]">Asset Specifications</h3>
          <div className="space-y-5">
            {[
              { label: 'Minimum Order (MOQ)', value: product.moq || '100 units', icon: Package },
              { label: 'Avg Lead Time', value: product.leadTime || '14 Days', icon: Clock },
              { label: 'Barcode / EAN', value: product.barcode || 'N/A', icon: Tag },
            ].map((spec) => (
              <div key={spec.label} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-text/5 flex items-center justify-center text-text/70 group-hover:text-primary transition-colors">
                    <spec.icon size={14} />
                  </div>
                  <span className="text-xs text-text/70 font-medium">{spec.label}</span>
                </div>
                <span className="text-xs text-text font-bold tracking-tight">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Status Tracker */}
        <section className="p-6 bg-text rounded-[28px] relative overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-text/20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <History size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Stock History</span>
                <span className="text-[10px] text-white/80 font-medium italic serif">Last updated 2h ago</span>
              </div>
            </div>
            <ArrowRight size={16} className="text-white/40 group-hover:text-white transition-all transform group-hover:translate-x-1" />
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-8 bg-background/50 border-t border-text/5 flex gap-4">
        <button className="flex-1 px-6 py-4 bg-white border border-text/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text/80 hover:text-text hover:border-text/20 transition-all flex items-center justify-center gap-2">
          <Edit3 size={16} /> Edit Asset
        </button>
        <button className="px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default function SupplierInventoryPage() {
  const { products, summary, loading, addProduct, updateStock } = useSupplier();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All Items');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'Fabric',
    stock: '',
    unit: 'mtrs',
    price: '',
    moq: '100',
    leadTime: '14 Days',
    barcode: '',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=100&auto=format&fit=crop'
  });

  const stats = [
    { label: 'Total SKU Portfolio', value: products.length, icon: Layers, trend: '↑ 2 new' },
    { label: 'Inventory Valuation', value: `Rs. ${(products.reduce((acc, p) => acc + (p.stock * p.price), 0) / 1000).toFixed(1)}k`, icon: TrendingUp, trend: '↑ 8.4%' },
    { label: 'Health Status', value: 'Excellent', icon: Package, trend: 'Optimal' },
  ];

  const visibleProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'All Items' || p.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [products, searchTerm, activeTab]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...newProduct,
        stock: parseInt(newProduct.stock) || 0,
        price: parseFloat(newProduct.price) || 0,
        status: parseInt(newProduct.stock) > 20 ? 'In Stock' : 'Low Stock'
      });
      setIsAddModalOpen(false);
      setNewProduct({
        name: '', sku: '', category: 'Fabric', stock: '', unit: 'mtrs', price: '', 
        moq: '100', leadTime: '14 Days', barcode: '', 
        img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=100&auto=format&fit=crop'
      });
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-[1600px] mx-auto px-4 md:px-8 py-10"
    >
      {/* ─── Header ─── */}
      <motion.div variants={rowAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/80 uppercase tracking-[0.3em]">Supply Intelligence</span>
          </div>
          <h1 className="text-4xl font-bold text-text tracking-tighter leading-none">The <span className="text-primary italic font-normal serif">Ledger.</span></h1>
          <p className="text-text/90 text-xs font-medium">Global stock control and SKU asset management.</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-6 py-4 bg-white border border-text/5 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-text/80 hover:text-text transition-all flex items-center gap-3">
            <History size={16} /> Activity Log
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="px-8 py-4 bg-text text-white rounded-[22px] text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-2xl shadow-text/10"
          >
            <Plus size={18} /> Register Asset
          </motion.button>
        </div>
      </motion.div>

      {/* ─── Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={rowAnim}>
            <GlassCard className="p-6 flex items-center justify-between group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-text/5 rounded-2xl flex items-center justify-center text-text/70 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg">
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-text/80 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-text tracking-tight">{stat.value}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{stat.trend}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* ─── Controls ─── */}
      <motion.div variants={rowAnim} className="bg-white rounded-[32px] border border-text/5 p-6 md:p-8 mb-10 shadow-sm flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
        <div className="relative w-full max-w-2xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text/60 group-focus-within:text-primary transition-colors" size={20} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH BY SKU, PRODUCT, OR CODE..."
            className="w-full bg-background/50 border border-transparent rounded-[24px] py-5 pl-16 pr-6 text-[10px] font-black uppercase tracking-widest text-text placeholder:text-text/60 outline-none transition-all focus:bg-white focus:border-primary/20"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center p-1.5 bg-background rounded-[20px] border border-text/5">
            {['All Items', 'Fabric', 'Leather', 'Hardware'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 md:px-6 py-3.5 rounded-[16px] text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeTab === tab
                    ? 'bg-white text-text shadow-sm border border-text/10'
                    : 'text-text/70 hover:text-text'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="p-5 bg-background rounded-2xl border border-text/5 text-text/70 hover:text-text transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </motion.div>

      {/* ─── Main Content ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-10 items-start">
        <motion.div variants={rowAnim} className="bg-white rounded-[40px] border border-text/5 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-text/[0.02] border-b border-text/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/70">Product Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/70">Category</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/70">Current Stock</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/70">Unit Price</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-text/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-text/5">
                <AnimatePresence mode="popLayout">
                  {visibleProducts.map((product) => (
                    <motion.tr
                      key={product._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedProduct(product)}
                      className={`group cursor-pointer transition-all duration-500 hover:bg-text/[0.01] ${
                        selectedProduct?._id === product._id ? 'bg-text/[0.02]' : ''
                      }`}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className={`w-1 h-12 rounded-full transition-all duration-500 ${selectedProduct?._id === product._id ? 'bg-primary' : 'bg-text/5 group-hover:bg-text/10'}`} />
                          <div className="relative">
                            <img src={product.img} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-text/5 shadow-sm group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-text text-sm tracking-tight">{product.name}</span>
                            <span className="text-[10px] font-bold text-text/70 mt-1 uppercase tracking-widest">{product.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black border uppercase tracking-widest ${
                          product.category === 'Fabric' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          product.category === 'Leather' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                          'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-text tracking-tight">{product.stock} <span className="text-[10px] font-medium text-text/70">{product.unit || 'units'}</span></span>
                          <StatusBadge status={product.stock > 20 ? 'In Stock' : 'Low Stock'} className="mt-1.5" />
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-text tracking-tight">Rs. {product.price}</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-3 text-text/60 hover:text-text transition-colors">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ─── Detail Side Panel ─── */}
        <AnimatePresence mode="wait">
          {selectedProduct ? (
            <motion.div 
              key={selectedProduct._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="sticky top-32"
            >
              <GlassCard className="p-0 overflow-hidden border-none shadow-2xl shadow-text/10 relative h-[calc(100vh-160px)]">
                <SupplierProductDetailPanel 
                  product={selectedProduct} 
                  onClose={() => setSelectedProduct(null)} 
                  onUpdateStock={updateStock}
                />
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="sticky top-32 h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center p-10 bg-white/40 rounded-[40px] border border-dashed border-text/10"
            >
              <div className="w-16 h-16 bg-text/5 rounded-3xl flex items-center justify-center text-text/60 mb-6">
                <Package size={32} strokeWidth={1} />
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-text/70 mb-2">No Asset Selected</p>
              <p className="text-xs text-text/60 font-medium leading-relaxed">Select an item from the ledger to view detailed analytics and manage stock.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Add Product Modal ─── */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-text/5 flex items-center justify-between bg-background/30">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">New SKU Registration</span>
                  <h2 className="text-3xl font-bold text-text tracking-tighter italic serif">Asset Creator.</h2>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-background transition-colors text-text/70">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddProduct} className="p-10 grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/80 uppercase tracking-widest ml-1">Product Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Raw Silk" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/80 uppercase tracking-widest ml-1">SKU ID</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. SLK-001" 
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/80 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all appearance-none"
                  >
                    <option>Fabric</option>
                    <option>Leather</option>
                    <option>Hardware</option>
                    <option>Packaging</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/80 uppercase tracking-widest ml-1">Price (per unit)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="0.00" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/80 uppercase tracking-widest ml-1">Initial Stock</label>
                  <div className="flex items-center gap-3">
                    <input 
                      required
                      type="number" 
                      placeholder="0" 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className="flex-1 px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                    />
                    <span className="text-[10px] font-black text-text/60 uppercase mr-2">Units</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/80 uppercase tracking-widest ml-1">Barcode / EAN</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 890123456789" 
                    value={newProduct.barcode}
                    onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>

                <div className="col-span-2 pt-6 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text/70 hover:bg-background transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-10 py-4 bg-text text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-text/10"
                  >
                    Finalize Asset
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
