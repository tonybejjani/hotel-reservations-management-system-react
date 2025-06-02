/** @format */

import { useEffect } from 'react';

export function useFullScreen() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;

    if (isMobile) {
      // Aggressive URL bar hiding for all mobile browsers
      const hideUrlBar = () => {
        // Force scroll to hide URL bar
        window.scrollTo(0, 1);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 50);
      };

      // Safari-specific URL bar hiding
      const hideSafariUrlBar = () => {
        if (window.navigator.standalone) return; // Already in standalone mode

        // Multiple attempts to hide URL bar
        setTimeout(() => window.scrollTo(0, 1), 100);
        setTimeout(() => window.scrollTo(0, 1), 300);
        setTimeout(() => window.scrollTo(0, 1), 500);
        setTimeout(() => window.scrollTo(0, 0), 600);
      };

      // Initial hide on page load
      setTimeout(hideUrlBar, 100);
      setTimeout(hideSafariUrlBar, 200);

      // Hide on scroll events
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            if (window.scrollY > 50) {
              // Force minimal UI on scroll
              document.documentElement.style.setProperty(
                '--vh',
                `${window.innerHeight * 0.01}px`
              );
            }
            ticking = false;
          });
          ticking = true;
        }
      };

      // Hide on orientation change
      const handleOrientationChange = () => {
        setTimeout(() => {
          hideUrlBar();
          hideSafariUrlBar();
          // Update viewport height
          document.documentElement.style.setProperty(
            '--vh',
            `${window.innerHeight * 0.01}px`
          );
        }, 300);
      };

      // Hide on focus events (when keyboard appears/disappears)
      const handleFocus = () => {
        setTimeout(hideUrlBar, 300);
      };

      // Set initial viewport height
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );

      // Add event listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleOrientationChange);
      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleFocus);

      // Cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener(
          'orientationchange',
          handleOrientationChange
        );
        window.removeEventListener('resize', handleOrientationChange);
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('blur', handleFocus);
      };
    }
  }, []);
}
