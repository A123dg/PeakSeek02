import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";

import { ListPageFilters, ListPageHeader } from "@apps/admin/components/listPageHeader";
import { PageContainer } from "@/shared/components/PageContainer";
import useFilter from "@/shared/hooks/useFilter";
import TableWithPagination from "@shared/components/tables/table-with-pagination";
import CommentFormModal from "./CommentFormModal";
import { useCommentActions } from "./pages/hooks/useActions";
import { useCommentColumns } from "./pages/hooks/useColumn";
import { useCommentData } from "./pages/hooks/useData";

const initialFilter = {
  page: 1,
  pageSize: 10,
};

export default function CommentList() {
  const { setFilter, filter, pagination } = useFilter(initialFilter);
  const { data, total, isLoading } = useCommentData(filter);
  const { modalOpen, selectedComment, loading, handleOpenCommentModal, handleModalCancel, handleHideComment } = useCommentActions();
  const { columns } = useCommentColumns({ handleOpenCommentModal, handleHideComment });

  return (
    <div style={{ fontSize: 14 }}>
      <PageContainer breadcrumbItems={[{ title: "Danh sách binh luan" }]} showNavButtons={false} showBreadcrumb>
        <ListPageHeader>
          <ListPageFilters>
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Tìm theo người dùng / nội dung..."
              allowClear
              style={{ width: 280 }}
              onChange={(e) =>
                setFilter((prev: typeof initialFilter) => ({
                  ...prev,
                  page: 1,
                  search: e.target.value,
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

      <CommentFormModal open={modalOpen} data={selectedComment ?? undefined} loading={loading} onCancel={handleModalCancel} />
    </div>
  );
}

