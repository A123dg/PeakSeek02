import { useState } from "react";
import { message } from "antd";

import { getCommentDetail } from "../../services/api";
import { useHideComment } from "../../services/mutation";
import type { CommentRow, CommentStatus } from "./useData";

export const useCommentActions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentRow | null>(null);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const { mutateAsync: hideComment, isLoading } = useHideComment();

  const handleOpenCommentModal = async (record: CommentRow) => {
    setSelectedComment(record);
    setModalOpen(true);
    setIsFetchingDetail(true);

    try {
      const response = await getCommentDetail(record.id);
      if (response?.data) {
        setSelectedComment({
          id: response.data.id,
          reviewId: response.data.reviewId,
          parentId: response.data.parentId,
          userId: response.data.userId,
          userName: response.data.userName,
          locationId: response.data.locationId,
          locationName: response.data.locationName,
          reviewContent: response.data.reviewContent,
          content: response.data.content,
          status:
            response.data.statusName === "active"
              ? "active"
              : ("inactive" as CommentStatus),
          statusCode: response.data.status,
          createdAt: response.data.createdAt,
        });
      }
    } catch {
      message.error("Không tải được chi tiết bình luận");
    } finally {
      setIsFetchingDetail(false);
    }
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedComment(null);
  };

  const handleHideComment = async (record: CommentRow) => {
    try {
      await hideComment(record.id);
      message.success("Ẩn bình luận thành công");
    } catch {
      message.error("Co loi xay ra");
    }
  };

  return {
    modalOpen,
    selectedComment,
    loading: isLoading || isFetchingDetail,
    handleOpenCommentModal,
    handleModalCancel,
    handleHideComment,
  };
};

