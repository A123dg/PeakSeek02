import { useMutation, useQueryClient } from "react-query";
import { createLocation, hideLocation, updateLocation } from "./api";
import type { ILocationPayload } from "./type";

export const useCreateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: ILocationPayload) => createLocation(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("locationList");
    },
  });
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }: { id: string; data: ILocationPayload }) => updateLocation(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("locationList");
    },
  });
};

export const useHideLocation = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => hideLocation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("locationList");
    },
  });
};
