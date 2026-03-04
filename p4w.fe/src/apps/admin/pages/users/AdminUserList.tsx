import { useMemo, useState } from 'react';
import { Avatar, Button, Input, Select, Space, Tag, Tooltip, message } from 'antd';
import {
  LockOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons';
import TableWithPagination from '@shared/components/tables/table-with-pagination';
import { default as UserFormModal, type UserFormData } from './UserFormModal';

type UserStatus = 'active' | 'suspended' | 'pending';

interface AdminUserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
}

const statusMeta: Record<
  UserStatus,
  { label: string; color: string; bg: string }
> = {
  active: { label: 'Hoạt động', color: '#16a34a', bg: '#ecfdf3' },
  suspended: { label: 'Khoá', color: '#dc2626', bg: '#fef2f2' },
  pending: { label: 'Chưa kích hoạt', color: '#f59e0b', bg: '#fffbeb' },
};

const mockData: AdminUserRow[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: '10/02/2026',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    role: 'Người dùng',
    status: 'pending',
    createdAt: '18/02/2026',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    role: 'Người dùng',
    status: 'suspended',
    createdAt: '20/02/2026',
  },
];

const roleMap: Record<string, 'user' | 'admin' | 'moderator'> = {
  Admin: 'admin',
  'Người dùng': 'user',
};

const statusMap: Record<UserStatus, 'active' | 'inactive' | 'banned'> = {
  active: 'active',
  suspended: 'inactive',
  pending: 'inactive',
};

const convertToUserFormData = (user: AdminUserRow): UserFormData => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: roleMap[user.role] || 'user',
  status: statusMap[user.status],
});

export default function AdminUserList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState<AdminUserRow | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (record: AdminUserRow) => {
    setModalMode('edit');
    setSelectedUser(record);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSubmit = async (values: UserFormData) => {
    try {
      setLoading(true);
      // TODO: Call API to add/edit user
      // await api.users.create/update(values)
      message.success(
        modalMode === 'add'
          ? 'Thêm người dùng thành công'
          : 'Cập nhật người dùng thành công'
      );
      handleModalCancel();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleLockUser = (record: AdminUserRow) => {
    // TODO: Call API to lock user
    message.success('Khoá tài khoản thành công');
  };
  const columns = useMemo(
    () => [
      {
        title: 'Người dùng',
        dataIndex: 'name',
        key: 'name',
        render: (name: string) => (
          <Space>
            <Avatar
              size={28}
              style={{ backgroundColor: '#a855f7', fontSize: 13 }}
            >
              {name
                .split(' ')
                .map((x) => x[0])
                .join('')
                .toUpperCase()}
            </Avatar>
            <span>{name}</span>
          </Space>
        ),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
        width: 140,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 160,
        render: (status: UserStatus) => {
          const meta = statusMeta[status];
          return (
            <Tag
              color={meta.bg}
              style={{
                color: meta.color,
                borderRadius: 999,
                border: 'none',
                paddingInline: 12,
              }}
            >
              {meta.label}
            </Tag>
          );
        },
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 140,
      },
      {
        title: 'Thao tác',
        key: 'action',
        width: 180,
        render: (_: any, record: AdminUserRow) => (
          <Space size={4}>
            <Tooltip title="Chỉnh sửa" color="var(--primary)">
              <Button
                size="small"
                type="text"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => handleOpenEditModal(record)}
              />
            </Tooltip>
            <Tooltip title="Khoá tài khoản" color="var(--primary)">
              <Button
                size="small"
                type="text"
                danger
                shape="circle"
                icon={<LockOutlined />}
                onClick={() => handleLockUser(record)}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ fontSize: 14 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
          gap: 12,
          padding: '12px 16px',
          backgroundColor: '#f5f3ff',
          borderRadius: 12,
        }}
      >
        <Space size={12}>
          <Input.Search
            placeholder="Tìm theo tên / email..."
            allowClear
            style={{ width: 260 }}
          />
          <Select
            placeholder="Vai trò"
            allowClear
            style={{ width: 180 }}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'Người dùng' },
            ]}
          />
          <Select
            placeholder="Trạng thái"
            allowClear
            style={{ width: 160 }}
            options={[
              { value: 'active', label: 'Hoạt động' },
              { value: 'pending', label: 'Chưa kích hoạt' },
              { value: 'suspended', label: 'Khoá' },
            ]}
          />
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#8c80cc', borderColor: '#8c80cc' }}
          onClick={handleOpenAddModal}
        >
          Thêm người dùng
        </Button>
      </div>

      <TableWithPagination
        columns={columns }
        dataSource={mockData}
        rowKey="id"
        bodyHeight="calc(100vh - 260px)"
      />

      <UserFormModal
        open={modalOpen}
        mode={modalMode}
        data={selectedUser ? convertToUserFormData(selectedUser) : undefined}
        loading={loading}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

