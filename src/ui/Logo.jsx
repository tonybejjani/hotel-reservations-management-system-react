/** @format */

import styled, { css } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const Img = styled.img`
  scale: 1;
  width: 50%;
`;

function Logo({ type = 'default' }) {
  const { isDarkMode } = useDarkMode();

  const logoTypes = {
    long: 'logo-long.png',
    short: 'logo-short.png',
    default: 'logo.png',
  };
  return (
    <Img
      // src={isDarkMode ? '/logo-purple.png' : '/logo.png'}
      src={logoTypes[type]}
      alt="Logo"
      mode={isDarkMode ? 'dark' : ''}
    />
  );
}

export default Logo;
