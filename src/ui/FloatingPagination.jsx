/** @format */

import styled from 'styled-components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  /* Only show on mobile */
  display: none;

  @media (max-width: 639px) {
    display: block;
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const FloatingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const PageIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
  min-width: 6rem;
`;

const CurrentPage = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

const PageText = styled.div`
  font-size: 1.1rem;
  opacity: 0.8;
`;

function FloatingMobilePagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
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
        <FloatingButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
        </FloatingButton>

        <PageIndicator>
          <CurrentPage>{currentPage}</CurrentPage>
          <PageText>of {pageCount}</PageText>
        </PageIndicator>

        <FloatingButton onClick={nextPage} disabled={currentPage === pageCount}>
          <HiChevronRight />
        </FloatingButton>
      </FloatingPagination>
    </FloatingContainer>
  );
}

export default FloatingMobilePagination;
