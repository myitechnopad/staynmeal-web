import React from 'react';
import { Phone } from "lucide-react"
import logo from '../assets/logo.png';
const Seekers: React.FC = () => {
  return (
    <div className="pt-10 min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <main className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 text-center">
        <img className="h-12 w-auto mx-auto" src={logo} alt="StayNMeal Logo" />
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          <span className="text-green-700 font-bold">Stay</span>
          <span className="font-bold" style={{ color: '#ffc107' }}>N</span>
          <span className="text-green-700 font-bold">Meal</span>
        </h1>
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Find Your <span className="text-green-600 font-semibold">Stay Options</span> or <span className="text-green-600 font-semibold">Meal Service</span>
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Help thousands discover PGs, Flats, or Meal Service with <span className="text-green-600 font-semibold">StayNMeal</span>. 
          Our AI-powered platform helps you reach providers easily.
        </p>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-4">
          📌 <strong>Coming Soon:</strong> Full-featured listing form with smart recommendations.
        </div>

        <div className="bg-green-50 border border-green-200 p-2 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            Want early access or to be notified when the form launches?
          </p>
          <a
            href="https://forms.gle/jZsBQUbVMqbm2X6q6"
            className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fill Interest Form →
          </a>
          { " "}
          <a
            href="/contact"
            className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Form →
          </a>          
        </div>
          <div className="bg-green-800 text-white p-4 rounded-xl shadow-md flex items-center justify-between max-w-md mx-auto my-4">
            <div className="text-sm space-y-2">
              📧 Reach us at: 
              <a href="mailto:support@staynmeal.com" className="underline ml-1 hover:text-yellow-300">
                support@staynmeal.com
              </a>
              <a
                href="https://wa.me/918788090590"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white bg-green-600 hover:bg-green-800 px-4 py-2 rounded-3xl font-medium shadow-sm transition-all"
              >
                <Phone className="h-4 w-4 text-white" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
      </main>
    </div>
  );
};

export default Seekers;
