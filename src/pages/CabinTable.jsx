/** @format */

import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../services/apiCabins';
import Spinner from '../ui/Spinner';
import { StyledTable as Table } from '../ui/Table';
function CabinTable() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins,
  });

  console.log(cabins);
  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      {/* <TableHeader role="row"></TableHeader> */}
      {/* {cabins.map((cabin) => (
        
      ))} */}
    </Table>
  );
}

export default CabinTable;
