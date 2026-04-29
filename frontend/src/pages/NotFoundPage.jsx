import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center px-6">
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Stockply's homepage."
        noIndex={true}
      />
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Sparkles size={36} className="text-primary" />
        </div>
        <h1 className="text-8xl font-black text-text/10 tracking-tighter mb-2">404</h1>
        <h2 className="text-2xl font-bold text-text mb-4">Page not found</h2>
        <p className="text-sm text-text/50 leading-relaxed mb-10">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2"
          >
            <Home size={16} /> Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 border border-text/10 bg-white text-text font-black text-xs uppercase tracking-widest rounded-xl hover:border-primary/30 transition-all flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
