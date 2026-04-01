import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import useCheckLogin from '@/shared/hooks/useCheckLogin';
import { handleRedirect } from '@shared/utils';
import * as rules from '@constants/rules';
import useHandleLogin from '@apps/auth/hooks/useHandleLogin';
import type { TLoginRequest } from '@apps/auth/services';

export default function Login() {
  const { isLogin } = useCheckLogin();
  const { handleSubmit, isLoading } = useHandleLogin();
  const [form] = Form.useForm<TLoginRequest>();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLogin) handleRedirect();
  }, [isLogin]);

  return (
    <div
      style={{
        minHeight: 'var(--device-height)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        backgroundColor: '#faf7ff',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 20,
          padding: '44px 64px',
          width: '100%',
          maxWidth: 620,
          boxShadow: '0 22px 60px rgba(129, 140, 248, 0.24)',
          textAlign: 'left',
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: 6,
            fontSize: 28,
            fontWeight: 700,
            color: '#7f1d3d',
          }}
        >
          Đăng nhập để tiếp tục
        </h3>
        <p
          style={{
            margin: 0,
            marginBottom: 28,
            fontSize: 14,
            color: '#8c80cc',
          }}
        >
          Nhập tài khoản để truy cập hệ thống quản lý điều hành của bạn.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 12, textAlign: 'left', width: '100%' }}
        >
          <Form.Item
            name="userName"
            label={
              <span
                style={{
                  fontWeight: 600,
                  color: '#7f1d3d',
                }}
              >
                Tài khoản
              </span>
            }
            rules={[rules.REQUIRED]}
            style={{ marginBottom: 16, width: '100%' }}
          >
            <Input
              placeholder="Nhập tài khoản"
              style={{
                width: '100%',
                height: 48,
                borderRadius: 12,
                paddingInline: 14,
              }}
            />
          </Form.Item>

          <Form.Item
  name="password"
  label={
    <span style={{ fontWeight: 600, color: '#7f1d3d' }}>
      Mật khẩu
    </span>
  }
  rules={[rules.REQUIRED]}
  style={{ marginBottom: 12, width: '100%' }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: 48,
      borderRadius: 12,
      border: '1px solid #d9d9d9',
      paddingInline: 14,
      backgroundColor: '#fff',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s',
    }}
  >
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Nhập mật khẩu"
      style={{
        flex: 1,
        border: 'none',
        outline: 'none',
        fontSize: 14,
        background: 'transparent',
        color: '#000',
      }}
      onChange={(e) => form.setFieldValue('password', e.target.value)}
    />
    <span
      onClick={() => setShowPassword((prev) => !prev)}
      style={{ cursor: 'pointer', color: '#8c80cc', display: 'flex', alignItems: 'center' }}
    >
      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
    </span>
  </div>
</Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            loading={isLoading}
            style={{
              borderRadius: 12,
              height: 48,
              fontWeight: 600,
              marginTop: 12,
              backgroundColor: 'var(--purple)',
              borderColor: 'var(--purple)',
            }}
          >
            Đăng nhập
          </Button>

          <div
            style={{
              marginTop: 12,
              textAlign: 'left',
              fontSize: 13,
            }}
          >
            <button
              type="button"
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                color: '#7f1d3d',
                cursor: 'pointer',
              }}
            >
              {/* <Link to={FORGOT_PASSWORD_ROUTE as string}>Quên mật khẩu?</Link> */}
            </button>
          </div>
        </Form>
      </div>

      <div
        style={{
          fontSize: 13,
          color: '#6b7280',
          textAlign: 'center',
          marginTop: 32,
        }}
      >
        Quản lý người dùng
      </div>
    </div>
  );
}
