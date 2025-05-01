/** @format */

import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ActionButton = styled.div`
  margin-left: auto;

  & button {
    box-shadow: 0 3px 6px 0 rgba(25, 27, 36, 0.16),
      0 -1px 4px 0 rgba(25, 27, 36, 0.04);
  }
`;

function BookingTableOperations() {
  const navigate = useNavigate();
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
        defaultFilter={0}
      />

      <SortBy
        options={[
          { value: 'startDate-desc', label: 'Sort by date (recent first)' },
          { value: 'startDate-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'totalPrice-desc',
            label: 'Sort by amount (high first)',
          },
          { value: 'totalPrice-asc', label: 'Sort by amount (low first)' },
        ]}
      />

      <ActionButton>
        <Button onClick={() => navigate('/add-booking')}>
          Add new booking
        </Button>
      </ActionButton>
    </TableOperations>
  );
}

export default BookingTableOperations;
