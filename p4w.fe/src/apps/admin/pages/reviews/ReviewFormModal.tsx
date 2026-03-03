import { useEffect } from 'react';
import { Form, Input, Select, Rate } from 'antd';
import ModalForm from '@shared/components/modal/ModalForm';

type ReviewFormModalMode = 'view' | 'edit' | 'approve';

export interface ReviewFormData {
  id?: number;
  user?: string;
  location?: string;
  rating?: number;
  content?: string;
  status: 'pending' | 'approved' | 'rejected';
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
          status: data.status,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, data, form]);

  const handleSubmit = async (values: any) => {
    const formData: ReviewFormData = {
      ...values,
      ...(data?.id && { id: data.id }),
    };
    await onSubmit(formData);
  };

  const isViewMode = mode === 'view';

  const formItems = [
    {
      label: 'Người dùng',
      name: 'user',
      component: <Input disabled />,
      span: 12,
    },
    {
      label: 'Địa điểm',
      name: 'location',
      component: <Input disabled />,
      span: 12,
    },
    {
      label: 'Sao đánh giá',
      name: 'rating',
      component: <Rate disabled={isViewMode} />,
      span: 12,
    },
    {
      label: 'Trạng thái',
      name: 'status',
      component: (
        <Select
          disabled={isViewMode}
          options={[
            { value: 'pending', label: 'Chờ duyệt' },
            { value: 'approved', label: 'Đã duyệt' },
            { value: 'rejected', label: 'Từ chối' },
          ]}
        />
      ),
      span: 12,
    },
    {
      label: 'Nội dung',
      name: 'content',
      span: 24,
      component: <Input.TextArea rows={4} disabled={isViewMode} />,
    },
  ];

  return (
    <ModalForm
      open={open}
      title={
        mode === 'view'
          ? 'Chi tiết đánh giá'
          : mode === 'approve'
            ? 'Duyệt đánh giá'
            : 'Chỉnh sửa đánh giá'
      }
      loading={loading}
      onCancel={onCancel}
      onOk={() => form.submit()}
      formItems={formItems}
      form={form}
      onFinish={handleSubmit}
      okText={isViewMode ? 'Đóng' : 'Lưu thay đổi'}
      cancelText={isViewMode ? undefined : 'Hủy'}
      width={700}
    />
  );
}

export default ReviewFormModal;
