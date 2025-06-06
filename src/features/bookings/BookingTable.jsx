/** @format */

import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import useBookings from './useBookings';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.MobileHeader>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.MobileHeader>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
