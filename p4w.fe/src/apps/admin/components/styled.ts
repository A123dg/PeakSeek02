import { Button, Tag } from "antd";
import styled from "styled-components";
import { Form } from "antd";

export const modalBodyStyles = {
  body: {
    padding: 0,
    background: "#f8fafc",
    borderRadius: 20,
    overflow: "hidden",
  },
};

export const ModalWrapper = styled.div`
  background: #f8fafc;
`;

export const ModalHeader = styled.div`
  background: linear-gradient(135deg, var(--primary, #8c80cc) 0%, #b7aedf 100%);
  padding: 22px 28px 28px;
  position: relative;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeaderMain = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AvatarShell = styled.div`
  flex-shrink: 0;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HeaderTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const HeaderTitle = styled.h2`
  color: #ffffff;
  margin: 0;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 800;
`;

export const HeaderSubtitle = styled.div`
  color: #f8f7ff;
  font-size: 18px;
  font-weight: 600;
`;

export const HeaderHint = styled.div`
  color: rgba(255, 255, 255, 0.88);
  font-size: 14px;
`;

export const StatusTag = styled(Tag)<{ $bg: string; $color: string }>`
  margin: 0;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border: none;
  border-radius: 999px;
  padding: 4px 12px;
  font-weight: 700;
`;

export const HeaderAction = styled(Button)`
  background: rgba(255, 255, 255, 0.18) !important;
  border-color: rgba(255, 255, 255, 0.32) !important;
  box-shadow: none !important;
`;

export const ModalContent = styled.div`
  padding: 24px;
`;

export const SectionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SectionCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 22px 24px;
  border: 1px solid #edf0f4;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
`;

export const SectionTitle = styled.div`
  color: var(--primary, #8c80cc);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.4px;
  margin-bottom: 18px;
  text-transform: uppercase;
`;

export const FieldWrap = styled.div`
  margin-bottom: 18px;
`;

export const FieldLabel = styled.div`
  color: #111827;
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 6px;
  text-transform: uppercase;
`;

export const FieldValue = styled.div`
  color: #1f2937;
  font-size: 16px;
  line-height: 1.5;
`;

export const PasswordValue = styled.div`
  color: #1f2937;
  font-size: 16px;
  line-height: 1.5;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const PasswordMask = styled.span`
  letter-spacing: 2px;
`;

export const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    font-weight: 700;
    color: #111827;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;
