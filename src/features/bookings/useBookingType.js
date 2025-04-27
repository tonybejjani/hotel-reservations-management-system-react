/** @format */

import { useQuery } from '@tanstack/react-query';
import { getBookingTypes } from '../../services/apiBookings';

function useBookingType() {
  const {
    isLoading,
    data: bookingTypes,
    error,
  } = useQuery({
    queryKey: ['bookingTypes'],
    queryFn: getBookingTypes,
  });

  return { isLoading, bookingTypes, error };
}

export default useBookingType;
