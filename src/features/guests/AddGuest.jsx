/** @format */

import styled from 'styled-components';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateGuestForm from './CreateGuestForm';
import { HiMiniPlus } from 'react-icons/hi2';

const ButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  padding: 0.2rem 0;
`;
function AddGuests() {
  return (
    <Modal>
      <Modal.Open opens="guestForm">
        <Button>
          <ButtonContentWrapper>
            <HiMiniPlus />
            <span>Add New Guest</span>
          </ButtonContentWrapper>
        </Button>
      </Modal.Open>
      <Modal.Window opens="guestForm" title="new guest">
        <CreateGuestForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddGuests;
