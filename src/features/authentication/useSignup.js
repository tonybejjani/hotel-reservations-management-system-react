/** @format */

import { useMutation } from '@tanstack/react-query';
import { signup as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signUpApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        `${user.user.email} account sign up successful. Please use user's credentials to login.`
      );
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Error signing up ');
    },
  });

  return { signup, isLoading };
}
