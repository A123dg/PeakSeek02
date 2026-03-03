import { useEffect } from 'react';
import { Form, Input, Select, TimePicker } from 'antd';
import ModalForm from '@shared/components/modal/ModalForm';
import dayjs from 'dayjs';

type LocationFormModalMode = 'add' | 'edit';

export interface LocationFormData {
  id?: number;
  name?: string;
  type?: string;
  address?: string;
  openingHours?: string;
  closingHours?: string;
  description?: string;
  tags?: string[];
  status?: 'active' | 'inactive' | 'draft';
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
      if (mode === 'edit' && data) {
        form.setFieldsValue({
          name: data.name,
          type: data.type,
          address: data.address,
          openingHours: data.openingHours ? dayjs(data.openingHours, 'HH:mm') : null,
          closingHours: data.closingHours ? dayjs(data.closingHours, 'HH:mm') : null,
          description: data.description,
          tags: data.tags || [],
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
      openingHours: values.openingHours?.format('HH:mm'),
      closingHours: values.closingHours?.format('HH:mm'),
      ...(mode === 'edit' && data?.id && { id: data.id }),
    };
    await onSubmit(formData);
  };

  const formItems = [
    {
      label: 'Tên địa điểm',
      name: 'name',
      component: <Input placeholder="Nhập tên địa điểm" />,
      rules: [{ required: true, message: 'Vui lòng nhập tên địa điểm' }],
    },
    {
      label: 'Loại hình',
      name: 'type',
      component: (
        <Select
          placeholder="Chọn loại hình"
          options={[
            { value: 'Café', label: 'Café' },
            { value: 'Homestay', label: 'Homestay' },
            { value: 'Coworking', label: 'Coworking' },
            { value: 'Khu du lịch', label: 'Khu du lịch' },
            { value: 'Thư viện', label: 'Thư viện' },
            { value: 'Văn phòng', label: 'Văn phòng' },
          ]}
        />
      ),
      rules: [{ required: true, message: 'Vui lòng chọn loại hình' }],
    },
    {
      label: 'Địa chỉ',
      name: 'address',
      span: 24,
      component: <Input placeholder="Nhập địa chỉ đầy đủ" />,
      rules: [{ required: true, message: 'Vui lòng nhập địa chỉ' }],
    },
    {
      label: 'Giờ mở cửa',
      name: 'openingHours',
      component: <TimePicker format="HH:mm" placeholder="Chọn giờ mở cửa" />,
      rules: [{ required: true, message: 'Vui lòng chọn giờ mở cửa' }],
    },
    {
      label: 'Giờ đóng cửa',
      name: 'closingHours',
      component: <TimePicker format="HH:mm" placeholder="Chọn giờ đóng cửa" />,
      rules: [{ required: true, message: 'Vui lòng chọn giờ đóng cửa' }],
    },
    {
      label: 'Mô tả',
      name: 'description',
      span: 24,
      component: <Input.TextArea rows={4} placeholder="Nhập mô tả chi tiết" />,
    },
    {
      label: 'Tags',
      name: 'tags',
      span: 24,
      component: (
        <Select
          mode="tags"
          placeholder="Thêm tags (nhập và Enter)"
          options={[
            { value: 'Yên tĩnh', label: 'Yên tĩnh' },
            { value: 'Wifi mạnh', label: 'Wifi mạnh' },
            { value: 'Giá rẻ', label: 'Giá rẻ' },
            { value: 'Đầy đủ tiện nghi', label: 'Đầy đủ tiện nghi' },
            { value: 'Phục vụ tốt', label: 'Phục vụ tốt' },
          ]}
        />
      ),
    },
    {
      label: 'Trạng thái',
      name: 'status',
      component: (
        <Select
          options={[
            { value: 'active', label: 'Đang hiển thị' },
            { value: 'inactive', label: 'Đã ẩn' },
            { value: 'draft', label: 'Nháp' },
          ]}
        />
      ),
      rules: [{ required: true, message: 'Vui lòng chọn trạng thái' }],
    },
  ];

  return (
    <ModalForm
      open={open}
      title={mode === 'add' ? 'Thêm địa điểm mới' : 'Chỉnh sửa địa điểm'}
      loading={loading}
      onCancel={onCancel}
      onOk={() => form.submit()}
      formItems={formItems}
      form={form}
      onFinish={handleSubmit}
      okText={mode === 'add' ? 'Thêm mới' : 'Lưu thay đổi'}
      cancelText="Hủy"
      width={800}
    />
  );
}

export default LocationFormModal;
