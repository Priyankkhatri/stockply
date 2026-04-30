import React from 'react';

const StatCard = ({ label, value, trend, icon: Icon, colorClass = 'text-text' }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-text/5 shadow-sm flex justify-between items-start">
      <div>
        <p className="text-[10px] font-bold text-text/70 uppercase tracking-widest mb-1">{label}</p>
        <h3 className={`text-2xl font-bold ${colorClass} mb-1`}>{value}</h3>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-bold">
            <span className={trend.isUp ? 'text-teal-500' : 'text-red-500'}>
              {trend.isUp ? '↗' : '↘'} {trend.value}
            </span>
            <span className="text-text/70 font-normal">{trend.label}</span>
          </div>
        )}
      </div>
      {Icon && (
        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text/20">
          <Icon size={20} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
