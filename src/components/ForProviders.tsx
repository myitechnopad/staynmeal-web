import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Feature {
  icon: string;
  name: string;
  description: string;
}

function ForProviders() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();  
  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };    
  const features: Feature[] = [
    { icon: '✨', name: 'Free & Easy Listing', description: 'Post your PG, flat, or meal service quickly and for free.' },
    { icon: '🏢', name: 'Property & Tenant Management', description: 'Efficiently manage your properties and occupants.' },
    { icon: '🔔', name: 'Rent & Payment Reminders', description: 'Automated reminders and collection services for hassle-free payments.' },
    { icon: '🍽️', name: 'Meal Service Management', description: 'Streamline your tiffin service operations.' },
    { icon: '📈', name: 'Quality Leads', description: 'Receive instant leads from interested seekers.' },
    { icon: '💬', name: 'Direct Seeker Chat', description: 'Communicate directly with potential tenants/customers.' },
  ];

  return (
    <section className="bg-green-50 py-4 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
          Grow Your Business with {" "}
          <span className="text-green-700">
            Stay
            <span style={{ color: '#ffc107' }}>N</span>
            Meal
          </span>
        </h2>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Streamline your operations and connect with verified seekers of PG, Flats and Meals.
          <br />
          <strong>Listing and managing your property or meal service has never been easier.</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-green-100 shadow-sm rounded-lg p-6 text-left hover:shadow-md transition">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-base font-semibold text-green-800">{feature.name}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <button className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        onClick={() => handleNavigate('/seekers')}>
          List Your Service Now – It's Free!
        </button>
      </div>
    </section>
  );
}

export default ForProviders;
