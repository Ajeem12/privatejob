import React from 'react';

import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-yellow-50 rounded-3xl shadow-xl overflow-hidden max-w-2xl w-full border border-yellow-100">
        <div className="p-8 sm:p-12 text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-white shadow-md mb-6 relative">
            <span className="text-4xl">😕</span>
            <div className="absolute">
             
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
            
              Return Home
            </Link>
            
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-sm transition-colors"
            >
              Refresh Page
            </button>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Error code: 404 • Need help?{' '}
              <a href="mailto:support@example.com" className="text-indigo-600 hover:underline">
                Contact support
              </a>
            </p>
          </div>
        </div>
        
        <div className="bg-white/50 p-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Attempting to reconnect...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;