import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import PremiumButton from './PremiumButton';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] border border-text/5 p-12 text-center shadow-2xl shadow-text/5">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[32px] flex items-center justify-center mx-auto mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-text mb-4 tracking-tighter">Something went wrong.</h2>
        <p className="text-text/60 text-sm mb-8 leading-relaxed">
          The system encountered an unexpected runtime exception. <br />
          <span className="text-red-500 font-mono text-[10px] break-all">{error.message}</span>
        </p>
        <PremiumButton 
          className="w-full justify-center" 
          onClick={resetErrorBoundary}
        >
          Attempt Recovery
        </PremiumButton>
      </div>
    </div>
  );
};

export const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
        window.location.href = '/';
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
