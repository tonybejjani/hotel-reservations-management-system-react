/** @format */

import styled from 'styled-components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);

  /* Hide on mobile (1-column grid) */
  @media (max-width: 639px) {
    display: none;
  }

  @media (max-width: 640px) and (min-width: 640px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const InfoText = styled.p`
  text-align: center;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  span {
    font-weight: 600;
    color: var(--color-grey-800);
  }

  @media (max-width: 640px) {
    font-size: 1.3rem;
  }
`;

const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4rem;
  height: 4rem;
  padding: 0 1rem;
  border: 1px solid var(--color-grey-300);
  background-color: ${(props) =>
    props.active ? 'var(--color-brand-600)' : 'var(--color-grey-0)'};
  color: ${(props) =>
    props.active ? 'var(--color-brand-50)' : 'var(--color-grey-700)'};
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.active ? 'var(--color-brand-700)' : 'var(--color-grey-100)'};
    border-color: var(--color-brand-300);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--color-grey-100);
    color: var(--color-grey-400);
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  @media (max-width: 640px) {
    min-width: 3.6rem;
    height: 3.6rem;
    font-size: 1.3rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

const NavButton = styled(PageButton)`
  min-width: auto;
  padding: 0 1.2rem;
  gap: 0.6rem;

  @media (max-width: 640px) {
    padding: 0 1rem;
    gap: 0.4rem;

    span {
      display: none;
    }
  }
`;

const EllipsisButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4rem;
  height: 4rem;
  color: var(--color-grey-500);

  @media (max-width: 640px) {
    min-width: 3.6rem;
    height: 3.6rem;
  }
`;

function ResponsivePagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function goToPage(page) {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    goToPage(next);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    goToPage(prev);
  }

  if (pageCount <= 1) return null;

  const startResult = (currentPage - 1) * PAGE_SIZE + 1;
  const endResult = currentPage === pageCount ? count : currentPage * PAGE_SIZE;

  // Generate page numbers for tablet/desktop
  function getPageNumbers() {
    const pages = [];
    const maxVisiblePages = 5;

    if (pageCount <= maxVisiblePages) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const rangeSize = maxVisiblePages - 3;
      const rangeStart = Math.max(2, currentPage - Math.floor(rangeSize / 2));
      const rangeEnd = Math.min(pageCount - 1, rangeStart + rangeSize - 1);

      if (rangeStart > 2) {
        pages.push('ellipsis-start');
      }

      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }

      if (rangeEnd < pageCount - 1) {
        pages.push('ellipsis-end');
      }

      if (pageCount > 1) {
        pages.push(pageCount);
      }
    }

    return pages;
  }

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      <InfoText>
        Showing{' '}
        <span>
          {startResult}-{endResult}
        </span>{' '}
        of <span>{count}</span> guests
      </InfoText>
      <PaginationNav>
        <NavButton
          onClick={prevPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <HiChevronLeft />
          <span>Previous</span>
        </NavButton>
        {pageNumbers.map((page, index) => {
          if (typeof page === 'string') {
            return <EllipsisButton key={page}>...</EllipsisButton>;
          }
          return (
            <PageButton
              key={page}
              active={page === currentPage}
              onClick={() => goToPage(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {' '}
              {page}{' '}
            </PageButton>
          );
        })}{' '}
        <NavButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
          aria-label="Next page"
        >
          {' '}
          <span>Next</span> <HiChevronRight />{' '}
        </NavButton>{' '}
      </PaginationNav>{' '}
    </PaginationContainer>
  );
}
export default ResponsivePagination;
