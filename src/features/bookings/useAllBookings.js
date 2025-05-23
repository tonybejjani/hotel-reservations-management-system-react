/** @format */

import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

// This hook fetches ALL bookings without pagination
// It could be extended to support filters/sorting if needed for the calendar view
function useAllBookings() {
  const {
    isLoading,
    data: { data: bookings, count } = {}, // Default to empty object if data is undefined
    error,
  } = useQuery({
    // Using a distinct queryKey to avoid conflicts with paginated 'bookings'
    queryKey: ['bookings', 'all'], 
    // Pass an empty object to getBookings to fetch all, without page, filter, or sort
    queryFn: () => getBookings({}), 
  });

  return { isLoading, error, bookings, count };
}

export default useAllBookings;
