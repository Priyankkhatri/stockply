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

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
  <motion.div variants={fadeUp} className="group relative bg-white rounded-[32px] p-8 border border-text/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
    <div className={`absolute top-0 right-0 w-40 h-40 -mr-16 -mt-16 rounded-full opacity-[0.06] group-hover:scale-125 transition-transform duration-700 ${color}`} />
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color} bg-opacity-10`}>
      <Icon size={26} />
    </div>
    <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
    <p className="text-sm text-text/50 leading-relaxed">{desc}</p>
  </motion.div>
);

const StatBlock = ({ value, label }) => {
  const [displayed, setDisplayed] = useState(value);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  
  useEffect(() => {
    if (isNaN(numericValue)) { setDisplayed(value); return; }
    let current = 0;
    const step = Math.max(1, Math.floor(numericValue / 40));
    const suffix = value.replace(/[0-9]/g, '');
    const timer = setInterval(() => {
      current += step;
      if (current >= numericValue) { setDisplayed(value); clearInterval(timer); }
      else { setDisplayed(current + suffix); }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{displayed}</p>
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mt-2">{label}</p>
    </div>
  );
};

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

      {/* ─── Features ─── */}
      <section id="features" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Capabilities</p>
            <h2 className="text-4xl lg:text-5xl font-black text-text tracking-tighter">Everything you need to scale.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Package} title="Smart Inventory" desc="Real-time stock tracking with automated low-stock alerts and intelligent categorisation." color="bg-teal-500 text-teal-500" />
            <FeatureCard icon={BarChart3} title="Analytics Engine" desc="Visualize supply chain performance with data-driven dashboards and actionable insights." color="bg-blue-500 text-blue-500" />
            <FeatureCard icon={Shield} title="Secure Auth" desc="JWT-powered authentication with role-based access for shop owners and suppliers." color="bg-purple-500 text-purple-500" />
            <FeatureCard icon={Zap} title="Instant Fulfillment" desc="Manage the entire order lifecycle — from placement to delivery — in one unified interface." color="bg-amber-500 text-amber-500" />
            <FeatureCard icon={Users} title="Partner Network" desc="Connect and manage your retail partners with trust metrics and geographic insights." color="bg-rose-500 text-rose-500" />
            <FeatureCard icon={Globe} title="Cloud-Native" desc="Deployed on Vercel and Render with MongoDB Atlas for 99.9% uptime reliability." color="bg-emerald-500 text-emerald-500" />
          </div>
        </motion.div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Workflow</p>
            <h2 className="text-4xl lg:text-5xl font-black text-text tracking-tighter">Three steps to clarity.</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your account as a Shop Owner or Supplier in seconds.', icon: Star },
              { step: '02', title: 'Connect', desc: 'Link your inventory, partners, and logistics into one dashboard.', icon: Truck },
              { step: '03', title: 'Scale', desc: 'Automate procurement, track orders, and grow with confidence.', icon: ChevronRight },
            ].map((item) => (
              <motion.div key={item.step} variants={fadeUp} className="relative bg-white rounded-[32px] p-10 border border-text/5 group hover:shadow-xl transition-all">
                <span className="text-8xl font-black text-text/[0.03] absolute top-6 right-8 group-hover:text-primary/[0.06] transition-colors">{item.step}</span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <item.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">{item.title}</h3>
                <p className="text-sm text-text/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-24 px-6 lg:px-12 bg-white/50">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Testimonials</p>
            <h2 className="text-4xl lg:text-5xl font-black text-text tracking-tighter">Loved by supply chains everywhere.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Aarav Mehta', role: 'Shop Owner, Mumbai', quote: 'Stockply replaced three tools for us. Inventory, orders, and partner management — all in one beautiful interface.' },
              { name: 'Priya Sharma', role: 'Supplier, Delhi', quote: 'The fulfillment dashboard is a game changer. I can track every order from placement to delivery in real-time.' },
              { name: 'Rohan Patel', role: 'Operations Lead, Bangalore', quote: 'We reduced stock-outs by 40% in the first month. The low-stock alerts are incredibly accurate.' },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-background rounded-[32px] p-8 border border-text/5 relative group hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, s) => <Star key={s} size={14} className="text-primary fill-primary" />)}
                </div>
                <p className="text-sm text-text/70 leading-relaxed mb-8 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black">{t.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <p className="text-sm font-bold text-text">{t.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text/30">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Trusted By ─── */}
      <section className="py-16 px-6 lg:px-12 border-y border-text/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text/20 mb-8">Trusted by businesses across India</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-30">
            {['RetailMax', 'UrbanGoods', 'FreshMart', 'TechSupply', 'MetroWare'].map((brand) => (
              <span key={brand} className="text-xl font-black text-text tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section id="stats" className="mx-6 lg:mx-12 mb-24">
        <div className="max-w-7xl mx-auto bg-text rounded-[40px] p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 blur-[120px] -mr-48 -mt-48" />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12">
            <StatBlock value="10K+" label="Products Tracked" />
            <StatBlock value="500+" label="Active Users" />
            <StatBlock value="99.9%" label="Uptime SLA" />
            <StatBlock value="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 px-6 lg:px-12 max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">FAQ</p>
            <h2 className="text-4xl lg:text-5xl font-black text-text tracking-tighter">Common questions.</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: 'Is Stockply free to use?', a: 'Yes! Stockply offers a free tier with all core features. Premium plans are available for high-volume businesses.' },
              { q: 'Can I use it as both a shop and supplier?', a: 'Each account is tied to a single role for security. You can create separate accounts for each role.' },
              { q: 'How is my data protected?', a: 'All data is encrypted in transit and at rest. We use JWT authentication and MongoDB Atlas with enterprise-grade security.' },
              { q: 'Does it work on mobile?', a: 'Absolutely. Stockply is fully responsive and works beautifully on phones, tablets, and desktops.' },
            ].map((faq, i) => (
              <motion.details key={i} variants={fadeUp} className="group bg-white rounded-2xl border border-text/5 overflow-hidden hover:shadow-md transition-all">
                <summary className="flex items-center justify-between cursor-pointer px-8 py-6 text-sm font-bold text-text list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-text/20 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-8 pb-6 text-sm text-text/50 leading-relaxed">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto relative bg-gradient-to-br from-primary to-primary-dark rounded-[48px] p-16 lg:p-20 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-3xl -mr-40 -mb-40" />
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-6">
              Ready to transform your<br />supply chain?
            </h2>
            <p className="text-white/60 mb-10 text-lg max-w-xl mx-auto">Join hundreds of businesses already using Stockply to streamline their operations.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/login')} className="group px-12 py-5 bg-white text-primary font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3">
                Get Started Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('/login')} className="px-12 py-5 border-2 border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                Log In
              </button>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-text/5 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Logo size={18} />
                </div>
                <span className="font-display font-black text-lg text-text tracking-tighter uppercase">Stockply</span>
              </div>
              <p className="text-xs text-text/40 leading-relaxed">The Digital Atelier for modern supply chain management.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30 mb-4">Product</h4>
              <div className="space-y-3">
                <a href="#features" className="block text-sm text-text/50 hover:text-primary transition-colors">Features</a>
                <a href="#how" className="block text-sm text-text/50 hover:text-primary transition-colors">How It Works</a>
                <a href="#stats" className="block text-sm text-text/50 hover:text-primary transition-colors">Stats</a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30 mb-4">Company</h4>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-text/50 hover:text-primary transition-colors">About</a>
                <a href="#" className="block text-sm text-text/50 hover:text-primary transition-colors">Careers</a>
                <a href="#" className="block text-sm text-text/50 hover:text-primary transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30 mb-4">Connect</h4>
              <div className="space-y-3">
                <a href="https://github.com/Priyankkhatri/stockply" target="_blank" className="block text-sm text-text/50 hover:text-primary transition-colors">GitHub</a>
                <a href="#" className="block text-sm text-text/50 hover:text-primary transition-colors">Twitter</a>
                <a href="#" className="block text-sm text-text/50 hover:text-primary transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-text/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-text/20">© 2026 Stockply. Built by Priyank Khatri.</p>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] font-bold text-text/20 hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-[10px] font-bold text-text/20 hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-[10px] font-bold text-text/20 hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
