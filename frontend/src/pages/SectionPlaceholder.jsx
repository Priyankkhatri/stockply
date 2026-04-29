import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import PremiumButton from '../components/PremiumButton';

const SectionPlaceholder = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <GlassCard className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            <Sparkles size={12} />
            In progress
          </div>
          <h1 className="text-4xl font-display font-bold text-text mb-3">{title}</h1>
          <p className="max-w-2xl text-lg leading-8 text-text-muted">{description}</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Reusable shell is now active',
              'Sidebar navigation stays consistent',
              'Next section can land without layout churn',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-text/5 bg-background/50 px-4 py-4 text-sm font-medium text-text">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PremiumButton icon={ArrowRight} onClick={() => navigate('/dashboard')}>
              Back to dashboard
            </PremiumButton>
            <button
              onClick={() => navigate('/dashboard/analytics')}
              className="text-sm font-bold text-text-muted transition-colors hover:text-primary"
            >
              Jump to analytics
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default SectionPlaceholder;
