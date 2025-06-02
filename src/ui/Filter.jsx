/** @format */

import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === 'activate' &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  ${(props) =>
    props.mode === 'dark' &&
    props.active === 'activate' &&
    css`
      color: var(--color-brand-900);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  ${(props) =>
    props.mode === 'dark' &&
    css`
      &:hover:not(:disabled) {
        color: var(--color-brand-800);
      }
    `}
`;

function Filter({ filterField, options, defaultFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isDarkMode } = useDarkMode();

  const mode = isDarkMode ? 'dark' : '';

  const activeFilter =
    searchParams.get(filterField) || options[defaultFilter].value;

  function handleClick(value) {
    //reset page
    if (searchParams.get('page')) {
      searchParams.set('page', 1);
    }

    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={activeFilter === option.value ? 'activate' : ''}
          disabled={activeFilter === option.value}
          mode={mode}
        >
          {option.label}
        </FilterButton>
      ))}
      {/* <FilterButton onClick={() => handleClick('all')}>All</FilterButton>
      <FilterButton onClick={() => handleClick('no-discount')}>
        No discount
      </FilterButton>
      <FilterButton onClick={() => handleClick('with-discount')}>
        With discount
      </FilterButton> */}
    </StyledFilter>
  );
}

export default Filter;
