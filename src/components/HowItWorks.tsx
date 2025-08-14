import React from 'react';

interface Step {
  icon: string;
  title: string;
  description: string;
}

function HowItWorks() {
  const steps: Step[] = [
    { icon: '🔍', title: 'Search Smartly', description: 'Tell us your preferences via Web, Mobile, or WhatsApp.' },
    { icon: '✅', title: 'Discover Curated Options', description: 'Our AI matches you with ideal PGs, flats, or meal services.' },
    { icon: '💬', title: 'Connect & Confirm', description: 'Shortlist, book, and chat directly with providers.' },
  ];

  return (
    <section className="bg-gray-50 py-4 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
          How{" "}
          <span className="text-green-700">
            Stay
            <span style={{ color: '#ffc107' }}>N</span>
            Meal
          </span>{" "}
          Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white shadow-md border border-green-100 p-6 rounded-lg text-center hover:shadow-lg transition">
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="text-base font-semibold text-green-800">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
