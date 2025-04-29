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
import { HiCalendar } from 'react-icons/hi';
// import { format } from 'date-fns';
// import { TfiRulerAlt } from 'react-icons/tfi';
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

  const [numGuests, setNumGuests] = useState();

  const [numNights, setNumNights] = useState('');

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

  function handleBookingDate(dates, field) {
    const [startDate, endDate] = dates;

    /* endDate -1 because the endDate is the checkout date
       so it is not considered a a date to reserve */
    const datesToReserve = getDatesBetween(
      new Date(startDate),
      new Date(endDate - 1)
    ).toString();

    const numNights = datesToReserve.split(',').length;
    setNumNights(numNights);
    /* Before proceeding checek if below conditions are true: 
    1- Check if 2 date ranges has been received because a 
       minimum booking reservation in the system is one night. 
    2- Check if both startDate and endDate are not identical  */
    if (
      datesToReserve.length === 2 ||
      datesToReserve[0] !== datesToReserve[1]
    ) {
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
          /* a cabin is double booked if any of its reserved days collide
          with the chosen reservation date */
          const activeBookingDays = booking.dates;
          let doubleBookingsCount = 0;

          activeBookingDays.forEach((activeBookingDay) => {
            if (datesToReserve.includes(activeBookingDay.toString())) {
              doubleBookingsCount++;
            }
          });

          // cabin is double booked - reservation date collision
          if (doubleBookingsCount > 0) return true;

          // cabin not double booked
          return false;
        });

      // remove duplicate cabins
      const unavailableUniqueCabins = unavailabeCabins
        .map((booking) => booking.cabin)
        .reduce((acc, curr) => {
          if (!acc.includes(curr)) acc.push(curr);
          return acc;
        }, []);

      // extract the remaining available cabins from the list of cabins
      const availableCabins = cabins?.reduce((acc, curr) => {
        if (!unavailableUniqueCabins.includes(curr.name)) acc.push(curr);
        return acc;
      }, []);

      if (availableCabins) {
        setCabinsAvailable(availableCabins);

        const maxGuests = availableCabins[0].maxCapacity;

        // spread the number of guests from minGuests to MaxGuests to an array
        let guests = [];
        for (let minGuests = 1; minGuests <= maxGuests; minGuests++) {
          guests[minGuests - 1] = minGuests;
        }

        setNumGuests(guests);
      }
    } else {
      setCabinsAvailable(null);
    }
    // unavailable cabins for the chosen reservation date

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

  /* if editing the cabin we can edit the image or keep the same image so we have 2 options::
   option 1: keep the same image = image already stored in the database so the image is stored as URL (string)
  from the database
   option: if we are editing the cabin and we changed the image by uploading a new one, the image  uploaded
   would take the form of data.image[0] */
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

  /* Extract Max number of guests from chosen cabin
  and list all range of numbers in an array to 
  be listed in the drop down of (number of guests)  */
  function handleNumGuests(e) {
    const arrCabin = e.target.value.split('—');
    const maxGuests = Number(arrCabin[0].match(/\d+/)[0]);

    let guests = [];
    for (let minGuests = 1; minGuests <= maxGuests; minGuests++) {
      guests[minGuests - 1] = minGuests;
    }

    setNumGuests(guests);
  }

  function handleUserNumGuests(e) {
    const userInputGuests = e.target.value;

    // spread the number of guests from minGuests to MaxGuests to an array
    let guests = [];
    for (let minGuests = 1; minGuests <= userInputGuests; minGuests++) {
      guests[minGuests - 1] = minGuests;
    }

    setNumGuests(guests);
  }

  // const isWorking = isCreating || isEditing;
  const isWorking = isCreating;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
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

      <FormRow label={'Guest Information*'} error={errors?.firstName?.message}>
        <Input
          type="text"
          id="firstName"
          disabled={isWorking}
          {...register('firstName', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow
        label={'Reservation date*'}
        error={errors?.reservationDate?.message}
        type="datePicker"
      >
        <Controller
          control={control}
          name="reservationDate"
          render={({ field }) => (
            <DatePicker
              // showIcon
              // toggleCalendarOnIconClick
              icon={<HiCalendar />}
              startDate={field.value?.[0]}
              endDate={field.value?.[1]}
              onChange={(dates) => handleBookingDate(dates, field)}
              calendarStartDay={3}
              placeholderText="Select Date Range"
              minDate={new Date()}
              selectsRange
              monthsShown={2}
              // withPortal
              customInput={<Input type="text" id="reservationDate" />}
            />
          )}
          // {...register('reservationDate', {
          //   required: 'this field is required',
          // })}
        />
      </FormRow>
      <FormRow label={'Number of nights*'} error={errors?.numNights?.message}>
        <Input
          type="text"
          id="numNights"
          disabled
          {...register('numNights', {
            required: 'this field is required',
          })}
          value={numNights}
        />
      </FormRow>
      <FormRow label={'Available cabins*'} error={errors?.Cabin?.message}>
        <StyledSelect
          id="cabin"
          onChangeCapture={handleNumGuests}
          type="white"
          disabled={
            isWorking ||
            isLoadingCabins ||
            isLoadingActiveBookings ||
            !cabinsAvailable
          }
          {...register('cabin', {
            required: 'this field is required',
          })}
        >
          <option value="" disabled>
            Select option
          </option>
          {cabinsAvailable?.map((cabin) => (
            <option value={cabin.value} key={cabin.id}>
              {`Up to ${cabin.maxCapacity} guests  — ${formatCurrency(
                cabin.regularPrice
              )} — Cabin ${cabin.name} `}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow label={'Number of guests*'} error={errors?.numGuests?.message}>
        <StyledSelect
          id="numGuests"
          type="white"
          disabled={
            isWorking || isLoadingCabins || !cabinsAvailable || !numGuests
          }
          {...register('numGuests', {
            required: 'this field is required',
          })}
          value={numGuests?.length}
          onChange={handleUserNumGuests}
        >
          <option value="" disabled>
            Select option
          </option>
          {numGuests?.map((num) => (
            <option value={num} key={num}>
              {num} guests
            </option>
          ))}
        </StyledSelect>
      </FormRow>

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
    </Form>
  );
}

export default AddBooking;
