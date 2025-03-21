/** @format */

import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabinForm">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window opens="cabinForm">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
