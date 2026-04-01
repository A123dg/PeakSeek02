import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";

import { ListPageFilters, ListPageHeader } from "@apps/admin/components/listPageHeader";
import { PageContainer } from "@/shared/components/PageContainer";
import useFilter from "@/shared/hooks/useFilter";
import TableWithPagination from "@shared/components/tables/table-with-pagination";
import LocationFormModal from "./LocationFormModal";
import { useLocationActions } from "./pages/hooks/useActions";
import { useLocationColumns } from "./pages/hooks/useColumn";
import { useLocationData } from "./pages/hooks/useData";

const initialFilter = {
  page: 1,
  pageSize: 10,
};

export default function LocationList() {
  const { setFilter, filter, pagination } = useFilter(initialFilter);
  const { data, total, isLoading } = useLocationData(filter);
  const {
    modalOpen,
    modalMode,
    selectedLocation,
    loading,
    handleOpenViewModal,
    handleModalCancel,
    handleModalSubmit,
    handleApproveLocation,
  } = useLocationActions();
  const { columns } = useLocationColumns({ handleOpenViewModal, handleApproveLocation });

  return (
    <div style={{ fontSize: 14 }}>
      <PageContainer
        breadcrumbItems={[{ title: "Danh sách dia diem" }]}
        showNavButtons={false}
        showBreadcrumb={true}
      >
        <ListPageHeader>
          <ListPageFilters>
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Tìm theo tên / địa chỉ..."
              allowClear
              style={{ width: 260 }}
              onChange={(e) =>
                setFilter((prev: typeof initialFilter) => ({
                  ...prev,
                  page: 1,
                  search: e.target.value,
                }))
              }
            />
            <Select
              placeholder="Loai hinh"
              allowClear
              style={{ width: 180 }}
              options={[
                { value: 1, label: "Thu vien" },
                { value: 2, label: "Quan ca phe" },
                { value: 3, label: "Nha sach" },
                { value: 4, label: "Coworking" },
                { value: 5, label: "Study cafe" },
                { value: 6, label: "Van phong" },
              ]}
              onChange={(value) =>
                setFilter((prev: typeof initialFilter) => ({
                  ...prev,
                  page: 1,
                  type: value as number | undefined,
                }))
              }
            />
            <Select
              placeholder="Trang thai"
              allowClear
              style={{ width: 160 }}
              options={[
                { value: 1, label: "Chờ duyệt" },
                { value: 2, label: "Đã duyệt" },
                { value: 3, label: "Từ chối" },
                { value: 4, label: "Đang hiển thị" },
                { value: 0, label: "Đã ẩn" },
              ]}
              onChange={(value) =>
                setFilter((prev: typeof initialFilter) => ({
                  ...prev,
                  page: 1,
                  status: value as number | undefined,
                }))
              }
            />
          </ListPageFilters>

        </ListPageHeader>

        <TableWithPagination
          columns={columns}
          dataSource={data}
          loading={isLoading || loading}
          pagination={pagination(total)}
          paginationBackground="#fff"
          rowKey="id"
          scroll={{ y: "var(--table-body-height-default)" }}
        />
      </PageContainer>

      <LocationFormModal
        open={modalOpen}
        mode={modalMode}
        data={
          selectedLocation
            ? {
                id: selectedLocation.id,
                ownerId: selectedLocation.ownerId,
                name: selectedLocation.name,
                type: selectedLocation.typeCode,
                address: selectedLocation.address,
                addressLink: selectedLocation.addressLink,
                openingHours: selectedLocation.openingHours,
                closingHours: selectedLocation.closingHours,
                description: selectedLocation.description,
                status: selectedLocation.statusCode,
                mediaLinkUrls: selectedLocation.mediaLinkUrls,
                pendingMediaLinkUrls: selectedLocation.pendingMediaLinkUrls,
              }
            : undefined
        }
        loading={loading}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

