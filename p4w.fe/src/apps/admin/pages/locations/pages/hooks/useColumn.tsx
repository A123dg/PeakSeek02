import { CheckOutlined, EyeOutlined, LinkOutlined } from "@ant-design/icons";
import { Button, Image, Space, Tag, Tooltip, Typography } from "antd";

import type { LocationRow, LocationStatus } from "./useData";

type UseLocationColumnsProps = {
  handleOpenViewModal: (record: LocationRow) => void;
  handleApproveLocation: (record: LocationRow) => void;
};

const statusMeta: Record<LocationStatus, { label: string; color: string; bg: string }> = {
  pending: { label: "Cho duyet", color: "#f59e0b", bg: "#fffbeb" },
  approved: { label: "Da duyet", color: "#16a34a", bg: "#ecfdf3" },
  rejected: { label: "Tu choi", color: "#dc2626", bg: "#fef2f2" },
  active: { label: "Dang hien thi", color: "#16a34a", bg: "#ecfdf3" },
  inactive: { label: "Da an", color: "#6b7280", bg: "#f3f4f6" },
};

export const useLocationColumns = ({
  handleOpenViewModal,
  handleApproveLocation,
}: UseLocationColumnsProps) => {
  const columns = [
    {
      title: "Ten dia diem",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loai hinh",
      dataIndex: "type",
      key: "type",
      width: 140,
    },
    {
      title: "Dia chi",
      dataIndex: "address",
      key: "address",
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
      title: "Gio mo cua",
      dataIndex: "openingHours",
      key: "openingHours",
      width: 150,
    },
    {
      title: "Trang thai",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: LocationStatus) => {
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
      title: "Thao tac",
      key: "action",
      width: 100,
      render: (_: unknown, record: LocationRow) => (
        <Space size={4}>
          {record.status === "pending" && (
            <Tooltip title="Duyet dia diem" color="var(--primary)">
              <Button
                size="small"
                type="text"
                shape="circle"
                style={{ color: "#16a34a" }}
                icon={<CheckOutlined />}
                onClick={() => handleApproveLocation(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="Xem chi tiet" color="var(--primary)">
            <Button
              size="small"
              type="text"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => handleOpenViewModal(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return { columns };
};
