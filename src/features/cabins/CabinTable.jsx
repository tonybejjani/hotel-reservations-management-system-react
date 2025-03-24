/** @format */
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import useCabins from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get('discount') || 'all';

  console.log(filterValue);

  let filteredCabins = cabins;

  if (filteredCabins === 'all') filteredCabins = cabins;

  if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  return (
    <Menus>
      {/* <button onClick={() => setDiscount('all')}>All</button>
      <button onClick={() => setDiscount('no discount')}>No Discount</button>
      <button onClick={() => setDiscount('with discount')}>
        With Discount
      </button> */}

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
