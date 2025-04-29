/** @format */
import AddBooking from '../features/bookings/AddBooking';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
function NewBooking() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">New Booking</Heading>
      </Row>
      <Row>
        <AddBooking />
      </Row>
    </>
  );
}

export default NewBooking;
