/** @format */
import { createGlobalStyle } from 'styled-components';

/*
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Sono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
*/

/* Colors adapted from https://tailwindcss.com/docs/customizing-colors */
const GlobalStyles = createGlobalStyle`
:root {


  &, &.light-mode {

    /* === Updated Semantic Colors - Light Mode (Using Professional Palette) === */
    /* Greys */
    --color-grey-0: var(--color-pro-grey-50);    /* Page background */
    --color-grey-50: var(--color-pro-grey-100);   /* Subtle background */
    --color-grey-100: var(--color-pro-grey-300);  /* UI element background */
    --color-grey-200: var(--color-pro-grey-300);  /* Borders */
    --color-grey-300: var(--color-pro-grey-500);  /* Borders, disabled elements */
    --color-grey-400: var(--color-pro-grey-500);  /* Hover borders */
    --color-grey-500: var(--color-pro-grey-700);  /* Text/icons, secondary */
    --color-grey-600: var(--color-pro-grey-700);  /* Text/icons, secondary */
    --color-grey-700: var(--color-pro-grey-900);  /* Primary text */
    --color-grey-800: var(--color-pro-grey-900);  /* Headings */
    --color-grey-900: var(--color-pro-grey-900);  /* Very dark elements */

    /* Brand (mapped to Pro Blues) */
    --color-brand-50: var(--color-pro-blue-100);
    --color-brand-100: var(--color-pro-blue-300); 
    --color-brand-200: var(--color-pro-blue-500); 
    --color-brand-500: var(--color-pro-blue-700);
    --color-brand-600: var(--color-pro-blue-700); /* Main brand color */
    --color-brand-700: var(--color-pro-blue-900);
    --color-brand-800: var(--color-pro-blue-900); 
    --color-brand-900: var(--color-pro-blue-900); 
    
    /* Accents */
    --color-blue-100: var(--color-pro-blue-100);
    --color-blue-700: var(--color-pro-blue-700);
    
    --color-green-100: var(--color-pro-blue-100); /* Using pro blue for positive bg */
    --color-green-700: var(--color-pro-blue-500); /* Using pro blue for positive element */
    
    --color-yellow-100: #fef9c3; /* Keeping original yellow */
    --color-yellow-700: #a16207; /* Keeping original yellow */
    
    --color-silver-100: var(--color-pro-grey-100);
    --color-silver-700: var(--color-pro-grey-500);
    
    --color-indigo-100: var(--color-pro-blue-100); 
    --color-indigo-700: var(--color-pro-blue-900); /* Using a darker pro blue */

    /* Reds (Unchanged) */
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    /* Backdrop & Shadows */
    --backdrop-color: rgba(203, 213, 225, 0.1); /* Based on color-pro-grey-300 with alpha */
    /* Using --color-pro-grey-700 (#334155) for shadow color */
    --shadow-sm: 0 1px 2px rgba(51, 65, 85, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(51, 65, 85, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(51, 65, 85, 0.12);

    /* === Professional Blue/Grey Palette - Light Mode === */
    --color-pro-blue-100: #e0f2fe;
    --color-pro-blue-300: #7dd3fc;
    --color-pro-blue-500: #0ea5e9;
    --color-pro-blue-700: #0369a1;
    --color-pro-blue-900: #0c4a6e;

    --color-pro-grey-50: #f8fafc;
    --color-pro-grey-100: #f1f5f9;
    --color-pro-grey-300: #cbd5e1;
    --color-pro-grey-500: #64748b;
    --color-pro-grey-700: #334155;
    --color-pro-grey-900: #0f172a;
    
    --gradient-blue-light: linear-gradient(to bottom right, var(--color-pro-blue-300), var(--color-pro-blue-500));
    --gradient-blue-dark: linear-gradient(to bottom right, var(--color-pro-blue-500), var(--color-pro-blue-700));
    --gradient-grey-light: linear-gradient(to bottom right, var(--color-pro-grey-100), var(--color-pro-grey-300));
    --gradient-grey-dark: linear-gradient(to bottom right, var(--color-pro-grey-300), var(--color-pro-grey-500));

    /* === Commented out RBC Palette - Light Mode (Reference) === */
    /*
    --rbc-blue-100: #eaf6ff;
    --rbc-blue-500: #3b99fc; 
    --rbc-blue-600: #3174ad; 
    --rbc-blue-700: #265985; 

    --rbc-grey-50: #f7f7f7;   
    --rbc-grey-100: #e6e6e6; 
    --rbc-grey-200: #e5e5e5; 
    --rbc-grey-300: #dddddd; 
    --rbc-grey-400: #cccccc; 
    --rbc-grey-500: #adadad; 
    --rbc-grey-600: #999999; 
    --rbc-grey-800: #373a3c; 

    --rbc-green-500: #74ad31; 

    --rbc-gradient-blue-light: linear-gradient(to bottom, var(--rbc-blue-600), var(--rbc-blue-700));
    --rbc-gradient-grey-light: linear-gradient(to bottom, var(--rbc-grey-100), var(--rbc-grey-300));
    */

      /* For dark mode */
    --image-grayscale: 0;
    --image-opacity: 100%;

    ::-webkit-calendar-picker-indicator {

    scale: 1.5;
  } 


  }

  &.dark-mode {

    /* === Updated Semantic Colors - Dark Mode (Using Professional Palette) === */
    /* Greys */
    --color-grey-0: var(--color-pro-grey-100-dark);    /* Page background */
    --color-grey-50: var(--color-pro-grey-300-dark);   /* UI element background */
    --color-grey-100: var(--color-pro-grey-500-dark);  /* Subtle background/borders */
    --color-grey-200: var(--color-pro-grey-500-dark);  /* Borders */
    --color-grey-300: var(--color-pro-grey-700-dark);  /* Borders, disabled elements */
    --color-grey-400: var(--color-pro-grey-700-dark);  /* Hover borders */
    --color-grey-500: var(--color-pro-grey-900-dark);  /* Text/icons, secondary */
    --color-grey-600: var(--color-pro-grey-900-dark);  /* Text/icons, secondary */
    --color-grey-700: var(--color-pro-grey-900-dark);  /* Primary text */
    --color-grey-800: var(--color-pro-grey-900-dark);  /* Headings */
    --color-grey-900: var(--color-pro-grey-900-dark);  /* Very light elements */

    /* Brand (mapped to Pro Blues dark) */
    --color-brand-50: var(--color-pro-blue-100-dark);
    --color-brand-100: var(--color-pro-blue-300-dark); 
    --color-brand-200: var(--color-pro-blue-500-dark); 
    --color-brand-500: var(--color-pro-blue-700-dark);
    --color-brand-600: var(--color-pro-blue-500-dark); /* Main brand color for dark */
    --color-brand-700: var(--color-pro-blue-300-dark); 
    --color-brand-800: var(--color-pro-blue-100-dark); 
    --color-brand-900: var(--color-pro-blue-100-dark); 

    /* Accents */
    --color-blue-100: var(--color-pro-blue-100-dark);
    --color-blue-700: var(--color-pro-blue-500-dark); 
    
    --color-green-100: var(--color-pro-blue-100-dark); /* Using pro blue for positive bg */
    --color-green-700: var(--color-pro-blue-500-dark); /* Using pro blue for positive element */
    
    --color-yellow-100: #854d0e; /* Keeping original dark yellow */
    --color-yellow-700: #fef9c3; /* Keeping original light yellow for text on dark */
    
    --color-silver-100: var(--color-pro-grey-300-dark);
    --color-silver-700: var(--color-pro-grey-700-dark);
    
    --color-indigo-100: var(--color-pro-blue-100-dark); 
    --color-indigo-700: var(--color-pro-blue-300-dark);

    /* Reds (Unchanged from original dark mode) */
    --color-red-100: #fee2e2; 
    --color-red-700: rgb(193, 81, 81);
    --color-red-800: #991b1b;

    /* Backdrop & Shadows */
    --backdrop-color: rgba(30, 41, 59, 0.3); /* Based on color-pro-grey-300-dark with alpha */
    /* Keeping black for shadows on dark for simplicity and contrast */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5); 
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
    
    /* === Professional Blue/Grey Palette - Dark Mode === */
    --color-pro-blue-100-dark: #0c4a6e; 
    --color-pro-blue-300-dark: #075985; 
    --color-pro-blue-500-dark: #0ea5e9; 
    --color-pro-blue-700-dark: #38bdf8; 
    --color-pro-blue-900-dark: #bae6fd; 

    --color-pro-grey-50-dark: #020617;  
    --color-pro-grey-100-dark: #0f172a; 
    --color-pro-grey-300-dark: #1e293b; 
    --color-pro-grey-500-dark: #475569; 
    --color-pro-grey-700-dark: #94a3b8; 
    --color-pro-grey-900-dark: #e2e8f0; 

    --gradient-blue-light-dark: linear-gradient(to bottom right, var(--color-pro-blue-300-dark), var(--color-pro-blue-500-dark));
    --gradient-blue-dark-dark: linear-gradient(to bottom right, var(--color-pro-blue-500-dark), var(--color-pro-blue-700-dark));
    --gradient-grey-light-dark: linear-gradient(to bottom right, var(--color-pro-grey-100-dark), var(--color-pro-grey-300-dark));
    --gradient-grey-dark-dark: linear-gradient(to bottom right, var(--color-pro-grey-300-dark), var(--color-pro-grey-500-dark));

    /* === Commented out RBC Palette - Dark Mode (Reference) === */
    /*
    --rbc-blue-100-dark: #1c2c3b;
    --rbc-blue-500-dark: #62b0ff; 
    --rbc-blue-600-dark: #58a6ff; 
    --rbc-blue-700-dark: #4a8cdb; 

    --rbc-grey-50-dark: #2d2d2d;   
    --rbc-grey-100-dark: #3a3a3a;
    --rbc-grey-200-dark: #444444;
    --rbc-grey-300-dark: #555555;
    --rbc-grey-400-dark: #666666;
    --rbc-grey-500-dark: #888888; 
    --rbc-grey-600-dark: #aaaaaa; 
    --rbc-grey-800-dark: #d0d0d0; 
    
    --rbc-green-500-dark: #8bc34a; 

    --rbc-gradient-blue-dark: linear-gradient(to bottom, var(--rbc-blue-600-dark), var(--rbc-blue-700-dark));
    --rbc-gradient-grey-dark: linear-gradient(to bottom, var(--rbc-grey-100-dark), var(--rbc-grey-300-dark));
    */

    --image-grayscale: 10%;
    --image-opacity: 90%;

    ::-webkit-calendar-picker-indicator {
    filter: invert(1)
    brightness(111%)
    sepia(100%)
    saturate(10000%)
    hue-rotate(180deg);
    scale: 1.5;
  } 
  }

    /* Indigo */
  /* --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81; */



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

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "lato", sans-serif;
  font-weight: 300;

  letter-spacing: 0.4px;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
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

}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-100);
  color: var(--color-grey-600);
}


input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

input::-webkit-calendar-picker-indicator {
              opacity: 100;
}
/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}



a {
  color: inherit;
  text-decoration: none;
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

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}`;

/*
FOR DARK MODE

*/
export default GlobalStyles;
