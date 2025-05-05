/** @format */

//// React Hooks
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

//// Custom Hooks
import useCabins from '../cabins/useCabins';
import useGuests from '../guests/useGuests';
import useCreateBooking from './useCreateBooking';
import useBookingType from './useBookingType';
import useBookingMethods from './useBookingMethods';
import useActiveBookings from './useActiveBookings';

// Custom Components
import GuestsTablePicker from '../guests/GuestsTablePicker';

//// UI
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import FormSection from '../../ui/FormSection';
import Heading from '../../ui/Heading';
import { HiMiniMagnifyingGlass, HiMiniPlus } from 'react-icons/hi2';
import Modal from '../../ui/Modal';

//// Styling
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

//// Helpers
import { formatCurrency, getDatesBetween } from '../../utils/helpers';
import CreateGuestForm from '../guests/CreateGuestForm';

const HeadingSection = styled.div`
  display: flex;
  column-gap: 2em;
  align-items: center;
  margin-bottom: 0.4rem;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid var(--color-grey-200);
`;

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

const NumberCircle = styled.span`
  height: 3.2rem;
  width: 3.2rem;
  background-color: var(--color-brand-600);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-brand-50);
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  position: relative;

  & svg {
    scale: 1.4;
    position: absolute;
    left: 1rem;
    color: var(--color-grey-0);
  }

  & button {
    padding-left: 3.2rem;
  }
`;

