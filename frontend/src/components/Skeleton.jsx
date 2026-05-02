import React from 'react';
import { Skeleton as MuiSkeleton } from '@mui/material';

/**
 * Premium Skeleton component wrapping MUI Skeleton with custom styling
 */
const Skeleton = ({ variant = 'text', width, height, className, circle }) => {
  return (
    <MuiSkeleton
      variant={circle ? 'circular' : variant}
      width={width}
      height={height}
      className={className}
      sx={{
        bgcolor: 'rgba(0, 0, 0, 0.04)',
        borderRadius: circle ? '50%' : '12px',
        '&::after': {
          background: 'linear-gradient(90deg, transparent, rgba(192, 133, 82, 0.05), transparent)',
        },
      }}
      animation="wave"
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-[32px] border border-text/5 p-8 space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton circle width={48} height={48} />
      <div className="space-y-2">
        <Skeleton width={120} height={16} />
        <Skeleton width={80} height={12} />
      </div>
    </div>
    <Skeleton variant="rectangular" height={100} className="rounded-2xl" />
    <div className="flex justify-between">
      <Skeleton width={60} height={20} />
      <Skeleton width={100} height={32} className="rounded-xl" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-4">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl border border-text/5 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Skeleton width={40} height={40} className="rounded-xl" />
          <Skeleton width="40%" height={20} />
        </div>
        <Skeleton width="15%" height={20} className="mx-4" />
        <Skeleton width="10%" height={32} className="rounded-full" />
      </div>
    ))}
  </div>
);

export default Skeleton;
