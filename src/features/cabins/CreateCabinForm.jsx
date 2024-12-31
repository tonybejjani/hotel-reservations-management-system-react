/** @format */

import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';

// eslint-disable-next-line react/prop-types
function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const queryClient = useQueryClient();

  const { errors } = formState;
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      reset();
    },

    onError: (err) => toast.error(err.message),
  });

  // mutationFn can only accept one object
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      reset();
    },

    onError: (err) => toast.error(err.message),
  });

  // if editing the cabin we can edit the image or not:
  // option 1: edit the image --> keep the same logic
  // option 2: keep the same image = image already stored in the database so keep same URL
  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    isEditSession
      ? editCabin({ newCabin: { ...data, image: image }, id: editId })
      : createCabin({ ...data, image: image });
  }

  // function onError(errors) {
  //   console.log(errors);
  // }

  const isWorking = isCreating || isEditing;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message} id="name">
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow
        label={'Maximum capacity'}
        error={errors?.maxCapacity?.message}
        id="maxCapacity"
      >
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

      <FormRow
        label={'Regular price'}
        error={errors?.regularPrice?.message}
        id="regularPrice"
      >
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

      <FormRow
        label={'Discount'}
        error={errors?.discount?.message}
        id="discount"
      >
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
        id="description"
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
        <Button variation="secondary" type="reset">
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
