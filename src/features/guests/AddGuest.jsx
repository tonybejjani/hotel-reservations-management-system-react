/** @format */

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateGuestForm from './CreateGuestForm';

function AddGuests() {
  return (
    <Modal>
      <Modal.Open opens="guestForm">
        <Button> Add new guest</Button>
      </Modal.Open>
      <Modal.Window opens="guestForm">
        <CreateGuestForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddGuests;
