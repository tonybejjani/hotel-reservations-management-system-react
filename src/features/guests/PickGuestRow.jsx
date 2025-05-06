/** @format */

/** @format */

import styled from 'styled-components';
// import { formatCurrency } from '../../utils/helpers';

// import useDeleteCabin from './useDeleteCabin';
// import useCreateCabin from './useCreateCabin';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table, { TableContext } from '../../ui/Table';
import Menus from '../../ui/Menus';
import CreateGuestForm from './CreateGuestForm';
import useDeleteGuest from './useDeleteGuest';
import Input from '../../ui/Input';
import { useContext, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(0.5);
`;

const Name = styled.div`
  padding-left: 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Email = styled.div`
  font-weight: 300;
`;

const NationalID = styled.div`
  color: var(--color-green-700);
  font-weight: 500;
`;

const RowWrapper = styled.div`
  display: flex;
  grid-column: 1.5fr 1.5fr 1.5fr 1.5fr;
`;
// eslint-disable-next-line react/prop-types
function PickGuestRow({ guest, onCloseModal }) {
  const { deleteGuest, isDeleting } = useDeleteGuest();

  const [rowData, setRowData] = useState({});
  // eslint-disable-next-line react/prop-types
  const {
    id: guestId,
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
  } = guest;

  const { setGuestRowData } = useGlobalContext();

  function handleSetRowData(rowData) {
    setRowData(rowData);
    setGuestRowData(rowData);
    onCloseModal?.();
  }
  return (
    <Table.Row
      ishoverable="true"
      rowData={guest}
      rowPass="guestsPass"
      onSetRowData={handleSetRowData}
    >
      <Name>{fullName}</Name>
      <Email>{email}</Email>
      <NationalID>{nationalID}</NationalID>
      <div>{nationality}</div>
    </Table.Row>
  );
}

export default PickGuestRow;
