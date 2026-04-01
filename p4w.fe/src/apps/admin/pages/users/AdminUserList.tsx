import { useState } from "react";
import { Button, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import TableWithPagination from "@shared/components/tables/table-with-pagination";
import { PageContainer } from "@/shared/components/PageContainer";
import { FilterHeader } from "./pages/components/FilterHeader";
import type { IUser, IUserResponse } from "./services/type";
import { useColumns } from "./pages/hooks/useColumn";
import { useUesrData } from "./pages/hooks/useData";
import useFilter from "@/shared/hooks/useFilter";
import CreateAdminModal from "./pages/components/CreateAdminModal";
import UserFormModal from "./pages/components/UserFormModal";
import { useCreateUser, useLockUser, useUnlockUser } from "./services/mutation";

const initialFilter = {
  page: 1,
  pageSize: 10,
};

export const AdminUserList = () => {
  const { setFilter, filter, pagination } = useFilter(initialFilter);
  const { data, total, pageIndex, pageSize } = useUesrData(filter);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view">("view");
  const [selectedUser, setSelectedUser] = useState<IUserResponse | null>(null);
  const { mutateAsync: createUserMutation, isLoading: isCreating } = useCreateUser();
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

  const handleCreateModalCancel = () => {
    setCreateModalOpen(false);
  };

  const handleModalSubmit = async (values: IUser) => {
    void values;
    handleModalCancel();
  };

  const handleCreateAdmin = async (values: IUser) => {
    try {
      await createUserMutation(values);
      message.success("Tạo tài khoản admin thanh cong");
      setCreateModalOpen(false);
    } catch (error) {
      message.error("Co loi xay ra");
      throw error;
    }
  };

  const handleLockUser = async (record: IUserResponse) => {
    try {
      if (record.statusName === "locked") {
        await unlockUserMutation(record.id);
        message.success("Mở khóa tài khoản thanh cong");
        return;
      }

      await lockUserMutation(record.id);
      message.success("Khóa tài khoản thanh cong");
    } catch {
      message.error("Co loi xay ra");
    }
  };

  const { columns } = useColumns({ handleOpenViewModal, handleLockUser, pageIndex, pageSize });

  return (
    <div style={{ fontSize: 14 }}>
      <PageContainer
        breadcrumbItems={[{ title: "Danh sách tai khoan" }]}
        showNavButtons={false}
        showBreadcrumb={true}
      >
        <FilterHeader
          setFilter={setFilter}
          extraAction={
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              style={{ backgroundColor: "#8c80cc", borderColor: "#8c80cc", height: 36 }}
              onClick={() => setCreateModalOpen(true)}
            >
              Tạo người dùng mới
            </Button>
          }
        />
        <TableWithPagination
          columns={columns}
          dataSource={data}
          loading={isCreating || isLocking || isUnlocking}
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

      <CreateAdminModal
        open={createModalOpen}
        loading={isCreating}
        onCancel={handleCreateModalCancel}
        onSubmit={handleCreateAdmin}
      />
    </div>
  );
};

export default AdminUserList;

