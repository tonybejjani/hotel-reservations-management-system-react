/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */

import styled from 'styled-components';
// import { formatCurrency } from '../../utils/helpers';
// import CreateCabinForm from './CreateCabinForm';
// import useDeleteCabin from './useDeleteCabin';
// import useCreateCabin from './useCreateCabin';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
// import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(0.5);
`;

// eslint-disable-next-line react/prop-types
function GuestRow({ guest }) {
  // const { deleteCabin, isDeleting } = useDeleteCabin();
  // const { createCabin, isCreating } = useCreateCabin();
  // eslint-disable-next-line react/prop-types
  const {
    id: guestId,
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
  } = guest;

  return (
    <Table.Row>
      <div>{fullName}</div>
      <div>{email}</div>
      <div>{nationalID}</div>
      <div>{nationality}</div>
      <Img src={countryFlag} />
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestId} />

            <Menus.List id={guestId}>
              <Modal.Open opens="edit-form">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete-form">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window opens="edit-form">
              {/* <CreateCabinForm guestToEdit={guest} /> */}
            </Modal.Window>

            <Modal.Window name="delete" opens="delete-form">
              {/* <ConfirmDelete
                resourceName={`Guest ` + fullName}
                disabled={isDeleting}
                 onConfirm={() => deleteGuest(guestId)}
              /> */}
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default GuestRow;
