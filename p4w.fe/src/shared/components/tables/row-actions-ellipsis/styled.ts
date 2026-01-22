import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const ChildrenWrapper = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
`;

export const RowButtonGroup = styled.div<{ active?: boolean }>`
  display: ${(props) => (props.active ? 'flex !important' : 'none')};
  gap: 1.2rem;
  align-items: center;
  margin: -0.8rem 0;
  position: absolute;
  /* bottom: 0; */
  right: 0;
`;

export const RowActionButton = styled.button`
  z-index: 1;
  border-radius: 999px;
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  &:hover {
    background-color: #edf8ff;
  }
`;
