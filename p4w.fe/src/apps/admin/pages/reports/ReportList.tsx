import { useMemo, useState } from 'react';
import { Button, Input, Select, Space, Tag, Tooltip, message } from 'antd';
import {
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import TableWithPagination from '@shared/components/tables/table-with-pagination';
import ReportFormModal, { type ReportFormData } from './ReportFormModal';

type ReportStatus = 'pending' | 'approved' | 'rejected';
type ReportType = 'user' | 'location' | 'review' | 'comment';

interface ReportRow {
  id: number;
  reportedBy: string;
  reportedItemType: ReportType;
  reportedItem: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
}

const statusMeta: Record<
  ReportStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: 'Chờ duyệt', color: '#f59e0b', bg: '#fffbeb' },
  approved: { label: 'Đã duyệt', color: '#16a34a', bg: '#ecfdf3' },
  rejected: { label: 'Từ chối', color: '#dc2626', bg: '#fef2f2' },
};

const reportTypeMeta: Record<ReportType, string> = {
  user: 'Người dùng',
  location: 'Địa điểm',
  review: 'Đánh giá',
  comment: 'Bình luận',
};

const mockData: ReportRow[] = [
  {
    id: 1,
    reportedBy: 'Nguyễn Văn A',
    reportedItemType: 'review',
    reportedItem: 'Đánh giá về Café Đêm Trắng',
    reason: 'Nội dung không phù hợp',
    status: 'pending',
    createdAt: '2026-02-25 10:30',
  },
  {
    id: 2,
    reportedBy: 'Trần Thị B',
    reportedItemType: 'user',
    reportedItem: 'Người dùng Spam123',
    reason: 'Spam, lạm dụng nền tảng',
    status: 'pending',
    createdAt: '2026-02-24 14:15',
  },
  {
    id: 3,
    reportedBy: 'Lê Văn C',
    reportedItemType: 'location',
    reportedItem: 'KDL Biển Xanh',
    reason: 'Thông tin sai lệch',
    status: 'approved',
    createdAt: '2026-02-23 09:00',
  },
  {
    id: 4,
    reportedBy: 'Phạm Thị D',
    reportedItemType: 'comment',
    reportedItem: 'Bình luận trên đánh giá',
    reason: 'Nội dung độc hại',
    status: 'rejected',
    createdAt: '2026-02-22 16:45',
  },
];

export default function ReportList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'approve' | 'reject'>(
    'view'
  );
  const [selectedReport, setSelectedReport] = useState<ReportRow | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenViewModal = (record: ReportRow) => {
    setModalMode('view');
    setSelectedReport(record);
    setModalOpen(true);
  };

  const handleOpenApproveModal = (record: ReportRow) => {
    setModalMode('approve');
    setSelectedReport(record);
    setModalOpen(true);
  };

  const handleOpenRejectModal = (record: ReportRow) => {
    setModalMode('reject');
    setSelectedReport(record);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  const handleModalSubmit = async (values: ReportFormData) => {
    try {
      setLoading(true);
      // TODO: Call API to approve/reject report
      // await api.reports.approve/reject(values)
      message.success(
        modalMode === 'approve'
          ? 'Duyệt báo cáo thành công'
          : modalMode === 'reject'
            ? 'Từ chối báo cáo thành công'
            : 'Cập nhật báo cáo thành công'
      );
      handleModalCancel();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: 'Người báo cáo',
        dataIndex: 'reportedBy',
        key: 'reportedBy',
        width: 140,
      },
      {
        title: 'Loại báo cáo',
        dataIndex: 'reportedItemType',
        key: 'reportedItemType',
        width: 120,
        render: (type: ReportType) => reportTypeMeta[type] || type,
      },
      {
        title: 'Mục báo cáo',
        dataIndex: 'reportedItem',
        key: 'reportedItem',
        ellipsis: true,
      },
      {
        title: 'Lý do',
        dataIndex: 'reason',
        key: 'reason',
        ellipsis: true,
        width: 160,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 140,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (status: ReportStatus) => {
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
        title: 'Thao tác',
        key: 'action',
        width: 200,
        render: (_: any, record: ReportRow) =>
          record.status === 'pending' ? (
            <Space size={4}>
              <Tooltip title="Xem chi tiết" color="var(--primary)">
                <Button
                  size="small"
                  type="text"
                  shape="circle"
                  icon={<EyeOutlined />}
                  onClick={() => handleOpenViewModal(record)}
                />
              </Tooltip>
              <Tooltip title="Duyệt" color="var(--primary)">
                <Button
                  size="small"
                  type="text"
                  shape="circle"
                  icon={<CheckOutlined />}
                  style={{ color: '#16a34a' }}
                  onClick={() => handleOpenApproveModal(record)}
                />
              </Tooltip>
              <Tooltip title="Từ chối" color="var(--primary)">
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
            <Tooltip title="Xem chi tiết" color="var(--primary)">
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
            placeholder="Tìm theo người báo cáo / mục báo cáo..."
            allowClear
            style={{ width: 300 }}
          />
          <Select
            placeholder="Loại báo cáo"
            allowClear
            style={{ width: 160 }}
            options={[
              { value: 'user', label: 'Người dùng' },
              { value: 'location', label: 'Địa điểm' },
              { value: 'review', label: 'Đánh giá' },
              { value: 'comment', label: 'Bình luận' },
            ]}
          />
          <Select
            placeholder="Trạng thái"
            allowClear
            style={{ width: 160 }}
            options={[
              { value: 'pending', label: 'Chờ duyệt' },
              { value: 'approved', label: 'Đã duyệt' },
              { value: 'rejected', label: 'Từ chối' },
            ]}
          />
        </Space>
      </div>

      <TableWithPagination
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        bodyHeight="calc(100vh - 260px)"
      />

      <ReportFormModal
        open={modalOpen}
        mode={modalMode}
        data={selectedReport || undefined}
        loading={loading}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
