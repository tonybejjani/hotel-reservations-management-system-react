/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

function useUpdateSettings() {
  const queryClient = useQueryClient();

  // mutationFn can only accept one object
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting successfully updated.');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}

export default useUpdateSettings;
