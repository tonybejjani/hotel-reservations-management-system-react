/** @format */

import { useQuery } from '@tanstack/react-query';
import { getSearchGuests } from '../../services/apiGuests';
function useSearchGuests() {
  const {
    isLoading,
    error,
    data: guests,
  } = useQuery({
    queryKey: ['searchGuests'],
    queryFn: () => getSearchGuests(fullName),
  });

  return { isLoading, error, guests };
}

export default useSearchGuests;
