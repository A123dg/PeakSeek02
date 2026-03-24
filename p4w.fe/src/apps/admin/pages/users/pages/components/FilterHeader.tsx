import useDebounce from "@/shared/hooks/useDebounce";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { HeaderContent, WrapFilter } from "./style";

interface FilterHeaderProps {
  handleOpenModal: () => void;
  setFilter: (filter: any) => void;
}

export const FilterHeader = ({ handleOpenModal, setFilter }: FilterHeaderProps) => {
  const debounce = useDebounce();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debounce(() => {
      setFilter((prev: any) => ({
        ...prev,
        Keyword: value,
        page: 1,
      }));
    });
  };

  return (
    <HeaderContent>
      <WrapFilter>
         <Input
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          placeholder="Tìm theo tên / email..."
          allowClear
          style={{ width: 260 }}
          onChange={handleTextChange}
        />
        <Select
          placeholder="Vai trò"
          allowClear
          style={{ width: 150 }}
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'Người dùng' },
          ]}
        />
        <Select
          placeholder="Trạng thái"
          allowClear
          style={{ width: 150 }}
          options={[
            { value: 'active', label: 'Hoạt động' },
            { value: 'pending', label: 'Chưa kích hoạt' },
            { value: 'suspended', label: 'Khoá' },
          ]}
        />
      </WrapFilter>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{
          backgroundColor: '#8c80cc',
          borderColor: '#8c80cc',
          flexShrink: 0,
          height: 36,
        }}
        onClick={handleOpenModal}
      >
        Thêm người dùng
      </Button>
    </HeaderContent>
  );
};