import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, ShoppingCart, User, Clock, DollarSign } from 'lucide-react';

const ProductDetailPanel = ({ product, onClose }) => {
  const navigate = useNavigate();
  if (!product) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-50 flex flex-col border-l border-text/5 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 border-b border-text/5 flex justify-between items-start">
        <div>
          <span className="bg-[#FDF2F0] text-[#E08D7B] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-2 block w-fit">
            {product.category}
          </span>
          <h2 className="text-xl font-bold text-text">{product.name}</h2>
          <p className="text-xs text-text/40 font-medium flex items-center gap-1 mt-1">
            <Store className="w-3 h-3" /> {product.supplier}
          </p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-background rounded-full transition-colors text-text/40">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background/50 p-4 rounded-xl border border-text/5">
            <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mb-1">Current Stock</p>
            <p className="text-2xl font-bold text-text">{product.stock.split(' ')[0]}</p>
          </div>
          <div className="bg-background/50 p-4 rounded-xl border border-text/5">
            <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest mb-1">Daily Sales</p>
            <p className="text-2xl font-bold text-text">~20</p>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="bg-[#FAF5F0] rounded-2xl p-5 border border-[#F0E5D8]">
          <div className="flex items-center gap-2 mb-3 text-[#C08552]">
            <Sparkles size={18} />
            <h3 className="font-bold text-sm">AI Recommendation</h3>
          </div>
          <p className="text-xs text-text/70 leading-relaxed">
            Stock will finish in <span className="text-red-500 font-bold">3 days</span> at current velocity. Recommended reorder: <span className="font-bold text-text">60 units.</span>
          </p>
        </div>

        {/* Supplier Details */}
        <div className="space-y-4">
          <h3 className="font-bold text-text text-sm">Supplier Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-text/40 font-medium">Contact</span>
              <span className="text-text font-bold">Jane Doe</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-text/40 font-medium">Lead Time</span>
              <span className="text-text font-bold">2-3 Business Days</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-text/40 font-medium">Unit Price</span>
              <span className="text-text font-bold">$1.45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-[#F9F6F2] border-t border-text/5 mt-auto">
        <button 
          onClick={() => navigate('/dashboard/inventory/compare')}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          <ShoppingCart size={18} />
          Reorder 60 Units
        </button>
      </div>
    </div>
  );
};

// Internal icon helper to avoid import issues if Store is not available
const Store = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 10V7"/></svg>
);

export default ProductDetailPanel;
