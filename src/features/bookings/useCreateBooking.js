/** @format */

import { useMutation } from '@tanstack/react-query';

function useCreateBooking() {
  const { isLoading: isCreating, createBooking } = useMutation({
    queryFn: () => createBooking,
  });

  return { createBooking, isCreating };
}

export default useCreateBooking;
