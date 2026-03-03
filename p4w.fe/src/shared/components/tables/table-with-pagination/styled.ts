import styled from 'styled-components';

export const TableWrapper = styled.div<{
  $bodyHeight?: string | number;
  paginationBackground?: string;
}>`
  ${(props) =>
    props && props.$bodyHeight
      ? `.ant-table-body {
        height: ${props.$bodyHeight};
      }`
      : ''}

  ${(props) =>
    props.paginationBackground
      ? `.ant-pagination.ant-table-pagination {
          background-color: ${props.paginationBackground};
        }
      `
      : ''}

  .ant-table-thead > tr > th {
    background-color: #8c80cc;
    color: #ffffff;
    font-weight: 500;
  }

  .ant-table-thead > tr > th:first-child {
    border-top-left-radius: 10px;
  }

  .ant-table-thead > tr > th:last-child {
    border-top-right-radius: 10px;
  }
`;
