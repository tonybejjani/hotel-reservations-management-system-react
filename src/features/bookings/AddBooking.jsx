/** @format */
/** @format */

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCreateBooking from './useCreateBooking';
import useBookingType from './useBookingType';
import useActiveBookings from './useActiveBookings';
import { useState } from 'react';
import styled from 'styled-components';
import useCabins from '../cabins/useCabins';
import { formatCurrency, getDatesBetween } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { TfiRulerAlt } from 'react-icons/tfi';
// import useEditBooking from './useEditCabin';

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

// eslint-disable-next-line react/prop-types
function AddBooking({ bookingToEdit = {}, onCloseModal }) {
  const { createBooking, isCreating } = useCreateBooking();
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { isLoading: isLoadingActiveBookings, activeBookings } =
    useActiveBookings();
  const { isLoading: isLoadingBookingTypes, bookingTypes = [] } =
    useBookingType();

  const [bookingTypeValue, setBookingTypeValue] = useState();
  const [cabinsAvailable, setCabinsAvailable] = useState();

  const navigate = useNavigate();
  // const { editCabin, isEditing } = useEditCabin();

  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, getValues, control } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });

  const { errors } = formState;

  // Booking Types
  let temp = [];
  function onlyUniqueOptions(value) {
    let uniqueOption = !temp.includes(value.value);

    if (!temp.includes(value.value)) temp.push(value.value);

    return uniqueOption;
  }

  function handleBookingMethods(e) {
    setBookingTypeValue((val) => (val = e.target.value));
  }

  function handleCabinToReserve() {}

  function handleBookingDate(dates, field) {
    const [startDate, endDate] = dates;

    const datesToReserve = getDatesBetween(
      new Date(startDate),
      new Date(endDate)
    ).toString();

    // unavailable cabins for the chosen reservation date
    const unavailabeCabins = activeBookings
      ?.map((booking) => {
        return {
          id: booking.id,
          dates: getDatesBetween(
            new Date(booking.startDate),
            new Date(booking.endDate)
          ),
          cabinId: booking.cabinId,
          cabin: booking.cabins.name,
        };
      })
      .filter((booking) => {
        /* a cabin is double booked if any of its reserved days match 
          the chosen reservation date */
        const activeBookingDays = booking.dates;
        let countDoubleBookings = 0;

        activeBookingDays.forEach((activeBookingDay) => {
          if (datesToReserve.includes(activeBookingDay.toString())) {
            countDoubleBookings++;
          }
        });

        // cabin is double booked
        if (countDoubleBookings > 0) return true;

        // cabin not double booked
        return false;
      });

    // const unavailableCabinsGroup = unavailabeCabins.reducer(
    //   acc,
    //   (curr) => curr,
    //   cabins
    // );
    // const availableCabins = cabins.filter(cabin => )

    console.log(cabins);
    console.log(unavailabeCabins);
    // console.log(unavailabeCabins);
    return field.onChange(dates);
  }

  //Mold bookingType to fit the <Select> component options attribute key/value/label structure
  const bookingTypesOptions = bookingTypes
    ?.map((bookingType) => {
      return {
        key: bookingType.id,
        value: bookingType.type,
        label: bookingType.type,
      };
    })
    .filter(onlyUniqueOptions);

  // Booking Methods
  const BookingMethodOptions = bookingTypes
    ?.map((bookingType) => {
      return {
        key: bookingType.id,
        type: bookingType.type,
        value: bookingType.description,
        label: bookingType.description,
      };
    })
    .filter((value) => {
      return bookingTypeValue === value.type;
    });
  // if editing the cabin we can edit the image or keep the same image so we have 2 options::
  // option 1: keep the same image = image already stored in the database so the image is stored as URL (string)
  // from the database
  // option: if we are editing the cabin and we changed the image by uploading a new one, the image  uploaded
  // would take the form of data.image[0]
  function onSubmit(data) {
    console.log(getValues());
    console.log(data);
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

  // function handleNumGuests(e) {
  //   return null;
  //   const cabinDescription = e.target.value;

  //   if (!cabinDescription.includes('guests')) return;

  //   var pos1 = cabinDescription.indexOf('—'); // locate first occurence of character "—"
  //   var pos2 = cabinDescription.indexOf('—', pos1 + 1); // locate second occurence of character "—"
  //   var strArr = cabinDescription.slice(pos1, pos2);

  //   const numGuests = strArr;

  //   console.log(numGuests);
  // }

  // const isWorking = isCreating || isEditing;
  const isWorking = isCreating;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow
        label={'Reservation date*'}
        error={errors?.reservationDate?.message}
      >
        <Controller
          control={control}
          name="reservationDate"
          render={({ field }) => (
            <DatePicker
              selectsRange
              startDate={field.value?.[0]}
              endDate={field.value?.[1]}
              onChange={(dates) => handleBookingDate(dates, field)}
              calendarStartDay={3}
              isClearable
              placeholderText="Select Date Range"
            />
          )}
          {...register('reservationDate', {
            required: 'this field is required',
          })}
        />
      </FormRow>
      <FormRow label={'Booking type*'} error={errors?.bookingType?.message}>
        <StyledSelect
          id="bookingType"
          onChangeCapture={handleBookingMethods}
          type="white"
          disabled={isWorking || isLoadingBookingTypes}
          {...register('bookingType', {
            required: 'this field is required',
          })}
        >
          <option value="" disabled>
            Select your option
          </option>
          {bookingTypesOptions?.map((option) => (
            <option value={option.value} key={option.key}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow
        label={'Booking method*'}
        error={errors?.bookingMethods?.message}
      >
        <StyledSelect
          type="white"
          id="bookingMethods"
          disabled={isWorking || isLoadingBookingTypes || !bookingTypeValue}
          {...register('bookingMethods', {
            required: 'this field is required',
          })}
        >
          <option value="" disabled>
            Select your option
          </option>
          {BookingMethodOptions.map((option) => (
            <option value={option.value} key={option.key}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label={'First name*'} error={errors?.firstName?.message}>
        <Input
          type="text"
          id="firstName"
          disabled={isWorking}
          {...register('firstName', {
            required: 'this field is required',
          })}
        />
      </FormRow>
      <FormRow label={'Last name*'} error={errors?.lastName?.message}>
        <Input
          type="text"
          id="lastName"
          disabled={isWorking}
          {...register('lastName', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label={'Available cabins*'} error={errors?.Cabin?.message}>
        <StyledSelect
          id="cabin"
          onChangeCapture={handleCabinToReserve}
          type="white"
          disabled={isWorking || isLoadingCabins || isLoadingActiveBookings}
          {...register('cabin', {
            required: 'this field is required',
          })}
        >
          <option value="" disabled>
            Select option
          </option>
          {cabins?.map((cabin) => (
            <option value={cabin.value} key={cabin.id}>
              {`${cabin.name}  — Up to ${
                cabin.maxCapacity
              } guests  — ${formatCurrency(cabin.regularPrice)}`}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      {/* <FormRow label={'Number of guests*'} error={errors?.numGuests?.message}>
        <StyledSelect
          id="numGuests"
          type="white"
          disabled={isWorking || isLoadingCabins}
          {...register('numGuests', {
            required: 'this field is required',
          })}
        >
          <option value="" disabled>
            Select option
          </option>
          {cabins.map((cabin) => (
            <option value={cabin.value} key={cabin.id}>
              {`${cabin.name}  — Up to ${
                cabin.maxCapacity
              } guests  — ${formatCurrency(cabin.regularPrice)}`}
            </option>
          ))}
        </StyledSelect>
      </FormRow> */}

      {/* <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
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
      </FormRow> */}

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => navigate('/bookings')}
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

export default AddBooking;
