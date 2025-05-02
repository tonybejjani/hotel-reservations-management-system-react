/** @format */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';
import { useParams, useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get('page') ? 2 : Number(searchParams.get('page'));

  const {
    isLoading,
    error,
    data: { data: guests, count } = {},
  } = useQuery({
    queryKey: ['guests'],
    queryFn: () => getGuests({ page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['guests', page + 1],
      queryFn: () => getGuests({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['guests', page - 1],
      queryFn: () => getGuests({ page: page - 1 }),
    });
  }

  return { isLoading, error, guests, count };
}

export default useGuests;
