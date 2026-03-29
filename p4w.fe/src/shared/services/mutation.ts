import { useMutation, useQueryClient } from 'react-query';

import { updateProfile } from './api';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('getUserInfo');
    },
  });
};
