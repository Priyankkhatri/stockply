import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Store, Truck, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [role, setRole] = useState('shop'); // 'shop' or 'supplier'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    
    if (role === 'shop') {
      navigate('/dashboard');
    } else {
      navigate('/supplier/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex bg-background font-sans">
      {/* Left Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-24 justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 text-primary font-bold text-xl mb-12">
            <Package size={24} />
            <span>The Tactile Archive</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text mb-2">Welcome back.</h1>
            <p className="text-text/60">Securely access your inventory command center.</p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="text-[10px] font-bold tracking-widest text-text/40 uppercase mb-4 block">
              SELECT YOUR PORTAL
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('shop')}
                className={`flex flex-col p-4 rounded-xl border-2 transition-all text-left ${
                  role === 'shop'
                    ? 'border-primary bg-white shadow-sm'
                    : 'border-transparent bg-white/50 hover:bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg mb-3 w-fit ${role === 'shop' ? 'text-primary' : 'text-text/40'}`}>
                  <Store size={20} />
                </div>
                <span className={`font-bold text-sm ${role === 'shop' ? 'text-text' : 'text-text/60'}`}>Shop Owner</span>
                <span className="text-[10px] text-text/40">Manage retail stock</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('supplier')}
                className={`flex flex-col p-4 rounded-xl border-2 transition-all text-left ${
                  role === 'supplier'
                    ? 'border-primary bg-white shadow-sm'
                    : 'border-transparent bg-white/50 hover:bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg mb-3 w-fit ${role === 'supplier' ? 'text-primary' : 'text-text/40'}`}>
                  <Truck size={20} />
                </div>
                <span className={`font-bold text-sm ${role === 'supplier' ? 'text-text' : 'text-text/60'}`}>Supplier</span>
                <span className="text-[10px] text-text/40">Fulfill wholesale</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-text/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-text/30 tracking-widest text-[10px] font-bold">
                AUTHENTICATION
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-bold tracking-widest text-text/40 uppercase mb-2 block">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full p-4 rounded-lg border border-text/10 bg-white focus:outline-none focus:border-primary/50 text-sm transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold tracking-widest text-text/40 uppercase block">
                  PASSWORD
                </label>
                <a href="#" className="text-[10px] font-bold text-primary hover:text-primary-dark transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full p-4 rounded-lg border border-text/10 bg-white focus:outline-none focus:border-primary/50 text-sm transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20"
            >
              Continue <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 mt-12">
          <a href="#" className="text-[10px] font-bold text-text/40 hover:text-text/60 transition-colors">Terms of Service</a>
          <a href="#" className="text-[10px] font-bold text-text/40 hover:text-text/60 transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] font-bold text-text/40 hover:text-text/60 transition-colors">Contact Support</a>
        </div>
      </div>

      {/* Right Side: Visual Content */}
      <div className="hidden lg:block lg:w-1/2 bg-[#D9D9D9] relative overflow-hidden">
        {/* Placeholder for the abstract image from screenshot */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
          alt="Warehouse" 
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
        <div className="absolute bottom-8 right-8">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
            <div className="w-8 h-[1px] bg-white/20"></div>
            SYSTEM ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
