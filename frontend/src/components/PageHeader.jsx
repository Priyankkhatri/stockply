import React from 'react';

const PageHeader = ({ title, subtitle, breadcrumbs = [], actions }) => {
  return (
    <div className="flex flex-col mb-10 animate-fade-in">
      {breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-8">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <span className={`hover:text-primary transition-colors ${i === breadcrumbs.length - 1 ? 'text-primary' : 'cursor-pointer'}`}>
                {crumb}
              </span>
              {i < breadcrumbs.length - 1 && <span className="text-text/20">/</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-text-muted font-medium text-lg max-w-2xl">
            {subtitle}
          </p>
        </div>
        {actions && (
          <div className="flex items-center gap-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
