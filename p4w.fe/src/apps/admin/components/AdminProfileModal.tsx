import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import dayjs from "dayjs";

import { INVALID_CONFIRM_PASSWORD, INVALID_PASSWORD } from "@/constants/rules/message";
import { PASSWORD_PATTERN } from "@/constants/rules/pattern";
import useNotification from "@/shared/hooks/useNotification";
import { useUpdateProfile } from "@/shared/services/mutation";
import { uploadImage } from "@/shared/services/api";
import { formatDate } from "@/shared/utils/formatDate";
import { resolveServerMessage } from "@/shared/utils/serverMessage";
import {
  AvatarButton,
  AvatarShell,
  FieldLabel,
  FieldValue,
  FieldWrap,
  FormActions,
  FormSection,
  HeaderAction,
  HeaderActions,
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
    return "Chưa cập nhật";
  }

  return String(value);
};

const formatStatus = (value?: number) => {
  switch (value) {
    case 1:
      return { label: "Đang hoạt động" };
    case 0:
      return { label: "Không hoạt động" };
    case 3:
      return { label: "Da khoa" };
    default:
      return { label: "Chưa cập nhật" };
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
    <FieldValue>{value ? formatDate(value) : "Chưa cập nhật"}</FieldValue>
  </FieldWrap>
);

const PasswordField = ({ label, value }: { label: string; value?: string }) => (
  <FieldWrap>
    <FieldLabel>{label}</FieldLabel>
    <PasswordValue>
      <PasswordMask>{value || "Chưa cập nhật"}</PasswordMask>
    </PasswordValue>
  </FieldWrap>
);

export default function AdminProfileModal({ open, onClose, user }: AdminProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [form] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
  const maskedPassword = useMemo(() => (user?.password ? "••••••••••••" : "Chua c?p nh?t"), [user?.password]);

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

  const buildProfilePayload = (overrides?: { mediaLinkUrl?: string; password?: string }) => {
    const currentValues = form.getFieldsValue();

    return {
      userName: (currentValues.userName || user?.userName || user?.username || "").trim(),
      email: (currentValues.email || user?.email || "").trim(),
      dateOfBirth: currentValues.dateOfBirth
        ? currentValues.dateOfBirth.format("YYYY-MM-DD")
        : user?.dateOfBirth || undefined,
      password: overrides?.password,
      mediaLinkUrl: overrides?.mediaLinkUrl,
    };
  };

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

      showSuccessNotify("Cập nhật thông tin thành công");
      setIsEditing(false);
      form.setFieldsValue({
        password: undefined,
        confirmPassword: undefined,
      });
    } catch (error: any) {
      if (error?.errorFields) {
        return;
      }

      showErrorNotify(resolveServerMessage(error?.data?.message || error?.message) || "Co loi xay ra");
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      setIsUploadingAvatar(true);
      const uploadResponse = await uploadImage(file);

      await updateProfileMutation(
        buildProfilePayload({
          mediaLinkUrl: uploadResponse.data,
        })
      );

      showSuccessNotify("Cập nhật avatar thanh cong");
    } catch (error: any) {
      showErrorNotify(resolveServerMessage(error?.data?.message || error?.message) || "Co loi xay ra");
    } finally {
      setIsUploadingAvatar(false);
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
                <AvatarButton type="button" onClick={handleAvatarClick} title="Cập nhật avatar">
                  <Avatar
                    size={110}
                    src={avatarSrc}
                    style={{
                      background: "#f4f1ff",
                      color: "var(--primary, #8c80cc)",
                      boxShadow: "none",
                    }}
                  >
                    {!avatarSrc ? avatarFallback : null}
                  </Avatar>
                </AvatarButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
              </AvatarShell>

              <HeaderText>
                <HeaderTitle>{displayName}</HeaderTitle>
                <HeaderSubtitle>{renderValue(user?.email)}</HeaderSubtitle>
                <HeaderHint>ID: {renderValue(user?.id)} | Click vao anh de doi avatar</HeaderHint>
              </HeaderText>
            </HeaderMain>

            <HeaderActions>
              <HeaderAction type="primary" onClick={handleToggleEdit} loading={isLoading || isUploadingAvatar}>
                {isEditing ? "Lưu" : "Cập nhật"}
              </HeaderAction>
            </HeaderActions>
          </HeaderRow>
        </ModalHeader>

        <ModalContent>
          <SectionStack>
            <SectionCard>
              <SectionTitle>Thông tin cá nhân</SectionTitle>

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
                            { type: "email", message: "Email không hợp lệ" },
                          ]}
                        >
                          <Input placeholder="Nhap email" />
                        </Form.Item>

                        <Form.Item label="Ngày sinh" name="dateOfBirth">
                          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                        </Form.Item>
                      </FormSection>
                    </Col>

                    <Col xs={24} md={12}>
                      <FormSection>
                        <Form.Item
                          label="Mật khẩu mới"
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
                          <Input.Password placeholder="Để trống nếu không đổi mật khẩu" />
                        </Form.Item>

                        <Form.Item
                          label="Xác nhận mật khẩu mới"
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
                          <Input.Password placeholder="Nhập lại mật khẩu mới" />
                        </Form.Item>
                        <InfoField label="Trang thai" value={statusMeta.label} />
                      </FormSection>
                    </Col>
                  </Row>

                  <FormActions>
                    <HeaderAction onClick={handleCancelEdit}>Hủy</HeaderAction>
                  </FormActions>
                </StyledForm>
              ) : (
                <Row gutter={[48, 8]}>
                  <Col xs={24} md={12}>
                    <InfoField label="User name" value={user?.userName || user?.username} />
                    <InfoField label="Email" value={user?.email} />
                    <InfoFieldDate label="Ngày sinh" value={user?.dateOfBirth} />
                  </Col>
                  <Col xs={24} md={12}>
                    <PasswordField label="Mật khẩu" value={maskedPassword} />
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

