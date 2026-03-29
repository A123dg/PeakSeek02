import { useState } from "react";
import { message } from "antd";

import type { ReviewFormData } from "../../ReviewFormModal";
import { useHideReview, useUpdateReviewStatus } from "../../services/mutation";
import type { ReviewRow } from "./useData";

export const useReviewActions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewRow | null>(null);
  const { mutateAsync: updateReviewStatus, isLoading: isUpdating } = useUpdateReviewStatus();
  const { mutateAsync: hideReview, isLoading: isHiding } = useHideReview();

  const handleOpenReviewModal = (record: ReviewRow) => {
    setSelectedReview(record);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedReview(null);
  };

  const handleModalSubmit = async (values: ReviewFormData) => {
    try {
      if (!selectedReview || values.status === selectedReview.status) {
        handleModalCancel();
        return;
      }

      await updateReviewStatus({
        id: selectedReview.id,
        data: {
          status: values.status === "active" ? 1 : 0,
        },
      });

      message.success("Cap nhat danh gia thanh cong");
      handleModalCancel();
    } catch {
      message.error("Co loi xay ra");
    }
  };

  const handleHideReview = async (record: ReviewRow) => {
    try {
      await hideReview(record.id);
      message.success("An danh gia thanh cong");
    } catch {
      message.error("Co loi xay ra");
    }
  };

  return {
    modalOpen,
    selectedReview,
    loading: isUpdating || isHiding,
    handleOpenReviewModal,
    handleModalCancel,
    handleModalSubmit,
    handleHideReview,
  };
};
