import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Plus, 
  AlertTriangle, 
  Truck, 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  Check, 
  X,
  Search,
  ArrowUpDown,
  MoreHorizontal
} from 'lucide-react';
import { useSupplier } from '../context/SupplierContext';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

const AlertCard = ({ type, category, name, value, threshold, color }) => {
  const colors = {
    rose: 'text-rose-500 bg-rose-50 border-rose-100',
    orange: 'text-orange-500 bg-orange-50 border-orange-100',
  };

  return (
    <GlassCard className="flex flex-col justify-between h-[220px] p-6 group">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className={`text-[9px] font-black uppercase tracking-widest ${color === 'rose' ? 'text-rose-500' : 'text-orange-400'}`}>{category}</p>
          <h4 className="font-bold text-text text-lg tracking-tight">{name}</h4>
        </div>
        <div className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-tighter border ${colors[color]}`}>
          {type}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-text mb-1 tracking-tighter">{value}</p>
        <p className="text-[9px] font-black text-text/60 uppercase tracking-widest">{threshold}</p>
      </div>
      <PremiumButton variant={color === 'rose' ? 'primary' : 'secondary'} size="sm" className="w-full mt-4 h-10 text-[10px]">
        {color === 'rose' ? 'Urgent Order' : 'Manage Stock'}
      </PremiumButton>
    </GlassCard>
  );
};

const InventoryRow = ({ product, isEditing, onUpdateStock }) => {
  const [adjustmentValue, setAdjustmentValue] = useState(1);

  return (
    <motion.tr 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`group transition-all duration-500 ${
        isEditing 
          ? 'bg-primary/5' 
          : 'hover:bg-background/40'
      }`}
    >
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={product.img || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=100&auto=format&fit=crop'} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-text/5 shadow-sm group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div>
            <p className="font-bold text-text text-sm mb-0.5 leading-tight tracking-tight">{product.name}</p>
            <p className="text-[9px] text-text/50 font-black uppercase tracking-widest">SKU: {product.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black border uppercase tracking-widest ${
          product.category === 'Fabric' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
          product.category === 'Leather' ? 'bg-orange-50 text-orange-600 border-orange-100' :
          'bg-blue-50 text-blue-600 border-blue-100'
        }`}>
          {product.category}
        </span>
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <p className="text-sm font-bold text-text tracking-tight">{product.stock} <span className="text-[9px] text-text/60 font-medium uppercase ml-1">{product.unit || 'units'}</span></p>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
            <input 
              type="number" 
              value={adjustmentValue}
              onChange={(e) => setAdjustmentValue(parseInt(e.target.value) || 0)}
              className="w-10 px-2 py-0.5 bg-background border border-text/5 rounded-md text-[10px] font-bold"
            />
            <button onClick={() => onUpdateStock(product._id, adjustmentValue, 'IN')} className="p-0.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors">
              <Plus size={12} />
            </button>
            <button onClick={() => onUpdateStock(product._id, adjustmentValue, 'OUT')} className="p-0.5 text-rose-600 hover:bg-rose-50 rounded transition-colors">
              <X size={12} />
            </button>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <p className="text-sm font-bold text-text tracking-tight">Rs. {product.price}</p>
      </td>
      <td className="px-6 py-5 text-xs font-bold text-text/40">{product.moq}</td>
      <td className="px-6 py-5 text-xs font-bold text-text/40">{product.leadTime}</td>
      <td className="px-6 py-5">
        <StatusBadge status={product.status || 'In Stock'} />
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2.5 text-text/60 hover:text-text transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default function SupplierInventoryPage() {
  const { products, summary, loading, addProduct, updateStock } = useSupplier();
  const [activeTab, setActiveTab] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.sku) return;
    
    await addProduct({
      ...newProduct,
      stock: parseInt(newProduct.stock) || 0,
      price: parseInt(newProduct.price) || 0,
      moq: parseInt(newProduct.moq) || 0
    });
    
    setIsAddModalOpen(false);
    setNewProduct({
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
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === 'All Items') return matchesSearch;
      if (activeTab === 'Raw Materials') return matchesSearch && (product.category === 'Fabric' || product.category === 'Leather');
      return matchesSearch && product.category === activeTab;
    });
  }, [products, searchQuery, activeTab]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-xs font-black uppercase tracking-widest text-text/70">Syncing Warehouse Data...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-[1600px] mx-auto pb-10 px-10 pt-10">
      <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/60 uppercase tracking-[0.3em]">Stock Intelligence</span>
          </div>
          <h1 className="text-4xl font-bold text-text tracking-tighter leading-none">The <span className="text-primary italic font-normal serif">Ledger.</span></h1>
          <p className="text-text/70 text-xs font-medium">Precision tracking for your entire inventory ecosystem.</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-6 py-4 bg-white border border-text/5 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-text/70 hover:text-text transition-all flex items-center gap-3">
            <Upload size={16} /> Export
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="px-8 py-4 bg-text text-white rounded-[22px] text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-2xl shadow-text/10"
          >
            <Plus size={18} /> Register SKU
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-text/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-text/5"
            >
              <div className="p-10 border-b border-text/5 flex items-center justify-between bg-background/50">
                <div>
                  <h3 className="text-2xl font-bold text-text">Add New SKU</h3>
                  <p className="text-[10px] font-black text-text/50 uppercase tracking-widest mt-1">Initialize raw material entry</p>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-background transition-colors text-text/50">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-10 grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-widest ml-1">Product Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Raw Silk" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-widest ml-1">SKU ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. SLK-001" 
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-widest ml-1">Category</label>
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
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-widest ml-1">Barcode / EAN</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 890123456789" 
                    value={newProduct.barcode}
                    onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/60 uppercase tracking-widest ml-1">Initial Stock</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      placeholder="0" 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className="flex-1 px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                    />
                    <span className="text-[10px] font-black text-text/30 uppercase mr-2">Units</span>
                  </div>
                </div>
              </div>

              <div className="px-10 py-8 bg-background/50 border-t border-text/5 flex items-center justify-end gap-4">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-8 py-4 text-xs font-black uppercase tracking-widest text-text/60 hover:text-text transition-colors"
                >
                  Discard
                </button>
                <PremiumButton onClick={handleAddProduct} className="px-10">
                  Save Product
                </PremiumButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary/5 rounded-[40px] p-10 mb-12 border border-primary/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -mr-32 -mt-32" />
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-sm border border-rose-100">
              <AlertTriangle size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-text text-xl tracking-tight">Critical Alerts</h3>
              <p className="text-[10px] font-black text-text/60 uppercase tracking-[0.2em]">{summary?.lowStockCount + summary?.outOfStockCount || 0} items require immediate replenishment</p>
            </div>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <AlertCard 
            type="Critical" 
            category="Fabric" 
            name="Raw Silk - 200TC" 
            value="12 mtrs" 
            threshold="Below MOQ (50)" 
            color="rose"
          />
          <AlertCard 
            type="Warning" 
            category="Hardware" 
            name="Brass Findings" 
            value="45 units" 
            threshold="Resupply in 2 days" 
            color="orange"
          />
          <GlassCard className="flex flex-col justify-between h-[220px] p-6">
            <div>
              <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center mb-4 text-text/40">
                <Truck size={24} />
              </div>
              <h4 className="font-bold text-text text-lg tracking-tight mb-1">Delayed Shipment</h4>
              <p className="text-[11px] text-text/60 font-medium max-w-[220px] leading-relaxed">
                PO #4029 from Linen Co. is overdue by 3 days.
              </p>
            </div>
            <PremiumButton variant="ghost" size="sm" className="border border-text/10 uppercase tracking-widest mt-4 h-10 text-[10px]">
              Track ID
            </PremiumButton>
          </GlassCard>
        </div>
      </motion.div>

      <section className="bg-white rounded-[40px] border border-text/5 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-text/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/50">
          <div className="flex items-center gap-8">
            {['All Items', 'Raw Materials', 'Packaging', 'Finished Goods'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-black uppercase tracking-widest transition-all relative py-2 ${
                  activeTab === tab ? 'text-text' : 'text-text/50 hover:text-text'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-8 left-0 right-0 h-1.5 bg-primary rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by SKU or name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3.5 bg-background border border-transparent rounded-2xl text-xs font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all w-full lg:w-72"
              />
            </div>
            <button className="p-3.5 text-text/60 hover:text-primary transition-all bg-background rounded-2xl border border-transparent hover:border-primary/10 hover:shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="lg:hidden divide-y divide-text/5 bg-white">
          {filteredProducts.map(product => (
            <div key={product._id || product.sku} className="p-6 space-y-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <img 
                    src={product.img || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=100&auto=format&fit=crop'} 
                    alt={product.name} 
                    className="w-14 h-14 rounded-xl object-cover border border-text/5"
                  />
                  <div>
                    <h4 className="font-bold text-text text-base leading-tight">{product.name}</h4>
                    <p className="text-[10px] text-text/50 font-black uppercase tracking-widest mt-1">SKU: {product.sku}</p>
                  </div>
                </div>
                <StatusBadge status={product.status || 'In Stock'} />
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="p-4 bg-background/50 rounded-2xl border border-text/5">
                  <p className="text-[9px] font-black text-text/50 uppercase tracking-widest mb-1">Stock Level</p>
                  <p className="text-sm font-bold text-text">{product.stock} <span className="text-[9px] text-text/40">{product.unit || 'units'}</span></p>
                </div>
                <div className="p-4 bg-background/50 rounded-2xl border border-text/5">
                  <p className="text-[9px] font-black text-text/50 uppercase tracking-widest mb-1">Price / Unit</p>
                  <p className="text-sm font-bold text-text">Rs. {product.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-background border border-text/5 rounded-xl px-2 py-1">
                    <button 
                      onClick={() => updateStock(product._id, 1, 'IN')}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                    <span className="text-xs font-bold px-2 text-text">1</span>
                    <button 
                      onClick={() => updateStock(product._id, 1, 'OUT')}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <PremiumButton variant="secondary" size="sm" className="flex-1">
                  Manage Item
                </PremiumButton>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[9px] font-black text-text/60 uppercase tracking-[0.25em] bg-background/30">
                <th className="px-6 py-5">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-text transition-colors">
                    Product <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Stock Level</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">MOQ</th>
                <th className="px-6 py-5">Lead Time</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text/5">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <InventoryRow 
                    key={product._id || product.sku} 
                    product={product} 
                    onUpdateStock={updateStock}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="px-10 py-8 border-t border-text/5 flex items-center justify-between bg-white/50">
          <p className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em]">Showing 1-3 of 124 items</p>
          <div className="flex items-center gap-6">
            <button className="p-2.5 rounded-xl text-text/40 transition-all" disabled>
              <ChevronLeft size={22} />
            </button>
            <div className="flex gap-3">
              {[1, 2, 3].map(page => (
                <button 
                  key={page}
                  className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                    page === 1 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' 
                      : 'bg-white text-text/60 hover:text-text hover:bg-background border border-text/5'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-2.5 rounded-xl text-text hover:text-primary transition-all hover:bg-background">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
