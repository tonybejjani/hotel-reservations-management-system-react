/** @format */
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import useCabins from './useCabins';
import Table, { Empty } from '../../ui/Table';
import Menus from '../../ui/Menus';

import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (cabins?.length === 0) return <Empty resource="cabins" />;
  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get('discount') || 'all';
  const sortByValue = searchParams.get('sortBy') || 'name-asc';

  let filteredCabins = cabins;

  if (filteredCabins === 'all') filteredCabins = cabins;

  if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  const [field, direction] = sortByValue.split('-');

  filteredCabins = filteredCabins.sort((a, b) => {
    // another trick
    // const modifier = direction === 'asc' ? 1 : -1;
    // const sortedCabins=  filterCabins.sort( (a,b) => (a[field] - b[field]) * modifier);

    const nameA = a[field]; // ignore upper and lowercase
    const nameB = b[field]; // ignore upper and lowercase

    if (nameA < nameB) {
      return direction === 'asc' ? 1 : -1;
    }
    if (nameA > nameB) {
      return direction === 'asc' ? -1 : 1;
    }
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
