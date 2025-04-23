/** @format */

// import { useState } from 'react';
import CreateBookingForm from './CreateBookingForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="bookingForm">
          <Button>Add new booking</Button>
        </Modal.Open>
        <Modal.Window opens="bookingForm">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
