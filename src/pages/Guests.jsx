/** @format */
import styled from 'styled-components';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import GuestsContainer from '../features/guests/GuestsContainer';
import AddGuest from '../features/guests/AddGuest';
import GuestsSearchBar from '../features/guests/GuestsSearchBar';

const StyledGuests = styled.div`
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

function Guests() {
  return (
    <StyledGuests>
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>

        <AddGuest />
      </Row>

      <Row>
        <GuestsSearchBar />

        <GuestsContainer />
      </Row>
    </StyledGuests>
  );
}

export default Guests;
