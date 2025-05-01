/** @format */
/** @format */

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useCabins from '../cabins/useCabins';
import useGuests from '../guests/useGuests';
import useCreateBooking from './useCreateBooking';
import useBookingType from './useBookingType';
import useBookingMethods from './useBookingMethods';
import useActiveBookings from './useActiveBookings';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
// import Textarea from '../../ui/Textarea';

import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { formatCurrency, getDatesBetween } from '../../utils/helpers';
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

  const { isLoading: isLoadingGuests, guests } = useGuests();

  const { isLoading: isLoadingCabins, cabins } = useCabins();

  const { isLoading: isLoadingActiveBookings, activeBookings } =
    useActiveBookings();

  const { isLoading: isLoadingBookingTypes, bookingTypes = [] } =
    useBookingType();

  const { isLoading: isLoadingBookingMethods, bookingMethods = [] } =
    useBookingMethods();

  const [numGuests, setNumGuests] = useState();
  const [bookingTypeId, setBookingTypeId] = useState();
  const [checkInOutDates, setCheckInOutDates] = useState();
  const [cabinsAvailable, setCabinsAvailable] = useState();
  const [numNights, setNumNights] = useState('');
  const [guestInput, setGuestInput] = useState('');
  const navigate = useNavigate();
  // const { editCabin, isEditing } = useEditCabin();
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, getValues, control } =
    useForm({
      defaultValues: {
        isEditSession: isEditSession ? editValues : {},
      },
    });

  const { errors } = formState;

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
      setCheckInOutDates(datesToReserve);
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

  function handleBookingMethods(e) {
    console.log(e.target.value);
    setBookingTypeId(Number(e.target.value));
  }

  // Booking Methods
  const BookingMethodOptions = bookingMethods?.filter((bookingMethod) => {
    return bookingTypeId === bookingMethod.typeId;
  });

  function handleNumGuests(e) {
    const cabinId = Number(e.target.value);

    const cabin = cabins
      ?.map((cabin) => {
        return { id: cabin.id, maxCapacity: cabin.maxCapacity };
      })
      .filter((cabin) => {
        return cabin.id === cabinId;
      });

    let guests = [];
    for (let minGuests = 1; minGuests <= cabin[0].maxCapacity; minGuests++) {
      guests[minGuests - 1] = minGuests;
    }

    setNumGuests(guests);
  }

  function handleSearchOnFocus(e) {
    setGuestInput('');
  }
  function handleSearchOnChange(e) {
    setGuestInput(e.target.value);
    console.log(getValues());
  }

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

  const isWorking = isCreating;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label={'Guest full name*'}
          error={errors?.guestfullName?.message}
        >
          <Input
            type="text"
            name="guestfullName"
            id="guestfullName"
            list="searchableFullNames"
            placeholder="Select option..."
            value={guestInput}
            onFocus={handleSearchOnFocus}
            onChangeCapture={handleSearchOnChange}
            // onClick={handleSearchOnClick}
            disabled={isWorking}
            {...register('guestfullName', {
              required: 'this field is required',
            })}
          />

          {!isLoadingGuests && (
            <datalist id="searchableFullNames">
              {guests.map((option) => {
                return (
                  <option
                    value={option.fullName}
                    id={option.id}
                    key={option.id}
                  />
                );
              })}
            </datalist>
          )}
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
            <option value="">Select option...</option>
            {bookingTypes?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
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
            disabled={isWorking || isLoadingBookingTypes || !bookingTypeId}
            {...register('bookingMethods', {
              required: 'this field is required',
            })}
          >
            <option value="">Select option...</option>
            {BookingMethodOptions.map((option) => (
              <option value={option.id} key={option.id}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
        </FormRow>
        <FormRow
          label={'Reservation date*'}
          error={errors?.reservationDate?.message}
          type="datePicker"
        >
          <Controller
            control={control}
            name="reservationDate"
            {...register('reservationDate', {
              required: 'this field is required',
            })}
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
                withPortal
                customInput={<Input type="text" />}
              />
            )}
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
        <FormRow label={'Available cabins*'} error={errors?.cabin?.message}>
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
            <option value="">Select option...</option>
            {cabinsAvailable?.map((cabin) => (
              <option value={cabin.id} key={cabin.id}>
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
            // onChangeCapture={handleUserNumGuests}
            {...register('numGuests', {
              required: 'this field is required',
            })}
          >
            <option value="">Select option...</option>
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
      </Form>
    </>
  );
}

export default AddBooking;
