import BaseModal from "@shared/components/modals/index";
import type { ModalProps } from "antd";
import { Col, Row, Spin } from "antd";
import React from "react";
import { StyledForm } from "./styled.ts";

interface IFormItem {
  label?: React.ReactNode;
  name?: string | string[];
  component: React.ReactNode;
  rules?: any[];
  span?: number;
  valuePropName?: string;
  getValueFromEvent?: (e: any) => any;
  raw?: boolean;
}

interface ModalFormProps extends ModalProps {
  loading?: boolean;
  open: boolean;
  isLoadingGetDetail?: boolean;
  title?: React.ReactNode;
  onCancel: () => void;
  onOk: () => void;
  formItems: IFormItem[];
  form?: any;
  okText?: string;
  cancelText?: string;
    children?: React.ReactNode; 
    onFinish?: (values: any) => void;
  width?: number;
  labelCol?: object;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  open,
  title,
  loading,
  isLoadingGetDetail,
  onCancel,
  onOk,
  formItems,
  children,
  form,
  onFinish,
  okText = "Thêm mới",
  cancelText = "Hủy",
  width = 900,
  labelCol,
  ...props
}) => {
  return (
    <BaseModal
      open={open}
      title={title}
      hideModal={onCancel}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      width={width}
      showHeader={true}
      loading={loading}
      destroyOnClose
      {...props}
    >
      {isLoadingGetDetail ? (
        <Spin size="small" style={{ display: "block", margin: "32px auto" }} />
      ) : (
        <StyledForm onFinish={onFinish} form={form} layout="horizontal" requiredMark>
          <Row gutter={[24, 10]}>
            {formItems.map((item, index) =>
              item.raw ? (
                <React.Fragment key={index}>{item.component}</React.Fragment>
              ) : (
                <Col key={index} span={item.span ? item.span : 12}>
                  <StyledForm.Item
                    label={item.label}
                    {...(item.name ? { name: item.name } : {})}
                    rules={item.rules}
                    valuePropName={item.valuePropName}
                    getValueFromEvent={item.getValueFromEvent}
                    labelCol={
                      typeof labelCol === "object"
                        ? labelCol
                        : { flex: "0 0 160px" }
                    }
                    wrapperCol={{ flex: "1" }}
                  >
                    {item.component}
                  </StyledForm.Item>
                </Col>
              )
            )}
          </Row>
                {children}

        </StyledForm>
      )}
    </BaseModal>
  );
};

export default ModalForm;
