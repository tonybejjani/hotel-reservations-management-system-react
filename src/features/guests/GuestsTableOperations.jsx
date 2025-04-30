/** @format */

import styled from 'styled-components';
import GuestsSearch from './GuestsSearch';
import TableOperations from '../../ui/TableOperations';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

const OperationsButton = styled.div`
  margin-left: auto;
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
