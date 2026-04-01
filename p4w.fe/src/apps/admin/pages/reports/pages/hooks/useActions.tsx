import { useState } from "react";
import { message } from "antd";

import type { ReportFormData } from "../../ReportFormModal";
import { useUpdateReportStatus } from "../../services/mutation";
import type { ReportRow } from "./useData";

export const useReportActions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "approve" | "reject">("view");
  const [selectedReport, setSelectedReport] = useState<ReportRow | null>(null);
  const { mutateAsync: updateReportStatus, isLoading } = useUpdateReportStatus();

  const handleOpenViewModal = (record: ReportRow) => {
    setModalMode("view");
    setSelectedReport(record);
    setModalOpen(true);
  };

  const handleOpenApproveModal = (record: ReportRow) => {
    setModalMode("approve");
    setSelectedReport(record);
    setModalOpen(true);
  };

  const handleOpenRejectModal = (record: ReportRow) => {
    setModalMode("reject");
    setSelectedReport(record);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  const handleModalSubmit = async (_values: ReportFormData) => {
    try {
      if (!selectedReport || modalMode === "view") {
        handleModalCancel();
        return;
      }

      await updateReportStatus({
        id: selectedReport.id,
        data: {
          status: modalMode === "approve" ? 2 : modalMode === "reject" ? 3 : selectedReport.statusCode,
        },
      });

      message.success(
        modalMode === "approve"
          ? "Duyệt báo cáo thanh cong"
          : modalMode === "reject"
            ? "Từ chối báo cáo thành công"
            : "Cập nhật báo cáo thành công"
      );
      handleModalCancel();
    } catch {
      message.error("Co loi xay ra");
    }
  };

  return {
    modalOpen,
    modalMode,
    selectedReport,
    loading: isLoading,
    handleOpenViewModal,
    handleOpenApproveModal,
    handleOpenRejectModal,
    handleModalCancel,
    handleModalSubmit,
  };
};

