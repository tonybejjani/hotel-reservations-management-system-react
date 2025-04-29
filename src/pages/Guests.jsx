/** @format */
import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import GuestsTableOperations from '../features/guests/GuestsTableOperations';
import GuestsTable from '../features/guests/GuestsTable';
// import AddGuests from '../features/guests/AddGuest';

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>

        {/* <GuestsTableOperations />
        <AddGuests /> */}
      </Row>
      <Row>
        <GuestsTable />
      </Row>
    </>
  );
}

export default Guests;
