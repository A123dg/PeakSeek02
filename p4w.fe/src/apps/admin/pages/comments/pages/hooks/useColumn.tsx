import { EyeOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Space, Tag, Tooltip } from "antd";

import { formatDate } from "@/shared/utils/formatDate";
import type { CommentRow, CommentStatus } from "./useData";

type UseCommentColumnsProps = {
  handleOpenCommentModal: (record: CommentRow) => void;
  handleHideComment: (record: CommentRow) => void;
};

const statusMeta: Record<CommentStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Đang hiển thị", color: "#16a34a", bg: "#ecfdf3" },
  inactive: { label: "Đã ẩn", color: "#6b7280", bg: "#f3f4f6" },
};

export const useCommentColumns = ({
  handleOpenCommentModal,
  handleHideComment,
}: UseCommentColumnsProps) => {
  const columns = [
    { title: "Người dùng", dataIndex: "userName", key: "userName", width: 160 },
    { title: "Dia diem", dataIndex: "locationName", key: "locationName", width: 180 },
    { title: "Nội dung review", dataIndex: "reviewContent", key: "reviewContent", ellipsis: true },
    { title: "Nội dung binh luan", dataIndex: "content", key: "content", ellipsis: true },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      render: (value: string) => formatDate(value),
    },
    {
      title: "Trang thai",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status: CommentStatus) => {
        const meta = statusMeta[status] ?? statusMeta.inactive;
        return (
          <Tag color={meta.bg} style={{ color: meta.color, borderRadius: 999, border: "none", paddingInline: 12 }}>
            {meta.label}
          </Tag>
        );
      },
    },
    {
      title: "Thao tac",
      key: "action",
      width: 140,
      render: (_: unknown, record: CommentRow) => (
        <Space size={4}>
          <Tooltip title="Xem chi tiet" color="var(--primary)">
            <Button size="small" type="text" shape="circle" icon={<EyeOutlined />} onClick={() => handleOpenCommentModal(record)} />
          </Tooltip>
          {record.status === "active" ? (
            <Tooltip title="An binh luan" color="var(--primary)">
              <Button size="small" type="text" danger shape="circle" icon={<StopOutlined />} onClick={() => handleHideComment(record)} />
            </Tooltip>
          ) : null}
        </Space>
      ),
    },
  ];

  return { columns };
};

