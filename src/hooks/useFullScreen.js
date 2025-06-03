/** @format */

import { useEffect } from 'react';

export function useFullScreen() {
  useEffect(() => {
    // Only run on mobile
    if (window.innerWidth <= 1024) {
      // Simple viewport height fix
      const updateVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      // Simple URL bar hiding
      const hideURLBar = () => {
        // Multiple scroll attempts for different browsers
        window.scrollTo(0, 1);
        setTimeout(() => window.scrollTo(0, 0), 100);
        setTimeout(() => window.scrollTo(0, 1), 200);
        setTimeout(() => window.scrollTo(0, 0), 300);
      };

      // Try to enter fullscreen mode
      const requestFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          // Safari
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          // IE/Edge
          elem.msRequestFullscreen();
        }
      };

      // Initial setup
      updateVH();
      setTimeout(hideURLBar, 100);

      // Try fullscreen on user interaction
      const enableFullscreen = () => {
        requestFullscreen();
        document.removeEventListener('touchstart', enableFullscreen);
        document.removeEventListener('click', enableFullscreen);
      };

      document.addEventListener('touchstart', enableFullscreen);
      document.addEventListener('click', enableFullscreen);

      // Handle viewport changes
      const handleChange = () => {
        updateVH();
        setTimeout(hideURLBar, 100);
      };

      window.addEventListener('resize', handleChange);
      window.addEventListener('orientationchange', handleChange);
      window.addEventListener('scroll', updateVH); // Update on scroll

      return () => {
        window.removeEventListener('resize', handleChange);
        window.removeEventListener('orientationchange', handleChange);
        window.removeEventListener('scroll', updateVH);
        document.removeEventListener('touchstart', enableFullscreen);
        document.removeEventListener('click', enableFullscreen);
      };
    }
  }, []);
}
