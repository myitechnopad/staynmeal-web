
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function CallToAction() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();  
  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };    
  return (
    <section className="bg-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
          Ready to Simplify Your Search?
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button className="px-6 py-3 rounded-lg border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition"
          onClick={() => handleNavigate('/seekers')}
          >
            Find Your Stay & Meal
          </button>
          <button className="px-6 py-3 rounded-lg border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition"
          onClick={() => handleNavigate('/list-service')}>
            List Your Property & Service
          </button>
        </div>

        <p className="text-gray-700 text-sm">
          Available on Web, Mobile, and your favorite chat app,&nbsp;
          <strong className="text-green-700">WhatsApp! (coming soon...)</strong>
        </p>
      </div>
    </section>
  );
}

export default CallToAction;
