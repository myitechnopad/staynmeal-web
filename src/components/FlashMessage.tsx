// components/FlashMessage.tsx
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FlashMessage = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state?.flash) {
      setMessage(location.state.flash);
      setVisible(true);

      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  if (!visible) return null;

  return (
    <div className="fixed top-1 left-1/2 transform -translate-x-1/2 bg-green-300 text-white px-4 py-2 rounded shadow z-50">
      {message}
    </div>
  );
};

export default FlashMessage;
