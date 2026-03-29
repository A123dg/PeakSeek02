import { useMutation, useQueryClient } from "react-query";
import { hideReview, updateReviewStatus } from "./api";
import type { IReviewStatusPayload } from "./type";

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }: { id: string; data: IReviewStatusPayload }) => updateReviewStatus(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("reviewList");
    },
  });
};

export const useHideReview = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => hideReview(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("reviewList");
    },
  });
};
