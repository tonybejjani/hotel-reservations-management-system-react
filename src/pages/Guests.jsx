/** @format */
import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import GuestsTableOperations from '../features/guests/GuestsTableOperations';
import GuestsTable from '../features/guests/GuestsTable';
import GuestsTableOperations from '../features/guests/GuestsTableOperations';
import { createContext, useState } from 'react';
// import AddGuests from '../features/guests/AddGuest';

export const GuestsContext = createContext();

function Guests() {
  const [guestsSearchResults, setGuestsSearchResults] = useState();

  function handleSearchResults(guests) {
    setGuestsSearchResults(guests);
  }
  return (
    <GuestsContext.Provider
      value={{
        onSearchResults: handleSearchResults,
        guestsSearchResults,
      }}
    >
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>
        <GuestsTableOperations />
        {/* <AddGuests /> */}
      </Row>
      <Row>
        <GuestsTable />
      </Row>
    </GuestsContext.Provider>
  );
}

export default Guests;
