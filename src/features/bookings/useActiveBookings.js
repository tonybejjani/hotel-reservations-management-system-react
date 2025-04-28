/** @format */

import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
import { getActiveBookings } from '../../services/apiBookings';

export default function useActiveBookings() {
  // const { bookingId } = useParams();

  const {
    isLoading,
    data: activeBookings,
    error,
  } = useQuery({
    queryKey: ['activeBookings'],
    queryFn: getActiveBookings,
    retry: false,
  });

  return { isLoading, error, activeBookings };
}
