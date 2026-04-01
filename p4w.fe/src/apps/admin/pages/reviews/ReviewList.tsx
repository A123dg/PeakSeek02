import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";

import { ListPageFilters, ListPageHeader } from "@apps/admin/components/listPageHeader";
import { PageContainer } from "@/shared/components/PageContainer";
import useFilter from "@/shared/hooks/useFilter";
import TableWithPagination from "@shared/components/tables/table-with-pagination";
import ReviewFormModal from "./ReviewFormModal";
import { useReviewActions } from "./pages/hooks/useActions";
import { useReviewColumns } from "./pages/hooks/useColumn";
import { useReviewData } from "./pages/hooks/useData";

const initialFilter = {
  page: 1,
  pageSize: 10,
};

export default function ReviewList() {
  const { setFilter, filter, pagination } = useFilter(initialFilter);
  const { data, total, isLoading } = useReviewData(filter);
  const {
    modalOpen,
    selectedReview,
    loading,
    handleOpenReviewModal,
    handleModalCancel,
    handleModalSubmit,
    handleHideReview,
  } = useReviewActions();
  const { columns } = useReviewColumns({ handleOpenReviewModal, handleHideReview });

  return (
    <div style={{ fontSize: 14 }}>
      <PageContainer
        breadcrumbItems={[{ title: "Danh sách danh gia" }]}
        showNavButtons={false}
        showBreadcrumb={true}
      >
        <ListPageHeader>
          <ListPageFilters>
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Tìm theo nội dung / người dùng..."
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
              placeholder="Sao danh gia"
              allowClear
              style={{ width: 160 }}
              options={[
                { value: 5, label: "5 sao" },
                { value: 4, label: "4 sao tro len" },
                { value: 3, label: "3 sao tro len" },
              ]}
              onChange={(value) =>
                setFilter((prev: typeof initialFilter) => ({
                  ...prev,
                  page: 1,
                  minRating: value as number | undefined,
                }))
              }
            />
            <Select
              placeholder="Trang thai"
              allowClear
              style={{ width: 160 }}
              options={[
                { value: 1, label: "Đang hiển thị" },
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

          <Button
            type="primary"
            icon={<DownloadOutlined />}
            style={{ backgroundColor: "#8c80cc", borderColor: "#8c80cc", height: 36 }}
          >
            Xuất báo cáo
          </Button>
        </ListPageHeader>

        <TableWithPagination
          columns={columns as never}
          dataSource={data}
          loading={isLoading || loading}
          pagination={pagination(total)}
          paginationBackground="#fff"
          rowKey="id"
          scroll={{ y: "var(--table-body-height-default)" }}
        />
      </PageContainer>

      <ReviewFormModal
        open={modalOpen}
        mode="view"
        data={selectedReview ?? undefined}
        loading={loading}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

