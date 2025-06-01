/** @format */

import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const Img = styled.img`
  width: auto;
  height: 3.2rem;
  transition: all 0.3s ease;
  object-fit: contain;
  max-width: 100%;

  /* Mobile: Compact logo for limited header space */
  @media (max-width: 639px) {
    height: 3.2rem;
    max-width: 14rem;
  }

  /* Phablet: Medium logo - optimized for enhanced header space */
  @media (min-width: 640px) and (max-width: 767px) {
    height: 3.8rem;
    max-width: 16rem;
  }

  /* Very small mobile: Even more compact */
  @media (max-width: 480px) {
    height: 2.8rem;
    max-width: 12rem;
  }

  /* Ensure crisp rendering */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* Subtle hover effect */
  &:hover {
    transform: scale(1.02);
  }
`;

function LogoMobile({ type = 'default' }) {
  const logoTypes = {
    long: 'logo-long.png',
    short: 'logo-short.png',
    default: 'logo.png',
  };
  return <Img src={logoTypes[type]} alt="Logo" />;
}

export default LogoMobile;
