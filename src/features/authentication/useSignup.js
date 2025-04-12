/** @format */

import { useMutation } from '@tanstack/react-query';
import { signup as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        `${user.user.email} account sign up successful. Please use email and password to login.`
      );
    },
  });

  return { signup, isLoading };
}
