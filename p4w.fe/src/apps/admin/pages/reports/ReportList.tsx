import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";

import { ListPageFilters, ListPageHeader } from "@apps/admin/components/listPageHeader";
import { PageContainer } from "@/shared/components/PageContainer";
import useFilter from "@/shared/hooks/useFilter";
import TableWithPagination from "@shared/components/tables/table-with-pagination";
import ReportFormModal from "./ReportFormModal";
import { useReportActions } from "./pages/hooks/useActions";
import { useReportColumns } from "./pages/hooks/useColumn";
import { useReportData } from "./pages/hooks/useData";

const initialFilter = {
  page: 1,
  pageSize: 10,
};

export default function ReportList() {
  const { setFilter, filter, pagination } = useFilter(initialFilter);
  const { data, total, isLoading } = useReportData(filter);
  const {
    modalOpen,
    modalMode,
    selectedReport,
    loading,
    handleOpenViewModal,
    handleOpenApproveModal,
    handleOpenRejectModal,
    handleModalCancel,
    handleModalSubmit,
  } = useReportActions();
  const { columns } = useReportColumns({
    handleOpenViewModal,
    handleOpenApproveModal,
    handleOpenRejectModal,
  });

  return (
    <div style={{ fontSize: 14 }}>
      <PageContainer
        breadcrumbItems={[{ title: "Danh sách báo cáo" }]}
        showNavButtons={false}
        showBreadcrumb={true}
      >
        <ListPageHeader>
          <ListPageFilters>
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Tìm theo người báo cáo / mục báo cáo..."
              allowClear
              style={{ width: 300 }}
              onChange={(e) =>
                setFilter((prev: typeof initialFilter) => ({
                  ...prev,
                  page: 1,
                  search: e.target.value,
                }))
              }
            />
            <Select
              placeholder="Loại báo cáo"
              allowClear
              style={{ width: 160 }}
              options={[
                { value: "user", label: "Người dùng" },
                { value: "location", label: "Dia diem" },
                { value: "review", label: "Danh gia" },
                { value: "comment", label: "Binh luan" },
              ]}
              onChange={(value) =>
                setFilter((prev: typeof initialFilter) => ({
                  ...prev,
                  page: 1,
                  targetType: value,
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

      <ReportFormModal
        open={modalOpen}
        mode={modalMode}
        data={selectedReport ?? undefined}
        loading={loading}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

