/** @format */

import styled from 'styled-components';
import { useState } from 'react';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 1rem;
  padding: 0.8rem 1.2rem;
  background-color: var(--color-grey-900);
  color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  transition: all 0.2s ease;
  z-index: 1000;
  box-shadow: var(--shadow-lg);

  /* Arrow pointing to the element */
  &::before {
    content: '';
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 6px solid transparent;
    border-right-color: var(--color-grey-900);
  }

  /* Dark mode adjustments */
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-grey-100);
    color: var(--color-grey-900);

    &::before {
      border-right-color: var(--color-grey-100);
    }
  }

  .dark-mode & {
    background-color: var(--color-grey-100);
    color: var(--color-grey-900);

    &::before {
      border-right-color: var(--color-grey-100);
    }
  }
`;

function Tooltip({ children, content, delay = 500 }) {
  const [show, setShow] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setShow(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setShow(false);
  };

  return (
    <TooltipContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <TooltipContent show={show}>{content}</TooltipContent>
    </TooltipContainer>
  );
}

export default Tooltip;
