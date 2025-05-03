/** @format */
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import GuestsTable from '../features/guests/GuestsTable';
import GuestsTableOperations from '../features/guests/GuestsTableOperations';

function Guests() {
  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Guests</Heading>
        <GuestsTableOperations />
      </Row>
      <Row>
        <GuestsTable />
      </Row>
    </>
  );
}

export default Guests;
