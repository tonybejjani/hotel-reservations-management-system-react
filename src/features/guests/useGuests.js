/** @format */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';
import { useParams, useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // console.log(searchParams.get('page'));
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const search = !searchParams.get('search') ? '' : searchParams.get('search');

  const {
    isLoading,
    error,
    data: { data: guests, count } = {},
  } = useQuery({
    queryKey: ['guests', page, search],
    queryFn: () => getGuests({ page, search }),
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
