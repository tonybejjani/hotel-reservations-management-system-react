/** @format */
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2rem;

  & label {
    color: var(--color-grey-600);
    font-weight: 600;
  }
`;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  position: relative;

  & svg {
    scale: 1.6;
    position: absolute;
    left: 1.6rem;
  }
`;
const Search = styled.input`
  border: 1px solid var(--color-grey-200);

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 1rem 1.6rem 1rem 4.6rem;
  box-shadow: var(--shadow-sm);
  width: 40rem;

  &:placeholder-shown {
    font-style: italic;
    font-size: 1.6rem;
  }
`;

function GuestsSearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchInput(e) {
    setSearchParams({ search: e.target.value });
  }

  return (
    <>
      <Wrapper>
        <SearchBarWrapper>
          <Search
            onChange={handleSearchInput}
            type="search"
            placeholder="Search guests..."
            results="0"
          />
          <HiMiniMagnifyingGlass />
        </SearchBarWrapper>
      </Wrapper>
    </>
  );
}

export default GuestsSearchBar;
