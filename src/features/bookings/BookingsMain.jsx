/** @format */

import BookingTable from './BookingTable';
import BookingTableOperations from './BookingTableOperations';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

function BookingsMain() {
  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default BookingsMain;
