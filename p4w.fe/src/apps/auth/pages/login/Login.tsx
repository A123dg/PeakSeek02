import { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import useCheckLogin from '@/shared/hooks/useCheckLogin';
import tokenManager from '@utils/tokenManager';
import { handleRedirect } from '@shared/utils';
import * as rules from '@constants/rules';
import { FORGOT_PASSWORD_ROUTE } from '@constants/index';

export default function Login() {
  const { isLogin } = useCheckLogin();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isLogin) handleRedirect();
  }, [isLogin]);

  const handleFakeLogin = () => {
    // Fake token để vượt qua guard beforeLoad
    tokenManager.setAccessToken('fake-admin-token');
    tokenManager.setRefreshToken('fake-refresh-token');
    handleRedirect();
  };

  return (
    <div
      style={{
        minHeight: 'var(--device-height)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px 40px',
        backgroundColor: '#faf7ff',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 20,
          padding: '40px 56px 40px',
          width: '100%',
          maxWidth: 520,
          boxShadow: '0 22px 60px rgba(129, 140, 248, 0.24)',
          textAlign: 'left',
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: 4,
            fontSize: 24,
            fontWeight: 600,
            color: '#7f1d3d',
          }}
        >
          Đăng nhập để tiếp tục
        </h3>
        <p
          style={{
            margin: 0,
            marginBottom: 24,
            fontSize: 14,
            color: '#8C80CC',
          }}
        >
          Nhập tên đăng nhập để truy cập hệ thống quản lý điều hành của bạn.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFakeLogin}
          style={{ marginTop: 12, textAlign: 'left' }}
        >
          <Form.Item
            name="username"
            label={
              <span
                style={{
                  fontWeight: 600,
                  color: '#7f1d3d',
                }}
              >
                Tên tài khoản{' '}
                <span style={{ color: '#e11d48' }}>*</span>
              </span>
            }
            rules={[rules.REQUIRED]}
            style={{ marginBottom: 12 }}
          >
            <Input placeholder="Nhập tên tài khoản" />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span
                style={{
                  fontWeight: 600,
                  color: '#7f1d3d',
                }}
              >
                Mật khẩu <span style={{ color: '#e11d48' }}>*</span>
              </span>
            }
            rules={[rules.REQUIRED]}
            style={{ marginBottom: 8 }}
          >
            <Input.Password
              placeholder="Mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            style={{
              borderRadius: 10,
              height: 46,
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
              <Link to={FORGOT_PASSWORD_ROUTE as string}>Quên mật khẩu?</Link>
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