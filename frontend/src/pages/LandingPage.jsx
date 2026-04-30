import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, ArrowRight, Sparkles, BarChart3, Shield, Zap,
  Users, ShoppingCart, Truck, Star, ChevronRight, Globe,
  Menu, X, Play, ArrowUpRight
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Logo from '../components/Logo';
import heroImage from '../assets/hero-dashboard.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Network', href: '#ecosystem' },
    { label: 'Vision', href: '#philosophy' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <SEOHead
        title="Stockply — Advanced Supply Chain & Inventory Management"
        description="Stockply simplifies complex logistics with a high-performance inventory management platform. Real-time tracking, actionable analytics, and seamless fulfillment for the modern retail ecosystem."
        path="/"
      />

      {/* ─── Sophisticated Navigation ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`max-w-[1400px] mx-auto px-8 transition-all duration-700 ${scrolled ? 'scale-[0.98]' : 'scale-100'}`}>
          <div className={`flex items-center justify-between px-10 h-20 rounded-[32px] border transition-all duration-700 ${
            scrolled 
              ? 'bg-white/80 backdrop-blur-2xl border-text/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)]' 
              : 'bg-transparent border-transparent'
          }`}>
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-12 h-12 bg-text rounded-2xl flex items-center justify-center text-white shadow-xl shadow-text/10 group-hover:bg-primary transition-all duration-500">
                <Logo size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-text tracking-tighter uppercase leading-none">Stockply</span>
                <span className="text-[8px] font-black text-text/20 tracking-[0.4em] uppercase mt-1">Digital Atelier</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map(l => (
                <a key={l.label} href={l.href} className="text-[10px] font-bold uppercase tracking-[0.3em] text-text/40 hover:text-primary transition-all relative group">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="hidden sm:flex items-center gap-2 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-text/60 hover:text-text transition-all"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="px-10 py-4 bg-text text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-2xl hover:bg-primary transition-all duration-500 shadow-xl shadow-text/10"
              >
                Join Now
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-12 h-12 flex items-center justify-center text-text hover:text-primary transition-colors">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Hero: The Grand Entrance ─── */}
      <section className="relative pt-64 pb-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              className="lg:col-span-6 space-y-10"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary/10 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
                <Sparkles size={14} /> Intelligence for supply chains
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-bold text-text tracking-[-0.05em] leading-[0.9] lg:max-w-xl">
                Scale Your <br />
                <span className="text-primary italic font-normal serif">Supply Chain.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-xl text-text/50 max-w-lg leading-relaxed font-medium">
                Stockply simplifies complex logistics with a high-performance inventory management platform. Built for businesses that value speed, precision, and efficiency.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                <button onClick={() => navigate('/login')} className="group w-full sm:w-auto px-12 py-6 bg-text text-white font-bold text-[11px] uppercase tracking-[0.25em] rounded-[2rem] hover:bg-primary transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl shadow-text/20">
                  Enter The Portal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-full border border-text/5 bg-white flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                    <Play size={20} fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text/40 group-hover:text-text transition-colors">Watch Film</span>
                </button>
              </motion.div>

              <motion.div variants={fadeUp} className="pt-12 flex items-center gap-10">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-background/50 flex items-center justify-center text-[8px] font-bold text-text/40">U{i}</div>
                  ))}
                </div>
                <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest italic leading-relaxed">
                  Trusted by 500+ premium <br /> retail partners across India.
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative z-10 rounded-[60px] overflow-hidden border border-text/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-white p-4">
                <img src={heroImage} alt="Stockply Dashboard" className="w-full h-auto rounded-[48px]" />
              </div>
              {/* Floating Decorative Element */}
              <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" 
              />
              <motion.div 
                animate={{ y: [0, 20, 0] }} 
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-64 h-64 bg-text/5 rounded-full blur-3xl" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Philosophical Divider ─── */}
      <section className="py-24 border-y border-text/5 overflow-hidden">
        <div className="flex items-center gap-20 whitespace-nowrap animate-marquee">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-20">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-text/20 italic">Precision over volume</span>
              <div className="w-2 h-2 rounded-full bg-primary/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-text/20 italic">Clarity over complexity</span>
              <div className="w-2 h-2 rounded-full bg-primary/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-text/20 italic">Flow over friction</span>
              <div className="w-2 h-2 rounded-full bg-primary/20" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Intelligence Section ─── */}
      <section id="features" className="py-48 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-5 sticky top-48">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-10">Advanced Features</p>
              <h2 className="text-5xl md:text-7xl font-bold text-text tracking-tighter leading-[0.95] mb-12">
                Built for the <br />
                Future of <br />
                <span className="text-text/20">Retail Logistics.</span>
              </h2>
              <p className="text-lg text-text/50 font-medium leading-relaxed max-w-md">
                We don't build features. We build experiences that empower decisions. Every interaction in Stockply is calibrated for absolute clarity.
              </p>
              <div className="mt-16 space-y-8">
                {[
                  'Real-time Inventory Ledger',
                  'Predictive Replenishment Alerts',
                  'Multi-City Fulfillment Routing',
                  'Executive Analytics Studio'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-[3] transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text/60 group-hover:text-text transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { icon: Package, title: 'Smart Inventory', desc: 'A sophisticated ledger system for precision tracking. Monitor SKU movements with absolute accuracy and zero latency.' },
                { icon: BarChart3, title: 'Actionable Insights', desc: 'Visual data that drives growth. We transform raw numbers into intuitive dashboards that highlight opportunities instantly.' },
                { icon: Shield, title: 'Secure Infrastructure', desc: 'Enterprise-grade protection with JWT authentication and role-based access control built for performance.' },
                { icon: Zap, title: 'Hyper-Fulfillment', desc: 'The fastest path from order to arrival. Automated routing that eliminates the bottlenecks of traditional logistics.' },
                { icon: Users, title: 'Partner Network', desc: 'Connect your entire ecosystem. Manage suppliers and retailers through a unified portal built for synergy.' },
                { icon: Globe, title: 'Global Backbone', desc: 'Cloud-native architecture that scales with your ambition. Consistent performance across any geography.' },
              ].map((f, i) => (
                <div key={i} className="p-12 rounded-[48px] bg-white border border-text/5 hover:border-primary/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 group">
                  <div className="w-16 h-16 rounded-3xl bg-background flex items-center justify-center text-text/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-10 shadow-sm">
                    <f.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-6 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-text/40 font-medium leading-relaxed italic">{f.desc}</p>
                  <div className="mt-10 pt-10 border-t border-text/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary">Learn Mastery</span>
                    <ArrowUpRight size={16} className="text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Growth: The Visual Proof ─── */}
      <section id="ecosystem" className="py-48 px-8 bg-text text-white rounded-[80px] mx-8 my-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -mr-96 -mt-96" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] -ml-72 -mb-72" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Our Impact</p>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85]">
                Driving <br />
                Growth for <br />
                Modern Retail.
              </h2>
              <div className="grid grid-cols-2 gap-16 pt-12">
                {[
                  { l: 'Processed Volume', v: '₹840Cr+' },
                  { l: 'Cities Connected', v: '142+' },
                  { l: 'Daily Shipments', v: '45k' },
                  { l: 'Uptime SLA', v: '99.9%' },
                ].map(s => (
                  <div key={s.l} className="space-y-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{s.l}</p>
                    <p className="text-4xl font-bold tracking-tight">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="p-16 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-xl">
                <blockquote className="text-3xl font-medium italic serif leading-relaxed mb-16 text-white/80">
                  "Stockply didn't just give us a dashboard; it gave us a competitive edge. Our inventory cycle time dropped by 60% in the first quarter."
                </blockquote>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/10" />
                  <div>
                    <p className="text-lg font-bold">Vikram Mehta</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Director, Mehta Logistics</p>
                  </div>
                </div>
              </div>
              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -30, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 p-8 rounded-[32px] bg-primary text-white shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Live Efficiency</span>
                </div>
                <p className="text-3xl font-bold tracking-tighter">98.2%</p>
              </motion.div>
            </div>
          </div>

          <div className="mt-48 pt-24 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <h2 className="text-4xl font-bold tracking-tight max-w-md">Begin your journey towards supply chain mastery.</h2>
            <button onClick={() => navigate('/login')} className="px-16 py-8 bg-white text-text font-bold text-[12px] uppercase tracking-[0.3em] rounded-full hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl">
              Launch Now
            </button>
          </div>
        </div>
      </section>

      {/* ─── Philosophy: The Stockply Way ─── */}
      <section id="philosophy" className="py-48 px-8">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-12">Our Vision</p>
          <h2 className="text-6xl md:text-9xl font-bold text-text tracking-tighter leading-none mb-24 max-w-5xl mx-auto">
            Efficiency <br />
            <span className="text-text/10">at any scale.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
            {[
              { t: 'The Minimalist Edge', d: 'We remove the noise. You focus on the signals. A clean interface leads to clean decisions.' },
              { t: 'Connected Craft', d: 'Relationships are the bedrock of logistics. We build features that strengthen your partner bonds.' },
              { t: 'Future-Proof Flow', d: 'Logistics changes every hour. Our architecture adapts every minute. Built to lead, never to follow.' },
            ].map((p, i) => (
              <div key={i} className="space-y-6">
                <h3 className="text-xl font-bold text-text tracking-tight">{p.t}</h3>
                <p className="text-sm text-text/40 font-medium leading-relaxed italic">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer: The Final Impression ─── */}
      <footer className="pt-48 pb-24 px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-20 pb-32 border-b border-text/5">
            <div className="col-span-2 md:col-span-4 space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-text rounded-[20px] flex items-center justify-center text-white">
                  <Logo size={28} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-text tracking-tighter uppercase leading-none">Stockply</span>
                  <span className="text-[9px] font-black text-text/20 tracking-[0.4em] uppercase mt-1">Digital Atelier</span>
                </div>
              </div>
              <p className="text-sm text-text/40 font-medium max-w-xs leading-relaxed italic">
                Defining the new standard for premium supply chain management. Beautifully simple, powerfully connected.
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-text">Explore</p>
              <ul className="space-y-4 text-[11px] font-bold text-text/40 uppercase tracking-widest">
                <li><a href="#features" className="hover:text-primary transition-colors">Intelligence</a></li>
                <li><a href="#ecosystem" className="hover:text-primary transition-colors">Ecosystem</a></li>
                <li><a href="#philosophy" className="hover:text-primary transition-colors">Philosophy</a></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-text">Portal</p>
              <ul className="space-y-4 text-[11px] font-bold text-text/40 uppercase tracking-widest">
                <li><button onClick={() => navigate('/login')} className="hover:text-primary transition-colors">Sign In</button></li>
                <li><button onClick={() => navigate('/login')} className="hover:text-primary transition-colors">Register</button></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-4 space-y-8 md:text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-text">Journal</p>
              <p className="text-sm text-text/40 font-medium italic">Subscribe to the Stockply monthly dispatch.</p>
              <div className="relative max-w-sm md:ml-auto">
                <input 
                  type="email" 
                  placeholder="atelier@stockply.com" 
                  className="w-full bg-background border border-text/5 rounded-2xl px-8 py-5 text-xs font-bold focus:border-primary outline-none transition-all placeholder:text-text/20" 
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 bg-text text-white rounded-xl hover:bg-primary transition-all duration-300">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text/20">
              &copy; 2025 Stockply Technology. All rights reserved.
            </p>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-text/20">
              <a href="#" className="hover:text-text transition-colors">Privacy</a>
              <a href="#" className="hover:text-text transition-colors">Terms</a>
              <a href="#" className="hover:text-text transition-colors">Ethics</a>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        .serif {
          font-family: "Playfair Display", serif;
        }
      ` }} />
    </div>
  );
};

export default LandingPage;
