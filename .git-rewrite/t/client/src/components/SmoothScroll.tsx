import { useEffect } from 'react';

export const SmoothScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo({
        top: window.scrollY,
        behavior: 'smooth',
      });
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return null;

};

export default SmoothScroll;