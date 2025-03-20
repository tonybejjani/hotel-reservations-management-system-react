/** @format */

import Spinner from '../../ui/Spinner';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSetting';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field, defaultValue) {
    const { value } = e.target;

    if (!value || Number(value) === defaultValue) return;

    updateSetting({ [field]: value });
    console.log(value);
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking" id="minBookingLength">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength', minBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking" id="maxBookingLength">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength', maxBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking" id="maxGuestsPerBooking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) =>
            handleUpdate(e, 'maxGuestsPerBooking', maxGuestsPerBooking)
          }
        />
      </FormRow>
      <FormRow label="Breakfast price" id="breakfastPrice">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice', breakfastPrice)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
