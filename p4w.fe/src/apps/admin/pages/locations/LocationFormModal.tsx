import { useEffect } from "react";
import { Form, Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";

import ModalForm from "@shared/components/modal/ModalForm";

type LocationFormModalMode = "view";

export interface LocationFormData {
  id?: string;
  ownerId?: string | null;
  name?: string;
  type?: number;
  address?: string;
  addressLink?: string;
  openingHours?: string;
  closingHours?: string;
  description?: string;
  status?: number;
}

interface LocationFormModalProps {
  open: boolean;
  mode: LocationFormModalMode;
  data?: LocationFormData;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: LocationFormData) => void | Promise<void>;
}

export function LocationFormModal({
  open,
  mode,
  data,
  loading,
  onCancel,
  onSubmit,
}: LocationFormModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (data) {
        form.setFieldsValue({
          name: data.name,
          type: data.type,
          address: data.address,
          addressLink: data.addressLink,
          openingHours: data.openingHours ? dayjs(data.openingHours, "HH:mm") : null,
          closingHours: data.closingHours ? dayjs(data.closingHours, "HH:mm") : null,
          description: data.description,
          status: data.status,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, mode, data, form]);

  const handleSubmit = async (values: any) => {
    const formData: LocationFormData = {
      ...values,
      openingHours: values.openingHours?.format("HH:mm"),
      closingHours: values.closingHours?.format("HH:mm"),
      ...(data?.id ? { id: data.id } : {}),
      ...(data ? { ownerId: data.ownerId ?? null } : {}),
    };

    await onSubmit(formData);
  };

  const formItems = [
    {
      label: "Ten dia diem",
      name: "name",
      component: <Input placeholder="Nhap ten dia diem" disabled />,
    },
    {
      label: "Loai hinh",
      name: "type",
      component: (
        <Select
          placeholder="Chon loai hinh"
          disabled
          options={[
            { value: 1, label: "Thu vien" },
            { value: 2, label: "Quan ca phe" },
            { value: 3, label: "Nha sach" },
            { value: 4, label: "Coworking" },
            { value: 5, label: "Study cafe" },
            { value: 6, label: "Van phong" },
          ]}
        />
      ),
    },
    {
      label: "Dia chi",
      name: "address",
      span: 24,
      component: <Input placeholder="Nhap dia chi day du" disabled />,
    },
    {
      label: "Link dia chi",
      name: "addressLink",
      span: 24,
      component: <Input placeholder="Nhap link ban do neu co" disabled />,
    },
    {
      label: "Gio mo cua",
      name: "openingHours",
      component: <TimePicker format="HH:mm" placeholder="Chon gio mo cua" disabled />,
    },
    {
      label: "Gio dong cua",
      name: "closingHours",
      component: <TimePicker format="HH:mm" placeholder="Chon gio dong cua" disabled />,
    },
    {
      label: "Mo ta",
      name: "description",
      span: 24,
      component: <Input.TextArea rows={4} placeholder="Nhap mo ta chi tiet" disabled />,
    },
    {
      label: "Trang thai",
      name: "status",
      component: (
        <Select
          disabled
          options={[
            { value: 1, label: "Cho duyet" },
            { value: 2, label: "Da duyet" },
            { value: 3, label: "Tu choi" },
            { value: 4, label: "Dang hien thi" },
            { value: 0, label: "Da an" },
          ]}
        />
      ),
    },
  ];

  return (
    <ModalForm
      open={open}
      title="Chi tiet dia diem"
      loading={loading}
      onCancel={onCancel}
      onOk={onCancel}
      formItems={formItems}
      form={form}
      onFinish={handleSubmit}
      okText="Dong"
      cancelText={undefined}
      width={800}
    />
  );
}

export default LocationFormModal;
