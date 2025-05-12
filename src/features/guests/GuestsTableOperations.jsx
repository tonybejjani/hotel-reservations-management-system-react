/** @format */

import styled from 'styled-components';
import GuestsSearchBar from './GuestsSearchBar';
import TableOperations from '../../ui/TableOperations';
import AddGuest from './AddGuest';

const ActionButton = styled.div`
  margin-left: auto;

  & button {
    box-shadow: 0 3px 6px 0 rgba(211, 217, 244, 0.16),
      0 -1px 4px 0 rgba(25, 27, 36, 0.04);
  }

  & svg {
    scale: 1.8;
  }
`;

function GuestsTableOperations() {
  return (
    <TableOperations>
      <GuestsSearchBar />

      <ActionButton>
        <AddGuest />
      </ActionButton>
    </TableOperations>
  );
}

export default GuestsTableOperations;
