import {  useState } from 'react';
import {  message } from 'antd';

import TableWithPagination from '@shared/components/tables/table-with-pagination';
import { default as UserFormModal, type UserFormData } from './pages/components/UserFormModal';
import { PageContainer } from '@/shared/components/PageContainer';
import { FilterHeader } from './pages/components/FilterHeader';
import type { AdminUserRow } from './services/type';
import { useColumns } from './pages/hooks/useColumn';
import { useUesrData } from './pages/hooks/useData';
import useFilter from '@/shared/hooks/useFilter';



const initialFilter = {
  Keyword: "",
  page: 1,
  pageSize: 10,
};




export const AdminUserList = ()=>  {
    const { setFilter, filter, pagination } = useFilter(initialFilter);

  const {data,total,pageIndex,pageSize} = useUesrData(filter);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState<AdminUserRow | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (record: AdminUserRow) => {
    setModalMode('edit');
    setSelectedUser(record);
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSubmit = async (_values: UserFormData) => {
    try {
      void _values;
      setLoading(true);
      message.success(
        modalMode === 'add'
          ? 'Thêm người dùng thành công'
          : 'Cập nhật người dùng thành công'
      );
      handleModalCancel();
    } catch {
      message.error('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleLockUser = (_record: AdminUserRow) => {
    void _record;
    message.success('Khoá tài khoản thành công');
  };

  const {columns} = useColumns({ handleOpenEditModal, handleLockUser });

  return (
    <div style={{ fontSize: 14 }}>
    
        <PageContainer
        breadcrumbItems={[{ title: 'Danh sách tài khoản' }]}
        showNavButtons={false}
        showBreadcrumb={true}
      >
        <FilterHeader handleOpenModal={handleOpenAddModal} setFilter={setFilter}/>
      <TableWithPagination
        columns={columns}
        dataSource={data}
        pagination={pagination(total)}
          paginationBackground="#fff"
        rowKey="id"
          scroll={{ y: "var(--table-body-height-default)" }}
      />
      </PageContainer>

      <UserFormModal
        open={modalOpen}
        mode={modalMode}
        data={selectedUser}
        loading={loading}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
export default AdminUserList;

        
