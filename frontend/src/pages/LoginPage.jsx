import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Truck, ArrowRight, ShieldCheck, Mail, Lock, User, Sparkles, ChevronRight } from 'lucide-react';
import { authAPI } from '../services/api';
import SEOHead from '../components/SEOHead';
import Logo from '../components/Logo';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('shop'); // 'shop' or 'supplier'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let res;
      if (isLogin) {
        res = await authAPI.login({ email, password, role });
      } else {
        res = await authAPI.signup({ email, password, role, name });
      }

      if (res.data.status === 'success') {
        const { token, data } = res.data;
        const user = data.user;

        localStorage.setItem('authToken', token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', user.role);
        
        if (user.role === 'shop') {
          navigate('/dashboard');
        } else {
          navigate('/supplier/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen flex bg-[#FDFCFB] font-sans selection:bg-primary/20 selection:text-primary overflow-hidden">
      <SEOHead
        title={isLogin ? "Log In — Stockply" : "Join Stockply"}
        description="Log in to your premium supply chain command center."
        path="/login"
      />

      {/* ─── Left Side: Cinematic Narrative ─── */}
      <div className="hidden lg:flex w-[40%] bg-text relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 flex items-center gap-4 group cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:bg-primary transition-all duration-500">
            <Logo size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-tighter uppercase leading-none">Stockply</span>
            <span className="text-[8px] font-black text-white/40 tracking-[0.4em] uppercase mt-1">Digital Atelier</span>
          </div>
        </motion.div>

        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            <Sparkles size={14} /> System v2.0.4 Active
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-white tracking-tighter leading-[0.9]"
          >
            Efficiency <br />
            Is an <br />
            <span className="text-primary italic font-normal serif">Art Form.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/40 text-sm font-medium leading-relaxed max-w-sm italic"
          >
            Enter your credentials to access the world's most refined supply chain ecosystem. Precision in every pixel, speed in every shipment.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 flex items-center gap-10"
        >
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-text bg-white/10 flex items-center justify-center text-[7px] font-bold text-white/40">U{i}</div>
            ))}
          </div>
          <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-relaxed">
            Trusted by premium <br /> retail partners globally.
          </p>
        </motion.div>
      </div>

      {/* ─── Right Side: Elegant Auth Flow ─── */}
      <div className="w-full lg:w-[60%] flex flex-col items-center justify-center p-8 md:p-20 bg-[#FDFCFB] relative">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-text/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="w-full max-w-[480px] space-y-10 relative z-10"
        >
          <div className="space-y-4">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-text tracking-tighter leading-none">
              {isLogin ? 'Welcome Back.' : 'Join the Network.'}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-text/40 text-sm font-medium">
              {isLogin 
                ? 'Sign in to manage your high-performance inventory.' 
                : 'Create an account to scale your logistics operations.'}
            </motion.p>
          </div>

          {/* Role Switcher */}
          <motion.div variants={fadeUp} className="space-y-4">
            <label className="text-[10px] font-black tracking-[0.3em] text-text/30 uppercase">Select Portal</label>
            <div className="grid grid-cols-2 gap-4 p-1.5 bg-background rounded-[24px] border border-text/5">
              <button
                onClick={() => setRole('shop')}
                className={`flex items-center justify-center gap-3 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  role === 'shop' 
                    ? 'bg-white text-text shadow-sm border border-text/5' 
                    : 'text-text/30 hover:text-text/60'
                }`}
              >
                <Store size={14} className={role === 'shop' ? 'text-primary' : ''} /> Shop Owner
              </button>
              <button
                onClick={() => setRole('supplier')}
                className={`flex items-center justify-center gap-3 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  role === 'supplier' 
                    ? 'bg-white text-text shadow-sm border border-text/5' 
                    : 'text-text/30 hover:text-text/60'
                }`}
              >
                <Truck size={14} className={role === 'supplier' ? 'text-primary' : ''} /> Supplier
              </button>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              {!isLogin && (
                <motion.div variants={fadeUp} className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-text/20 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="FULL NAME"
                    className="w-full bg-background border border-transparent rounded-[20px] py-5 pl-16 pr-6 text-xs font-bold text-text placeholder:text-text/20 outline-none transition-all focus:bg-white focus:border-primary/20"
                  />
                </motion.div>
              )}

              <motion.div variants={fadeUp} className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-text/20 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-background border border-transparent rounded-[20px] py-5 pl-16 pr-6 text-xs font-bold text-text placeholder:text-text/20 outline-none transition-all focus:bg-white focus:border-primary/20"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-text/20 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  className="w-full bg-background border border-transparent rounded-[20px] py-5 pl-16 pr-6 text-xs font-bold text-text placeholder:text-text/20 outline-none transition-all focus:bg-white focus:border-primary/20"
                />
                {isLogin && (
                  <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black text-primary uppercase tracking-widest hover:text-text transition-colors">
                    Reset
                  </button>
                )}
              </motion.div>
            </div>

            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={loading}
              className="w-full bg-text text-white py-6 rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-primary transition-all duration-500 shadow-2xl shadow-text/10 disabled:opacity-50 group"
            >
              {loading ? 'Authenticating...' : (isLogin ? 'Enter The Portal' : 'Create Account')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <motion.div variants={fadeUp} className="pt-6 flex flex-col items-center gap-8">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-text/40 hover:text-text transition-colors"
            >
              {isLogin ? "New to the system? Sign Up" : 'Returning user? Log In'}
            </button>

            <div className="flex items-center gap-8 text-[9px] font-bold text-text/20 uppercase tracking-widest">
              <a href="#" className="hover:text-text/40 transition-colors">Privacy</a>
              <div className="w-1 h-1 rounded-full bg-text/10" />
              <a href="#" className="hover:text-text/40 transition-colors">Security</a>
              <div className="w-1 h-1 rounded-full bg-text/10" />
              <a href="#" className="hover:text-text/40 transition-colors">Support</a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .serif {
          font-family: "Playfair Display", serif;
        }
      ` }} />
    </div>
  );
};

export default LoginPage;
