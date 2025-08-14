import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Skip if there's a hash (#section)
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null; // No UI
}
