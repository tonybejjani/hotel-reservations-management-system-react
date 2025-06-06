/** @format */
import GuestRow from './GuestRow';
import Spinner from '../../ui/Spinner';
import useGuests from './useGuests';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import styled from 'styled-components';
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';

const FullName = styled.div`
  padding-left: 1.5rem;
`;
function GuestsTable() {
  const { isLoading, guests, count } = useGuests();

  if (isLoading) return <Spinner />;

  if (guests.length === 0) return <Empty resource="guests" />;

  return (
    <Menus>
      <Table columns="1.5fr 1.5fr 1fr 0.8fr 0.5fr 0.2fr">
        <Table.MobileHeader>
          <FullName>Full Name</FullName>
          <div>Email</div>
          <div>nationalID</div>
          <div>Nationality</div>
          <div></div>
          <div></div>
          {/* {!isClickable && <div></div>} */}
        </Table.MobileHeader>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
        <Table.Footer>
          <Pagination count={count}></Pagination>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestsTable;
