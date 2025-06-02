/** @format */

import styled from 'styled-components';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRowVertical from '../../ui/FormRowVertical';

import { useForm } from 'react-hook-form';
import useCreateGuest from './useCreateCabin';
import useEditGuest from './useEditGuest';
import { useGlobalContext } from '../../context/GlobalContext';

// Responsive wrapper for the form
const ResponsiveFormWrapper = styled.div`
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.2s, background 0.2s;
  width: 100%;

  /* Desktop (≥1200px): Large screens */
  max-width: 52rem;
  margin: 4rem auto;
  padding: 3.6rem 3.6rem 2.8rem 3.6rem;

  /* Laptop/Small Desktop (1025px-1199px) */
  @media (max-width: 1199px) {
    max-width: 48rem;
    margin: 3.5rem auto;
    padding: 3.2rem 3.2rem 2.4rem 3.2rem;
  }

  /* Tablet (768px-1024px) */
  @media (max-width: 1024px) {
    max-width: 44rem;
    margin: 3rem 2rem;
    padding: 2.8rem 2.8rem 2rem 2.8rem;
  }

  /* Phablet (640px-767px) */
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 2rem 1.5rem;
    padding: 2.4rem 2rem 1.6rem 2rem;
    border-radius: var(--border-radius-md);
  }

  /* Mobile (≤639px) */
  @media (max-width: 639px) {
    margin: 1.5rem 1rem;
    padding: 2rem 1.5rem 1.2rem 1.5rem;
  }

  /* Small Mobile (≤480px) */
  @media (max-width: 480px) {
    max-width: 28rem;
    margin: 0rem;
    padding: 0rem;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 320px) {
    max-width: 24rem;
    margin: 0rem;
    padding: 0rem;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
  }
`;

// Responsive FormRow override for different viewport behaviors
const ResponsiveFormRow = styled(FormRowVertical)`
  display: flex;

  align-items: flex-start;
  margin-bottom: 2rem;

  /* Desktop & Laptop: Side-by-side layout */
  flex-direction: row;
  gap: 2.4rem;

  /* Label styling for larger screens */

  /* Input container */
  > div:last-child {
    flex: 1;
  }

  /* Tablet: Slightly reduced spacing */
  @media (max-width: 1024px) {
    gap: 2rem;
    margin-bottom: 1.8rem;
  }

  /* Phablet: Reduced spacing, keep horizontal */
  @media (max-width: 767px) {
    gap: 1.6rem;
    margin-bottom: 1.6rem;
  }

  /* Mobile: Stack vertically */
  @media (max-width: 639px) {
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 1.4rem;
  }

  /* Small Mobile: Tighter spacing */
  @media (max-width: 480px) {
    flex-direction: column;
    margin-bottom: 1.2rem;
    gap: 0.4rem;
  }
`;

// Responsive button row with different layouts per viewport
const ButtonRow = styled.div`
  display: flex;
  gap: 1.4rem;
  margin-top: 2.4rem;

  /* Desktop & Laptop: Right-aligned buttons */
  justify-content: flex-end;

  /* Tablet: Right-aligned with reduced spacing */
  @media (max-width: 1024px) {
    margin-top: 2rem;
    gap: 1.2rem;
  }

  /* Phablet: Right-aligned, smaller buttons */
  @media (max-width: 767px) {
    margin-top: 1.8rem;
    gap: 1rem;
  }

  /* Mobile: Stack buttons vertically, full width */
  @media (max-width: 639px) {
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.6rem;

    button {
      width: 100%;
      justify-content: center;
    }
  }

  /* Small Mobile: Tighter spacing */
  @media (max-width: 480px) {
    gap: 0.8rem;
    margin-top: 1.4rem;
  }
`;

// Enhanced input styling for better mobile experience
const ResponsiveInput = styled(Input)`
  /* Base styling inherits from Input component */

  /* Mobile: Larger touch targets */
  @media (max-width: 639px) {
    padding: 1.2rem 1rem;
    font-size: 1.6rem;
    min-height: 4.4rem; /* Accessibility: minimum touch target */
  }

  /* Small Mobile: Optimize for small screens */
  @media (max-width: 480px) {
    padding: 1rem 0.8rem;
    font-size: 1.8rem;
    width: 28rem;
  }

  @media (max-width: 320px) {
    width: 24rem;
  }
`;

// Responsive button with size variants
const ResponsiveButton = styled(Button)`
  /* Desktop & Laptop: Standard size */
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;

  /* Tablet: Slightly smaller */
  @media (max-width: 1024px) {
    padding: 1rem 2rem;
  }

  /* Phablet: Smaller padding */
  @media (max-width: 767px) {
    padding: 1rem 1.6rem;
    font-size: 1.3rem;
  }

  /* Mobile: Full width with larger touch target */
  @media (max-width: 639px) {
    padding: 1.4rem 2rem;
    font-size: 1.5rem;
    min-height: 4.4rem; /* Accessibility: minimum touch target */
  }

  /* Small Mobile: Optimized sizing */
  @media (max-width: 480px) {
    padding: 1.2rem 1.6rem;
    font-size: 1.8rem;
    width: 28rem !important;
  }

  @media (max-width: 320px) {
    padding: 1.2rem 1.6rem;
    font-size: 1.6rem;
    width: 24rem !important;
  }
`;

// eslint-disable-next-line react/prop-types
function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { createGuest, isCreating } = useCreateGuest();
  const { editGuest, isEditing } = useEditGuest();

  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { setGuestRowData } = useGlobalContext();
  const { errors } = formState;

  function onSubmit(data) {
    isEditSession
      ? editGuest(
          { newGuest: { ...data }, id: editId },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        )
      : createGuest(
          { ...data },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
              setGuestRowData(data);
            },
          }
        );
  }

  const isWorking = isCreating || isEditing;

  return (
    <ResponsiveFormWrapper>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        type={onCloseModal ? 'modal' : 'regular'}
        style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}
      >
        <ResponsiveFormRow
          label={'Full name'}
          error={errors?.fullName?.message}
        >
          <ResponsiveInput
            type="text"
            id="fullName"
            disabled={isWorking}
            {...register('fullName', {
              required: 'This field is required',
            })}
          />
        </ResponsiveFormRow>

        <ResponsiveFormRow label={'Email'} error={errors?.email?.message}>
          <ResponsiveInput
            type="email"
            id="email"
            disabled={isWorking}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            })}
          />
        </ResponsiveFormRow>
        <ResponsiveFormRow
          label={'National ID'}
          error={errors?.nationalID?.message}
        >
          <ResponsiveInput
            type="text"
            id="nationalID"
            disabled={isWorking}
            {...register('nationalID', {
              required: 'This field is required',
            })}
          />
        </ResponsiveFormRow>
        <ResponsiveFormRow
          label={'Nationality'}
          error={errors?.nationality?.message}
        >
          <ResponsiveInput
            type="text"
            id="nationality"
            disabled={isWorking}
            {...register('nationality', {
              required: 'This field is required',
            })}
          />
        </ResponsiveFormRow>

        <ButtonRow>
          <ResponsiveButton
            variation="secondary"
            type="button"
            onClick={() => onCloseModal?.()}
            disabled={isWorking}
          >
            Cancel
          </ResponsiveButton>
          <ResponsiveButton disabled={isWorking}>
            {isWorking
              ? isEditSession
                ? 'Updating...'
                : 'Creating...'
              : isEditSession
              ? 'Edit Guest'
              : 'Create new Guest'}
          </ResponsiveButton>
        </ButtonRow>
      </Form>
    </ResponsiveFormWrapper>
  );
}

export default CreateGuestForm;
