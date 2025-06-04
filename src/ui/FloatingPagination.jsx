/** @format */

import styled, { css } from 'styled-components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';
import { useDarkMode } from '../context/DarkModeContext';

const FloatingContainer = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  /* Mobile Portrait: Above mobile nav */
  @media (max-width: 639px) {
    bottom: 8rem; /* Above 5.6rem mobile nav + margin */
    display: block;
  }

  /* Phablet: Above taller mobile nav */
  @media (min-width: 640px) and (max-width: 767px) {
    bottom: 8.5rem; /* Above 6rem mobile nav + margin */
    display: block;
  }

  /* Tablet and up: Hide (use regular pagination) */
  @media (min-width: 768px) {
    display: none;
  }

  /* PWA Standalone: Much closer to bottom */
  @media all and (display-mode: standalone) {
    @media (max-width: 639px) {
      bottom: 2.5rem; /* No mobile nav in PWA */
    }

    @media (min-width: 640px) and (max-width: 767px) {
      bottom: 3rem; /* Slightly more space on phablets */
    }
  }

  /* Safe area support for devices with notches */
  @supports (bottom: env(safe-area-inset-bottom)) {
    @media (max-width: 639px) {
      bottom: calc(8rem + env(safe-area-inset-bottom));
    }

    @media (min-width: 640px) and (max-width: 767px) {
      bottom: calc(8.5rem + env(safe-area-inset-bottom));
    }

    /* PWA with safe area */
    @media all and (display-mode: standalone) {
      @media (max-width: 639px) {
        bottom: calc(2.5rem + env(safe-area-inset-bottom));
      }

      @media (min-width: 640px) and (max-width: 767px) {
        bottom: calc(3rem + env(safe-area-inset-bottom));
      }
    }
  }
`;

const FloatingPagination = styled.div`
  background: linear-gradient(
    135deg,
    var(--color-brand-600) 0%,
    var(--color-brand-700) 100%
  );
  border-radius: 3rem;
  padding: 1rem 1.5rem;

  /* Enhanced shadows for better depth */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  /* Subtle border for better definition */
  border: 1px solid rgba(255, 255, 255, 0.08);

  display: flex;
  align-items: center;
  gap: 1.5rem;

  /* Dark mode adjustments */
  .dark-mode & {
    background: linear-gradient(
      135deg,
      var(--color-brand-500) 0%,
      var(--color-brand-600) 100%
    );

    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1);

    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  /* Accessibility: Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    * {
      transition: none !important;
      animation: none !important;
    }
  }
`;

const FloatingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--color-grey-0);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Better touch target for accessibility */
  min-width: 44px;
  min-height: 44px;

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }

  /* Focus state for keyboard navigation */
  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  svg {
    width: 2rem;
    height: 2rem;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));

    ${(props) =>
      props.mode === 'dark' &&
      css`
        color: var(--color-grey-900);
      `}
  }

  /* Smaller screens: Slightly smaller buttons */
  @media (max-width: 380px) {
    width: 4rem;
    height: 4rem;

    svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

const PageIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-grey-0);
  min-width: 6rem;
  text-align: center;

  ${(props) =>
    props.mode === 'dark' &&
    css`
      color: var(--color-grey-900);
    `}
`;

const CurrentPage = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  /* Smaller screens: Adjust font size */
  @media (max-width: 380px) {
    font-size: 1.6rem;
  }
`;

const PageText = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  /* Smaller screens: Adjust font size */
  @media (max-width: 380px) {
    font-size: 1.1rem;
  }
`;

function FloatingMobilePagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isDarkMode } = useDarkMode();

  const mode = isDarkMode ? 'dark' : '';

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <FloatingContainer>
      <FloatingPagination>
        <FloatingButton
          onClick={prevPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
          mode={mode}
        >
          <HiChevronLeft />
        </FloatingButton>

        <PageIndicator mode={mode}>
          <CurrentPage>{currentPage}</CurrentPage>
          <PageText>of {pageCount}</PageText>
        </PageIndicator>

        <FloatingButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
          aria-label="Next page"
        >
          <HiChevronRight />
        </FloatingButton>
      </FloatingPagination>
    </FloatingContainer>
  );
}

export default FloatingMobilePagination;
