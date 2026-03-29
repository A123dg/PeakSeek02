
import React from "react";
import { MessageContent, StyledConfirmModal } from "./modal/styled";

interface ConfirmDialogProps {
  open: boolean;
  loading?: boolean;
  title?: string;
  message: React.ReactNode;
  okText?: string;
  cancelText?: string;
  danger?: boolean;
  onOk: () => void;
  onCancel: () => void;
  zIndex?: number;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  loading = false,
  title = "Xác nhận thao tác",
  message,
  okText = "Đồng ý",
  cancelText = "Hủy",
  danger = true,
  onOk,
  onCancel,
  zIndex = 2000,
}) => {
  return (
    <StyledConfirmModal
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      okType={danger ? "danger" : "primary"}
      centered
      width={380}
      maskClosable={false}
      confirmLoading={loading}
      // (VI) Đặt container = document.body và zIndex cao để dialog nổi lên trên modal cha
      getContainer={() => document.body}
      zIndex={zIndex}
    >
      <MessageContent>{message}</MessageContent>
    </StyledConfirmModal>
  );
};

export default ConfirmDialog;
