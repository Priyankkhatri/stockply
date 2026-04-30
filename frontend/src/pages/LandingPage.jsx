import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package, ArrowRight, Sparkles, BarChart3, Shield, Zap,
  Users, ShoppingCart, Truck, Star, ChevronRight, Globe,
  Menu, X
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Logo from '../components/Logo';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Stats', href: '#stats' },
  ];

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden scroll-smooth">
      <SEOHead
        title="Stockply — Supply Chain Clarity, Beautifully Delivered"
        description="Stockply is the Digital Atelier for supply chain management. Real-time inventory tracking, intelligent analytics, and seamless logistics for shop owners and suppliers across India."
        path="/"
      />      {/* ─── Navbar ─── */}
      <nav aria-label="Main navigation" className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
        <div className={`max-w-5xl mx-auto px-6 h-14 flex items-center justify-between rounded-full border border-text/5 backdrop-blur-xl transition-all duration-500 pointer-events-auto ${scrolled ? 'bg-white/80 shadow-2xl shadow-text/5 border-text/10' : 'bg-white/40'}`}>
          <div className="flex items-center gap-2">
            <Logo size={20} />
            <span className="font-bold text-sm text-text tracking-tight uppercase">Stockply</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="text-[10px] font-bold uppercase tracking-[0.2em] text-text/40 hover:text-primary transition-colors">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/login')} className="hidden sm:block px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-text/60 hover:text-primary transition-colors">Log In</button>
            <button onClick={() => navigate('/login')} className="px-5 py-2.5 bg-text text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-primary transition-all duration-300">
              Get Started
            </button>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle mobile menu" className="md:hidden w-8 h-8 flex items-center justify-center text-text/60 hover:text-primary transition-colors">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="md:hidden mt-4 mx-auto max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl border border-text/10 p-6 shadow-2xl pointer-events-auto">
            <div className="flex flex-col gap-4">
              {navLinks.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-text/60 hover:text-primary transition-all">{l.label}</a>
              ))}
              <div className="pt-4 border-t border-text/5">
                <button onClick={() => { navigate('/login'); setMobileOpen(false); }} className="w-full py-4 bg-text text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <main>
      <section className="pt-48 pb-32 px-6 lg:px-12 max-w-7xl mx-auto relative">
        {/* Subtle Geometric Accents */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] border border-text/[0.03] rounded-full -mr-64 pointer-events-none" />
        <div className="absolute top-40 right-20 w-[300px] h-[300px] border border-text/[0.02] rounded-full pointer-events-none" />
        
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="relative z-10 flex flex-col items-center text-center">
          <motion.div variants={fadeUp} className="mb-8 px-5 py-1.5 rounded-full border border-primary/10 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
            Digital Atelier for Supply Chains
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-bold text-text tracking-[-0.04em] leading-[0.95] mb-8">
            Clarity in every<br />
            <span className="italic font-normal serif text-primary/80">movement.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-text/40 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Connect shop owners and suppliers with an elegant inventory experience. Real-time tracking, intelligent analytics, and seamless fulfillment.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <button onClick={() => navigate('/login')} className="px-10 py-5 bg-text text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-full shadow-2xl shadow-text/20 hover:bg-primary transition-all duration-500 flex items-center gap-4">
              Get Started Free <ArrowRight size={14} />
            </button>
            <a href="#features" className="px-10 py-5 text-text/40 font-bold text-[11px] uppercase tracking-[0.2em] hover:text-text transition-all flex items-center gap-2 group">
              Explore Features <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all" />
            </a>
          </motion.div>
        </motion.div>

        {/* Premium Composition Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-6xl mx-auto px-4"
        >
          <div className="grid grid-cols-12 gap-6 relative">
            {/* Primary Content Card */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-[40px] border border-text/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="flex items-center justify-between px-8 py-6 border-b border-text/5 bg-surface-muted/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Logo size={20} /></div>
                  <div className="space-y-0.5 text-left">
                    <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest">Active Inventory</p>
                    <p className="text-xs font-bold text-text">Mumbai Hub — Sector A4</p>
                  </div>
                </div>
                <div className="hidden sm:flex gap-2">
                  <div className="w-20 h-2 bg-text/5 rounded-full" />
                  <div className="w-12 h-2 bg-primary/20 rounded-full" />
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  {[
                    { l: 'Revenue', v: '₹2.4M', c: 'text-text' },
                    { l: 'Growth', v: '+24%', c: 'text-primary' },
                    { l: 'Efficiency', v: '98.2%', c: 'text-text' },
                    { l: 'Uptime', v: '100%', c: 'text-text' },
                  ].map(s => (
                    <div key={s.l} className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-text/30">{s.l}</p>
                      <p className={`text-2xl font-bold tracking-tight ${s.c}`}>{s.v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-3 h-48 px-2 border-b border-text/5 pb-6">
                  {[40, 65, 45, 90, 55, 75, 60, 85, 40, 70, 50, 95].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }} 
                      animate={{ height: `${h}%` }} 
                      transition={{ delay: 1 + (i * 0.05), duration: 0.8 }}
                      className={`flex-1 rounded-t-xl transition-colors duration-500 ${i === 11 ? 'bg-primary' : 'bg-text/5 hover:bg-primary/20'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Detail Cards */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-6 pt-12">
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-text rounded-[32px] p-8 text-white shadow-2xl shadow-text/20"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 text-left">Fulfillment Rate</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold tracking-tighter">94.2%</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-primary"><Zap size={18} /></div>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '94.2%' }} transition={{ delay: 1.5, duration: 1 }} className="h-full bg-primary" />
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="bg-white rounded-[32px] p-8 border border-text/10 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Truck size={18} /></div>
                  <div className="space-y-0.5 text-left">
                    <p className="text-[10px] font-bold text-text/30 uppercase tracking-widest">In Transit</p>
                    <p className="text-xs font-bold text-text">8 Active Shipments</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-text/5 last:border-0">
                      <div className="w-24 h-2 bg-text/5 rounded-full" />
                      <div className="w-8 h-2 bg-primary/20 rounded-full" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="features" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative overflow-hidden">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-24">
            <motion.div variants={fadeUp} className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6">Capabilities</p>
              <h2 className="text-4xl lg:text-6xl font-bold text-text tracking-[-0.03em] leading-tight">
                Crafting tools for the <br />
                <span className="text-text/20">modern supply chain.</span>
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="max-w-xs text-sm text-text/40 leading-relaxed font-medium mb-2">
              Every feature is meticulously designed to provide maximum clarity with minimal friction.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: Package, title: "Smart Inventory", desc: "Real-time stock tracking with automated alerts and category intelligence." },
              { icon: BarChart3, title: "Deep Analytics", desc: "Visualize supply chain performance with high-fidelity, actionable data." },
              { icon: Shield, title: "Secure Trust", desc: "JWT-powered security with enterprise-grade role management." },
              { icon: Zap, title: "Instant Flow", desc: "Fulfillment journeys that move as fast as your business does." },
              { icon: Users, title: "Partner Studio", desc: "Manage your retail network with sophisticated partner metrics." },
              { icon: Globe, title: "Global Cloud", desc: "Built on a world-class infrastructure for total reliability." },
            ].map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} className="group space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-muted border border-text/5 flex items-center justify-center text-text/40 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                  <f.icon size={20} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-text tracking-tight flex items-center gap-2">
                    {f.title}
                    <div className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-text/40 leading-relaxed font-medium">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section id="how" className="py-32 px-6 bg-surface-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6">The Journey</p>
            <h2 className="text-4xl lg:text-6xl font-bold text-text tracking-[-0.03em]">Seamlessly connected.</h2>
          </div>

          <div className="space-y-24 relative">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-[2.45rem] md:left-1/2 w-px bg-text/5 -translate-x-1/2" />
            
            {[
              { step: '01', title: 'Onboard your Hub', desc: 'Initialize your supply chain by connecting your shop or warehouse to the Stockply cloud.', icon: Globe },
              { step: '02', title: 'Curate your Catalog', desc: 'Define your inventory with high-fidelity attributes and real-time stock intelligence.', icon: Package },
              { step: '03', title: 'Sustain the Flow', desc: 'Enable intelligent fulfillment cycles that automatically balance your business.', icon: Zap },
            ].map((s, i) => (
              <motion.div key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`flex flex-col md:flex-row gap-8 md:gap-24 items-start md:items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 flex md:justify-end items-center gap-6">
                  <div className={`hidden md:block w-full text-right space-y-2 ${i % 2 !== 0 ? 'hidden' : ''}`}>
                    <h3 className="text-xl font-bold text-text">{s.title}</h3>
                    <p className="text-xs text-text/40 font-medium leading-relaxed max-w-xs ml-auto">{s.desc}</p>
                  </div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-white border border-text/5 shadow-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <s.icon size={28} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-text text-white text-[10px] font-bold flex items-center justify-center border-4 border-white">{s.step}</div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4 text-left">
                  <div className="md:hidden space-y-2">
                    <h3 className="text-xl font-bold text-text">{s.title}</h3>
                    <p className="text-xs text-text/40 font-medium leading-relaxed">{s.desc}</p>
                  </div>
                  <div className={`hidden md:block space-y-2 ${i % 2 === 0 ? 'hidden' : ''}`}>
                    <h3 className="text-xl font-bold text-text">{s.title}</h3>
                    <p className="text-xs text-text/40 font-medium leading-relaxed max-w-xs">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6">Voices</p>
            <h2 className="text-4xl font-bold text-text tracking-tight mb-8">Trusted by India's finest retail artisans.</h2>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-surface-muted flex items-center justify-center text-[10px] font-bold text-text/20">U{i}</div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center text-[10px] font-bold">+500</div>
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Rahul Sharma", role: "Wholesale Distributor", text: "Stockply has transformed how we manage our 12 warehouses. The clarity is unparalleled." },
              { name: "Priya Patel", role: "Retail Shop Owner", text: "Finally, an inventory tool that feels premium and works even faster than I do." },
            ].map((t, i) => (
              <motion.div key={t.name} whileHover={{ y: -5 }} className="p-10 rounded-[40px] bg-white border border-text/5 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="flex gap-1 mb-6 text-primary">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                </div>
                <p className="text-lg font-medium text-text italic serif leading-relaxed mb-8">"{t.text}"</p>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-text">{t.name}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text/20">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Growth Section ─── */}
      <section id="stats" className="py-32 px-6 bg-text text-white rounded-t-[60px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
            {[
              { l: 'Total Volume', v: '₹840Cr+' },
              { l: 'Retail Partners', v: '12,400' },
              { l: 'Cities Covered', v: '142' },
              { l: 'Orders Daily', v: '45,000' },
            ].map(s => (
              <div key={s.l} className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">{s.l}</p>
                <p className="text-4xl lg:text-5xl font-bold tracking-tight">{s.v}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-32 pt-32 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">Ready to craft your flow?</h2>
              <p className="text-lg text-white/40 max-w-xl">Join the elite network of supply chain professionals building the future of Indian retail.</p>
            </div>
            <button onClick={() => navigate('/login')} className="px-12 py-6 bg-primary text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-text transition-all duration-500 shadow-2xl shadow-primary/20">
              Create your account
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-text text-white/40 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-white">
              <Logo size={20} />
              <span className="font-bold text-sm tracking-tight uppercase">Stockply</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs font-medium">
              The Digital Atelier for modern supply chains. Beautifully simple, powerfully connected.
            </p>
          </div>
          
          <div className="space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Platform</p>
            <ul className="space-y-4 text-[11px] font-medium">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how" className="hover:text-primary transition-colors">Journey</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Resources</p>
            <ul className="space-y-4 text-[11px] font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div className="col-span-2 space-y-6 lg:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Newsletter</p>
            <div className="relative max-w-sm lg:ml-auto">
              <input type="text" placeholder="atelier@stockply.com" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-xs font-medium focus:border-primary outline-none transition-all" />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-white rounded-full"><ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest">&copy; 2025 Stockply Tech Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
};

export default LandingPage;
