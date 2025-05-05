/** @format */

/** @format */
import Spinner from '../../ui/Spinner';
import useGuests from './useGuests';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import styled from 'styled-components';
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';
import PickGuestRow from './PickGuestRow';

const FullName = styled.div`
  padding-left: 1.5rem;
`;
function GuestsTablePicker() {
  const { isLoading, guests, count } = useGuests();

  if (isLoading) return <Spinner />;

  if (guests.length === 0) return <Empty resource="guests" />;

  return (
    <Menus>
      <Table columns="1.5fr 1.5fr 1.5fr 1.5fr ">
        <Table.Header>
          <FullName>Full Name</FullName>
          <div>Email</div>
          <div>nationalID</div>
          <div>Nationality</div>
          {/* {!isClickable && <div></div>} */}
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => <PickGuestRow guest={guest} key={guest.id} />}
        />
        <Table.Footer>
          <Pagination count={count}></Pagination>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestsTablePicker;
