import { useState } from "react";
import { message } from "antd";

import TableWithPagination from "@shared/components/tables/table-with-pagination";
import { PageContainer } from "@/shared/components/PageContainer";
import { FilterHeader } from "./pages/components/FilterHeader";
import type { IUser, IUserResponse } from "./services/type";
import { useColumns } from "./pages/hooks/useColumn";
import { useUesrData } from "./pages/hooks/useData";
import useFilter from "@/shared/hooks/useFilter";
import UserFormModal from "./pages/components/UserFormModal";
import { useLockUser, useUnlockUser } from "./services/mutation";

const initialFilter = {
  page: 1,
  pageSize: 10,
};

export const AdminUserList = () => {
  const { setFilter, filter, pagination } = useFilter(initialFilter);
  const { data, total, pageIndex, pageSize } = useUesrData(filter);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view">("view");
  const [selectedUser, setSelectedUser] = useState<IUserResponse | null>(null);
  const { mutateAsync: lockUserMutation, isLoading: isLocking } = useLockUser();
  const { mutateAsync: unlockUserMutation, isLoading: isUnlocking } = useUnlockUser();

  const handleOpenViewModal = (record: IUserResponse) => {
    setModalMode("view");
    setSelectedUser(record);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSubmit = async (values: IUser) => {
    void values;
    handleModalCancel();
  };

  const handleLockUser = async (record: IUserResponse) => {
    try {
      if (record.statusName === "locked") {
        await unlockUserMutation(record.id);
        message.success("Mo khoa tai khoan thanh cong");
        return;
      }

      await lockUserMutation(record.id);
      message.success("Khoa tai khoan thanh cong");
    } catch {
      message.error("Co loi xay ra");
    }
  };

  const { columns } = useColumns({ handleOpenViewModal, handleLockUser, pageIndex, pageSize });

  return (
    <div style={{ fontSize: 14 }}>
      <PageContainer
        breadcrumbItems={[{ title: "Danh sach tai khoan" }]}
        showNavButtons={false}
        showBreadcrumb={true}
      >
        <FilterHeader setFilter={setFilter} />
        <TableWithPagination
          columns={columns}
          dataSource={data}
          loading={isLocking || isUnlocking}
          pagination={pagination(total)}
          paginationBackground="#fff"
          rowKey="id"
          scroll={{ y: "var(--table-body-height-default)" }}
        />
      </PageContainer>

      <UserFormModal
        open={modalOpen}
        mode={modalMode}
        data={selectedUser ?? undefined}
        loading={isLocking || isUnlocking}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default AdminUserList;
