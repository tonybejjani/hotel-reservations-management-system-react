/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      loginApi({ fullName, email, password }),
    onSuccess: (user) => {
      // let keys = Object.keys(localStorage);
      // keys.forEach((key) => {
      //   if (key.includes('auth-token')) {
      //     let json_str = localStorage.getItem(key);
      //     localStorage.setItem(key + '1', json_str);
      //   }
      // });
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}
