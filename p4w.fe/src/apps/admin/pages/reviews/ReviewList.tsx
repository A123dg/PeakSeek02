import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Tooltip,
  message,
} from 'antd';
import {
  EyeOutlined,
  StopOutlined,
  DownloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import TableWithPagination from '@shared/components/tables/table-with-pagination';
import { default as ReviewFormModal, type ReviewFormData } from './ReviewFormModal';

type ReviewStatus = 'pending' | 'approved' | 'rejected';

interface ReviewRow {
  id: number;
  user: string;
  location: string;
  rating: number;
  content: string;
  status: ReviewStatus;
  createdAt: string;
}

const statusMeta: Record<
  ReviewStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: 'Chờ duyệt', color: '#f59e0b', bg: '#fffbeb' },
  approved: { label: 'Đã duyệt', color: '#16a34a', bg: '#ecfdf3' },
  rejected: { label: 'Từ chối', color: '#dc2626', bg: '#fef2f2' },
};

const mockData: ReviewRow[] = [
  {
    id: 1,
    user: 'Lam Anh',
    location: 'Café Đêm Trắng',
    rating: 4.5,
    content: 'Không gian đẹp, wifi ổn.',
    status: 'approved',
    createdAt: '12/02/2026',
  },
  {
    id: 2,
    user: 'Minh Tuấn',
    location: 'Homestay Mây Trắng',
    rating: 3.0,
    content: 'Phòng hơi nhỏ nhưng sạch sẽ.',
    status: 'pending',
    createdAt: '15/02/2026',
  },
  {
    id: 3,
    user: 'Hoài Thương',
    location: 'KDL Biển Xanh',
    rating: 2.0,
    content: 'Dịch vụ chưa tốt, cần cải thiện.',
    status: 'rejected',
    createdAt: '18/02/2026',
  },
];

export default function ReviewList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewRow | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenReviewModal = (record: ReviewRow) => {
    setSelectedReview(record);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedReview(null);
  };

  const handleModalSubmit = async (values: ReviewFormData) => {
    try {
      setLoading(true);
      // TODO: Call API to update review status
      // await api.reviews.updateStatus(values)
      message.success('Cập nhật đánh giá thành công');
      handleModalCancel();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleHideReview = (record: ReviewRow) => {
    // TODO: Call API to hide review
    message.success('Ẩn đánh giá thành công');
  };
  const columns = useMemo(
    () => [
      {
        title: 'Người dùng',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: 'Địa điểm',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Sao đánh giá',
        dataIndex: 'rating',
        key: 'rating',
        width: 120,
        render: (value: number) => (
          <Space>
            <span>{value.toFixed(1)}</span>
            <Badge color="#fbbf24" />
          </Space>
        ),
      },
      {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
        ellipsis: true,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 140,
        render: (status: ReviewStatus) => {
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
        title: 'Thời gian tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 140,
      },
      {
        title: 'Thao tác',
        key: 'action',
        width: 160,
        render: (_: any, record: ReviewRow) => (
          <Space size={4}>
            <Tooltip title="Xem chi tiết">
              <Button
                size="small"
                type="text"
                shape="circle"
                icon={<EyeOutlined />}
                onClick={() => handleOpenReviewModal(record)}
              />
            </Tooltip>
            <Tooltip title="Ẩn đánh giá">
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
            placeholder="Tìm theo nội dung / người dùng..."
            allowClear
            style={{ width: 260 }}
          />
          <Select
            placeholder="Sao đánh giá"
            allowClear
            style={{ width: 160 }}
            options={[
              { value: '5', label: '5 sao' },
              { value: '4', label: '4 sao trở lên' },
              { value: '3', label: '3 sao trở lên' },
            ]}
          />
          <Select
            placeholder="Trạng thái"
            allowClear
            style={{ width: 160 }}
            options={[
              { value: 'approved', label: 'Đã duyệt' },
              { value: 'pending', label: 'Chờ duyệt' },
              { value: 'rejected', label: 'Từ chối' },
            ]}
          />
          <Button icon={<FilterOutlined />} />
        </Space>

        <Button
          type="primary"
          icon={<DownloadOutlined />}
          style={{ backgroundColor: '#8c80cc', borderColor: '#8c80cc' }}
        >
          Xuất báo cáo
        </Button>
      </div>

      <TableWithPagination
        columns={columns as any}
        dataSource={mockData}
        rowKey="id"
        bodyHeight="calc(100vh - 260px)"
      />

      <ReviewFormModal
        open={modalOpen}
        mode="view"
        data={selectedReview || undefined}
        loading={loading}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

