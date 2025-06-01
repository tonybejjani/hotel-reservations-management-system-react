/** @format */

import styled from 'styled-components';
import { useState } from 'react';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';

const SearchContainer = styled.div`
  position: relative;

  /* Desktop: Inline search */
  &.desktop {
    @media (min-width: 1025px) {
      width: 35rem;
      max-width: 40rem;
      display: block;
    }

    @media (max-width: 1024px) {
      display: none;
    }
  }

  /* Tablet: Full-width in header */
  &.tablet {
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      max-width: none;
      display: block;
    }

    @media (min-width: 1025px), (max-width: 767px) {
      display: none;
    }
  }

  /* Mobile: Sticky search bar */
  &.mobile {
    @media (max-width: 767px) {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(var(--color-grey-0-rgb), 0.95);
      padding: 1.5rem 0;
      margin: 0 -2rem 2rem -2rem;
      padding-left: 2rem;
      padding-right: 2rem;
      border-bottom: 1px solid var(--color-grey-200);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: block;
    }

    @media (min-width: 768px) {
      display: none;
    }
  }

  /* Default: Hide if no class specified */
  &:not(.desktop):not(.tablet):not(.mobile) {
    @media (min-width: 768px) {
      width: 35rem;
      max-width: 40rem;
    }

    @media (max-width: 767px) {
      width: 100%;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.2rem 4.4rem 1.2rem 4.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  font-size: 1.4rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(var(--color-brand-600-rgb), 0.1);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }

  /* Mobile: Enhanced styling */
  @media (max-width: 767px) {
    padding: 1.4rem 4.8rem 1.4rem 4.8rem;
    font-size: 1.6rem;
    border-radius: var(--border-radius-lg);
    background: var(--color-grey-50);
    border: 2px solid var(--color-grey-200);

    &:focus {
      background: var(--color-grey-0);
      border-color: var(--color-brand-500);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(var(--color-brand-600-rgb), 0.15);
    }
  }

  /* Phablet: Larger input */
  @media (min-width: 640px) and (max-width: 767px) {
    padding: 1.6rem 5.2rem 1.6rem 5.2rem;
    font-size: 1.7rem;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.4rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-grey-400);
  pointer-events: none;

  svg {
    width: 2rem;
    height: 2rem;
  }

  /* Mobile: Larger icon */
  @media (max-width: 767px) {
    left: 1.6rem;

    svg {
      width: 2.2rem;
      height: 2.2rem;
    }
  }

  /* Phablet: Even larger */
  @media (min-width: 640px) and (max-width: 767px) {
    left: 1.8rem;

    svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1.4rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-grey-400);
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};

  &:hover {
    color: var(--color-grey-600);
    background: var(--color-grey-100);
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  /* Mobile: Larger clear button */
  @media (max-width: 767px) {
    right: 1.6rem;
    padding: 0.6rem;

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

function GuestsSearchBar({ expanded, mobile, className }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Update URL params
    if (value) {
      searchParams.set('search', value);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    setSearchValue('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  // Determine container class based on props
  let containerClass = '';
  if (mobile) containerClass = 'mobile';
  else if (expanded) containerClass = 'tablet';
  else containerClass = 'desktop';

  return (
    <SearchContainer className={`${containerClass} ${className || ''}`}>
      <SearchIcon>
        <HiMagnifyingGlass />
      </SearchIcon>

      <SearchInput
        type="text"
        placeholder="Search guests..."
        value={searchValue}
        onChange={handleSearchChange}
        aria-label="Search guests"
      />

      <ClearButton
        show={searchValue.length > 0}
        onClick={clearSearch}
        aria-label="Clear search"
      >
        <HiXMark />
      </ClearButton>
    </SearchContainer>
  );
}

export default GuestsSearchBar;
