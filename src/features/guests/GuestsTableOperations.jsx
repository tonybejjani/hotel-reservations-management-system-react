/** @format */

import styled from 'styled-components';
import GuestsSearch from './GuestsSearch';
import TableOperations from '../../ui/TableOperations';
import AddGuest from './AddGuest';

const ActionButton = styled.div`
  margin-left: auto;

  & button {
    box-shadow: 0 3px 6px 0 rgba(25, 27, 36, 0.16),
      0 -1px 4px 0 rgba(25, 27, 36, 0.04);
  }
`;
function GuestsTableOperations() {
  return (
    <TableOperations>
      <GuestsSearch />
      <ActionButton>
        <AddGuest />
      </ActionButton>
    </TableOperations>
  );
}

export default GuestsTableOperations;
