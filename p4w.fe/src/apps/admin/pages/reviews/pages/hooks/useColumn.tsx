import { EyeOutlined, LinkOutlined, StopOutlined } from "@ant-design/icons";
import { Badge, Button, Image, Space, Tag, Tooltip, Typography } from "antd";

import { formatDate } from "@/shared/utils/formatDate";
import type { ReviewRow, ReviewStatus } from "./useData";

type UseReviewColumnsProps = {
  handleOpenReviewModal: (record: ReviewRow) => void;
  handleHideReview: (record: ReviewRow) => void;
};

const statusMeta: Record<ReviewStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Đang hiển thị", color: "#16a34a", bg: "#ecfdf3" },
  inactive: { label: "Đã ẩn", color: "#6b7280", bg: "#f3f4f6" },
};

export const useReviewColumns = ({
  handleOpenReviewModal,
  handleHideReview,
}: UseReviewColumnsProps) => {
  const columns = [
    {
      title: "Người dùng",
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
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Media URL",
      dataIndex: "mediaLinkUrls",
      key: "mediaLinkUrls",
      width: 220,
      render: (mediaLinkUrls?: string[]) => {
        const firstMedia = mediaLinkUrls?.[0];
        if (!firstMedia) {
          return <span>--</span>;
        }

        return (
          <Space size={8}>
            <Image
              src={firstMedia}
              width={40}
              height={40}
              style={{ objectFit: "cover", borderRadius: 10 }}
              fallback="data:image/gif;base64,R0lGODlhAQABAAAAACw="
            />
            <Typography.Link href={firstMedia} target="_blank" ellipsis style={{ maxWidth: 140 }}>
              <LinkOutlined /> Xem media
            </Typography.Link>
          </Space>
        );
      },
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
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      render: (value: string) => formatDate(value),
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

