/** @format */

import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import useBookings from './useBookings';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const { isLoading, bookings } = useBookings();

  if (!bookings?.length) return <Empty resource="bookings" />;

  if (isLoading) return <Spinner />;

  // let filteredBookings = bookings;

  // console.log(filteredBookings);
  // if (filterValue === 'all') filteredBookings = bookings;

  // if (filterValue === 'checked-in')
  //   filteredBookings = filteredBookings.filter(
  //     (booking) => booking.status === 'checked-in'
  //   );

  // if (filterValue === 'checked-out')
  //   filteredBookings = filteredBookings.filter(
  //     (booking) => booking.status === 'checked-out'
  //   );

  // if (filterValue === 'unconfirmed')
  //   filteredBookings = filteredBookings.filter(
  //     (booking) => booking.status === 'unconfirmed'
  //   );

  // const [field, direction] = sortByValue.split('-');

  // filteredBookings = filteredBookings.sort((a, b) => {
  //   // another trick
  //   // const modifier = direction === 'asc' ? 1 : -1;
  //   // const sortedCabins=  filterCabins.sort( (a,b) => (a[field] - b[field]) * modifier);

  //   const nameA = a[field]; // ignore upper and lowercase
  //   const nameB = b[field]; // ignore upper and lowercase

  //   if (nameA < nameB) {
  //     return direction === 'asc' ? -1 : 1;
  //   }
  //   if (nameA > nameB) {
  //     return direction === 'asc' ? 1 : -1;
  //   }
  // });
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
