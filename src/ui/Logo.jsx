/** @format */

import styled, { css } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  scale: 1;
  width: 50%;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img
        // src={isDarkMode ? '/logo-purple.png' : '/logo.png'}
        src="/logo-orange9.png"
        alt="Logo"
        mode={isDarkMode ? 'dark' : ''}
      />
    </StyledLogo>
  );
}

export default Logo;
