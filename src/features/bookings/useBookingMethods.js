/** @format */

import { useQuery } from '@tanstack/react-query';
import { getBookingMethods } from '../../services/apiBookings';

function useBookingMethods() {
  const {
    isLoading,
    data: bookingMethods,
    error,
  } = useQuery({
    queryKey: ['bookingMethods'],
    queryFn: getBookingMethods,
  });

  return { isLoading, bookingMethods, error };
}

export default useBookingMethods;
