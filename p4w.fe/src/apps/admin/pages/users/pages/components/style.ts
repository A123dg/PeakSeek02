import styled from "styled-components";

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
  padding: 12px 16px;
  background-color: #f5f3ff;
  border-radius: 12px;
`;

export const WrapFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  /* Đồng nhất chiều cao tất cả các ô input/select về 36px */
  .ant-input-affix-wrapper,
  .ant-input-search .ant-input-affix-wrapper,
  .ant-select-selector {
    height: 36px !important;
    display: flex !important;
    align-items: center !important;
  }

  .ant-input-search-button {
    height: 36px !important;
  }

  .ant-select-single {
    height: 36px !important;
  }

  .ant-select-selection-search-input {
    height: 34px !important;
  }
`;