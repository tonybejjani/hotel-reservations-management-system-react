/** @format */
/** @format */

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import useCreateBooking from './useCreateBooking';
import Select from '../../ui/Select';
import useBookingType from './useBookingType';
// import useEditBooking from './useEditCabin';

// eslint-disable-next-line react/prop-types
function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { createBooking, isCreating } = useCreateBooking();
  const { isLoading: isLoadingBookingTypes, bookingTypes } = useBookingType();
  // const { editCabin, isEditing } = useEditCabin();

  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  //Mold bookingType to fit the <Select> component options attribute value/label structure

  // if editing the cabin we can edit the image or keep the same image so we have 2 options::
  // option 1: keep the same image = image already stored in the database so the image is stored as URL (string)
  // from the database
  // option: if we are editing the cabin and we changed the image by uploading a new one, the image  uploaded
  // would take the form of data.image[0]
  function onSubmit(data) {
    // isEditSession
    //   ? editCabin(
    //       { newCabin: { ...data, image: image }, id: editId },
    //       {
    //         onSuccess: () => {
    //           reset();
    //           onCloseModal?.();
    //         },
    //       }
    //     )
    //   :
    //
    createBooking(
      { ...data },
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

  // const isWorking = isCreating || isEditing;
  const isWorking = isCreating;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label={'Booking type'} error={errors?.bookingType?.message}>
        <Select
          options={[
            { value: 'walk-in', label: 'Direct: Walk-in' },
            { value: 'phone', label: 'Direct: By Phone' },
            { value: 'website', label: 'Direct: Website' },
            { value: 'OTA', label: 'Indirect:  Online Travel Agency (OTA)' },
            {
              value: 'GDS',
              label: 'Indirect: Global Distribution System (GDS)',
            },
          ]}
          type="white"
          id="bookingType"
          disabled={isWorking || isLoadingBookingTypes}
          {...register('bookingType', {
            required: 'this field is required',
          })}
        ></Select>
      </FormRow>

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
          {/* {isEditSession ? 'Edit cabin' : 'Create new cabin'} */}
          Create new booking
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
