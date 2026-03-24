import { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import ModalForm from '@shared/components/modal/ModalForm';
// import dayjs from 'dayjs';

type UserFormModalMode = 'add' | 'edit';

export interface UserFormData {
  id?: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: 'user' | 'admin' | 'moderator';
  status?: 'active' | 'inactive' | 'banned';
}

interface UserFormModalProps {
  open: boolean;
  mode: UserFormModalMode;
  data?: UserFormData;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: UserFormData) => void | Promise<void>;
}

export function UserFormModal({
  open,
  mode,
  data,
  loading,
  onCancel,
  onSubmit,
}: UserFormModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && data) {
        form.setFieldsValue({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          role: data.role,
          status: data.status,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, mode, data, form]);

  const handleSubmit = async (values: any) => {
    const formData: UserFormData = {
      ...values,
      ...(mode === 'edit' && data?.id && { id: data.id }),
    };
    await onSubmit(formData);
  };

  const formItems = [
    {
      label: 'Tên người dùng',
      name: 'name',
      component: <Input placeholder="Nhập tên người dùng" />,
      rules: [{ required: true, message: 'Vui lòng nhập tên' }],
      span: 24,
    },
    {
      label: 'Email',
      name: 'email',
      component: <Input type="email" placeholder="Nhập email" />,
      rules: [
        { required: true, message: 'Vui lòng nhập email' },
        { type: 'email', message: 'Email không hợp lệ' },
      ],
      span: 24,
    },
    {
      label: 'Số điện thoại',
      name: 'phoneNumber',
      component: <Input placeholder="Nhập số điện thoại" />,
      span: 24,
    },
    {
      label: 'Vai trò',
      name: 'role',
      component: (
        <Select
          placeholder="Chọn vai trò"
          options={[
            { value: 'user', label: 'Người dùng' },
            { value: 'admin', label: 'Quản trị viên' },
            { value: 'moderator', label: 'Kiểm duyệt viên' },
          ]}
        />
      ),
      rules: [{ required: true, message: 'Vui lòng chọn vai trò' }],
      span: 24,
    },
    {
      label: 'Trạng thái',
      name: 'status',
      component: (
        <Select
          options={[
            { value: 'active', label: 'Hoạt động' },
            { value: 'inactive', label: 'Không hoạt động' },
            { value: 'banned', label: 'Bị cấm' },
          ]}
        />
      ),
      rules: [{ required: true, message: 'Vui lòng chọn trạng thái' }],
      span: 24,
    },
  ];

  return (
    <ModalForm
      open={open}
      title={mode === 'add' ? 'Thêm người dùng mới' : 'Chỉnh sửa người dùng'}
      loading={loading}
      onCancel={onCancel}
      onOk={() => form.submit()}
      formItems={formItems}
      form={form}
      onFinish={handleSubmit}
      okText={mode === 'add' ? 'Thêm mới' : 'Lưu thay đổi'}
      cancelText="Hủy"
      width={700}
    />
  );
}

export default UserFormModal;
