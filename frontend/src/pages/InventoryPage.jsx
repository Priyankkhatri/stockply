import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
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
  X,
  Loader2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import StatusBadge from '../components/StatusBadge';
import ProductDetailPanel from '../components/ProductDetailPanel';
import PremiumButton from '../components/PremiumButton';
import GlassCard from '../components/GlassCard';
import { TableSkeleton, CardSkeleton } from '../components/Skeleton';
import SEOHead from '../components/SEOHead';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const InventoryPage = () => {
  const location = useLocation();
  const { products: productList, summary, loading, addProduct, refreshData } = useShop();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState(location.state?.searchQuery || '');
  const [activeStatus, setActiveStatus] = useState(location.state?.filter || 'All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ─── Add Product via Formik ────────────────────────────────────
  const formik = useFormik({
    initialValues: {
      name: '', sku: '', category: 'General', supplier: '', price: '', stock: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      price: Yup.number().required('Price is required').min(0, 'Must be positive'),
      stock: Yup.number().required('Initial stock is required').min(0, 'Must be positive'),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payload = {
          ...values,
          sku: values.sku || `SKU-${Date.now()}`,
          price: parseFloat(values.price),
          stock: parseInt(values.stock),
        };
        await addProduct(payload);
        toast.success(`${values.name} integrated into ledger.`);
        setIsAddModalOpen(false);
        resetForm();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to create product');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // ─── Filter & Search ────────────────────────────────────────
  const visibleProducts = useMemo(() => {
    return productList.filter((product) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        (product.name || '').toLowerCase().includes(term) ||
        (product.supplier || '').toLowerCase().includes(term) ||
        (product.category || '').toLowerCase().includes(term) ||
        (product.sku || '').toLowerCase().includes(term);

      const matchesStatus = 
        activeStatus === 'All' || 
        product.status === activeStatus || 
        product.category === activeStatus;
      return matchesSearch && matchesStatus;
    });
  }, [productList, searchTerm, activeStatus]);

  // ─── Compute dynamic stats ─────────────────────────────────
  const stats = useMemo(() => {
    const totalSKU = productList.length;
    const totalValue = productList.reduce((sum, p) => sum + (p.stock || 0) * (p.price || 0), 0);
    const inStockCount = productList.filter(p => p.status === 'In Stock').length;
    const healthPct = totalSKU > 0 ? ((inStockCount / totalSKU) * 100).toFixed(1) : '0.0';
    
    return [
      { label: 'Total Inventory SKU', value: totalSKU.toLocaleString(), icon: Layers, trend: summary ? `${summary.lowStockCount || 0} low` : '—' },
      { label: 'Asset Valuation', value: `Rs. ${totalValue >= 1000000 ? (totalValue / 1000000).toFixed(1) + 'M' : totalValue >= 1000 ? (totalValue / 1000).toFixed(1) + 'K' : totalValue.toFixed(0)}`, icon: TrendingUp, trend: totalSKU > 0 ? 'Live' : '—' },
      { label: 'Stock Health', value: `${healthPct}%`, icon: Package, trend: healthPct >= 90 ? 'Excellent' : healthPct >= 70 ? 'Good' : 'Needs attention' },
    ];
  }, [productList, summary]);

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      <SEOHead 
        title="Inventory Ledger" 
        description="Real-time tracking of stock levels, SKUs, and supply chain assets with precision data intelligence." 
        path="/dashboard/inventory" 
      />
      {/* ─── Header Section ─── */}
      <motion.div variants={rowAnim} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-6 sm:gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/80 uppercase tracking-[0.3em]">Stock Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text tracking-tighter leading-none">The <span className="text-primary italic font-normal serif">Ledger.</span></h1>
          <p className="text-text/80 text-xs font-medium">Precision tracking for your entire inventory ecosystem.</p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => refreshData()}
            className="px-6 py-4 bg-white border border-text/5 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-text/80 hover:text-text hover:border-primary/20 transition-all flex items-center gap-3 group"
          >
            <History size={16} className="group-hover:text-primary transition-colors" /> Refresh
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

      {/* ─── Stats & Highlights ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={rowAnim}>
            <GlassCard className="p-6 flex items-center justify-between group hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-text/5 rounded-2xl flex items-center justify-center text-text/70 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg">
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-text/70 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-text tracking-tight">{stat.value}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* ─── Controls & Filters ─── */}
      <motion.div variants={rowAnim} className="bg-white rounded-[24px] sm:rounded-[32px] border border-text/5 p-4 sm:p-8 mb-6 sm:mb-10 shadow-sm flex flex-col xl:flex-row gap-6 sm:gap-8 items-start xl:items-center justify-between">
        <div className="relative w-full max-w-2xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text/70 group-focus-within:text-primary transition-colors" size={20} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH BY SKU, PRODUCT, OR SUPPLIER..."
            className="w-full bg-background/50 border border-transparent rounded-[24px] py-5 pl-16 pr-6 text-[10px] font-black uppercase tracking-widest text-text placeholder:text-text/70 outline-none transition-all focus:bg-white focus:border-primary/20"
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {!['All', 'In Stock', 'Low Stock', 'Out of Stock'].includes(activeStatus) && (
            <div className="flex shrink-0 items-center gap-2 px-4 py-3 bg-primary/5 text-primary rounded-[16px] border border-primary/20">
              <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">{activeStatus}</span>
              <button onClick={() => setActiveStatus('All')} className="p-1 hover:bg-primary/10 rounded-full transition-colors shrink-0">
                <X size={14} />
              </button>
            </div>
          )}
          <div className="flex items-center p-1.5 bg-background rounded-[20px] border border-text/5">
            {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-4 sm:px-6 py-3 sm:py-3.5 rounded-[16px] text-[9px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                  activeStatus === status
                    ? 'bg-white text-text shadow-sm border border-text/10'
                    : 'text-text/70 hover:text-text'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <button className="p-5 bg-background rounded-2xl border border-text/5 text-text/70 hover:text-text transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </motion.div>

      {/* ─── Main Ledger ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6 sm:gap-10 items-start">
        <motion.div variants={rowAnim} className="bg-white rounded-[28px] sm:rounded-[40px] border border-text/5 shadow-premium overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="p-8">
              <TableSkeleton rows={8} />
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center px-8">
              <div className="w-20 h-20 bg-text/5 rounded-3xl flex items-center justify-center text-text/70 mb-6">
                <Package size={40} strokeWidth={1} />
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-text/70 mb-2">
                {productList.length === 0 ? 'No Products Yet' : 'No Matches Found'}
              </p>
              <p className="text-xs text-text/70 font-medium leading-relaxed max-w-sm">
                {productList.length === 0
                  ? 'Register your first asset to begin tracking inventory in real-time.'
                  : 'Try adjusting your search or filter criteria.'}
              </p>
              {productList.length === 0 && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-6 px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center gap-2"
                >
                  <Plus size={14} /> Register First Asset
                </button>
              )}
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-text/[0.02] border-b border-text/5">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/70">Product Details</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/70">Category</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/70">Inventory</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/70">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text/70 text-right">Actions</th>
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
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-1 h-10 rounded-full transition-all duration-500 ${selectedProduct?._id === product._id ? 'bg-primary' : 'bg-text/5 group-hover:bg-text/10'}`} />
                          <div className="flex flex-col">
                            <span className="font-bold text-text text-sm tracking-tight">{product.name}</span>
                            <span className="text-[10px] font-bold text-text/80 mt-1 uppercase tracking-widest">{product.sku}{product.supplier ? ` • ${product.supplier}` : ''}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setActiveStatus(product.category); }}
                          className="text-xs font-bold text-text/80 uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
                        >
                          {product.category}
                        </button>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-text tracking-tight">{product.stock} units</span>
                          <span className="text-[9px] font-black text-text/70 uppercase tracking-widest mt-1">Rs. {(product.price || 0).toFixed(2)}/unit</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-3 text-text/70 hover:text-primary transition-colors">
                            <ShoppingBag size={18} />
                          </button>
                          <button className="p-3 text-text/70 hover:text-text transition-colors">
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
          )}
        </motion.div>

        {/* ─── Detail Panel ─── */}
        <AnimatePresence mode="wait">
          {loading ? (
             <CardSkeleton />
          ) : selectedProduct ? (
            <motion.div 
              key={selectedProduct._id}
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
                  <X size={16} className="text-text/70" />
                </button>
                <ProductDetailPanel product={{
                  ...selectedProduct,
                  id: selectedProduct._id,
                  code: selectedProduct.sku,
                  stock: `${selectedProduct.stock} units`,
                  price: `Rs. ${(selectedProduct.price || 0).toFixed(2)}`
                }} onClose={() => setSelectedProduct(null)} />
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="sticky top-32 h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center p-10 bg-white/40 rounded-[40px] border border-dashed border-text/10"
            >
              <div className="w-16 h-16 bg-text/5 rounded-3xl flex items-center justify-center text-text/70 mb-6">
                <Package size={32} strokeWidth={1} />
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-text/70 mb-2">No Asset Selected</p>
              <p className="text-xs text-text/70 font-medium leading-relaxed">Select an item from the ledger to view detailed analytics and manage stock.</p>
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
              className="absolute inset-0 bg-text/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-text/5 flex items-center justify-between bg-background/30">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Inventory Integration</span>
                  <h2 className="text-3xl font-bold text-text tracking-tighter italic serif">Asset Registration.</h2>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-background transition-colors text-text/70">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="p-10 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text/70 ml-1">Asset Name</label>
                    <input 
                      name="name"
                      type="text" 
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-background border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-text/5'} rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-primary/20 transition-all`} 
                      placeholder="e.g. Paracetamol 500mg" 
                    />
                    {formik.touched.name && formik.errors.name && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{formik.errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text/70 ml-1">SKU Code</label>
                    <input 
                      name="sku"
                      type="text" 
                      value={formik.values.sku}
                      onChange={formik.handleChange}
                      className="w-full bg-background border border-text/5 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-primary/20 transition-all" 
                      placeholder="Auto-generated if empty" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text/70 ml-1">Category</label>
                    <input 
                      name="category"
                      type="text"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      className="w-full bg-background border border-text/5 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-primary/20 transition-all" 
                      placeholder="e.g. Analgesics" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text/70 ml-1">Supplier</label>
                    <input 
                      name="supplier"
                      type="text"
                      value={formik.values.supplier}
                      onChange={formik.handleChange}
                      className="w-full bg-background border border-text/5 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-primary/20 transition-all" 
                      placeholder="e.g. PharmaCorp Inc." 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text/70 ml-1">Unit Price (Rs.)</label>
                    <input 
                      name="price"
                      type="number" 
                      step="0.01"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-background border ${formik.touched.price && formik.errors.price ? 'border-red-500' : 'border-text/5'} rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-primary/20 transition-all`} 
                      placeholder="4.50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text/70 ml-1">Initial Stock</label>
                    <input 
                      name="stock"
                      type="number" 
                      min="0"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-background border ${formik.touched.stock && formik.errors.stock ? 'border-red-500' : 'border-text/5'} rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-primary/20 transition-all`} 
                      placeholder="0" 
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full py-6 bg-text text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-text/20 hover:bg-primary transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {formik.isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Registering...
                      </>
                    ) : (
                      'Integrate into Ledger'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </motion.div>
  );
};

export default InventoryPage;
