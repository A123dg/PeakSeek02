import { useEffect } from "react";
import { Form, Input, Select } from "antd";

import ModalForm from "@shared/components/modal/ModalForm";

type ReportFormModalMode = "view" | "approve" | "reject";
type ReportStatus = "pending" | "approved" | "rejected";

export interface ReportFormData {
  id?: string;
  reportedBy?: string;
  reportedItem?: string;
  reportedItemType?: string;
  reason?: string;
  description?: string;
  evidence?: string;
  createdAt?: string;
  status: ReportStatus;
}

interface ReportFormModalProps {
  open: boolean;
  mode: ReportFormModalMode;
  data?: ReportFormData;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: ReportFormData) => void | Promise<void>;
}

export function ReportFormModal({
  open,
  mode,
  data,
  loading,
  onCancel,
  onSubmit,
}: ReportFormModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (data) {
        form.setFieldsValue({
          reportedBy: data.reportedBy,
          reportedItem: data.reportedItem,
          reportedItemType: data.reportedItemType,
          reason: data.reason,
          description: data.description,
          evidence: data.evidence,
          createdAt: data.createdAt,
          status: data.status,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, data, form]);

  const handleSubmit = async (values: ReportFormData) => {
    const formData: ReportFormData = {
      ...values,
      ...(data?.id ? { id: data.id } : {}),
    };
    await onSubmit(formData);
  };

  const isViewMode = mode === "view";

  const getModalTitle = () => {
    switch (mode) {
      case "view":
        return "Chi tiet bao cao";
      case "approve":
        return "Duyet bao cao";
      case "reject":
        return "Tu choi bao cao";
      default:
        return "Bao cao";
    }
  };

  const getOkButtonText = () => {
    switch (mode) {
      case "view":
        return "Dong";
      case "approve":
        return "Duyet";
      case "reject":
        return "Tu choi";
      default:
        return "Luu";
    }
  };

  const formItems = [
    {
      label: "Nguoi bao cao",
      name: "reportedBy",
      component: <Input disabled />,
      span: 12,
    },
    {
      label: "Loai bao cao",
      name: "reportedItemType",
      component: <Input disabled />,
      span: 12,
    },
    {
      label: "Muc bao cao",
      name: "reportedItem",
      component: <Input disabled />,
      span: 12,
    },
    {
      label: "Ngay tao",
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
            { value: "pending", label: "Cho duyet" },
            { value: "approved", label: "Da duyet" },
            { value: "rejected", label: "Tu choi" },
          ]}
        />
      ),
      span: 12,
    },
    {
      label: "Ly do",
      name: "reason",
      component: <Input disabled />,
      span: 24,
    },
    {
      label: "Mo ta chi tiet",
      name: "description",
      span: 24,
      component: <Input.TextArea rows={4} disabled={isViewMode} />,
    },
    {
      label: "Bang chung",
      name: "evidence",
      span: 24,
      component: <Input.TextArea rows={3} disabled={isViewMode} />,
    },
  ];

  return (
    <ModalForm
      open={open}
      title={getModalTitle()}
      loading={loading}
      onCancel={onCancel}
      onOk={isViewMode ? onCancel : () => form.submit()}
      formItems={formItems}
      form={form}
      onFinish={handleSubmit}
      okText={getOkButtonText()}
      cancelText={isViewMode ? undefined : "Huy"}
      width={800}
    />
  );
}

export default ReportFormModal;
