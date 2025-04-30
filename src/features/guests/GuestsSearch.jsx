/** @format */

import { useState, useEffect, useContext } from 'react';
import { GuestsContext } from '../../pages/Guests';
import styled from 'styled-components';
import { getSearchGuests } from '../../services/apiGuests';
import Spinner from '../../ui/Spinner';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.6rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;
function GuestsSearch() {
  const [userSearchInput, setUserSearchInput] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { onSearchResults } = useContext(GuestsContext);

  useEffect(() => {
    async function getSearchResults() {
      setIsLoading(true);
      const res = await getSearchGuests(userSearchInput);
      onSearchResults(res);
      setIsLoading(false);
    }

    getSearchResults();
  }, [userSearchInput]);

  function handleSearchInput(e) {
    setUserSearchInput(e.target.value);
  }

  // if (isLoading) return <Spinner />;

  return <Input onChange={handleSearchInput} />;
}

export default GuestsSearch;
