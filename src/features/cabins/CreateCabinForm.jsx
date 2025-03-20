/** @format */

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';

// eslint-disable-next-line react/prop-types
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  // if editing the cabin we can edit the image or keep the same image so we have 2 options::
  // option 1: keep the same image = image already stored in the database so the image is stored as URL (string)
  // from the database
  // option: if we are editing the cabin and we changed the image by uploading a new one, the image  uploaded
  // would take the form of data.image[0]
  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    isEditSession
      ? editCabin(
          { newCabin: { ...data, image: image }, id: editId },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        )
      : createCabin(
          { ...data, image: image },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        );
  }

  // function onError(errors) {
  //   console.log(errors);
  // }

  const isWorking = isCreating || isEditing;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'this field is required',
            min: {
              value: 1,
              message: 'Regular Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          min="0"
          {...register('discount', {
            required: 'this field is required',
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'Discount should be less then regular price',
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label={'Description for website'}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          {...register('description', { required: 'this field is required' })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'this field is required',
          })}
        />
      </FormRow>

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
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
