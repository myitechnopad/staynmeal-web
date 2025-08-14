import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Feature {
  icon: string;
  name: string;
  description: string;
}

function ForSeekers() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();  
  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };  
  const features: Feature[] = [
    { icon: '🏠', name: 'Smart Search', description: 'Find your ideal PG, flat, or meal service with intuitive search options.' },
    { icon: '❤️', name: 'Shortlist & Save', description: 'Keep track of your favorites and compare options easily.' },
    { icon: '🗓️', name: 'Seamless Booking', description: 'Secure your spot directly through the platform.' },
    { icon: '📊', name: 'Manage Everything', description: 'Access your bookings, payments, and invoices in one place.' },
    { icon: '🗣️', name: 'Direct Chat', description: 'Communicate instantly with providers for queries and details.' },
    { icon: '💡', name: 'Personalized Recommendations', description: 'Get tailored suggestions based on your preferences.' },
  ];

  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
          Your Next Home & Meal Awaits.
        </h2>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Say goodbye to endless searching. {" "}
            <strong>
              <span className="text-green-700">
                Stay
                <span style={{ color: '#ffc107' }}>N</span>
                Meal
            </span>
            </strong>
          {" "}
          helps working professionals and students like you
          find the perfect place to stay and delicious daily meals with ease, right here in Pimpri-Chinchwad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-green-50 border border-green-100 shadow-sm rounded-lg p-6 text-left hover:shadow-md transition">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-base font-semibold text-green-800">{feature.name}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <button className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        onClick={() => handleNavigate('/seekers')}
        >
          Start Your Search Today!
        </button>
      </div>
    </section>
  );
}

export default ForSeekers;
