import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useHomeScroll() {
  const location = useLocation();

  useEffect(() => {
    let scrollId = '';

    // Priority: location.state.scrollTo > location.hash
    if (location.state?.scrollTo) {
      scrollId = location.state.scrollTo;
    } else if (location.hash) {
      scrollId = location.hash.replace('#', '');
    }

    if (scrollId) {
      const el = document.getElementById(scrollId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
}
