import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://stockply.vercel.app';

const SEOHead = ({
  title = 'Stockply — Supply Chain Clarity, Beautifully Delivered',
  description = 'Premium inventory management and procurement ecosystem for retail shops and suppliers. Optimize your supply chain with real-time tracking, actionable analytics, and seamless fulfillment.',
  keywords = 'stockply, inventory management, saas, retail inventory, supplier management, procurement software, supply chain optimization, kirana store inventory, pharmacy management',
  path = '/',
  image = '/og-image.png',
  noIndex = false,
}) => {
  const fullUrl = `${BASE_URL}${path}`;
  const fullTitle = path === '/' ? title : `${title} | Stockply`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Search Engine Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="Stockply" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${BASE_URL}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}${image}`} />
      <meta name="twitter:site" content="@stockply" />

      {/* Mobile / App Tags */}
      <meta name="apple-mobile-web-app-title" content="Stockply" />
      <meta name="application-name" content="Stockply" />
      <meta name="theme-color" content="#FF6B00" />
    </Helmet>
  );
};

export default SEOHead;
