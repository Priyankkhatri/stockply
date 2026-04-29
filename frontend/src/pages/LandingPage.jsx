import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package, ArrowRight, Sparkles, BarChart3, Shield, Zap,
  Users, ShoppingCart, Truck, Star, ChevronRight, Globe,
  Menu, X
} from 'lucide-react';

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

const StatBlock = ({ value, label }) => (
  <div className="text-center">
    <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{value}</p>
    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mt-2">{label}</p>
  </div>
);

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
      {/* ─── Navbar ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${scrolled ? 'bg-white/90 border-text/10 shadow-lg shadow-text/5' : 'bg-background/80 border-text/5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Sparkles size={20} />
            </div>
            <span className="font-display font-black text-xl text-text tracking-tighter uppercase">Stockply</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="text-[11px] font-black uppercase tracking-widest text-text/40 hover:text-primary transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="px-6 py-3 text-[11px] font-black uppercase tracking-widest text-text/60 hover:text-primary transition-colors">Log In</button>
            <button onClick={() => navigate('/login')} className="px-6 py-3 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
              Get Started
            </button>
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-text/60 hover:text-primary transition-colors">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {/* Mobile menu overlay */}
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-t border-text/5 shadow-xl px-6 py-6 space-y-2">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-text/60 hover:text-primary hover:bg-primary/5 transition-all">{l.label}</a>
            ))}
            <div className="pt-4 border-t border-text/5 flex flex-col gap-2">
              <button onClick={() => { navigate('/login'); setMobileOpen(false); }} className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20">Get Started</button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-40 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="text-center max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-8">
            <Sparkles size={12} /> The Digital Atelier for Supply Chains
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-black text-text tracking-tighter leading-[1.05] mb-6">
            Supply chain clarity,<br />
            <span className="text-primary">beautifully delivered.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-text/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stockply connects shop owners and suppliers through a premium inventory management experience — real-time tracking, intelligent analytics, and seamless logistics.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/login')} className="group px-10 py-5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/25 hover:bg-primary-dark transition-all flex items-center gap-3">
              Start Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#features" className="px-10 py-5 border border-text/10 bg-white text-text font-black text-xs uppercase tracking-widest rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all">
              See Features
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-b from-primary/10 via-transparent to-transparent rounded-[48px] blur-3xl" />
          <div className="relative bg-white rounded-[36px] border border-text/10 shadow-2xl shadow-text/10 p-3 overflow-hidden">
            <div className="bg-background rounded-[28px] p-8 lg:p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Revenue', val: 'Rs. 2.4M', icon: BarChart3, c: 'text-amber-500 bg-amber-50' },
                  { label: 'Orders', val: '1,247', icon: ShoppingCart, c: 'text-teal-500 bg-teal-50' },
                  { label: 'Products', val: '386', icon: Package, c: 'text-blue-500 bg-blue-50' },
                  { label: 'Partners', val: '45', icon: Users, c: 'text-purple-500 bg-purple-50' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-text/5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.c}`}><s.icon size={18} /></div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-text/30 mb-1">{s.label}</p>
                    <p className="text-xl font-black text-text tracking-tight">{s.val}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-end justify-between gap-3 h-32 px-2">
                {[35, 55, 42, 68, 50, 85, 60].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-full rounded-xl ${i === 5 ? 'bg-primary' : 'bg-primary/15'}`} style={{ height: `${h}%` }} />
                    <span className="text-[8px] font-bold text-text/20">{['M','T','W','T','F','S','S'][i]}</span>
                  </div>
                ))}
              </div>
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

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-black text-text tracking-tighter mb-6">
            Ready to transform your<br />supply chain?
          </h2>
          <p className="text-text/50 mb-10 text-lg">Join hundreds of businesses already using Stockply to streamline their operations.</p>
          <button onClick={() => navigate('/login')} className="group px-12 py-5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/25 hover:bg-primary-dark transition-all inline-flex items-center gap-3">
            Get Started Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-text/5 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20"><Sparkles size={18} /></div>
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
