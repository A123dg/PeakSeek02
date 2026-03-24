import { EditOutlined, LockOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, Tag, Tooltip } from "antd";
import type { AdminUserRow, UserStatus } from "../../services/type";

type TColumn = {
  handleOpenEditModal: (record: AdminUserRow) => void;
  handleLockUser: (record: AdminUserRow) => void;
};

const statusMeta: Record<UserStatus, { label: string; color: string; bg: string }> = {
  active:    { label: "Hoạt động",       color: "#16a34a", bg: "#ecfdf3" },
  suspended: { label: "Khoá",            color: "#dc2626", bg: "#fef2f2" },
  pending:   { label: "Không hoạt động", color: "#f59e0b", bg: "#fffbeb" },
};

export const useColumns = ({ handleOpenEditModal, handleLockUser }: TColumn) =>
    { 
        const columns =[
  {
    title: "Người dùng",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <Space>
        <Avatar size={28} style={{ backgroundColor: "#a855f7", fontSize: 13 }}>
          {name.split(" ").map((part) => part[0]).join("").toUpperCase()}
        </Avatar>
        <span>{name}</span>
      </Space>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
    width: 140,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 160,
    render: (status: UserStatus) => {
      const meta = statusMeta[status];
      return (
        <Tag
          color={meta.bg}
          style={{ color: meta.color, borderRadius: 999, border: "none", paddingInline: 12 }}
        >
          {meta.label}
        </Tag>
      );
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 140,
  },
  {
    title: "Thao tác",
    key: "action",
    width: 180,
    render: (_: unknown, record: AdminUserRow) => (
      <Space size={4}>
        <Tooltip title="Chỉnh sửa" color="var(--primary)">
          <Button
            size="small" type="text" shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleOpenEditModal(record)}
          />
        </Tooltip>
        <Tooltip title="Khoá tài khoản" color="var(--primary)">
          <Button
            size="small" type="text" danger shape="circle"
            icon={<LockOutlined />}
            onClick={() => handleLockUser(record)}
          />
        </Tooltip>
      </Space>
    ),
  },
];
return { columns };
    }