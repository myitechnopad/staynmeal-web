import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function HeroSection() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();  
  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };  
  return (
    <section className="bg-white py-10 px-4 md:px-10">
      <div className="pt-5 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Left: Text Content */}
        <div className="py-1 md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-6">
            Simplify Your <span className="text-green-600">Stay</span> & <span className="text-green-600">Meal</span> Experience
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8">
            Welcome to <strong>StayNMeal</strong> — an <span className="text-green-700 font-semibold">AI-powered platform</span> that connects you with affordable accommodations and delicious home-style meals in <strong>Pune and beyond</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium shadow transition"
              onClick={() => handleNavigate('/seekers')}
            >
              Find Stay & Meal
            </button>
            <button 
              className="px-6 py-3 border border-green-600 text-green-600 hover:bg-green-50 rounded-full font-medium transition"
              onClick={() => handleNavigate('/list-service')}
              >
              List Your Service
            </button>
          </div>
        </div>

        {/* Right: Image Carousel */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-64 md:w-80 h-72 min-h-[20rem] rounded-xl shadow-lg overflow-hidden">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showIndicators={true}
              emulateTouch
              transitionTime={700}
              swipeable
              interval={3000}
              dynamicHeight={false}
            >
              <div>
                <img src="/Image1.png" alt="StayNMeal Slide 1" className="w-full h-full object-cover" />
              </div>
              <div>
                <img src="/Image2.png" alt="StayNMeal Slide 2" className="w-full h-full object-cover" />
              </div>
              <div>
                <img src="/Image3.png" alt="StayNMeal Slide 3" className="w-full h-full object-cover" />
              </div>
              <div>
                <img src="/Image4.png" alt="StayNMeal Slide 3" className="w-full h-full object-cover" />
              </div>              
            </Carousel>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
