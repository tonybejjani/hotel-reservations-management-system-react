/** @format */
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {

  &, &.light-mode {

    /* ===== NEUTRAL GREYS (LIGHT THEME) ===== */
    --color-grey-0: #ffffff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;

    /* ===== SEMANTIC COLORS (LIGHT THEME) ===== */
    --color-blue-100: #dbeafe;
    --color-blue-700: #1d4ed8;
    --color-green-100: #dcfce7;
    --color-green-700: #15803d;
    --color-yellow-100: #fef3c7;
    --color-yellow-700: #b45309;
    --color-silver-100: #e5e7eb;
    --color-silver-700: #374151;
    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4338ca;

    /* ===== SOPHISTICATED BLUE BRAND ===== */
    --color-brand-50: #eff6ff;
    --color-brand-100: #dbeafe;
    --color-brand-200: #bfdbfe;
    --color-brand-500: #3b82f6;
    --color-brand-600: #2563eb;
    --color-brand-700: #1d4ed8;
    --color-brand-800: #1e40af;
    --color-brand-900: #1e3a8a;

    /* ===== ERROR COLORS ===== */
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    /* ===== DESIGN TOKENS ===== */
    --backdrop-color: rgba(0, 0, 0, 0.1);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

    /* For dark mode */
    --image-grayscale: 0;
    --image-opacity: 100%;

    ::-webkit-calendar-picker-indicator {
      scale: 1.5;
    } 
  }

  &.dark-mode {

    /* ===== NEUTRAL GREYS (DARK THEME - BETTER CONTRAST!) ===== */
    --color-grey-0: #18212f;
    --color-grey-50: #111827;
    --color-grey-100: #1f2937;
    --color-grey-200: #374151;
    --color-grey-300: #4b5563;
    --color-grey-400: #6b7280;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;
    /* ===== SEMANTIC COLORS (DARK THEME - BETTER CONTRAST!) ===== */
    --color-blue-100: #1e3a8a;        /* Darker blue for dark theme */
    --color-blue-700: #93c5fd;        /* Much brighter blue for better contrast */
    --color-green-100: #14532d;       /* Darker green */
    --color-green-700: #86efac;       /* Much brighter green for better contrast */
    --color-yellow-100: #78350f;      /* Darker yellow */
    --color-yellow-700: #fde047;      /* Much brighter yellow for better contrast */
    --color-silver-100: #404040;      /* Dark silver - better contrast */
    --color-silver-700: #d4d4d4;      /* Light silver - better contrast */
    --color-indigo-100: #312e81;      /* Darker indigo */
    --color-indigo-700: #c7d2fe;      /* Much brighter indigo for better contrast */

    /* ===== SOPHISTICATED BLUE BRAND (DARK THEME - BETTER CONTRAST!) ===== */
    --color-brand-50: #172554;        /* Very dark brand */
    --color-brand-100: #1e3a8a;       /* Dark brand */
    --color-brand-200: #1e40af;       /* Medium dark brand */
    --color-brand-500: #60a5fa;       /* Bright brand for dark bg - increased brightness */
    --color-brand-600: #3b82f6;       /* Main brand color - good contrast */
    --color-brand-700: #93c5fd;       /* Much brighter for better text contrast */
    --color-brand-800: #bfdbfe;       /* Even brighter for high contrast needs */
    --color-brand-900: #dbeafe;       /* Very bright for maximum contrast */

    /* ===== ERROR COLORS (DARK THEME - BETTER CONTRAST!) ===== */
    --color-red-100: #7f1d1d;         /* Dark red */
    --color-red-700: #fca5a5;         /* Much brighter red for better contrast */
    --color-red-800: #f87171;         /* Brighter red - better contrast */

    /* ===== DESIGN TOKENS (DARK THEME) ===== */
    --backdrop-color: rgba(0, 0, 0, 0.7);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.8);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.7), 0 2px 4px -2px rgba(0, 0, 0, 0.7);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.8), 0 4px 6px -4px rgba(0, 0, 0, 0.8);

    --image-grayscale: 10%;
    --image-opacity: 90%;

    ::-webkit-calendar-picker-indicator {
      filter: invert(1) brightness(111%) sepia(100%) saturate(10000%) hue-rotate(180deg);
      scale: 1.5;
    } 
  }

  /* ===== BORDER RADIUS SYSTEM ===== */
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
}

html {
  font-size: 62.5%;
  width: 100%;
  overflow-x: hidden;
}

body {
  font-family: "Inter", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: var(--color-grey-700);
  background-color: var(--color-grey-0);
  
  transition: color 0.3s ease, background-color 0.3s ease;
  min-height: 100vh;
  line-height: 1.6;
  font-size: 1.6rem;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  
  /* Better font rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  
  /* Simple mobile viewport */
  @media (max-width: 1024px) {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    height: -webkit-fill-available;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    min-height: -webkit-fill-available;
  }
}

#root {
  width: 100%;
  min-height: 100vh;
  
  @media (max-width: 1024px) {
    min-height: calc(var(--vh, 1vh) * 100);
    min-height: -webkit-fill-available;
  }
}

/* Simple mobile optimizations */
@media (max-width: 1024px) {
  input[type="text"], input[type="email"], input[type="password"], textarea {
    font-size: 16px !important;
  }

    /* ===== FIX WOBBLING/UNSTABLE SCROLLING ===== */
  html, body {
    overflow-x: hidden !important;
    overscroll-behavior-x: none;
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
  
  #root {
    overflow-x: hidden !important;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }
  
  /* Prevent horizontal bounce/wobble */
  * {
    overscroll-behavior-x: none;
    -webkit-overscroll-behavior-x: none;
  }
  
  /* Stabilize touch scrolling */
  body {
    touch-action: pan-y !important;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }
  
  /* Allow text selection only for inputs */
  input, textarea, [contenteditable] {
    -webkit-user-select: auto;
    user-select: auto;
    touch-action: manipulation;
  }
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  background: none;
  border: none;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-100);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

input::-webkit-calendar-picker-indicator {
  opacity: 1;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-brand-600);
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  height: auto;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* Hide scrollbars on mobile */
@media (max-width: 1024px) {
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  
  * {
    scrollbar-width: none;
  }
}

/* Desktop scrollbars */
@media (min-width: 1025px) {
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 4px;
    
    &:hover {
      background: var(--color-grey-400);
    }
  }
  
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--color-grey-300) var(--color-grey-100);
  }
}

/* Responsive typography */
@media (max-width: 768px) {
  html {
    font-size: 56.25%;
  }
}

@media (max-width: 480px) {
  html {
    font-size: 50%;
  }
}

@media (min-width: 1200px) {
  html {
    font-size: 68.75%;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}



/* ===== PWA FULL-SCREEN FIXES ===== */
@media all and (display-mode: standalone) {
  html, body {
    height: 100vh;
    height: 100dvh; /* Dynamic viewport height */
    overflow: hidden;
  }
  
  #root {
    height: 100vh;
    height: 100dvh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  /* Remove any bottom margins/padding in PWA mode */
  body {
    margin: 0 !important;
    padding: 0 !important;
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }
}

/* ===== iOS SAFE AREA HANDLING ===== */
@supports (padding: max(0px)) {
  body {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    padding-bottom: env(safe-area-inset-bottom);
    padding-top: env(safe-area-inset-top);
  }
  
  /* In PWA mode, handle safe areas differently */
  @media all and (display-mode: standalone) {
    body {
      padding-bottom: 0 !important; /* Remove bottom safe area padding */
    }
  }
}


`;

export default GlobalStyles;
