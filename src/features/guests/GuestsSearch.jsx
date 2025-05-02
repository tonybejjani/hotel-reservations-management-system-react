/** @format */
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Search = styled.input`
  border: 1px solid var(--color-grey-100);
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.6rem 0.8rem 4.6rem;
  box-shadow: var(--shadow-sm);
  width: 30rem;

  &:placeholder-shown {
    font-style: italic;
    font-size: 1.5rem;
  }
`;

function GuestsSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchInput(e) {
    setSearchParams({ search: e.target.value });
  }

  return (
    <Search
      onChange={handleSearchInput}
      type="search"
      placeholder="Search guests..."
      results="0"
    />
  );
}

export default GuestsSearch;
