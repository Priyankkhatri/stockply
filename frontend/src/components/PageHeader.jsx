import React from 'react';
import './PageHeader.css';

const PageHeader = ({ title, subtitle, breadcrumbs = [], actions }) => {
  return (
    <div className="page-header-container">
      {breadcrumbs.length > 0 && (
        <div className="breadcrumbs">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <span className={`breadcrumb-item ${i === breadcrumbs.length - 1 ? 'active' : ''}`}>
                {crumb}
              </span>
              {i < breadcrumbs.length - 1 && <span className="breadcrumb-separator">/</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="header-main">
        <div>
          <h1 className="header-title">
            {title}
          </h1>
          <p className="header-subtitle">
            {subtitle}
          </p>
        </div>
        {actions && (
          <div className="header-actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
