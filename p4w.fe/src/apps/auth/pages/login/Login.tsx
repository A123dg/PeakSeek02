import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Button, Form, Input, Space, Typography } from 'antd';
import * as rules from '@constants/rules';
import { FORGOT_PASSWORD_ROUTE } from '@constants/index';
import useHandleLogin from '@apps/auth/hooks/useHandleLogin';
import useCheckLogin from "@/shared/hooks/useCheckLogin";
import { handleRedirect } from "@shared/utils";

export default function Login() {
  const [form] = Form.useForm();
  const { isLogin } = useCheckLogin();
  const { isLoading, handleSubmit } = useHandleLogin();

  useEffect(() => {
    if(isLogin) handleRedirect();
  }, [isLogin]);

  return (
    <div>
      <Typography.Title level={3}>Đăng nhập</Typography.Title>
      <Form form={form} onFinish={handleSubmit} style={{ width: '100%' }}>
        <Form.Item rules={[rules.REQUIRED]} name="account">
          <Input placeholder="Tài khoản" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item rules={[rules.REQUIRED]} name="password">
          <Input.Password placeholder="Mật khẩu" style={{ width: '100%' }} />
        </Form.Item>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Button htmlType="submit" type="primary" block loading={isLoading}>
            Đăng nhập
          </Button>

          <Space style={{ justifyContent: 'center', width: '100%' }}>
            <button type="button" style={{ color: 'var(--primary)' }}>
              <Link to={FORGOT_PASSWORD_ROUTE as string} >Quên mật khẩu?</Link>
            </button>
          </Space>
        </Space>
      </Form>
    </div>
  );
}