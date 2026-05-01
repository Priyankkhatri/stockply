import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ArrowRight, ArrowLeft, Tag, Plus, X, Sparkles, Check, SkipForward, Users } from 'lucide-react';
import { onboardingAPI } from '../services/api';
import Logo from '../components/Logo';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const CATEGORY_SUGGESTIONS = [
  'Pharmaceuticals', 'Medical Supplies', 'Groceries', 'Electronics',
  'Textiles', 'FMCG', 'Hardware', 'Stationery', 'Cosmetics', 'Other'
];

export default function SupplierOnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Step 1 — Profile
  const [profile, setProfile] = useState({
    name: localStorage.getItem('userName') || '',
    companyName: '',
  });
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');

  const addCategory = (cat) => {
    const value = cat || categoryInput.trim();
    if (!value || categories.includes(value)) return;
    setCategories(prev => [...prev, value]);
    setCategoryInput('');
  };

  const removeCategory = (cat) => {
    setCategories(prev => prev.filter(c => c !== cat));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await onboardingAPI.completeSupplier({
        ...profile,
        categoriesSupplied: categories
      });
      localStorage.setItem('onboardingComplete', 'true');
      navigate('/supplier/dashboard');
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
      navigate('/supplier/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const canProceedStep1 = profile.companyName.trim();

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
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
            Setup Your <span className="text-primary italic font-normal serif">Supply Portal.</span>
          </h1>
          <p className="text-text/70 text-sm font-medium">
            {step === 1 ? 'Tell us about your company.' : 'Connect with retail partners.'}
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
                  <label className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em] block mb-3">Company Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.companyName}
                      onChange={e => setProfile(p => ({ ...p, companyName: e.target.value }))}
                      placeholder="e.g. Acme Apothecary Supplies"
                      className="w-full px-6 py-4 bg-background border border-text/5 rounded-2xl text-sm font-bold text-text placeholder:text-text/70 focus:outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                    />
                    <Building2 size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-text/70 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-text/70 uppercase tracking-[0.2em] block mb-3">Categories Supplied</label>
                  
                  {/* Tags */}
                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories.map(cat => (
                        <span key={cat} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider">
                          {cat}
                          <button onClick={() => removeCategory(cat)} className="hover:text-rose-500 transition-colors">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {CATEGORY_SUGGESTIONS.filter(c => !categories.includes(c)).map(cat => (
                      <button
                        key={cat}
                        onClick={() => addCategory(cat)}
                        className="px-3 py-1.5 rounded-full border border-text/10 text-[9px] font-black text-text/70 uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all"
                      >
                        + {cat}
                      </button>
                    ))}
                  </div>

                  {/* Custom input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={categoryInput}
                      onChange={e => setCategoryInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addCategory()}
                      placeholder="Add custom category..."
                      className="flex-1 px-5 py-3 bg-background border border-text/5 rounded-xl text-xs font-bold text-text placeholder:text-text/70 focus:outline-none focus:border-primary/20 transition-all"
                    />
                    <button
                      onClick={() => addCategory()}
                      disabled={!categoryInput.trim()}
                      className="px-4 py-3 bg-text text-white rounded-xl text-xs font-bold hover:bg-primary transition-all disabled:bg-text/10 disabled:text-text/70"
                    >
                      <Plus size={16} />
                    </button>
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
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text tracking-tight">Retail Partners</h3>
                    <p className="text-[10px] font-bold text-text/70 uppercase tracking-widest">You can add shops later from your dashboard</p>
                  </div>
                </div>

                <div className="py-16 text-center">
                  <Users size={48} className="mx-auto text-text/10 mb-6" />
                  <p className="text-sm font-bold text-text/70 mb-2">No shops connected yet</p>
                  <p className="text-[10px] text-text/70 max-w-sm mx-auto">
                    Shops will appear here once they place orders through your supply portal. You can also invite them manually from your dashboard.
                  </p>
                </div>

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
                        Launch Portal <Sparkles size={16} />
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
