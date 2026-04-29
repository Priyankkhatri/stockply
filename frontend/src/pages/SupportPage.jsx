import React from "react";
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

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-10 py-10">
      <div className="mb-10 flex items-end justify-between gap-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            <LifeBuoy size={12} />
            Support Center
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-text">Help & Support</h1>
          <p className="mt-2 max-w-2xl text-text/60 font-medium">
            Get assistance with orders, inventory workflows, supplier connections, and account operations from one place.
          </p>
        </div>

        <div className="rounded-[28px] border border-text/5 bg-white px-6 py-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/30">Current Status</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-text">All support systems operational</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-8">
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {supportChannels.map((channel) => (
              <div key={channel.title} className="rounded-[32px] border border-text/5 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary/20">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <channel.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-text">{channel.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text/55">{channel.description}</p>
                <button type="button" className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary">
                  {channel.action}
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </section>

          <section className="rounded-[36px] border border-text/5 bg-white p-10 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-text/40">
                <HelpCircle size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text">Frequently Asked Questions</h2>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-text/30">High-signal guidance</p>
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-[24px] border border-text/5 bg-background/40 p-6">
                  <h3 className="text-sm font-bold text-text">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-text/55">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-[36px] border border-accent-emerald/10 bg-accent-emerald/5 p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-accent-emerald shadow-sm">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-xl font-bold text-text">Escalation Desk</h3>
            <p className="mt-3 text-sm leading-7 text-text/60">
              Billing failures, access lockouts, and live fulfillment blockers are routed through the priority desk.
            </p>
            <button type="button" className="mt-6 w-full rounded-2xl bg-accent-emerald px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-accent-emerald/20">
              Escalate issue
            </button>
          </section>

          <section className="rounded-[36px] border border-text/5 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-text/40">
                <BookOpen size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">Guided Resources</h3>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-text/30">Common workflows</p>
              </div>
            </div>

            <div className="space-y-3">
              {["Order status tracking", "Inventory sync setup", "Supplier connection review"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-text/5 px-4 py-4 text-sm font-bold text-text">
                  <span>{item}</span>
                  <ArrowUpRight size={16} className="text-text/30" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

