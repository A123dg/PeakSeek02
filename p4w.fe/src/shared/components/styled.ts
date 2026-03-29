import { Modal } from "antd";
import styled from "styled-components";

export const StyledModalDescription = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  }

  .ant-modal-header {
    background-color: #f9fafb;
    padding: 20px 24px;

    .ant-modal-title {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }
  }

  .ant-modal-close {
    top: 20px;
    right: 24px;
    color: var(--primary);

    .ant-modal-close-x {
      font-size: 22px;
      color: var(--primary);
      width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 50%;
      &:hover {
        color: var(--primary);
      }
    }
  }

  .ant-modal-body {
    padding: 24px;
    background: var(--white);
    max-height: 75vh;
    overflow-y: auto;

    /* FIX: Selector cho label trong Descriptions (Bắt buộc phải mạnh hơn) */
    .ant-descriptions-title, /* Tiêu đề chính (nếu có) */
    .ant-descriptions-item-label {
      font-weight: 700 !important; /* Dùng !important nếu cần ghi đè */
      color: #3b82f6 !important; /* MÀU XANH: Áp dụng màu xanh */
      background-color: #f7f9fc !important; /* Thêm màu nền nhạt để nổi bật label */

      // thành thêm
      white-space: nowrap !important; /* Không xuống dòng */
      overflow: hidden !important; /* Ẩn text vượt quá */
      text-overflow: ellipsis !important; /* Hiển thị dấu ... */
    }

    /* Selector này bắt label cho Descriptions có bordered */
    .ant-descriptions-bordered .ant-descriptions-item-label {
      font-weight: 700 !important;
      color: #3b82f6 !important;
      background-color: #f7f9fc !important;

      // thành thêm
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    /* Chỉnh màu cho Value trong Descriptions (giữ nguyên) */
    .ant-descriptions-item-content {
      color: #1f2937;
      /* Nếu value cũng không đổi màu, thêm !important vào đây: */
      /* color: #1f2937 !important; */
    }
  }
`;
export const MessageContent = styled.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.6;

  strong {
    color: #111827;
    font-weight: 600;
  }
`;