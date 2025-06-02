/** @format */

import styled from 'styled-components';
import { HiPlus } from 'react-icons/hi2';
import Modal from './Modal';
import CreateGuestForm from '../features/guests/CreateGuestForm';

const FloatingActionButton = styled.button`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 9rem; /* Above bottom navigation */
    right: 2rem;
    width: 5.6rem;
    height: 5.6rem;
    background: var(--color-brand-600);
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 8px 24px rgba(var(--color-brand-600-rgb), 0.4);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;

    /* Ensure proper stacking above content */
    &::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 50%;
      background: linear-gradient(
        135deg,
        var(--color-brand-500),
        var(--color-brand-700)
      );
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 32px rgba(var(--color-brand-600-rgb), 0.5);

      &::before {
        opacity: 1;
      }
    }

    &:active {
      transform: scale(0.95);
      transition: transform 0.1s ease;
    }

    &:focus {
      outline: 2px solid var(--color-brand-200);
      outline-offset: 4px;
    }

    svg {
      width: 2.4rem;
      height: 2.4rem;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
    }
  }

  /* Phablet: Slightly larger FAB */
  @media (min-width: 640px) and (max-width: 767px) {
    width: 6rem;
    height: 6rem;
    bottom: 10rem; /* Account for larger bottom nav */
    right: 2.4rem;

    svg {
      width: 2.6rem;
      height: 2.6rem;
    }
  }

  /* Very small screens: Smaller FAB */
  @media (max-width: 380px) {
    width: 5.2rem;
    height: 5.2rem;
    right: 1.6rem;
    bottom: 8.5rem;

    svg {
      width: 2.2rem;
      height: 2.2rem;
    }
  }

  /* Safe area support for devices with notches */
  @supports (bottom: env(safe-area-inset-bottom)) {
    bottom: calc(12rem + env(safe-area-inset-bottom));

    @media (min-width: 640px) and (max-width: 767px) {
      bottom: calc(13rem + env(safe-area-inset-bottom));
    }

    @media (max-width: 380px) {
      bottom: calc(10rem + env(safe-area-inset-bottom));
    }
  }
`;

const FABLabel = styled.span`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-grey-900);
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
  font-weight: 500;
  white-space: nowrap;
  margin-right: 1.2rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;

  /* Tooltip arrow */
  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 6px solid transparent;
    border-left-color: var(--color-grey-900);
  }

  ${FloatingActionButton}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(-0.4rem);
  }
`;

function MobileAddButton() {
  return (
    <Modal>
      <Modal.Open opens="mobile-guest-form">
        <FloatingActionButton aria-label="Add new guest" title="Add new guest">
          <FABLabel>Add Guest</FABLabel>
          <HiPlus />
        </FloatingActionButton>
      </Modal.Open>

      <Modal.Window opens="mobile-guest-form" title="Add New Guest">
        <CreateGuestForm />
      </Modal.Window>
    </Modal>
  );
}

export default MobileAddButton;
