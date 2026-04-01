import { useRef, useState, type ChangeEvent } from "react";
import { Avatar, Button, Col, DatePicker, Form, Input, Modal, Row, Select, message } from "antd";
import { UploadOutlined, UserAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { uploadImage } from "@/shared/services/api";
import {
  AvatarShell,
  FieldLabel,
  FieldValue,
  FieldWrap,
  FormActions,
  HeaderHint,
  HeaderMain,
  HeaderRow,
  HeaderSubtitle,
  HeaderText,
  HeaderTitle,
  ModalContent,
  ModalHeader,
  ModalWrapper,
  SectionCard,
  SectionStack,
  SectionTitle,
  StyledForm,
  modalBodyStyles,
} from "@/apps/admin/components/styled";
import type { IUser } from "../../services/type";
import styled from "styled-components";

const ADMIN_ROLE_ID = "8acea62a-e03e-47b9-89e5-9e4320085d7d";

const HeaderUploadAction = styled.div`
  padding-right: 48px;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const ModalActions = styled(FormActions)`
  gap: 14px;
`;

interface CreateAdminModalProps {
  open: boolean;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: IUser) => Promise<void>;
}

export default function CreateAdminModal({
  open,
  loading,
  onCancel,
  onSubmit,
}: CreateAdminModalProps) {
  const [form] = Form.useForm();
  const avatarUrl = Form.useWatch("mediaLinkUrl", form);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  const handleFinish = async (values: Record<string, unknown>) => {
    try {
      await onSubmit({
        userName: String(values.userName ?? "").trim(),
        email: String(values.email ?? "").trim(),
        roleId: ADMIN_ROLE_ID,
        status: Number(values.status ?? 1),
        dateOfBirth: values.dateOfBirth
          ? dayjs(values.dateOfBirth as string).format("YYYY-MM-DD")
          : undefined,
        mediaLinkUrl: values.mediaLinkUrl ? String(values.mediaLinkUrl).trim() : undefined,
      });

      form.resetFields();
    } catch {
      return;
    }
  };

  const handlePickAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setIsUploading(true);
    try {
      const response = await uploadImage(file);
      form.setFieldValue("mediaLinkUrl", response.data);
      message.success("Tai avatar len thanh cong");
    } catch {
      message.error("Tai avatar len that bai");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal open={open} onCancel={handleClose} footer={null} width={980} centered styles={modalBodyStyles}>
      <ModalWrapper>
        <ModalHeader>
          <HeaderRow>
            <HeaderMain>
              <AvatarShell>
                <Avatar
                  size={110}
                  src={avatarUrl}
                  style={{
                    background: "#f4f1ff",
                    color: "var(--primary, #8c80cc)",
                    border: "4px solid rgba(255,255,255,0.92)",
                    boxShadow: "0 12px 26px rgba(15, 23, 42, 0.18)",
                  }}
                  icon={!avatarUrl ? <UserAddOutlined /> : undefined}
                />
              </AvatarShell>

              <HeaderText>
                <HeaderTitle>Tạo tài khoản admin</HeaderTitle>
                <HeaderSubtitle>Tai khoan moi duoc gan quyen quan tri ngay khi tao</HeaderSubtitle>
                <HeaderHint>Nhập thông tin cơ bản và tùy chọn thêm avatar để khởi tạo tài khoản.</HeaderHint>
              </HeaderText>
            </HeaderMain>

            <HeaderUploadAction>
              <Button
                icon={<UploadOutlined />}
                loading={isUploading}
                onClick={handlePickAvatar}
              >
                Tai avatar
              </Button>
            </HeaderUploadAction>
          </HeaderRow>
        </ModalHeader>

        <ModalContent>
          <SectionStack>
            <SectionCard>
              <SectionTitle>Thông tin tai khoan</SectionTitle>

              <StyledForm form={form} layout="vertical" initialValues={{ status: 1 }} onFinish={handleFinish}>
                <Row gutter={[24, 8]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Ten hien thi"
                      name="userName"
                      rules={[
                        { required: true, message: "Nhap ten hien thi" },
                        { max: 100, message: "Tên không quá 100 ký tự" },
                      ]}
                    >
                      <Input placeholder="Nhap ten admin" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Nhap email" },
                        { type: "email", message: "Email không hợp lệ" },
                      ]}
                    >
                      <Input placeholder="admin@example.com" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <FieldWrap>
                      <FieldLabel>Vai tro</FieldLabel>
                      <FieldValue>Admin</FieldValue>
                    </FieldWrap>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Trang thai" name="status">
                      <Select
                        options={[
                          { value: 1, label: "Hoạt động" },
                          { value: 0, label: "Không hoạt động" },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Ngày sinh" name="dateOfBirth">
                      <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Avatar URL" name="mediaLinkUrl">
                      <Input placeholder="https://..." />
                    </Form.Item>
                  </Col>
                </Row>

                <ModalActions>
                  <Button onClick={handleClose}>Đóng</Button>
                  <Button type="primary" htmlType="submit" loading={loading || isUploading}>
                    Tạo mới
                  </Button>
                </ModalActions>
              </StyledForm>
            </SectionCard>
          </SectionStack>
        </ModalContent>
      </ModalWrapper>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleAvatarChange}
      />
    </Modal>
  );
}

