/** @format */

import { useQuery } from '@tanstack/react-query';
import { getAvailableCabins } from '../../services/apiCabins';

function useCabins() {
  const {
    isLoadingAvailableCabins,
    error,
    data: cabinsAvailable,
  } = useQuery({
    queryKey: ['cabinsAvailable'],
    queryFn: getAvailableCabins,
  });

  return { isLoadingAvailableCabins, error, cabinsAvailable };
}

export default useCabins;
