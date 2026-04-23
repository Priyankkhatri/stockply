import React from 'react';
import { Check, Circle } from 'lucide-react';

const OrderTimeline = ({ currentStep }) => {
  const steps = [
    { label: 'Submitted', date: '10 May', id: 'submitted' },
    { label: 'Confirmed', date: 'Today', id: 'confirmed' },
    { label: 'Dispatched', date: '', id: 'dispatched' },
    { label: 'Delivered', date: '', id: 'delivered' },
  ];

  const currentIdx = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="relative flex justify-between items-start w-full px-4 py-8">
      {/* Connector Line */}
      <div className="absolute top-[46px] left-[10%] right-[10%] h-[2px] bg-text/5">
        <div 
          className="h-full bg-primary transition-all duration-500" 
          style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>

      {/* Steps */}
      {steps.map((step, index) => {
        const isActive = index <= currentIdx;
        const isCurrent = index === currentIdx;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center w-24">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isActive 
                ? 'bg-primary text-white' 
                : 'bg-white border-2 border-text/5 text-text/20'
            }`}>
              {isActive && !isCurrent ? (
                <Check size={18} strokeWidth={3} />
              ) : isCurrent ? (
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
              ) : (
                <div className="w-2 h-2 bg-text/10 rounded-full"></div>
              )}
            </div>
            <div className="mt-3 text-center">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-text' : 'text-text/30'}`}>
                {step.label}
              </p>
              {step.date && (
                <p className="text-[9px] font-bold text-text/40 mt-0.5">{step.date}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
