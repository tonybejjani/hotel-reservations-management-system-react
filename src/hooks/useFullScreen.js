/** @format */

import { useEffect } from 'react';

export function useFullScreen() {
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      // Dynamic viewport height calculation
      const updateVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      // Scroll stabilization state
      let isScrolling = false;
      let scrollTimeout = null;

      // Handle scroll start (when user starts touching/scrolling)
      const handleScrollStart = () => {
        if (!isScrolling) {
          isScrolling = true;
          document.body.classList.add('scrolling');
        }

        // Clear existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };

      // Handle scroll end (when user stops scrolling)
      const handleScrollEnd = () => {
        // Debounce the scroll end detection
        scrollTimeout = setTimeout(() => {
          if (isScrolling) {
            isScrolling = false;
            document.body.classList.remove('scrolling');
          }
        }, 150);
      };

      // Optimized URL bar hiding (less aggressive)
      const hideURLBar = () => {
        if (window.scrollY === 0) {
          window.scrollTo(0, 1);
          setTimeout(() => window.scrollTo(0, 0), 100);
        }
      };

      // Try to enter fullscreen mode (with error handling)
      const requestFullscreen = () => {
        const elem = document.documentElement;
        try {
          if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {});
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          }
        } catch (error) {
          // Silently handle fullscreen errors
          console.log('Fullscreen not supported or blocked');
        }
      };

      // Handle viewport/orientation changes
      const handleViewportChange = () => {
        updateVH();
        setTimeout(hideURLBar, 200);
      };

      // One-time fullscreen attempt on user interaction
      const enableFullscreen = () => {
        requestFullscreen();
        // Remove listeners after first attempt
        document.removeEventListener('touchstart', enableFullscreen);
        document.removeEventListener('click', enableFullscreen);
      };

      // Initial setup
      updateVH();
      setTimeout(hideURLBar, 200);

      // Add event listeners with proper options
      document.addEventListener('touchstart', enableFullscreen, {
        once: true,
        passive: true,
      });
      document.addEventListener('click', enableFullscreen, {
        once: true,
        passive: true,
      });

      // Scroll handling for wobble prevention
      window.addEventListener('touchstart', handleScrollStart, {
        passive: true,
      });
      window.addEventListener('touchmove', handleScrollStart, {
        passive: true,
      });
      window.addEventListener('touchend', handleScrollEnd, { passive: true });
      window.addEventListener('scroll', handleScrollEnd, { passive: true });

      // Viewport change handling
      window.addEventListener('resize', handleViewportChange);
      window.addEventListener('orientationchange', handleViewportChange);

      // Cleanup function
      return () => {
        // Clear timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // Remove body class
        document.body.classList.remove('scrolling');

        // Remove all event listeners
        window.removeEventListener('resize', handleViewportChange);
        window.removeEventListener('orientationchange', handleViewportChange);
        window.removeEventListener('touchstart', handleScrollStart);
        window.removeEventListener('touchmove', handleScrollStart);
        window.removeEventListener('touchend', handleScrollEnd);
        window.removeEventListener('scroll', handleScrollEnd);
        document.removeEventListener('touchstart', enableFullscreen);
        document.removeEventListener('click', enableFullscreen);
      };
    }
  }, []);
}
