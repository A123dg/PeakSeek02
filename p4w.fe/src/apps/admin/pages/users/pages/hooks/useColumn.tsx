import { EyeOutlined, LockOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, Tag, Tooltip } from "antd";
import type { IUserResponse, UserStatus } from "../../services/type";

type TColumn = {
  handleOpenViewModal: (record: IUserResponse) => void;
  handleLockUser: (record: IUserResponse) => void;
  pageIndex: number;
  pageSize: number;
};

const statusMeta: Record<UserStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Hoat dong", color: "#16a34a", bg: "#ecfdf3" },
  locked: { label: "Khoa", color: "#dc2626", bg: "#fef2f2" },
  inactive: { label: "Khong hoat dong", color: "#f59e0b", bg: "#fffbeb" },
};

export const useColumns = ({ handleOpenViewModal, handleLockUser, pageIndex, pageSize }: TColumn) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => (pageIndex - 1) * pageSize + index + 1,
    },
    {
      title: "Nguoi dung",
      dataIndex: "userName",
      key: "userName",
      width: 240,
      render: (name: string) => (
        <Space>
          <Avatar size={28} style={{ backgroundColor: "#a855f7", fontSize: 13 }}>
            {name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </Avatar>
          <span>{name}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Vai tro",
      dataIndex: "roleName",
      key: "roleName",
      width: 140,
    },
    {
      title: "Trang thai",
      dataIndex: "statusName",
      key: "statusName",
      width: 160,
      render: (status: UserStatus) => {
        const meta = statusMeta[status] ?? statusMeta.inactive;
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
      title: "Thao tac",
      key: "action",
      width: 140,
      render: (_: unknown, record: IUserResponse) => (
        <Space size={4}>
          <Tooltip title="Xem chi tiet" color="var(--primary)">
            <Button
              size="small"
              type="text"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => handleOpenViewModal(record)}
            />
          </Tooltip>
          <Tooltip title={record.statusName === "locked" ? "Mo khoa tai khoan" : "Khoa tai khoan"} color="var(--primary)">
            <Button
              size="small"
              type="text"
              danger={record.statusName !== "locked"}
              shape="circle"
              icon={<LockOutlined />}
              onClick={() => handleLockUser(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return { columns };
};
