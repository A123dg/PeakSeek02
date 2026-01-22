import { ChildrenWrapper, RowActionButton, RowButtonGroup, Wrapper } from './styled';
import { Tooltip } from 'antd';
import React from 'react';
import type { ReactNode } from 'react';

export interface IRowEllipsisAction {
  icon?: ReactNode;
  label?: ReactNode;
  tooltip?: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}

interface IRowActionsEllipsis {
  active?: boolean;
  actions: IRowEllipsisAction[];
  children?: ReactNode;
}

const RowActionsEllipsis = ({ active, actions, children }: IRowActionsEllipsis) => {
  return (
    <Wrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <RowButtonGroup className="row-actions" active={active}>
        {actions
          .filter((e) => !e.hidden)
          .map((action, index) => {
            if (action.label) {
              return (
                <button
                  key={index}
                  disabled={action.disabled}
                  onClick={(event) => {
                    event.stopPropagation();
                    action.onClick(event);
                  }}
                >
                  {action.label}
                </button>
              );
            }

            if (action.tooltip) {
              return (
                <Tooltip title={action.tooltip} key={index}>
                  <RowActionButton
                    disabled={action.disabled}
                    onClick={(event) => {
                      event.stopPropagation();
                      action.onClick(event);
                    }}
                  >
                    {action.icon}
                  </RowActionButton>
                </Tooltip>
              );
            }

            return (
              <RowActionButton
                key={index}
                onClick={(event) => {
                  event.stopPropagation();
                  action.onClick(event);
                }}
                disabled={action.disabled}
              >
                {action.icon}
              </RowActionButton>
            );
          })}
      </RowButtonGroup>
    </Wrapper>
  );
};

export default RowActionsEllipsis;
