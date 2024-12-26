/** @format */

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCabin } from '../../services/apiCabins';

import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState } = useForm();

  const queryClient = useQueryClient();

  const { errors } = formState;
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      reset();
    },

    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message} id="name">
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'this field is required' })}
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
          {...register('maxCapacity', { required: 'this field is required' })}
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
          {...register('regularPrice', { required: 'this field is required' })}
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
          {...register('discount', { required: 'this field is required' })}
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
          {...register('description', { required: 'this field is required' })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isAdding}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
