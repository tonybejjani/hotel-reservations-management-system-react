/** @format */

import styled, { css } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const Img = styled.img`
  scale: 1;
  width: 50%;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <Img
      // src={isDarkMode ? '/logo-purple.png' : '/logo.png'}
      src="/logo.png"
      alt="Logo"
      mode={isDarkMode ? 'dark' : ''}
    />
  );
}

export default Logo;
