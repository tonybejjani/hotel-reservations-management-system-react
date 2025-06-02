/** @format */

import { useEffect } from 'react';

export function useFullScreen() {
  useEffect(() => {
    // Mobile full-screen behavior
    const isMobile = window.innerWidth <= 1024;

    if (isMobile) {
      // Force initial scroll to hide URL bar
      const forceHideUrlBar = () => {
        window.scrollTo(0, 1);
        setTimeout(() => window.scrollTo(0, 0), 100);
      };

      // Hide URL bar on load
      setTimeout(forceHideUrlBar, 500);

      // Hide URL bar on orientation change
      const handleOrientationChange = () => {
        setTimeout(forceHideUrlBar, 300);
      };

      // Add event listeners
      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleOrientationChange);

      // Cleanup
      return () => {
        window.removeEventListener(
          'orientationchange',
          handleOrientationChange
        );
        window.removeEventListener('resize', handleOrientationChange);
      };
    }
  }, []);
}
