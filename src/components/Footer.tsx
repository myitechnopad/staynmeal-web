import { useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { Phone } from "lucide-react"
function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollNav = (id: string) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="bg-green-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>        
          <h4 className="text-xl font-bold mb-2">Stay
            <span className="font-bold" style={{ color: '#ffc107' }}>N</span>
            Meal</h4>
          <p className="text-sm text-green-100">
            Your AI-powered platform for seamless accommodation and meal discovery.
          </p>
          <p className="text-xs text-green-200 mt-4">
            &copy; {new Date().getFullYear()} StayNMeal. All rights reserved.
          </p>
          <p className="text-xs mt-1">
            Run and operated by{' '}
            <a
              href="https://itechnopad.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 font-semibold hover:underline"
            >
              ITECHNOPAD.
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => handleScrollNav('hero')} className="hover:text-green-300">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollNav('seekers')} className="hover:text-green-300">
                For Seekers
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollNav('providers')} className="hover:text-green-300">
                For Providers
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollNav('how-it-works')} className="hover:text-green-300">
                How it Works
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollNav('start')} className="hover:text-green-300">
                Let's Start
              </button>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-green-300">FAQ</a></li>
            <li><a href="/blogs" className="hover:text-green-300">Blog</a></li>
            <li><a href="/contact" className="hover:text-green-300">Contact Us</a></li>
            <li><a href="/support" className="hover:text-green-300">Support Us</a></li>
            <li><a href="/privacy" className="hover:text-green-300">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-green-300">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Connect With Us</h4>
          <div className="flex space-x-4 text-white">
            <a
              href="https://www.facebook.com/profile.php?id=61578620797463"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com/staynmeal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/staynmeal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-400"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://wa.me/+918788090590"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-400"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
          <div className="bg-white text-green-800 font-bold p-4 rounded-xl shadow-md flex items-center justify-between max-w-100 h-20 mx-auto my-4">
            <div className="text-sm space-y-2 space-x-6">
              📧 
              <a href="mailto:support@staynmeal.com" className="underline ml-1 text-green-800 hover:text-blue-800">
                support@staynmeal.com
              </a>
              <a
                href="https://wa.me/918788090590"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-left items-center gap-2 text-sm text-white bg-green-600 hover:bg-green-800 px-4 py-2 rounded-3xl font-medium shadow-sm transition-all"
              >
                <Phone className="h-4 w-4 text-white" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
