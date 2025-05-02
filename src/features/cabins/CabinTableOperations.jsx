/** @format */

import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import styled from 'styled-components';
import AddCabin from '../cabins/AddCabin';
const ActionButton = styled.div`
  margin-left: auto;

  & button {
    box-shadow: 0 3px 6px 0 rgba(25, 27, 36, 0.16),
      0 -1px 4px 0 rgba(25, 27, 36, 0.04);
  }
  & svg {
    scale: 1.8;
  }
`;
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No Discount' },
          { value: 'with-discount', label: 'With Discount' },
        ]}
        defaultFilter={0}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          {
            value: 'regularPrice-asc',
            label: 'Sort by price (lowest first)',
          },
          {
            value: 'regularPrice-desc',
            label: 'Sort by price (highest first)',
          },
          {
            value: 'maxCapacity-asc',
            label: 'Sort by capacity (lowest first)',
          },
          {
            value: 'maxCapacity-desc',
            label: 'Sort by capacity (highest first)',
          },
        ]}
      />
      <ActionButton>
        <AddCabin />
      </ActionButton>
    </TableOperations>
  );
}

export default CabinTableOperations;
