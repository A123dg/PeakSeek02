import { useState } from "react";
import { Form } from "antd";

type TFilterSearch = { setFilter: (filter:any) => void;
    initialFilter?: any;
 }

export const useFilterSearch = ({setFilter, initialFilter}: TFilterSearch) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  
  const [form] = Form.useForm();

  const showFilter = () => setVisible(true);
  const closeFilter = () => setVisible(false);

  const resetFilter = () => {
    form.resetFields(); 
    setFilter(initialFilter || {});
  };
  return {
    visible,
    form,
    showFilter,
    closeFilter,
    resetFilter,
    open,setOpen
  };
};