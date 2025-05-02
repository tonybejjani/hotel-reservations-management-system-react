/** @format */

import { useQuery } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';
import { useParams } from 'react-router-dom';
function useGuests() {
  const { page } = useParams();

  const {
    isLoading,
    error,
    data: { data: guests, count } = {},
  } = useQuery({
    queryKey: ['guests'],
    queryFn: () => getGuests({ page }),
  });

  return { isLoading, error, guests, count };
}

export default useGuests;
