/** @format */

import { useState, useEffect, useContext } from 'react';
import { GuestsContext } from '../../pages/Guests';
import styled from 'styled-components';
import { getSearchGuests } from '../../services/apiGuests';
import Spinner from '../../ui/Spinner';

const Search = styled.input`
  border: 1px solid var(--color-grey-100);
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem 1.6rem;
  box-shadow: var(--shadow-sm);
  width: 30rem;

  &:placeholder-shown {
    font-style: italic;
    font-size: 1.5rem;
  }
`;

function GuestsSearch() {
  const [userSearchInput, setUserSearchInput] = useState();

  const { onSearchResults, onUserSearchInput } = useContext(GuestsContext);

  useEffect(() => {
    async function getSearchResults() {
      const res = await getSearchGuests(userSearchInput);
      onUserSearchInput(userSearchInput);
      onSearchResults(res);
    }

    getSearchResults();
  }, [userSearchInput]);

  function handleSearchInput(e) {
    setUserSearchInput(e.target.value);
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
