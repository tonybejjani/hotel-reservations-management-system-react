/** @format */

import styled from 'styled-components';
import { HiMiniPlus } from 'react-icons/hi2';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateGuestForm from './CreateGuestForm';

const ButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  /* Hide on mobile - FAB takes over */
  @media (max-width: 767px) {
    display: none;
  }

  /* Tablet: Adjust spacing */
  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 1rem;
  }

  span {
    font-weight: 500;

    /* Hide text on smaller tablets if needed */
    @media (max-width: 900px) {
      display: none;
    }
  }

  svg {
    width: 2rem;
    height: 2rem;

    /* Larger icon when text is hidden */
    @media (max-width: 900px) {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
`;

const StyledButton = styled(Button)`
  /* Hide entire component on mobile */
  @media (max-width: 767px) {
    display: none;
  }

  /* Desktop: Standard button */
  @media (min-width: 1025px) {
    padding: 1.2rem 2rem;
  }

  /* Tablet: Compact button */
  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 1rem 1.6rem;
  }

  /* Smaller tablets: Icon-only */
  @media (max-width: 900px) {
    padding: 1rem;
    min-width: 4.4rem;
    justify-content: center;
  }
`;

function AddGuest() {
  return (
    <Modal>
      <Modal.Open opens="guest-form">
        <StyledButton>
          <ButtonContentWrapper>
            <HiMiniPlus />
            <span>Add New Guest</span>
          </ButtonContentWrapper>
        </StyledButton>
      </Modal.Open>

      <Modal.Window opens="guest-form" title="Add New Guest">
        <CreateGuestForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddGuest;
