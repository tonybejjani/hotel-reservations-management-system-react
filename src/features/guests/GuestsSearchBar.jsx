/** @format */
import styled from 'styled-components';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 639px) {
    position: sticky;
    top: 0;
    z-index: 200;
    background-color: var(--color-grey-0);
    padding: 1.5rem 0;
    margin: -1.5rem 0 2rem 0;
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

// Desktop/Tablet search bar
const DesktopSearchBar = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 40rem;
  position: relative;

  @media (max-width: 639px) {
    display: none;
  }
`;

// Mobile search bar with glassmorphism
const MobileSearchBar = styled.div`
  display: none;

  @media (max-width: 639px) {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  padding-left: 4.5rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 3px rgba(var(--color-brand-600), 0.1);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const MobileSearchInput = styled.input`
  width: 100%;
  padding: 1.4rem 1.5rem;
  padding-left: 4.5rem;
  padding-right: ${(props) => (props.hasValue ? '4.5rem' : '1.5rem')};
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--border-radius-lg);
  font-size: 1.4rem;
  font-weight: 500;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);

  color: var(--color-grey-800);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: rgba(var(--color-brand-600), 0.5);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(255, 255, 255, 0.2) 100%
    );
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      0 0 0 3px rgba(var(--color-brand-600), 0.2);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: var(--color-grey-500);
    font-weight: 400;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-grey-400);
  pointer-events: none;
  z-index: 1;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const MobileSearchIcon = styled(SearchIcon)`
  color: var(--color-grey-600);

  svg {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-grey-500);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-700);
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const MobileClearButton = styled(ClearButton)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-grey-600);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  svg {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }
`;

const SearchStats = styled.div`
  display: none;

  @media (max-width: 639px) {
    display: block;
    margin-top: 1rem;
    text-align: center;
    font-size: 1.2rem;
    color: var(--color-grey-600);

    span {
      font-weight: 600;
      color: var(--color-brand-700);
    }
  }
`;

function GuestsSearchBar({ totalGuests, filteredCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchParams.set('search', searchTerm);
        searchParams.set('page', '1'); // Reset to first page when searching
      } else {
        searchParams.delete('search');
      }
      setSearchParams(searchParams);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchParams, setSearchParams]);

  const handleClear = () => {
    setSearchTerm('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const hasSearchTerm = searchTerm.length > 0;
  const showStats = hasSearchTerm && filteredCount !== undefined;

  return (
    <>
      <SearchContainer>
        {/* Desktop/Tablet Search */}
        <DesktopSearchBar>
          <SearchIcon>
            <HiMagnifyingGlass />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search guests by name, email, or nationality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {hasSearchTerm && (
            <ClearButton onClick={handleClear} aria-label="Clear search">
              <HiXMark />
            </ClearButton>
          )}
        </DesktopSearchBar>

        {/* Mobile Search with Glassmorphism */}
        <MobileSearchBar>
          <MobileSearchIcon>
            <HiMagnifyingGlass />
          </MobileSearchIcon>
          <MobileSearchInput
            type="text"
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            hasValue={hasSearchTerm}
          />
          {hasSearchTerm && (
            <MobileClearButton onClick={handleClear} aria-label="Clear search">
              <HiXMark />
            </MobileClearButton>
          )}
        </MobileSearchBar>
      </SearchContainer>

      {/* Mobile Search Stats */}
      {showStats && (
        <SearchStats>
          Found <span>{filteredCount}</span> of {totalGuests} guests
        </SearchStats>
      )}
    </>
  );
}

export default GuestsSearchBar;
