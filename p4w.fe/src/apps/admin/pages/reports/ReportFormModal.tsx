import { useEffect } from "react";
import { Form, Input, Select } from "antd";

import ModalForm from "@shared/components/modal/ModalForm";
import { formatDate } from "@/shared/utils/formatDate";

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
          createdAt: data.createdAt ? formatDate(data.createdAt) : undefined,
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
        return "Chi tiết báo cáo";
      case "approve":
        return "Duyệt báo cáo";
      case "reject":
        return "Từ chối báo cáo";
      default:
        return "Báo cáo";
    }
  };

  const getOkButtonText = () => {
    switch (mode) {
      case "view":
        return "Đóng";
      case "approve":
        return "Duyệt";
      case "reject":
        return "Từ chối";
      default:
        return "Lưu";
    }
  };

  const formItems = [
    {
      label: "Người báo cáo",
      name: "reportedBy",
      component: <Input disabled />,
      span: 12,
    },
    {
      label: "Loại báo cáo",
      name: "reportedItemType",
      component: <Input disabled />,
      span: 12,
    },
    {
      label: "Mục báo cáo",
      name: "reportedItem",
      component: <Input disabled />,
      span: 12,
    },
    {
      label: "Ngày tạo",
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
            { value: "pending", label: "Chờ duyệt" },
            { value: "approved", label: "Đã duyệt" },
            { value: "rejected", label: "Từ chối" },
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
      cancelText={isViewMode ? undefined : "Hủy"}
      width={800}
    />
  );
}

export default ReportFormModal;

