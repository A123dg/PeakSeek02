import { useMutation, useQueryClient } from "react-query";
import { createUser, lockUser, unlockUser, updateUser } from "./api";
import type { IUser } from "./type";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("userList");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }: { id: string; data: IUser }) => updateUser(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("userList");
    },
  });
};

export const useLockUser = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => lockUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("userList");
    },
  });
};

export const useUnlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => unlockUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("userList");
    },
  });
};
