/** @format */

// import styled, { css } from 'styled-components';

import styled, { css } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  smallMedium: css`
    font-size: 1.2rem;
    padding: 1rem 1.2rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  primaryDark: css`
    color: var(--color-grey-900);
    background-color: var(--color-brand-600);

    &:hover {
      color: var(--color-brand-100);
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-green-300);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-200);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const StyledButton = styled.button`
  ${(props) =>
    css`
      ${sizes[props.size]}
    `}

  ${(props) =>
    css`
      ${variations[props.variation]}
    `}

  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

StyledButton.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

function Button({ children, variation = 'primary', size, ...props }) {
  const { isDarkMode } = useDarkMode();

  const mode = isDarkMode ? 'dark' : '';

  const variationMode = `${variation}${
    mode.charAt(0).toUpperCase() + mode.slice(1)
  }`;

  return (
    <StyledButton variation={variationMode} mode={mode} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
