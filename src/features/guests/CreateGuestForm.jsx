/** @format */

/** @format */

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import useCreateGuest from './useCreateCabin';
import useEditGuest from './useEditGuest';
import { useContext } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

// eslint-disable-next-line react/prop-types
function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { createGuest, isCreating } = useCreateGuest();
  const { editGuest, isEditing } = useEditGuest();

  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
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
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label={'Guest Full name'} error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register('fullName', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label={'Email'} error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isWorking}
          {...register('email', {
            required: 'this field is required',
          })}
        />
      </FormRow>
      <FormRow label={'National ID'} error={errors?.nationalID?.message}>
        <Input
          type="number"
          id="nationalID"
          disabled={isWorking}
          {...register('nationalID', {
            required: 'this field is required',
          })}
        />
      </FormRow>
      <FormRow label={'Nationality'} error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isWorking}
          {...register('nationality', {
            required: 'this field is required',
          })}
        />
      </FormRow>
      {/* <FormRow label={'Nationality'} error={errors?.nationality?.message}>
        <img
          type="text"
          id="nationality"
          disabled={isWorking}
          {...register('nationality', {
            required: 'this field is required',
          })}
        />
      </FormRow> */}
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Guest' : 'Create new Guest'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
