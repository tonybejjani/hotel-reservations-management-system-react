/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

function useUpdateUser() {
  const queryClient = useQueryClient();
  // mutationFn can only accept one object
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User successfully updated.');

      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
