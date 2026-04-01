import { useMutation, useQueryClient } from "react-query";
import { hideComment } from "./api";

export const useHideComment = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => hideComment(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("commentList");
    },
  });
};
