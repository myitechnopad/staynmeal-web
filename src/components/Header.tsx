import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search as SearchIcon, User } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

const navSections = [
  { label: '🏚️', id: 'hero' },
  { label: 'Seekers', id: 'seekers' },
  { label: 'Providers', id: 'providers' },
  { label: 'How it Works', id: 'how-it-works' },
  { label: 'Get Started', id: 'start' },
  { label: 'Pricing', id: 'pricing' },
];

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useAuth();

  const isLoggedIn = !!accessToken;

  const handleScrollNav = (id: string) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
    setMobileMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleScrollNav('hero')} className="flex items-center gap-0">
          <img src={logo} alt="StayNMeal Logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-semibold text-green-700">
            Stay
              <span className="font-bold" style={{ color: '#ffc107' }}>N</span>
            Meal
          </span>
        </button>


        {/* Search */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="flex items-center border rounded-full px-4 py-1 w-full max-w-md shadow-sm">
            <SearchIcon className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search PGs,Flats,Meals or Services..."
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              {/* Desktop Nav Links */}
              <nav className="hidden md:flex space-x-3 items-center">
                {navSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleScrollNav(section.id)}
                    className="text-sm text-gray-700 hover:text-green-700 transition"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>

              {/* Auth Buttons */}
              <div className="hidden md:flex gap-2 items-center">
                <button
                  onClick={() => handleNavigate('/list-service')}
                  className="px-3 py-1 text-sm rounded-full bg-green-700 text-white hover:bg-green-800 transition font-medium"
                >
                  📢 List Your Service
                </button>                
                <button
                  onClick={() => handleNavigate('/list-service')}
                  className="px-3 py-1 text-sm rounded-full text-green-700 border border-green-700 hover:bg-green-50 transition font-medium"
                >
                  Login
                </button>
              </div>

              {/* Hamburger */}
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          ) : (
            // Post-login user icon
            <button
              onClick={() => navigate('/UserProfile')}
              className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition"
              title="Profile"
            >
              <User size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu (pre-login only) */}
      {!isLoggedIn && isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScrollNav(section.id)}
              className="block w-full text-left text-sm text-gray-700 hover:text-green-700 font-medium"
            >
              {section.label}
            </button>
          ))}
          <hr className="border-gray-200" />
          <button
            onClick={() => handleNavigate('/list-service')}
            className="w-full px-5 py-2 rounded-full text-green-700 border border-green-700 hover:bg-green-50 transition font-medium"
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate('/list-service')}
            className="w-full px-5 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition font-medium"
          >
            📢 List Your Service
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
