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
`;
