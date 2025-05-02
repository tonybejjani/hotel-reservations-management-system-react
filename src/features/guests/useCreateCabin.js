/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditGuest } from '../../services/apiGuests';

import toast from 'react-hot-toast';

function useCreateGuest() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createGuest } = useMutation({
    mutationFn: createEditGuest,
    onSuccess: () => {
      toast.success(`New guest successfully created.`);
      queryClient.invalidateQueries({
        queryKey: ['guests'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { createGuest, isCreating };
}

export default useCreateGuest;
