/** @format */

import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import { HiMiniPlus } from 'react-icons/hi2';
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
  & svg {
    scale: 1.8;
  }
`;

const ButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  padding: 0.2rem 0;
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
          <ButtonContentWrapper>
            <HiMiniPlus />
            <span> Add New Booking</span>
          </ButtonContentWrapper>
        </Button>
      </ActionButton>
    </TableOperations>
  );
}

export default BookingTableOperations;
