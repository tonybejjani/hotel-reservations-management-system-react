/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGuest as deleteGuestAPI } from '../../services/apiGuests';
import toast from 'react-hot-toast';

function useDeleteGuest() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteGuest } = useMutation({
    mutationFn: deleteGuestAPI,
    onSuccess: () => {
      toast.success(`Guest successfully deleted.`);
      queryClient.invalidateQueries({
        queryKey: ['guests'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteGuest, isDeleting };
}

export default useDeleteGuest;
