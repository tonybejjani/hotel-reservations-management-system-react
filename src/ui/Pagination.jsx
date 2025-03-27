/** @format */

import { useState } from 'react';
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

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [direction, setDirection] = useState();
  let pageValue = Number(searchParams.get('page'));

  if (!pageValue) pageValue = 1;

  function handleClick(direction) {
    setDirection(direction);
    if (pageValue === 1 && direction === 'prev') return;

    searchParams.set(
      'page',
      direction === 'prev' ? Number(pageValue) - 1 : Number(pageValue) + 1
    );

    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>1</span> to <span>10</span> of <span>23</span> results.
      </P>
      <Buttons>
        <PaginationButton
          onClick={() => handleClick('prev')}
          disabled={pageValue === 1 && direction == 'prev'}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={() => handleClick('next')}
          disabled={pageValue === 1 && direction == 'next'}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
