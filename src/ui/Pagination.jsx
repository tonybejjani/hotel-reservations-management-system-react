/** @format */

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const PAGE_SIZE = 10;

function Pagination({ count }) {
  console.log(count);

  const [searchParams, setSearchParams] = useSearchParams();

  let pageValue = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function PrevPage() {
    if (pageValue === 1) return;

    searchParams.set('page', Number(pageValue) - 1);

    setSearchParams(searchParams);
  }

  function NextPage() {
    if (pageValue === pageCount) return;

    searchParams.set('page', Number(pageValue) + 1);

    setSearchParams(searchParams);
  }

  if (pageCount === 1) return;

  return (
    <StyledPagination>
      <P>
        Showing <span>{PAGE_SIZE * pageValue + 1 - 10} </span> to
        <span>
          {' '}
          {pageValue === pageCount ? count : PAGE_SIZE * pageValue}
        </span>{' '}
        of
        <span> {count}</span> results.
      </P>
      <Buttons>
        <PaginationButton onClick={PrevPage} disabled={pageValue === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={NextPage} disabled={pageValue === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
