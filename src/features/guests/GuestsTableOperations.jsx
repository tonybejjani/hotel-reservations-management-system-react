/** @format */

import styled from 'styled-components';
import GuestsSearch from './GuestsSearch';
import TableOperations from '../../ui/TableOperations';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

const OperationsButton = styled.div`
  margin-left: auto;

  & button {
    box-shadow: 0 3px 6px 0 rgba(25, 27, 36, 0.16),
      0 -1px 4px 0 rgba(25, 27, 36, 0.04);
  }
`;
function GuestsTableOperations() {
  const navigate = useNavigate();
  return (
    <TableOperations>
      <GuestsSearch />
      <OperationsButton>
        <Button onClick={() => navigate('/add-booking')}>Add new guest</Button>
      </OperationsButton>
    </TableOperations>
  );
}

export default GuestsTableOperations;
