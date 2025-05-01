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

  /* background-image: url(https://cdn2.hubspot.net/hubfs/4004166/bioticresearch_website_assets/images/search_icon.png);
  background-repeat: no-repeat;
  background-position: left center; */
`;

function GuestsSearch() {
  const [userSearchInput, setUserSearchInput] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { onSearchResults, onUserSearchInput } = useContext(GuestsContext);

  useEffect(() => {
    async function getSearchResults() {
      setIsLoading(true);
      const res = await getSearchGuests(userSearchInput);
      onUserSearchInput(userSearchInput);
      onSearchResults(res);
      setIsLoading(false);
    }

    getSearchResults();
  }, [userSearchInput]);

  function handleSearchInput(e) {
    setUserSearchInput(e.target.value);
  }

  // if (isLoading) return <Spinner />;

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
