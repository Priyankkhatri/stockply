import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import PremiumButton from "../components/PremiumButton";

const supportChannels = [
  {
    title: "Live Chat Concierge",
    description: "Reach operations support for urgent procurement, delivery, or platform issues.",
    icon: MessageSquare,
    action: "Open chat",
  },
  {
    title: "Priority Email Desk",
    description: "Share screenshots, order IDs, or account concerns for tracked follow-up.",
    icon: Mail,
    action: "Write email",
  },
  {
    title: "Call Support",
    description: "Talk directly to the help desk for critical fulfillment or payment blockers.",
    icon: PhoneCall,
    action: "Call now",
  },
];

const faqs = [
  {
    question: "How do I update reorder thresholds?",
    answer: "Open inventory settings and adjust the reorder logic or product-level stock limits from the ledger.",
  },
  {
    question: "Why is a supplier order delayed?",
    answer: "Delayed fulfillment usually appears in alerts and supplier orders. Review dispatch status before escalating.",
  },
  {
    question: "Can I export account or stock data?",
    answer: "Yes. Inventory, orders, and analytics pages now expose export-ready structure for each workflow.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export default function SupportPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="mx-auto max-w-[1600px] px-4 sm:px-10 py-6 sm:py-10"
    >
      <motion.div variants={rowAnim} className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-black text-text/30 uppercase tracking-[0.3em]">Support Center</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tighter text-text leading-none">Help & <span className="text-primary italic font-normal serif">Support.</span></h1>
          <p className="text-text/40 text-sm font-medium">Get assistance with orders, inventory workflows, and account operations.</p>
        </div>

        <GlassCard className="px-6 py-5" hover={false}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Current Status</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-text">All systems operational</span>
          </div>
        </GlassCard>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .serif { font-family: "Playfair Display", serif; }
        .shadow-premium { box-shadow: 0 20px 80px -20px rgba(0,0,0,0.06); }
      ` }} />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-8">
          <motion.section variants={rowAnim} className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {supportChannels.map((channel) => (
              <GlassCard key={channel.title} className="p-8 group">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                  <channel.icon size={24} />
                </div>
                <h3 className="text-lg font-display font-bold text-text">{channel.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text/55">{channel.description}</p>
                <button type="button" className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary">
                  {channel.action}
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </GlassCard>
            ))}
          </motion.section>

          <motion.div variants={rowAnim}>
            <GlassCard className="p-10" hover={false}>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/50 shadow-sm border border-text/5 text-text/40">
                  <HelpCircle size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-text">Frequently Asked Questions</h2>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-text/30">High-signal guidance</p>
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-[24px] border border-text/5 bg-white/40 p-6 transition-colors hover:bg-white/60">
                    <h3 className="text-sm font-bold text-text">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-text/55">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.div variants={rowAnim}>
            <GlassCard className="border-accent-emerald/10 bg-accent-emerald/5 p-8" hover={false}>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-accent-emerald shadow-sm">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xl font-display font-bold text-text">Escalation Desk</h3>
              <p className="mt-3 text-sm leading-7 text-text/60">
                Billing failures, access lockouts, and live fulfillment blockers are routed through the priority desk.
              </p>
              <PremiumButton variant="primary" className="w-full mt-6 bg-accent-emerald hover:bg-accent-emerald/90 shadow-accent-emerald/20">
                Escalate issue
              </PremiumButton>
            </GlassCard>
          </motion.div>

          <motion.div variants={rowAnim}>
            <GlassCard className="p-8" hover={false}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/50 border border-text/5 shadow-sm text-text/40">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-text">Guided Resources</h3>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-text/30">Common workflows</p>
                </div>
              </div>

              <div className="space-y-3">
                {["Order status tracking", "Inventory sync setup", "Supplier connection review"].map((item) => (
                  <div key={item} className="group flex cursor-pointer items-center justify-between rounded-2xl border border-text/5 bg-white/50 px-4 py-4 text-sm font-bold text-text transition-all hover:bg-white hover:shadow-sm">
                    <span>{item}</span>
                    <ArrowUpRight size={16} className="text-text/30 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

