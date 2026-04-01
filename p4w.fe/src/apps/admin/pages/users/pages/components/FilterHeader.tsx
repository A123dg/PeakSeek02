import useDebounce from "@/shared/hooks/useDebounce";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import type { ReactNode } from "react";
import { ListPageFilters, ListPageHeader } from "@/apps/admin/components/listPageHeader";

const ROLE_OPTIONS = [
  { value: "8acea62a-e03e-47b9-89e5-9e4320085d7d", label: "Admin" },
  { value: "f8d2ee70-5c68-4390-a18e-11943a86142a", label: "Người dùng" },
];

const STATUS_OPTIONS = [
  { value: 1, label: "Hoạt động" },
  { value: 0, label: "Không hoạt động" },
  { value: 3, label: "Khoa" },
];

interface FilterHeaderProps {
  setFilter: (filter: any) => void;
  extraAction?: ReactNode;
}

export const FilterHeader = ({ setFilter, extraAction }: FilterHeaderProps) => {
  const debounce = useDebounce();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debounce(() => {
      setFilter((prev: any) => ({
        ...prev,
        search: value,
        page: 1,
      }));
    });
  };

  return (
    <ListPageHeader>
      <ListPageFilters>
        <Input
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          placeholder="Tìm theo tên / email..."
          allowClear
          style={{ width: 260 }}
          onChange={handleTextChange}
        />
        <Select
          placeholder="Vai tro"
          allowClear
          style={{ width: 150 }}
          options={ROLE_OPTIONS}
          onChange={(value) =>
            setFilter((prev: any) => ({
              ...prev,
              roleId: value,
              page: 1,
            }))
          }
        />
        <Select
          placeholder="Trang thai"
          allowClear
          style={{ width: 150 }}
          options={STATUS_OPTIONS}
          onChange={(value) =>
            setFilter((prev: any) => ({
              ...prev,
              status: value,
              page: 1,
            }))
          }
        />
      </ListPageFilters>

      {extraAction}
    </ListPageHeader>
  );
};

