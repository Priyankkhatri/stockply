import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  canonical 
}) => {
  const siteTitle = "Stockply | Advanced Inventory Management & Procurement SaaS";
  const fullTitle = title ? `${title} | Stockply` : siteTitle;
  const defaultDescription = "Stockply is a high-fidelity inventory management and procurement ecosystem for retail shops and suppliers. Optimize your supply chain with real-time intelligence.";
  const defaultKeywords = "inventory management, stockply, saas, retail inventory, supplier management, procurement software, supply chain optimization, kirana store inventory, pharmacy management";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      {!canonical && <link rel="canonical" href={window.location.href} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={window.location.href} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Google Site Verification (Optional - replace with real tag if provided) */}
      {/* <meta name="google-site-verification" content="verification_token" /> */}
    </Helmet>
  );
};

export default SEO;
