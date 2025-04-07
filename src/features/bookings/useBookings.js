/** @format */

import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: 'status',
          value: filterValue,
          method: 'eq',
        };

  const sortByValue = searchParams.get('sortBy') || 'startDate-desc';

  const [field, direction] = sortByValue.split('-');
  const sortBy = {
    field,
    direction,
  };

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, error, bookings, count };
}

export default useBookings;
