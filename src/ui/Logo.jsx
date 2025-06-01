/** @format */

import styled, { css } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const Img = styled.img`
  display: none;

  /* Target component when type prop is 'short' */
  ${(props) =>
    props.type === 'short' &&
    css`
      @media (min-width: 768px) and (max-width: 1199px) {
        width: 70%;
        scale: 0.8;
        display: block;
      }
    `}

  /* Target component when type prop is 'long' */
  ${(props) =>
    props.type === 'long' &&
    css`
      width: 70%;
      scale: 1.2;
    `}

  /* Target component when mode prop is 'dark' */
  ${(props) =>
    props.type === 'default' &&
    css`
      @media (min-width: 1200px) {
        width: 70%;
        scale: 0.7;
        display: block;
      }
    `}

  @media (max-width: 767px) {
    display: none;
  }
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
      type={type}
      src={logoTypes[type]}
      alt="Logo"
      mode={isDarkMode ? 'dark' : ''}
    />
  );
}

export default Logo;
