/** @format */

import styled, { css } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const Img = styled.img`
  scale: 1;
  width: 50%;
`;

function Logo({ logoType = 'default' }) {
  const { isDarkMode } = useDarkMode();
  return (
    <Img
      // src={isDarkMode ? '/logo-purple.png' : '/logo.png'}
      src={logoType === 'default' ? '/logo.png' : '/logo-short.png'}
      alt="Logo"
      mode={isDarkMode ? 'dark' : ''}
    />
  );
}

export default Logo;
