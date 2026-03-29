import { EyeOutlined, StopOutlined } from "@ant-design/icons";
import { Badge, Button, Space, Tag, Tooltip } from "antd";

import type { ReviewRow, ReviewStatus } from "./useData";

type UseReviewColumnsProps = {
  handleOpenReviewModal: (record: ReviewRow) => void;
  handleHideReview: (record: ReviewRow) => void;
};

const statusMeta: Record<ReviewStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Dang hien thi", color: "#16a34a", bg: "#ecfdf3" },
  inactive: { label: "Da an", color: "#6b7280", bg: "#f3f4f6" },
};

export const useReviewColumns = ({
  handleOpenReviewModal,
  handleHideReview,
}: UseReviewColumnsProps) => {
  const columns = [
    {
      title: "Nguoi dung",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Dia diem",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Sao danh gia",
      dataIndex: "rating",
      key: "rating",
      width: 120,
      render: (value: number) => (
        <Space>
          <span>{value.toFixed(1)}</span>
          <Badge color="#fbbf24" />
        </Space>
      ),
    },
    {
      title: "Noi dung",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Trang thai",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status: ReviewStatus) => {
        const meta = statusMeta[status] ?? statusMeta.inactive;
        return (
          <Tag
            color={meta.bg}
            style={{
              color: meta.color,
              borderRadius: 999,
              border: "none",
              paddingInline: 12,
            }}
          >
            {meta.label}
          </Tag>
        );
      },
    },
    {
      title: "Thoi gian tao",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
    },
    {
      title: "Thao tac",
      key: "action",
      width: 160,
      render: (_: unknown, record: ReviewRow) => (
        <Space size={4}>
          <Tooltip title="Xem chi tiet" color="var(--primary)">
            <Button
              size="small"
              type="text"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => handleOpenReviewModal(record)}
            />
          </Tooltip>
          <Tooltip title="An danh gia" color="var(--primary)">
            <Button
              size="small"
              type="text"
              danger
              shape="circle"
              icon={<StopOutlined />}
              onClick={() => handleHideReview(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return { columns };
};
