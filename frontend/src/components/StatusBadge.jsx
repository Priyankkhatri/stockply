import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    // Stock statuses
    'Out of Stock': 'bg-rose-50 text-rose-600 border-rose-200',
    'Low Stock': 'bg-orange-50 text-orange-600 border-orange-200',
    'In Stock': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    // Order statuses
    'Pending': 'bg-orange-50 text-orange-600 border-orange-200',
    'Processing': 'bg-blue-50 text-blue-600 border-blue-200',
    'Shipped': 'bg-purple-50 text-purple-600 border-purple-200',
    'Delivered': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'Cancelled': 'bg-rose-50 text-rose-600 border-rose-200',
    // Fulfillment statuses
    'Accepted': 'bg-blue-50 text-blue-600 border-blue-200',
    'Ready': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'Packing': 'bg-orange-50 text-orange-600 border-orange-200',
    'Dispatched': 'bg-teal-50 text-teal-600 border-teal-200',
    'At Risk': 'bg-rose-50 text-rose-500 border-rose-200',
    // Generic
    'Active': 'bg-teal-50 text-teal-600 border-teal-200',
    'Draft': 'bg-gray-50 text-gray-500 border-gray-200',
    'Paid': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'Failed': 'bg-rose-50 text-rose-600 border-rose-200',
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border 
      ${styles[status] || 'bg-text-light/5 text-text-muted border-text-light/20'}
    `}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
      {status}
    </span>
  );
};

export default StatusBadge;
