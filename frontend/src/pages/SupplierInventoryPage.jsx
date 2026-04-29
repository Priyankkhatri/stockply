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
    <GlassCard className="flex flex-col justify-between h-[240px] group">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className={`text-[10px] font-black uppercase tracking-widest ${color === 'rose' ? 'text-rose-500' : 'text-orange-400'}`}>{category}</p>
          <p className="font-bold text-text text-xl">{name}</p>
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${colors[color]}`}>
          {type}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-4xl font-bold text-text mb-1">{value}</p>
        <p className="text-[10px] font-black text-text/40 uppercase tracking-widest">{threshold}</p>
      </div>
      <PremiumButton variant={color === 'rose' ? 'primary' : 'secondary'} size="sm" className="w-full mt-4">
        {color === 'rose' ? 'Urgent Order' : 'Manage Stock'}
      </PremiumButton>
    </GlassCard>
  );
};

const InventoryRow = ({ product, isEditing, onEdit, onCancel }) => {
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
      <td className="px-10 py-8">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img src={product.img} alt={product.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div>
            <p className="font-bold text-text text-lg mb-1 leading-tight">{product.name}</p>
            <p className="text-[10px] text-text/30 font-black uppercase tracking-widest">SKU: {product.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-10 py-8">
        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black border uppercase tracking-widest ${
          product.category === 'Fabric' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
          product.category === 'Leather' ? 'bg-orange-50 text-orange-600 border-orange-100' :
          'bg-blue-50 text-blue-600 border-blue-100'
        }`}>
          {product.category}
        </span>
      </td>
      <td className="px-10 py-8">
        {isEditing ? (
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              defaultValue={product.stock}
              className="w-24 px-4 py-2.5 border border-primary/20 rounded-xl text-sm font-bold text-text focus:outline-none focus:ring-4 focus:ring-primary/10 bg-white"
            />
            <span className="text-[10px] font-black text-text/40 uppercase">{product.unit}</span>
          </div>
        ) : (
          <p className="text-sm font-bold text-text">{product.stock} <span className="text-[10px] text-text/40 font-medium uppercase ml-1">{product.unit}</span></p>
        )}
      </td>
      <td className="px-10 py-8">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-text/40">Rs.</span>
            <input 
              type="text" 
              defaultValue={product.price}
              className="w-32 px-4 py-2.5 border border-primary/20 rounded-xl text-sm font-bold text-text focus:outline-none focus:ring-4 focus:ring-primary/10 bg-white"
            />
          </div>
        ) : (
          <p className="text-sm font-bold text-text">Rs. {product.price}</p>
        )}
      </td>
      <td className="px-10 py-8 text-sm font-bold text-text/40">{product.moq}</td>
      <td className="px-10 py-8 text-sm font-bold text-text/40">{product.leadTime}</td>
      <td className="px-10 py-8">
        <StatusBadge status={product.status} />
      </td>
      <td className="px-10 py-8 text-right">
        {isEditing ? (
          <div className="flex items-center justify-end gap-3">
            <button 
              onClick={onCancel} 
              className="w-11 h-11 flex items-center justify-center text-text/40 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
            >
              <X size={20} />
            </button>
            <button 
              onClick={onCancel} 
              className="w-11 h-11 flex items-center justify-center bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
            >
              <Check size={20} strokeWidth={3} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={onEdit} 
              className="px-5 py-2.5 text-[10px] font-black text-primary hover:bg-primary/5 rounded-xl transition-all uppercase tracking-widest border border-transparent hover:border-primary/10"
            >
              Edit
            </button>
            <button className="p-2.5 text-text/40 hover:text-text transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        )}
      </td>
    </motion.tr>
  );
};

