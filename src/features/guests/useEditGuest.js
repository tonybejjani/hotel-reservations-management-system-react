/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditGuest } from '../../services/apiGuests';

function useEditGuest() {
  const queryClient = useQueryClient();
  // mutationFn can only accept one object
  const { isLoading: isEditing, mutate: editGuest } = useMutation({
    mutationFn: ({ newGuest, id }) => createEditGuest(newGuest, id),
    onSuccess: () => {
      toast.success('Guest successfully edited.');
      queryClient.invalidateQueries({
        queryKey: ['guests'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { editGuest, isEditing };
}

export default useEditGuest;
