import { useEffect, useMemo, useState } from "react";
import { Avatar, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import dayjs from "dayjs";

import { INVALID_CONFIRM_PASSWORD, INVALID_PASSWORD } from "@/constants/rules/message";
import { PASSWORD_PATTERN } from "@/constants/rules/pattern";
import useNotification from "@/shared/hooks/useNotification";
import { useUpdateProfile } from "@/shared/services/mutation";
import {
  AvatarShell,
  FieldLabel,
  FieldValue,
  FieldWrap,
  FormActions,
  FormSection,
  HeaderAction,
  HeaderHint,
  HeaderMain,
  HeaderRow,
  HeaderSubtitle,
  HeaderText,
  HeaderTitle,
  ModalContent,
  ModalHeader,
  ModalWrapper,
  PasswordMask,
  PasswordValue,
  SectionCard,
  SectionStack,
  SectionTitle,
  StyledForm,
  modalBodyStyles,
} from "./styled";

type AdminProfileModalUser = {
  id?: string;
  roleId?: string;
  googleUserId?: string;
  userName?: string;
  email?: string;
  dateOfBirth?: string;
  password?: string;
  status?: number;
  refreshTokenExpiryTime?: string;
  createdAt?: string;
  mediaLinkUrl?: string;
  username?: string;
  avatar?: string;
};

interface AdminProfileModalProps {
  open: boolean;
  onClose: () => void;
  user?: AdminProfileModalUser;
}

const renderValue = (value?: string | number | null) => {
  if (value === undefined || value === null || value === "") {
    return "Chua cap nhat";
  }

  return String(value);
};

const formatDate = (value?: string) => {
  if (!value) {
    return "Chua cap nhat";
  }

  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format("DD/MM/YYYY") : value;
};

const formatStatus = (value?: number) => {
  switch (value) {
    case 1:
      return { label: "Dang hoat dong" };
    case 0:
      return { label: "Khong hoat dong" };
    case 3:
      return { label: "Da khoa" };
    default:
      return { label: "Chua cap nhat" };
  }
};

const InfoField = ({ label, value }: { label: string; value?: string | number | null }) => (
  <FieldWrap>
    <FieldLabel>{label}</FieldLabel>
    <FieldValue>{renderValue(value)}</FieldValue>
  </FieldWrap>
);

const InfoFieldDate = ({ label, value }: { label: string; value?: string }) => (
  <FieldWrap>
    <FieldLabel>{label}</FieldLabel>
    <FieldValue>{formatDate(value)}</FieldValue>
  </FieldWrap>
);

const PasswordField = ({ label, value }: { label: string; value?: string }) => (
  <FieldWrap>
    <FieldLabel>{label}</FieldLabel>
    <PasswordValue>
      <PasswordMask>{value || "Chua cap nhat"}</PasswordMask>
    </PasswordValue>
  </FieldWrap>
);

export default function AdminProfileModal({ open, onClose, user }: AdminProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { mutateAsync: updateProfileMutation, isLoading } = useUpdateProfile();
  const { showErrorNotify, showSuccessNotify } = useNotification();
  const displayName = user?.userName || user?.username || "Admin";
  const avatarSrc = user?.avatar || user?.mediaLinkUrl;
  const avatarFallback = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const statusMeta = formatStatus(user?.status);
  const maskedPassword = useMemo(() => (user?.password ? "••••••••••••" : "Chua cap nhat"), [user?.password]);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        userName: user?.userName || user?.username,
        email: user?.email,
        dateOfBirth: user?.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        password: undefined,
        confirmPassword: undefined,
      });
      return;
    }

    setIsEditing(false);
    form.resetFields();
  }, [open, user, form]);

  const handleToggleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const values = await form.validateFields();

      await updateProfileMutation({
        userName: values.userName,
        email: values.email,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : undefined,
        password: values.password || undefined,
      });

      showSuccessNotify("Cap nhat thong tin thanh cong");
      setIsEditing(false);
      form.setFieldsValue({
        password: undefined,
        confirmPassword: undefined,
      });
    } catch (error: any) {
      if (error?.errorFields) {
        return;
      }

      showErrorNotify(error?.data?.message || error?.message || "Co loi xay ra");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.setFieldsValue({
      userName: user?.userName || user?.username,
      email: user?.email,
      dateOfBirth: user?.dateOfBirth ? dayjs(user.dateOfBirth) : null,
      password: undefined,
      confirmPassword: undefined,
    });
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={1100} centered styles={modalBodyStyles}>
      <ModalWrapper>
        <ModalHeader>
          <HeaderRow>
            <HeaderMain>
              <AvatarShell>
                <Avatar
                  size={110}
                  src={avatarSrc}
                  style={{
                    background: "#f4f1ff",
                    color: "var(--primary, #8c80cc)",
                    border: "4px solid rgba(255,255,255,0.92)",
                    boxShadow: "0 12px 26px rgba(15, 23, 42, 0.18)",
                  }}
                >
                  {!avatarSrc ? avatarFallback : null}
                </Avatar>
              </AvatarShell>

              <HeaderText>
                <HeaderTitle>{displayName}</HeaderTitle>
                <HeaderSubtitle>{renderValue(user?.email)}</HeaderSubtitle>
                <HeaderHint>ID: {renderValue(user?.id)}</HeaderHint>
              </HeaderText>
            </HeaderMain>

            <HeaderAction type="primary" onClick={handleToggleEdit} loading={isLoading}>
              {isEditing ? "Luu" : "Cap nhat"}
            </HeaderAction>
          </HeaderRow>
        </ModalHeader>

        <ModalContent>
          <SectionStack>
            <SectionCard>
              <SectionTitle>Thong tin ca nhan</SectionTitle>

              {isEditing ? (
                <StyledForm form={form} layout="vertical">
                  <Row gutter={[24, 0]}>
                    <Col xs={24} md={12}>
                      <FormSection>
                        <Form.Item
                          label="User name"
                          name="userName"
                          rules={[{ required: true, message: "Vui long nhap user name" }]}
                        >
                          <Input placeholder="Nhap user name" />
                        </Form.Item>

                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            { required: true, message: "Vui long nhap email" },
                            { type: "email", message: "Email khong hop le" },
                          ]}
                        >
                          <Input placeholder="Nhap email" />
                        </Form.Item>

                        <Form.Item label="Ngay sinh" name="dateOfBirth">
                          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                        </Form.Item>
                      </FormSection>
                    </Col>

                    <Col xs={24} md={12}>
                      <FormSection>
                        <Form.Item
                          label="Mat khau moi"
                          name="password"
                          rules={[
                            {
                              validator(_, value) {
                                if (!value || PASSWORD_PATTERN.test(value)) {
                                  return Promise.resolve();
                                }

                                return Promise.reject(new Error(INVALID_PASSWORD));
                              },
                            },
                          ]}
                        >
                          <Input.Password placeholder="De trong neu khong doi mat khau" />
                        </Form.Item>

                        <Form.Item
                          label="Xac nhan mat khau moi"
                          name="confirmPassword"
                          dependencies={["password"]}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                const password = getFieldValue("password");

                                if (!password && !value) {
                                  return Promise.resolve();
                                }

                                if (password === value) {
                                  return Promise.resolve();
                                }

                                return Promise.reject(new Error(INVALID_CONFIRM_PASSWORD));
                              },
                            }),
                          ]}
                        >
                          <Input.Password placeholder="Nhap lai mat khau moi" />
                        </Form.Item>

                        <InfoField label="Google user id" value={user?.googleUserId} />
                        <InfoField label="Role id" value={user?.roleId} />
                        <InfoField label="Trang thai" value={statusMeta.label} />
                      </FormSection>
                    </Col>
                  </Row>

                  <FormActions>
                    <HeaderAction onClick={handleCancelEdit}>Huy</HeaderAction>
                  </FormActions>
                </StyledForm>
              ) : (
                <Row gutter={[48, 8]}>
                  <Col xs={24} md={12}>
                    <InfoField label="User name" value={user?.userName || user?.username} />
                    <InfoField label="Email" value={user?.email} />
                    <InfoFieldDate label="Ngay sinh" value={user?.dateOfBirth} />
                  </Col>
                  <Col xs={24} md={12}>
                    <PasswordField label="Mat khau" value={maskedPassword} />
                    <InfoField label="Google user id" value={user?.googleUserId} />
                    <InfoField label="Role id" value={user?.roleId} />
                    <InfoField label="Trang thai" value={statusMeta.label} />
                  </Col>
                </Row>
              )}
            </SectionCard>
          </SectionStack>
        </ModalContent>
      </ModalWrapper>
    </Modal>
  );
}
