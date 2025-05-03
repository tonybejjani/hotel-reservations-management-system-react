/** @format */

import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { HiMiniPlus } from 'react-icons/hi2';
import styled from 'styled-components';

function AddCabin() {
  const ButtonContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    padding: 0.2rem 0;
  `;
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabinForm">
          <Button>
            <ButtonContentWrapper>
              <HiMiniPlus />
              <span>New Cabin</span>
            </ButtonContentWrapper>
          </Button>
        </Modal.Open>
        <Modal.Window opens="cabinForm" title="new cabin">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
