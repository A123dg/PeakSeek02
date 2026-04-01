import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space, Tag, Tooltip } from "antd";

import { formatDate } from "@/shared/utils/formatDate";
import type { ReportRow, ReportStatus, ReportType } from "./useData";

type UseReportColumnsProps = {
  handleOpenViewModal: (record: ReportRow) => void;
  handleOpenApproveModal: (record: ReportRow) => void;
  handleOpenRejectModal: (record: ReportRow) => void;
};

const statusMeta: Record<ReportStatus, { label: string; color: string; bg: string }> = {
  pending: { label: "Cho duyet", color: "#f59e0b", bg: "#fffbeb" },
  approved: { label: "Da duyet", color: "#16a34a", bg: "#ecfdf3" },
  rejected: { label: "Tu choi", color: "#dc2626", bg: "#fef2f2" },
};

const reportTypeMeta: Record<ReportType, string> = {
  user: "Nguoi dung",
  location: "Dia diem",
  review: "Danh gia",
  comment: "Binh luan",
};

export const useReportColumns = ({
  handleOpenViewModal,
  handleOpenApproveModal,
  handleOpenRejectModal,
}: UseReportColumnsProps) => {
  const columns = [
    {
      title: "Nguoi bao cao",
      dataIndex: "reportedBy",
      key: "reportedBy",
      width: 140,
    },
    {
      title: "Loai bao cao",
      dataIndex: "reportedItemType",
      key: "reportedItemType",
      width: 120,
      render: (type: ReportType) => reportTypeMeta[type] || type,
    },
    {
      title: "Muc bao cao",
      dataIndex: "reportedItem",
      key: "reportedItem",
      ellipsis: true,
    },
    {
      title: "Ly do",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
      width: 160,
    },
    {
      title: "Ngay tao",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      render: (value: string) => formatDate(value),
    },
    {
      title: "Trang thai",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: ReportStatus) => {
        const meta = statusMeta[status];
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
      width: 200,
      render: (_: unknown, record: ReportRow) =>
        record.status === "pending" ? (
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
            <Tooltip title="Duyet" color="var(--primary)">
              <Button
                size="small"
                type="text"
                shape="circle"
                icon={<CheckOutlined />}
                style={{ color: "#16a34a" }}
                onClick={() => handleOpenApproveModal(record)}
              />
            </Tooltip>
            <Tooltip title="Tu choi" color="var(--primary)">
              <Button
                size="small"
                type="text"
                danger
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => handleOpenRejectModal(record)}
              />
            </Tooltip>
          </Space>
        ) : (
          <Tooltip title="Xem chi tiet" color="var(--primary)">
            <Button
              size="small"
              type="text"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => handleOpenViewModal(record)}
            />
          </Tooltip>
        ),
    },
  ];

  return { columns };
};
