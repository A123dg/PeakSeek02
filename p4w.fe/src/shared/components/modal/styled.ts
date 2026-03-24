import { Drawer, Form, Modal, Tabs } from "antd";
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  // min-height: 100vh;
  height: 100%;
  background-color: var(--bg-secondary);
  position: relative;
`;

export const ContentWrapper = styled.main<{ sidebarCollapsed: boolean }>`
  margin-left: ${({ sidebarCollapsed }) =>
    sidebarCollapsed ? "6rem" : "var(--sidebar-width)"};
  padding: 0;
  padding-top: var(--header-admin-height);
  height: 100%;
 
  transition: left 0.2s ease;
  overflow-y: auto;

  background: #ffffff;

`;

export const StyledModal = styled(Modal)`
  .ant-modal-mask {
    backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 0.65) !important;
    transition: all 0.3s ease;
  }

  .ant-modal-content {
    border-radius: 12px;
    background-color: var(--white);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .ant-modal-header {
    // background-color: #f9fafb;
    background-color: var(--primary);

    padding: 14px 24px;
    border-radius: 12px 12px 0 0;

    .ant-modal-title {
      font-size: 2rem;
      font-weight: 500;
      color: #fff;
      margin: 0;
    }
  }

  .ant-modal-body {
    padding: 24px;
    background: var(--white);
    max-height: 75vh;
    overflow-y: auto;
  }

  .ant-modal-footer {
    border-top: 0.5px solid var(--border-primary);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 14px 24px !important;
    background: var(--white);
    text-align: right;

    .ant-btn {
      min-width: 100px;
      height: 40px;
      border-radius: 4px;
      font-weight: 500;

      &:first-child {
        margin-right: 1px;
      }
    }

    .ant-btn-primary {
      background-color: var(--primary);
      border: none;

      &:hover {
        opacity: 0.95;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
    }
  }
`;

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
  }

  .ant-form-item-label {
    padding-bottom: 0;
    flex-shrink: 0;
    width: 180px;

    > label {
      font-weight: 500;
      color: #374151;
      height: auto;
      display: flex;
      text-align: left;
      word-wrap: break-word;
      word-break: break-word;
      white-space: normal;
      line-height: 1.5;
      margin-right: 16px;
    }
  }

  .ant-select.ant-select-in-form-item,
  .ant-input-number {
    max-width: 100%;
    width: 100%;
  }
  .ant-form-item-control {
    flex: 1;
  }

  .ant-input,
  .ant-select-selector,
  .ant-input-textarea textarea {
    border-radius: 4px;
    width: 100%;
  }

  .ant-input:focus,
  .ant-input-textarea textarea:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(140, 128, 204, 0.12);
  }

  .ant-select-focused .ant-select-selector,
  .ant-select-selector:focus {
    border-color: var(--primary) !important;
    box-shadow: 0 0 0 2px rgba(140, 128, 204, 0.12) !important;
  }
`;

export const StyledModalDescription = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .ant-modal-header {
    background-color: #f9fafb;
    padding: 20px 24px;
    border-radius: 12px 12px 0 0;

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

    /*  màu cho Value trong Descriptions */
    .ant-descriptions-item-content {
      color: #1f2937;
      
    }
  }
`;

export const DetailContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 8px;
`;

export const DetailItem = styled.div<{ span?: number }>`
  grid-column: span ${({ span }) => span || 1};
  background: var(--white);
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

export const DetailLabel = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: #000;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.div`
  font-size: 15px;
  color: #333;
  word-wrap: break-word;
  line-height: 1.6;

  /* Styling cho các trạng thái đặc biệt */
  .status-active {
    color: #52c41a;
    font-weight: 500;
  }

  .status-inactive {
    color: #ff4d4f;
    font-weight: 500;
  }

  .status-pending {
    color: #faad14;
    font-weight: 500;
  }
`;

export const StyledFilterDrawer = styled(Drawer)`
  .ant-drawer-header {
    background-color: #f9fafb;
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;

    .ant-drawer-title {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
    }

    .ant-drawer-close {
      color: #374151;
      &:hover {
        color: #111827;
      }
    }
  }

  .filter-body {
    height: calc(100vh - 180px);
    overflow-y: auto;
    padding: 24px;
    background: #fff;

    .ant-form-item {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .ant-form-item-label {
      padding-bottom: 6px;

      > label {
        font-size: 14px;
        font-weight: 500;
        color: #374151;
        height: auto;
      }
    }

    .ant-input,
    .ant-input-number,
    .ant-select-selector,
    .ant-picker,
    .ant-input-textarea textarea {
      border-radius: 8px;
      width: 100%;
      font-size: 14px;
      line-height: 1.5;
      height: 40px;
      transition: all 0.3s ease;
    }

    .ant-input:focus,
    .ant-input-number-focused,
    .ant-select-focused .ant-select-selector,
    .ant-picker:focus,
    .ant-input-textarea textarea:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    .ant-input:hover,
    .ant-input-number:hover,
    .ant-select:hover .ant-select-selector,
    .ant-picker:hover {
      border-color: #9ca3af;
    }

    .ant-input::placeholder,
    .ant-input-number::placeholder {
      color: #9ca3af;
      font-size: 14px;
    }

    .ant-input-affix-wrapper {
      height: 40px;
      .ant-input {
        height: auto;
      }
    }

    .ant-input-number-handler-wrap {
      display: none;
    }

    .ant-select-selector {
      height: 3.5rem !important;
      display: flex;
      align-items: center;
    }

    .ant-picker {
      width: 100%;
    }

    .ant-input-textarea textarea {
      height: auto;
      min-height: 80px;
      resize: vertical;
    }
  }

  .filter-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #e5e7eb;
    padding: 16px 24px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    background: #fff;

    .ant-btn {
      min-width: 100px;
      height: 40px;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .ant-btn-primary {
      background-color: #3b82f6;
      border: none;
      &:hover {
        background-color: #2563eb;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
    }

    .ant-btn-default {
      &:hover {
        border-color: #3b82f6;
        color: #3b82f6;
      }
    }

    .ant-btn-dangerous {
      transition: all 0.3s ease;
      &:hover {
        background: #ef4444 !important;
        color: #fff !important;
        border-color: #ef4444 !important;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }
      &:hover .anticon {
        color: #fff !important;
      }
    }
  }

  .ant-form-item-label
    > label.ant-form-item-required:not(
      .ant-form-item-required-mark-optional
    ):before {
    position: relative;
    right: 4px;
    bottom: 4px;
  }

  .ant-form-vertical
    .ant-form-item-label
    > label.ant-form-item-required:not(
      .ant-form-item-required-mark-optional
    ):before {
    right: -4px;
  }
`;

export const StyledConfirmModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .ant-modal-header {
    background-color: #f9fafb;
    padding: 16px 24px;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 12px 12px 0 0;

    .ant-modal-title {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }
  }

  .ant-modal-close {
    top: 14px;
    right: 14px;
    color: #fff;
    .ant-modal-close-x {
      font-size: 16px;
      color: #fff;
      transition: color 0.2s;

      &:hover {
        color: #374151;
      }
    }
  }

  .ant-modal-body {
    padding: 24px;
    background: #ffffff;
    font-size: 15px;
    color: #374151;
    line-height: 1.6;
  }

  .ant-modal-footer {
    border-top: 1px solid #e5e7eb;
    padding: 12px 16px !important;
    background: #fff;
    text-align: right;
    border-radius: 0 0 12px 12px;

    .ant-btn {
      min-width: 100px;
      height: 40px;
      border-radius: 6px;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.2s ease;

      &:first-child {
        margin-right: 2px;
      }
    }

    .ant-btn-default {
      border-color: #d1d5db;
      color: #374151;

      &:hover {
        border-color: #9ca3af;
        color: #111827;
      }
    }

    .ant-btn-primary {
      background-color: #7a1f36;
      border: none;

      &:hover {
        opacity: 0.8;
      transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
    }

    .ant-btn-dangerous {
      background-color: #ef4444;
      border: none;
      color: #fff;

      &:hover {
        background-color: #dc2626;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }
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

export const StyledTabs = styled(Tabs)`
  &.ant-tabs {
    .ant-tabs-nav {
      margin-bottom: 20px;
      padding: 0 12px;
    }

    .ant-tabs-nav-wrap {
      border: none;
    }
    .ant-tabs-tab {
      font-size: 15px !important;
      padding: 10px 16px !important;
      margin: 0 !important;
      color: #555 !important;
    }

    .ant-tabs-tab-btn {
      font-size: 15px !important;
    }

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      font-weight: 600 !important;
      color: #1890ff !important;
    }

    .ant-tabs-ink-bar {
      height: 3px !important;
      background: #1890ff !important;
      border-radius: 999px;
    }
  }
`;

export const StyledFilterContent = styled.div`
  width: 678px;
  display: flex;
  flex-direction: column;
  max-height: 450px;
  font-family: Roboto, sans-serif;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  background: #fff;
  border-radius: 6px;

  /* --- BODY --- */
  .filter-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px;

    /* Grid 2 cột */
    .ant-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 8px;
      row-gap: 8px;
    }

    .ant-form-item {
      min-width: 0;
      margin-bottom: 0;
    }

    .ant-form-item-label {
      padding-bottom: 4px;
      > label {
        font-size: 14px;
        font-weight: 500;
        color: #374151;
      }
    }

    /* === KHU VỰC SỬA LỖI CĂN GIỮA === */

    /* 1. INPUT: Dùng công thức Line-height = Height - 2px */
    .ant-input {
      height: 36px !important;
      padding: 0 11px !important;
      font-size: 14px !important;

      display: flex;
      align-items: center;

      border-radius: 6px;
      box-sizing: border-box;
    }
    .ant-input-affix-wrapper {
      height: 36px !important;
      border-radius: 6px;
      padding: 0 11px !important;

      display: flex;
      align-items: center;
    }

    .ant-input-affix-wrapper > input.ant-input {
      height: 100%;
      padding: 0;
    }

    /* 2. INPUT NUMBER: Đồng bộ với Input thường */
    .ant-input-number {
      width: 100%;
      height: 36px !important;
      border-radius: 6px;

      .ant-input-number-input {
        height: 34px !important; /* Content height */
        font-size: 14px !important;
        padding: 0 11px !important;
        line-height: 30px !important; /* Đồng bộ line-height */
      }
    }

    /* 3. SELECT: Sử dụng Flexbox (Phương pháp tối ưu nhất cho div) */
    .ant-select {
      width: 100%;
      .ant-select-selector {
        height: 36px !important;
        border-radius: 6px !important;
        font-size: 14px !important;
        padding: 0 11px !important;

        /* Flexbox để căn giữa theo trục dọc */
        display: flex !important;
        align-items: center !important;

        .ant-select-selection-search {
          display: flex;
          align-items: center;
          inset-block-start: 0 !important; /* Reset vị trí search của antd */

          .ant-select-selection-search-input {
            height: 34px !important; /* Đồng bộ height */
            line-height: 34px !important;
          }
        }

        .ant-select-selection-item,
        .ant-select-selection-placeholder {
          position: static !important; /* Reset position absolute của antd */
          padding: 0 !important;
          margin: 0 !important;
          line-height: 34px !important; /* Đồng bộ line-height */
          display: flex;
          align-items: center;
        }
      }
    }

    /* 4. PICKER (Datepicker): Căn chỉnh lại input bên trong */
    .ant-picker {
      height: 36px !important;
      border-radius: 6px;
      padding: 0 11px !important;
      display: flex;
      align-items: center; /* Flexbox cho container */

      .ant-picker-input {
        height: 100%; /* Full height */

        > input {
          font-size: 14px;
          line-height: 34px !important; /* Chuẩn 34px */
        }
      }
    }
  }

  /* --- FOOTER --- */
  .filter-footer {
    border-top: 1px solid #e5e7eb;
    padding: 10px 16px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    background: #fff;
    border-radius: 0 0 8px 8px;

    .ant-btn {
      border-radius: 6px;
      height: 36px; /* Đồng bộ chiều cao nút với input luôn cho đẹp */
      font-size: 14px;
      font-weight: 500;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-close-danger {
      color: #ef4444;
      border-color: #ef4444;
      &:hover {
        background-color: #ef4444;
        color: #fff;
        border-color: #ef4444;
      }
    }
  }
`;
