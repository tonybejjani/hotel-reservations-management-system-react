/** @format */

import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

function useCabins() {
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}

export default useCabins;
