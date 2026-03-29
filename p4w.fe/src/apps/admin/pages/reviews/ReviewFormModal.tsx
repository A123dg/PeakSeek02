import { useEffect } from "react";
import { Form, Input, Rate, Select } from "antd";

import ModalForm from "@shared/components/modal/ModalForm";

type ReviewFormModalMode = "view" | "edit" | "approve";

export interface ReviewFormData {
  id?: string;
  user?: string;
  location?: string;
  rating?: number;
  content?: string;
  createdAt?: string;
  status: "active" | "inactive";
}

interface ReviewFormModalProps {
  open: boolean;
  mode: ReviewFormModalMode;
  data?: ReviewFormData;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: ReviewFormData) => void | Promise<void>;
}

export function ReviewFormModal({
  open,
  mode,
  data,
  loading,
  onCancel,
  onSubmit,
}: ReviewFormModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (data) {
        form.setFieldsValue({
          user: data.user,
          location: data.location,
          rating: data.rating,
          content: data.content,
          createdAt: data.createdAt,
          status: data.status,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, data, form]);

  const handleSubmit = async (values: ReviewFormData) => {
    const formData: ReviewFormData = {
      ...values,
      ...(data?.id ? { id: data.id } : {}),
    };
    await onSubmit(formData);
  };

  const isViewMode = mode === "view";

  const formItems = [
    {
      label: "Nguoi dung",
      name: "user",
      component: <Input disabled />,
      span: 12,
    },
    {
      label: "Dia diem",
      name: "location",
      component: <Input disabled />,
      span: 12,
    },
    {
      label: "Sao danh gia",
      name: "rating",
      component: <Rate disabled={isViewMode} />,
      span: 12,
    },
    {
      label: "Thoi gian tao",
      name: "createdAt",
      component: <Input disabled />,
      span: 12,
    },
    {
      label: "Trang thai",
      name: "status",
      component: (
        <Select
          disabled={isViewMode}
          options={[
            { value: "active", label: "Dang hien thi" },
            { value: "inactive", label: "Da an" },
          ]}
        />
      ),
      span: 12,
    },
    {
      label: "Noi dung",
      name: "content",
      span: 24,
      component: <Input.TextArea rows={4} disabled={isViewMode} />,
    },
  ];

  return (
    <ModalForm
      open={open}
      title={
        mode === "view" ? "Chi tiet danh gia" : mode === "approve" ? "Duyet danh gia" : "Chinh sua danh gia"
      }
      loading={loading}
      onCancel={onCancel}
      onOk={isViewMode ? onCancel : () => form.submit()}
      formItems={formItems}
      form={form}
      onFinish={handleSubmit}
      okText={isViewMode ? "Dong" : "Luu thay doi"}
      cancelText={isViewMode ? undefined : "Huy"}
      width={700}
    />
  );
}

export default ReviewFormModal;
