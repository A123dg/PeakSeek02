import { useMutation, useQueryClient } from "react-query";
import { updateReportStatus } from "./api";
import type { IReportStatusPayload } from "./type";

export const useUpdateReportStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }: { id: string; data: IReportStatusPayload }) => updateReportStatus(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries("reportList");
    },
  });
};