//// Context
export const AddBookingContext = createContext();

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

  const [guestRowData, setGuestRowData] = useState({});
  const [numGuests, setNumGuests] = useState();
  const [bookingTypeId, setBookingTypeId] = useState();
  const [cabinsAvailable, setCabinsAvailable] = useState();
  const navigate = useNavigate();
  // const { editCabin, isEditing } = useEditCabin();
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    getValues,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      isEditSession: isEditSession ? editValues : {},
    },
  });

  const { errors } = formState;

  ////// Reservation dates validation && Fetching number of cabins && number of nights //////
  function handleBookingDate(e, userInput) {
    const startDate =
      userInput === 'checkinDate' ? e.target.value : getValues().checkin;

    setValue('checkin', startDate);

    const endDate =
      userInput === 'checkoutDate' ? e.target.value : getValues().checkout;

    setValue('checkout', endDate);

    const datesToReserve = getDatesBetween(
      new Date(startDate),
      new Date(endDate) - 1
    ).toString();

    console.log(getValues());

    if (startDate && endDate && startDate < endDate) {
      const numNights = datesToReserve.split(',').length - 1;
      setValue('numNights', numNights);

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
      setValue('numNights', null);
    }
    // unavailable cabins for the chosen reservation date
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

  ///// FIRST METHOD: DEPRECATED ////
  // function handleSearchOnFocus(e) {
  //   setValue('fullName', null);
  // }

  // function handleSearchOnClick(e) {
  //   setValue('fullName', null);
  // }

  // function handleSearchOnChange(e) {
  //   console.log(e.options);
  //   setValue('fullName', e.target.value);

  //   console.log(getValues());
  // }

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
      <AddBookingContext.Provider value={{ setGuestRowData }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <HeadingSection>
            <Heading as="h2">
              <TitleWrapper>
                <NumberCircle>1</NumberCircle>
                <span>Guest Details</span>
              </TitleWrapper>
            </Heading>
            <Modal>
              <Modal.Open opens="searchGuest">
                <SearchWrapper>
                  <HiMiniMagnifyingGlass />
                  <Button size="smallMedium">Search Guests</Button>
                </SearchWrapper>
              </Modal.Open>

              <Modal.Open opens="addGuest">
                <SearchWrapper>
                  <HiMiniPlus />
                  <Button size="smallMedium">Add New Guest</Button>
                </SearchWrapper>
              </Modal.Open>

              {/* <Modal.Open opens="addGuest">
              <Button>Add Existing Guests</Button>
            </Modal.Open> */}
              <Modal.Window opens="searchGuest">
                <GuestsTablePicker />
              </Modal.Window>
              <Modal.Window opens="addGuest">
                <CreateGuestForm />
              </Modal.Window>
            </Modal>
          </HeadingSection>
          <FormSection title="Add Guest Info ">
            <FormRow label={'Full name'}>
              <Input type="hidden" />
              <Input
                type="text"
                id="fullName"
                disabled
                value={guestRowData?.fullName}
              />
            </FormRow>
            <FormRow label={'National ID'}>
              <Input
                type="text"
                id="nationalId"
                disabled
                value={guestRowData?.nationalID}
              />
            </FormRow>
            <FormRow label={'Nationality'}>
              <Input
                type="text"
                id="nationality"
                disabled
                value={guestRowData?.nationality}
              />
            </FormRow>
            <FormRow label={'Email'}>
              <Input
                type="text"
                id="email"
                disabled
                value={guestRowData?.email}
              />
            </FormRow>
          </FormSection>
          {/* <FormRow label={'Guest full name*'} error={errors?.fullName?.message}>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            list="searchableFullNames"
            placeholder="Search exisiting guests..."
            onFocus={handleSearchOnFocus}
            onChangeCapture={handleSearchOnChange}
            // onMouseDown={handleSearchOnClick}
            onClick={handleSearchOnClick}
            disabled={isWorking}
            {...register('fullName', {
              required: 'this field is required',
            })}
          />

          {!isLoadingGuests && (
            <datalist id="searchableFullNames">
              {guests.map((option) => {
                return (
                  <option
                    value={`${option.fullName} Id: ${option.nationalID}`}
                    id={option.id}
                    key={option.id}
                  />
                );
              })}
            </datalist>
          )}
        </FormRow> */}
          <HeadingSection>
            <Heading as="h2">
              <TitleWrapper>
                <NumberCircle>2</NumberCircle>
                <span>Booking Details</span>
              </TitleWrapper>
            </Heading>
            <Modal>
              {/* <Modal.Open opens="searchGuest">
              <Button size="smallMedium">Search Guests</Button>
            </Modal.Open> */}
              {/* <Modal.Open opens="addGuest">
              <Button>Add Existing Guests</Button>
            </Modal.Open> */}
              {/* <Modal.Window opens="searchGuest">
              <GuestsTable />
            </Modal.Window> */}
              {/* <Modal.Window opens="addGuest">
              <p>Add Guest</p>
            </Modal.Window> */}
            </Modal>
          </HeadingSection>
          <FormSection>
            <FormRow label="Check in" error={errors?.checkin?.message}>
              <Input
                type="date"
                name="checkin"
                id="checkin"
                onChangeCapture={(e) => handleBookingDate(e, 'checkinDate')}
                onBlurCapture={() => trigger(['checkin', 'checkout'])}
                min={new Date().toLocaleString('fr-CA').substr(0, 10)}
                {...register('checkin', {
                  required: 'this field is required',
                  validate: (value) => {
                    if (!getValues().checkout) return;
                    return (
                      value <= getValues().checkout ||
                      'Check in date should be earlier then check out date.'
                    );
                  },
                })}
              />
            </FormRow>

            <FormRow label="Check out" error={errors?.checkout?.message}>
              <Input
                type="date"
                name="checkout"
                id="checkout"
                onChangeCapture={(e) => handleBookingDate(e, 'checkoutDate')}
                onBlurCapture={() => trigger(['checkin', 'checkout'])}
                min={new Date().toLocaleString('fr-CA').substr(0, 10)}
                {...register('checkout', {
                  required: 'this field is required',
                  validate: (value) => {
                    if (!getValues().checkin) return;
                    return (
                      value > getValues().checkin ||
                      'Check out date should be later then check in date.'
                    );
                  },
                })}
              />
            </FormRow>

            <FormRow
              label={'Booking type*'}
              error={errors?.bookingTypeId?.message}
            >
              <StyledSelect
                id="bookingTypeId"
                onChangeCapture={handleBookingMethods}
                type="white"
                disabled={isWorking || isLoadingBookingTypes}
                {...register('bookingTypeId', {
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
              error={errors?.bookingMethodId?.message}
            >
              <StyledSelect
                type="white"
                id="bookingMethodId"
                disabled={isWorking || isLoadingBookingTypes || !bookingTypeId}
                {...register('bookingMethodId', {
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
              label={'Number of nights*'}
              error={errors?.numNights?.message}
            >
              <Input
                type="text"
                id="numNights"
                disabled
                {...register('numNights', {
                  required: 'this field is required',
                })}
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
            <FormRow
              label={'Number of guests*'}
              error={errors?.numGuests?.message}
            >
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
          </FormSection>
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
      </AddBookingContext.Provider>
    </>
  );
}

export default AddBooking;
