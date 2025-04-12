/** @format */

import styled, { css } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12.8rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img
        src={isDarkMode ? '/logo-purple.png' : '/logo-light1.png'}
        alt="Logo"
        mode={isDarkMode ? 'dark' : ''}
      />
    </StyledLogo>
  );
}

export default Logo;
