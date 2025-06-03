/** @format */

import { useEffect } from 'react';

export function useFullScreen() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;

    if (isMobile) {
      // Set dynamic viewport height
      const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      // Initial set
      setVH();

      // Aggressive URL bar hiding
      const hideAddressBar = () => {
        setTimeout(() => {
          window.scrollTo(0, 1);
          setTimeout(() => window.scrollTo(0, 0), 100);
        }, 100);
      };

      // Force initial hide
      hideAddressBar();

      // Handle orientation and resize
      const handleResize = () => {
        setVH();
        setTimeout(hideAddressBar, 300);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    }
  }, []);
}