export default function SupplierInventoryPage() {
  const { products, addProduct } = useSupplier();
  const [activeTab, setActiveTab] = useState('All Items');
  const [editingRow, setEditingRow] = useState(null);
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
    status: 'In Stock',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=100&auto=format&fit=crop'
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku) return;
    
    addProduct(newProduct);
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
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=100&auto=format&fit=crop'
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === 'All Items') return matchesSearch;
      if (activeTab === 'Raw Materials') return matchesSearch && (product.category === 'Fabric' || product.category === 'Leather');
      return matchesSearch && product.category === activeTab;
    });
  }, [products, searchQuery, activeTab]);


  return (
    <div className="max-w-[1600px] mx-auto pb-10 px-10 pt-10">
      <PageHeader 
        title="Inventory Ledger"
        subtitle="Manage and track your raw materials with real-time visibility and precision."
        breadcrumbs={['Inventory', 'Ledger']}
        actions={
          <>
            <PremiumButton variant="secondary" icon={Upload}>
              Export Data
            </PremiumButton>
            <PremiumButton icon={Plus} onClick={() => setIsAddModalOpen(true)}>
              Add Product
            </PremiumButton>
          </>
        }
      />

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
                  <p className="text-[10px] font-black text-text/30 uppercase tracking-widest mt-1">Initialize raw material entry</p>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-background transition-colors text-text/30">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-10 grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/40 uppercase tracking-widest ml-1">Product Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Raw Silk" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/40 uppercase tracking-widest ml-1">SKU ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. SLK-001" 
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                    className="w-full px-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text/40 uppercase tracking-widest ml-1">Category</label>
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
                  <label className="text-[10px] font-black text-text/40 uppercase tracking-widest ml-1">Initial Stock</label>
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
                  className="px-8 py-4 text-xs font-black uppercase tracking-widest text-text/40 hover:text-text transition-colors"
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
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-rose-500 shadow-sm border border-rose-100">
              <AlertTriangle size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-text text-2xl">Critical Alerts</h3>
              <p className="text-[10px] font-black text-text/40 uppercase tracking-[0.2em]">3 items require immediate replenishment</p>
            </div>
          </div>
          <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
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
          <GlassCard className="flex flex-col justify-between h-[240px]">
            <div>
              <div className="w-14 h-14 bg-background rounded-3xl flex items-center justify-center mb-5 text-text/20">
                <Truck size={28} />
              </div>
              <h4 className="font-bold text-text text-lg mb-2">Delayed Shipment</h4>
              <p className="text-xs text-text/40 font-medium max-w-[220px]">
                PO #4029 from Linen Co. is overdue by 3 days.
              </p>
            </div>
            <PremiumButton variant="ghost" size="sm" className="border border-text/10 uppercase tracking-widest mt-6">
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
                  activeTab === tab ? 'text-text' : 'text-text/40 hover:text-text'
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
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text/30 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by SKU or name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3.5 bg-background border border-transparent rounded-2xl text-xs font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all w-full lg:w-72"
              />
            </div>
            <button className="p-3.5 text-text/40 hover:text-primary transition-all bg-background rounded-2xl border border-transparent hover:border-primary/10 hover:shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-text/30 uppercase tracking-[0.25em] bg-background/30">
                <th className="px-10 py-6">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-text transition-colors">
                    Product <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-10 py-6">Category</th>
                <th className="px-10 py-6">Stock Level</th>
                <th className="px-10 py-6">Price</th>
                <th className="px-10 py-6">MOQ</th>
                <th className="px-10 py-6">Lead Time</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-text/5">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <InventoryRow 
                    key={product.sku} 
                    product={product} 
                    isEditing={editingRow === product.sku}
                    onEdit={() => setEditingRow(product.sku)}
                    onCancel={() => setEditingRow(null)}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="px-10 py-8 border-t border-text/5 flex items-center justify-between bg-white/50">
          <p className="text-[10px] font-black text-text/40 uppercase tracking-[0.2em]">Showing 1-3 of 124 items</p>
          <div className="flex items-center gap-6">
            <button className="p-2.5 rounded-xl text-text/20 transition-all" disabled>
              <ChevronLeft size={22} />
            </button>
            <div className="flex gap-3">
              {[1, 2, 3].map(page => (
                <button 
                  key={page}
                  className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                    page === 1 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' 
                      : 'bg-white text-text/40 hover:text-text hover:bg-background border border-text/5'
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
