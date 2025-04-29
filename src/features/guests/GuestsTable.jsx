/** @format */
import GuestRow from './GuestRow';
import Spinner from '../../ui/Spinner';
import useGuests from './useGuests';
import Table, { Empty } from '../../ui/Table';
import Menus from '../../ui/Menus';
import styled from 'styled-components';

// import { useSearchParams } from 'react-router-dom';

const FullName = styled.div`
  padding-left: 1.5rem;
`;
function GuestsTable() {
  const { isLoading, guests } = useGuests();

  // const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (guests?.length === 0) return <Empty resource="guests" />;

  // const filterValue = searchParams.get('discount') || 'all';
  // const sortByValue = searchParams.get('sortBy') || 'name-asc';

  // let filteredCabins = cabins;

  // if (filteredCabins === 'all') filteredCabins = cabins;

  // if (filterValue === 'no-discount') {
  //   filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  // }
  // if (filterValue === 'with-discount') {
  //   filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  // }

  // const [field, direction] = sortByValue.split('-');

  // filteredCabins = filteredCabins.sort((a, b) => {
  //   // another trick
  //   // const modifier = direction === 'asc' ? 1 : -1;
  //   // const sortedCabins=  filterCabins.sort( (a,b) => (a[field] - b[field]) * modifier);

  //   const nameA = a[field]; // ignore upper and lowercase
  //   const nameB = b[field]; // ignore upper and lowercase

  //   if (nameA < nameB) {
  //     return direction === 'asc' ? 1 : -1;
  //   }
  //   if (nameA > nameB) {
  //     return direction === 'asc' ? -1 : 1;
  //   }
  // });

  return (
    <Menus>
      <Table columns="1.5fr 1.5fr 1fr 0.8fr 0.5fr 0.2fr">
        <Table.Header>
          <FullName>Full Name</FullName>
          <div>Email</div>
          <div>nationalID</div>
          <div>Nationality</div>
          <div></div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />
      </Table>
    </Menus>
  );
}

export default GuestsTable;
