import React, { useState, useEffect } from 'react';
import { X, Search, Plus, Trash2, Package, User, IndianRupee } from 'lucide-react';
import PremiumButton from './PremiumButton';
import { userAPI, orderAPI } from '../services/api';

const CreateOrderModal = ({ onClose, onSuccess }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await userAPI.getSuppliers();
        setSuppliers(res.data?.data?.suppliers || []);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
      } finally {
        setLoadingSuppliers(false);
      }
    };
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.businessName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSupplier) return alert('Please select a supplier');
    if (items.some(item => !item.name || item.quantity <= 0)) return alert('Please fix item details');

    try {
      setSubmitting(true);
      const totalAmount = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
      
      const orderData = {
        supplierId: selectedSupplier._id,
        items,
        totalAmount,
        priority: 'Normal', // Default
      };

      await orderAPI.create(orderData);
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to create order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-text/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between p-8 border-b border-text/5 bg-background/50">
          <div>
            <h3 className="text-2xl font-bold text-text">Create Consignment</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-text/30 mt-1">Direct Procurement Flow</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-text/5 rounded-xl transition-colors">
            <X size={24} className="text-text/40" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10 scrollbar-hide">
          {/* Step 1: Select Supplier */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-xs">1</div>
              <h4 className="text-sm font-black uppercase tracking-widest text-text">Select Supplier</h4>
            </div>

            {!selectedSupplier ? (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text/20" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by name or business..."
                    className="w-full pl-12 pr-6 py-4 bg-background border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-primary/20 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {loadingSuppliers ? (
                    <div className="col-span-full py-10 text-center text-text/20 font-bold text-xs uppercase tracking-widest animate-pulse">Cataloging Suppliers...</div>
                  ) : filteredSuppliers.map(s => (
                    <div 
                      key={s._id}
                      onClick={() => setSelectedSupplier(s)}
                      className="p-5 rounded-2xl border border-text/5 hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-text/5 flex items-center justify-center text-text/20 group-hover:text-primary transition-colors">
                          <User size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-text text-sm">{s.businessName || s.name}</p>
                          <p className="text-[10px] text-text/30 font-bold">{s.email}</p>
                        </div>
                      </div>
                      <Plus size={20} className="text-text/10 group-hover:text-primary" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-teal-600/60">Selected Partner</p>
                    <p className="font-bold text-text text-base">{selectedSupplier.businessName || selectedSupplier.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedSupplier(null)}
                  className="text-[10px] font-black uppercase tracking-widest text-teal-600 hover:underline"
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Itemize */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-xs">2</div>
              <h4 className="text-sm font-black uppercase tracking-widest text-text">Itemized Manifest</h4>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end animate-in slide-in-from-left-4 duration-300">
                  <div className="md:col-span-5 space-y-2">
                    <label className="text-[9px] font-black text-text/20 uppercase tracking-widest ml-1">Product Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Organic Cotton Tee"
                      className="w-full px-5 py-3 bg-background border border-transparent rounded-xl text-xs font-bold focus:outline-none focus:bg-white focus:border-primary/20"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-[9px] font-black text-text/20 uppercase tracking-widest ml-1">Quantity</label>
                    <input 
                      type="number"
                      className="w-full px-5 py-3 bg-background border border-transparent rounded-xl text-xs font-bold focus:outline-none focus:bg-white focus:border-primary/20"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-[9px] font-black text-text/20 uppercase tracking-widest ml-1">Unit Price (Rs)</label>
                    <input 
                      type="number"
                      className="w-full px-5 py-3 bg-background border border-transparent rounded-xl text-xs font-bold focus:outline-none focus:bg-white focus:border-primary/20"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="md:col-span-1 flex justify-center pb-2">
                    {items.length > 1 && (
                      <button onClick={() => handleRemoveItem(index)} className="p-2 text-text/20 hover:text-rose-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button 
                onClick={handleAddItem}
                className="w-full py-4 border-2 border-dashed border-text/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text/20 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Line Item
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 lg:p-10 bg-text text-white flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Total Valuation</p>
            <div className="flex items-center gap-1">
              <IndianRupee size={24} className="text-primary" />
              <span className="text-3xl font-black tracking-tighter">
                {items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
              Cancel
            </button>
            <PremiumButton 
              onClick={handleSubmit}
              loading={submitting}
              className="px-12"
              variant="primary"
            >
              Issue Consignment
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderModal;
