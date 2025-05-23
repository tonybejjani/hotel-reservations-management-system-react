/** @format */

import { Outlet } from 'react-router-dom';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import Heading from '../ui/Heading';
import Pagination from '../ui/Pagination';
import Row from '../ui/Row';

function Bookings() {
  return (
    <>
      <Outlet />
      {/* <Row type="vertical">
        <Heading as="h1">Bookings</Heading>

        <BookingTableOperations />
      </Row>
      <BookingTable /> */}
    </>
  );
}

export default Bookings;
