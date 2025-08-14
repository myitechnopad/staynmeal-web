import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-md w-full">
        <h1 className="text-6xl font-bold text-primary-blue mb-2">404</h1>
        <p className="text-gray-700 text-base mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary-blue text-green px-6 py-2 rounded-md text-sm font-bold hover:bg-green-700 hover:text-white transition"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

export default NotFound;
