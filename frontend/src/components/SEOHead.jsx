import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://stockply.vercel.app';

const SEOHead = ({
  title = 'Stockply — Supply Chain Clarity, Beautifully Delivered',
  description = 'Premium inventory management connecting shop owners and suppliers with real-time tracking and analytics.',
  path = '/',
  noIndex = false,
}) => {
  const fullUrl = `${BASE_URL}${path}`;
  const fullTitle = path === '/' ? title : `${title} | Stockply`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEOHead;
