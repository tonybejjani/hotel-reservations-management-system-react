/** @format */

//// React Hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

//// Custom Hooks
import useCabins from '../cabins/useCabins';
import useCreateBooking from './useCreateBooking';
import useBookingType from './useBookingType';
import useBookingMethods from './useBookingMethods';
import useActiveBookings from './useActiveBookings';
import useSettings from '../settings/useSettings';

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
import { useGlobalContext } from '../../context/GlobalContext';
import Textarea from '../../ui/Textarea';
import { useDarkMode } from '../../context/DarkModeContext';

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
    color: ${(props) =>
      props.isDarkMode ? 'var(--color-grey-900)' : 'var(--color-grey-0)'};
  }

  & button {
    padding-left: 3.2rem;
  }
`;

// eslint-disable-next-line react/prop-types
function AddBooking({ bookingToEdit = {}, onCloseModal }) {
  const { guestRowData } = useGlobalContext();
  const { isDarkMode } = useDarkMode();

  const { createBooking, isCreating } = useCreateBooking();

  const { isLoading: isLoadingCabins, cabins } = useCabins();

  const { isLoading: isLoadingSettings, settings } = useSettings();

  const { isLoading: isLoadingActiveBookings, activeBookings } =
    useActiveBookings();

  const { isLoading: isLoadingBookingTypes, bookingTypes = [] } =
    useBookingType();

  const { isLoading: isLoadingBookingMethods, bookingMethods = [] } =
    useBookingMethods();

  const [totalExtrasPrice, setTotalExtrasPrice] = useState();
  const [numGuests, setNumGuests] = useState();
  const [disableIsPaid, setDisableIsPaid] = useState(true);
  const [disableStatus, setDisableStatus] = useState(true);

  const [userNumGuests, setUserNumGuests] = useState();
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
    watch,
  } = useForm({
    defaultValues: {
      isEditSession: isEditSession ? editValues : {},
      ispaid: false,
    },
  });

  const isPaidValue = watch('ispaid');

  const {
    id: guestId,
    fullName,
    nationalID,
    nationality,
    email,
  } = guestRowData;

  // Fill guest details when user chooses a guest or creates a guest
  useEffect(() => {
    setValue('guestId', guestId);
    setValue('fullName', fullName);
    setValue('email', email);
    setValue('nationalID', nationalID);
    setValue('nationality', nationality);
  }, [guestId, fullName, nationalID, nationality]);

  const { errors } = formState;

  // Booking Methods
  const BookingMethodOptions = bookingMethods?.filter((bookingMethod) => {
    return bookingTypeId === bookingMethod.typeId;
  });

  function handleBookingMethods(e) {
    setBookingTypeId(Number(e.target.value));
  }

  ////// Validate cabin dates, Fetch available cabins and calculate number of night stays //////

  function handleBookingDate(e, userInput) {
    /// reset all values related to choosing dates first
    setCabinsAvailable(null);

    setValue('cabin', null);
    setValue('numGuests', null);
    setValue('hasBreakfast', null);

    setValue('extrasPrice', null);
    setValue('extrasPriceFormat', formatCurrency(0));

    setValue('cabinPrice', null);
    setValue('cabinPriceFormat', formatCurrency(0));

    setValue('totalPrice', null);
    setValue('totalPriceFormat', formatCurrency(0));

    setValue('cabinDiscount', null);
    setValue('cabinDiscountFormat', formatCurrency(0));

    setValue('ispaid', false);
    setDisableIsPaid(true);

    setValue('status', null);
    setDisableStatus(true);

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
      }
    } else {
      setCabinsAvailable(null);
      setValue('numNights', null);
    }
    // unavailable cabins for the chosen reservation date
  }

  function handleCabinChoice(e) {
    //reset all fields related to choosing a cabin

    setNumGuests(null);
    setUserNumGuests(false);

    setValue('numGuests', null);
    setValue('hasBreakfast', null);
    setValue('extrasPrice', 0);
    setValue('extrasPriceFormat', formatCurrency(0));

    setValue('cabinPrice', null);
    setValue('cabinPriceFormat', formatCurrency(0));

    setValue('totalPrice', null);
    setValue('totalPriceFormat', formatCurrency(0));

    setValue('cabinDiscount', null);
    setValue('cabinDiscountFormat', formatCurrency(0));

    setValue('ispaid', false);
    setDisableIsPaid(true);

    setValue('status', null);
    setDisableStatus(true);

    setValue('status', null);
    setDisableStatus(true);

    const cabinId = Number(e.target.value);

    const cabin = cabins
      ?.map((cabin) => {
        return {
          id: cabin.id,
          maxCapacity: cabin.maxCapacity,
          price: cabin.regularPrice,
          discount: cabin.discount,
        };
      })
      .filter((cabin) => {
        return cabin.id === cabinId;
      });

    // calculate number of guests
    let numGuests = [];
    for (let minGuests = 1; minGuests <= cabin[0].maxCapacity; minGuests++) {
      numGuests[minGuests - 1] = minGuests;
    }

    // Fill the drop down of Number of guests
    setNumGuests(numGuests);

    // set cabin  regular price and corresponding discount
    setValue('cabinPrice', cabin[0].price);
    setValue('cabinPriceFormat', formatCurrency(cabin[0].price));
    setValue('cabinDiscount', cabin[0].discount);
    setValue('cabinDiscountFormat', formatCurrency(-cabin[0].discount));
  }

  function handleUserGuestsOption(e) {
    const userInput = e.target.value;
    const hasBreakfast = getValues().hasBreakfast;

    //reset all fields related to choosing a guest if no choise is made by the user
    if (!userInput) {
      setTotalExtrasPrice(0);
      setUserNumGuests(null);
      setValue('numGuests', null);
      setValue('hasBreakfast', false);
      setValue('extrasPrice', 0);
      setValue('extrasPriceFormat', formatCurrency(0));
      setValue('totalPrice', 0);
      setValue('totalPriceFormat', formatCurrency(0));
      setValue('ispaid', false);
      setDisableIsPaid(true);
      setValue('status', null);
      setDisableStatus(true);

      return;
    }

    setUserNumGuests(userInput);
    setValue('numGuests', userInput);
    setValue('ispaid', false);

    let totalPrice =
      (getValues().cabinPrice - getValues().cabinDiscount) *
      getValues().numNights;

    if (hasBreakfast) {
      const totalExtrasPrice =
        settings?.breakfastPrice *
        getValues().numGuests *
        getValues().numNights;

      setValue('extrasPrice', totalExtrasPrice);
      setValue('extrasPriceFormat', formatCurrency(totalExtrasPrice));

      totalPrice = totalPrice + totalExtrasPrice;
    }

    setValue('totalPrice', totalPrice);
    setValue('totalPriceFormat', formatCurrency(totalPrice));

    setDisableIsPaid(false);
    setValue('status', null);
    setDisableStatus(true);
  }

  function handleIncludeBreakfast(e) {
    const checked = e.target.checked;
    const totalPrice = getValues().totalPrice;
    const totalPriceformat = getValues().totalPriceFormat;
    const isPaid = getValues().ispaid;

    // no breakfast
    if (!checked) {
      // breakfast is removed from total price

      setValue('hasBreakfast', false);
      setValue('totalPrice', totalPrice - getValues().extrasPrice);
      setValue(
        'totalPriceFormat',
        formatCurrency(totalPrice - getValues().extrasPrice)
      );
      setValue('extrasPrice', 0);
      setValue('extrasPriceFormat', formatCurrency(0));

      setValue('status', null);
      setDisableStatus(true);

      if (isPaid) {
        setValue('ispaid', false);
        setDisableIsPaid(false);
      }
    }

    // load app global settings feature values first
    if (isLoadingSettings) return;

    // with breakfast
    if (checked) {
      if (isPaid) {
        setValue('ispaid', false);
        setDisableIsPaid(false);

        setValue('status', null);
        setDisableStatus(true);
      }

      setValue('hasBreakfast', true);
      if (!getValues().numNights || !getValues().numGuests) return;

      const totalExtrasPrice =
        settings?.breakfastPrice *
        getValues().numGuests *
        getValues().numNights;

      setValue('extrasPrice', totalExtrasPrice);
      setValue('extrasPriceFormat', formatCurrency(totalExtrasPrice));

      setValue('totalPrice', totalPrice + getValues().extrasPrice);
      setValue(
        'totalPriceFormat',
        formatCurrency(totalPrice + getValues().extrasPrice)
      );
    }
  }

  function handleIsPaid(e) {
    const isPaid = e.target.checked;

    if (isPaid) {
      setValue('ispaid', true);
      setDisableIsPaid(true);

      setDisableStatus(false);
    }
    console.log(getValues().ispaid);
  }

  function onSubmit(data) {
    const dataFormat = {
      startDate: data.checkin,
      endDate: data.checkout,
      numNights: +data.numNights,
      numGuests: +data.numGuests,
      cabinPrice: +data.cabinPrice,
      extrasPrice: +data.extrasPrice,
      totalPrice: +data.totalPrice,
      status: data.status,
      hasBreakfast: data.hasBreakfast,
      isPaid: data.ispaid,
      observations: data.observation,
      cabinId: +data.cabin,
      guestId: +data.guestId,
      bookingTypeId: +data.bookingTypeId,
      bookingMethodId: +data.bookingMethodId,
    };

    console.log(dataFormat);
    createBooking(dataFormat, {
      onSuccess: () => {
        reset();
        navigate('/bookings');
      },
    });
  }

  const isWorking = isCreating;

  console.log(isDarkMode);
  return (
    <>
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
              <SearchWrapper isDarkMode={isDarkMode}>
                <HiMiniMagnifyingGlass />
                <Button size="smallMedium">Search Guests</Button>
              </SearchWrapper>
            </Modal.Open>

            <Modal.Open opens="addGuest">
              <SearchWrapper isDarkMode={isDarkMode}>
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
          <FormRow label={'Full name'} error={errors?.fullName?.message}>
            <Input
              type="hidden"
              id="guestId"
              {...register('guestId', {
                required: 'this field is required',
              })}
            />
            <Input
              type="text"
              id="fullName"
              disabled
              {...register('fullName', {
                required: 'this field is required',
              })}
            />
          </FormRow>
          <FormRow label={'National ID'} error={errors?.nationalID?.message}>
            <Input
              type="text"
              id="nationalID"
              disabled
              {...register('nationalID', {
                required: 'this field is required',
              })}
            />
          </FormRow>
          <FormRow label={'Nationality'} error={errors?.nationality?.message}>
            <Input
              type="text"
              id="nationality"
              disabled
              {...register('nationality', {
                required: 'this field is required',
              })}
            />
          </FormRow>
          <FormRow label={'Email'} error={errors?.email?.message}>
            <Input
              type="text"
              id="email"
              disabled
              value={email}
              {...register('email', {
                required: 'this field is required',
              })}
            />
          </FormRow>
        </FormSection>

        <HeadingSection>
          <Heading as="h2">
            <TitleWrapper>
              <NumberCircle>2</NumberCircle>
              <span>Booking Details</span>
            </TitleWrapper>
          </Heading>
        </HeadingSection>
        <FormSection>
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
                    'Check out date should be 1 day later then check in date.'
                  );
                },
              })}
            />
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
              onChangeCapture={handleCabinChoice}
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
              onChangeCapture={handleUserGuestsOption}
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
          <FormRow
            label={'Include Breakfast'}
            error={errors?.hasBreakfast?.message}
          >
            <Input
              type="checkbox"
              id="hasBreakfast"
              disabled={isWorking || isLoadingSettings || !userNumGuests}
              onClick={handleIncludeBreakfast}
              // onChangeCapture={handleUserNumGuests}
              {...register('hasBreakfast')}
            />
          </FormRow>
          <FormRow
            label={'Additional Information'}
            error={errors?.observation?.message}
          >
            <Textarea
              type="text"
              id="observation"
              disabled={isWorking}
              {...register('observation')}
              defaultValue=""
            />
          </FormRow>
        </FormSection>

        <HeadingSection>
          <Heading as="h2">
            <TitleWrapper>
              <NumberCircle>3</NumberCircle>
              <span>Payment Details</span>
            </TitleWrapper>
          </Heading>
        </HeadingSection>
        <FormSection>
          <FormRow
            label={'Cabin Price*'}
            error={errors?.cabinPriceFormat?.message}
          >
            <Input type="hidden" {...register('cabinPrice')} />
            <Input
              type="text"
              id="cabinPriceFormat"
              disabled
              // onChangeCapture={handleUserNumGuests}
              {...register('cabinPriceFormat', {
                required: 'this field is required',
              })}
            />
          </FormRow>
          <FormRow
            label={'Cabin Discount'}
            error={errors?.cabinDiscountFormat?.message}
          >
            <Input type="hidden" {...register('cabinDiscount')} />
            <Input
              type="text"
              id="cabinDiscountFormat"
              disabled
              // onChangeCapture={handleUserNumGuests}
              {...register('cabinDiscountFormat', {
                required: 'this field is required',
              })}
            />
          </FormRow>
          <FormRow label={'Extras'} error={errors?.extrasPriceFormat?.message}>
            <Input type="hidden" {...register('extrasPrice')} />
            <Input
              type="text"
              id="extrasPriceFormat"
              disabled
              // onChangeCapture={handleUserNumGuests}
              {...register('extrasPriceFormat', {
                required: 'this field is required',
              })}
            />
          </FormRow>
          <FormRow
            label={'Total Price'}
            error={errors?.totalPriceFormat?.message}
          >
            <Input type="hidden" {...register('totalPrice')} />
            <Input
              type="text"
              id="totalPriceFormat"
              disabled
              // onChangeCapture={handleUserNumGuests}
              {...register('totalPriceFormat', {
                required: 'this field is required',
              })}
            />
          </FormRow>
          <FormRow label={'Payment Received*'} error={errors?.ispaid?.message}>
            <Input
              type="checkbox"
              id="ispaid"
              disabled={isWorking || disableIsPaid}
              onChangeCapture={handleIsPaid}
              // onChangeCapture={handleUserNumGuests}
              {...register('ispaid')}
            />
            <input
              type="hidden"
              value={isPaidValue}
              {...register('ispaidValue')}
            />
          </FormRow>
        </FormSection>

        <HeadingSection>
          <Heading as="h2">
            <TitleWrapper>
              <NumberCircle>4</NumberCircle>
              <span>Booking Status</span>
            </TitleWrapper>
          </Heading>
        </HeadingSection>
        <FormSection>
          <FormRow label={'Booking Status*'} error={errors?.status?.message}>
            <StyledSelect
              id="status"
              type="white"
              disabled={isWorking || disableStatus}
              // onChangeCapture={handleUserNumGuests}
              {...register('status', {
                required: isPaidValue
                  ? 'this field is required'
                  : 'Payment not received yet.',
              })}
            >
              <option value="">Select option...</option>
              <option value="unconfirmed">Unconfirmed</option>
              <option value="checked-in">Check in</option>
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
    </>
  );
}

export default AddBooking;
