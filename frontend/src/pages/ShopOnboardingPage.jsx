import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, MapPin, ArrowRight, ArrowLeft, Package, Plus, X, Sparkles, Check, SkipForward } from 'lucide-react';
import { onboardingAPI } from '../services/api';
import Logo from '../components/Logo';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const SHOP_TYPES = ['Pharmacy', 'Medical Store', 'Grocery', 'Electronics', 'Fashion', 'General Store', 'Other'];

export default function ShopOnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Step 1 — Profile
  const [profile, setProfile] = useState({
    name: localStorage.getItem('userName') || '',
    shopName: '',
    shopType: '',
    location: ''
  });

  // Step 2 — Initial products
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', quantity: '', barcode: '' });

  const handleAddProduct = () => {
    if (!newProduct.name.trim()) return;
    setProducts(prev => [...prev, { ...newProduct, quantity: parseInt(newProduct.quantity) || 0 }]);
    setNewProduct({ name: '', category: '', quantity: '', barcode: '' });
  };

  const handleRemoveProduct = (index) => {
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await onboardingAPI.completeShop({
        ...profile,
        products: products.length > 0 ? products : undefined
      });
      localStorage.setItem('onboardingComplete', 'true');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      await onboardingAPI.skip();
      localStorage.setItem('onboardingComplete', 'true');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const canProceedStep1 = profile.shopName.trim() && profile.shopType;

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-text/5 rounded-full blur-[80px] -ml-32 -mb-32" />

      <style dangerouslySetInnerHTML={{ __html: `.serif { font-family: "Playfair Display", serif; }` }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-text rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-text/20">
              <Logo size={24} />
            </div>
            <span className="text-text font-bold text-lg tracking-tighter uppercase">Stockply</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-text tracking-tighter leading-none mb-3">
            Setup Your <span className="text-primary italic font-normal serif">Shop.</span>
          </h1>
          <p className="text-text/70 text-sm font-medium">
            {step === 1 ? 'Tell us about your business.' : 'Add your first products (optional).'}
          </p>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${
                  step >= s ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-text/5 text-text/70'
                }`}>
                  {step > s ? <Check size={14} /> : s}
                </div>
                {s < 2 && <div className={`w-12 h-0.5 rounded-full transition-all duration-500 ${step > 1 ? 'bg-primary' : 'bg-text/10'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[40px] border border-text/5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.06)] p-8 sm:p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em] block mb-3">Your Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="w-full px-6 py-4 bg-background border border-text/5 rounded-2xl text-sm font-bold text-text placeholder:text-text/70 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em] block mb-3">Shop Name *</label>
                  <input
                    type="text"
                    value={profile.shopName}
                    onChange={e => setProfile(p => ({ ...p, shopName: e.target.value }))}
                    placeholder="e.g. MedPlus Pharmacy"
                    className="w-full px-6 py-4 bg-background border border-text/5 rounded-2xl text-sm font-bold text-text placeholder:text-text/70 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em] block mb-3">Shop Type *</label>
                    <div className="relative">
                      <select
                        value={profile.shopType}
                        onChange={e => setProfile(p => ({ ...p, shopType: e.target.value }))}
                        className="w-full px-6 py-4 bg-background border border-text/5 rounded-2xl text-sm font-bold text-text appearance-none focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                      >
                        <option value="">Select type</option>
                        {SHOP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <Store size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-text/70 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em] block mb-3">Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profile.location}
                        onChange={e => setProfile(p => ({ ...p, location: e.target.value }))}
                        placeholder="City, State"
                        className="w-full px-6 py-4 bg-background border border-text/5 rounded-2xl text-sm font-bold text-text placeholder:text-text/70 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                      />
                      <MapPin size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-text/70 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="text-rose-500 text-xs font-bold bg-rose-50 px-4 py-3 rounded-xl">{error}</p>
                )}

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={handleSkip}
                    disabled={loading}
                    className="flex items-center gap-2 text-[10px] font-black text-text/70 uppercase tracking-widest hover:text-text transition-colors"
                  >
                    <SkipForward size={14} /> Skip for now
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                    className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all ${
                      canProceedStep1
                        ? 'bg-text text-white shadow-2xl shadow-text/20 hover:bg-primary'
                        : 'bg-text/10 text-text/70 cursor-not-allowed'
                    }`}
                  >
                    Continue <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                <div className="flex items-center gap-3 pb-6 border-b border-text/5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text tracking-tight">Initial Inventory</h3>
                    <p className="text-[10px] font-bold text-text/70 uppercase tracking-widest">Add products to get started</p>
                  </div>
                </div>

                {/* Add product row */}
                <div className="grid grid-cols-12 gap-3">
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))}
                    placeholder="Product name"
                    className="col-span-4 px-4 py-3 bg-background border border-text/5 rounded-xl text-xs font-bold text-text placeholder:text-text/70 focus:outline-none focus:border-primary/20 transition-all"
                  />
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}
                    placeholder="Category"
                    className="col-span-3 px-4 py-3 bg-background border border-text/5 rounded-xl text-xs font-bold text-text placeholder:text-text/70 focus:outline-none focus:border-primary/20 transition-all"
                  />
                  <input
                    type="number"
                    value={newProduct.quantity}
                    onChange={e => setNewProduct(p => ({ ...p, quantity: e.target.value }))}
                    placeholder="Qty"
                    className="col-span-2 px-4 py-3 bg-background border border-text/5 rounded-xl text-xs font-bold text-text placeholder:text-text/70 focus:outline-none focus:border-primary/20 transition-all"
                  />
                  <input
                    type="text"
                    value={newProduct.barcode}
                    onChange={e => setNewProduct(p => ({ ...p, barcode: e.target.value }))}
                    placeholder="Barcode"
                    className="col-span-2 px-4 py-3 bg-background border border-text/5 rounded-xl text-xs font-bold text-text placeholder:text-text/70 focus:outline-none focus:border-primary/20 transition-all"
                  />
                  <button
                    onClick={handleAddProduct}
                    disabled={!newProduct.name.trim()}
                    className="col-span-1 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-primary-dark transition-all disabled:bg-text/10 disabled:text-text/70"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Product list */}
                {products.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {products.map((p, i) => (
                      <div key={i} className="flex items-center justify-between px-5 py-3 bg-background rounded-xl border border-text/5">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-text">{p.name}</span>
                          <span className="text-[9px] font-bold text-text/70 uppercase tracking-widest">{p.category || 'General'}</span>
                          <span className="text-[9px] font-bold text-primary">×{p.quantity || 0}</span>
                        </div>
                        <button onClick={() => handleRemoveProduct(i)} className="text-text/70 hover:text-rose-500 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Package size={32} className="mx-auto text-text/10 mb-4" />
                    <p className="text-[10px] font-black text-text/70 uppercase tracking-widest">No products added yet</p>
                    <p className="text-[9px] text-text/70 mt-1">You can always add them later from your dashboard</p>
                  </div>
                )}

                {error && (
                  <p className="text-rose-500 text-xs font-bold bg-rose-50 px-4 py-3 rounded-xl">{error}</p>
                )}

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-[10px] font-black text-text/70 uppercase tracking-widest hover:text-text transition-colors"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    onClick={handleSubmit}
                    className="px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Setting up...
                      </>
                    ) : (
                      <>
                        Launch Dashboard <Sparkles size={16} />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
