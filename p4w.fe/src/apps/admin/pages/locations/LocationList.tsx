import { useMemo, useState } from 'react';
import { Button, Input, Select, Space, Tag, Tooltip, message } from 'antd';
import {
  EditOutlined,
  EyeInvisibleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import TableWithPagination from '@shared/components/tables/table-with-pagination';
import LocationFormModal, { type LocationFormData } from './LocationFormModal';

type LocationStatus = 'active' | 'inactive' | 'draft';

interface LocationRow {
  id: number;
  name: string;
  type: string;
  address: string;
  openingHours: string;
  status: LocationStatus;
}

const statusMeta: Record<
  LocationStatus,
  { label: string; color: string; bg: string }
> = {
  active: { label: 'Đang hiển thị', color: '#16a34a', bg: '#ecfdf3' },
  inactive: { label: 'Đã ẩn', color: '#6b7280', bg: '#f3f4f6' },
  draft: { label: 'Nháp', color: '#f59e0b', bg: '#fffbeb' },
};

const locationRows: LocationRow[] = [];

export default function LocationList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedLocation, setSelectedLocation] = useState<LocationRow | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedLocation(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (record: LocationRow) => {
    setModalMode('edit');
    setSelectedLocation(record);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  const handleModalSubmit = async (_values: LocationFormData) => {
    try {
      void _values;
      setLoading(true);
      message.success(
        modalMode === 'add'
          ? 'Thêm địa điểm thành công'
          : 'Cập nhật địa điểm thành công'
      );
      handleModalCancel();
    } catch {
      message.error('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleHideLocation = (_record: LocationRow) => {
    void _record;
    message.success('Ẩn địa điểm thành công');
  };

  const columns = useMemo(
    () => [
      {
        title: 'Tên địa điểm',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Loại hình',
        dataIndex: 'type',
        key: 'type',
        width: 140,
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
        ellipsis: true,
      },
      {
        title: 'Giờ mở cửa',
        dataIndex: 'openingHours',
        key: 'openingHours',
        width: 150,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (status: LocationStatus) => {
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
        width: 160,
        render: (_: unknown, record: LocationRow) => (
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
            <Tooltip title="Ẩn địa điểm" color="var(--primary)">
              <Button
                size="small"
                type="text"
                danger
                shape="circle"
                icon={<EyeInvisibleOutlined />}
                onClick={() => handleHideLocation(record)}
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
            placeholder="Tìm theo tên / địa chỉ..."
            allowClear
            style={{ width: 260 }}
          />
          <Select
            placeholder="Loại hình"
            allowClear
            style={{ width: 180 }}
            options={[
              { value: 'cafe', label: 'Café' },
              { value: 'homestay', label: 'Homestay' },
              { value: 'kdl', label: 'Khu du lịch' },
            ]}
          />
          <Select
            placeholder="Trạng thái"
            allowClear
            style={{ width: 160 }}
            options={[
              { value: 'active', label: 'Đang hiển thị' },
              { value: 'inactive', label: 'Đã ẩn' },
              { value: 'draft', label: 'Nháp' },
            ]}
          />
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#8c80cc', borderColor: '#8c80cc' }}
          onClick={handleOpenAddModal}
        >
          Thêm địa điểm
        </Button>
      </div>

      <TableWithPagination
        columns={columns}
        dataSource={locationRows}
        rowKey="id"
        bodyHeight="calc(100vh - 260px)"
      />

      <LocationFormModal
        open={modalOpen}
        mode={modalMode}
        data={selectedLocation || undefined}
        loading={loading}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
