import { Button, Form, Input } from 'antd';
import { Link } from '@tanstack/react-router'
import * as rules from '@constants/rules';
import { LOGIN_ROUTE } from '@/constants';

export default function ForgotPassword() {
  const isLoading = false;
  const [form] = Form.useForm();
  const handleSubmit = (values:any) => {
    console.log("FORGOT PASS::", values);
  }

  return (
    <div>
      <p style={{ fontSize: '2.4rem', fontWeight: 600, marginBottom: 20 }}>Quên mật khẩu?</p>
      <p style={{ marginBottom: 24 }}>
        Vui lòng nhập email bạn đã đăng ký. Chúng tôi sẽ gửi đường dẫn khởi tạo mật khẩu vào email
        của bạn.
      </p>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="tenDangNhap" rules={[rules.REQUIRED]}>
          <Input placeholder="Tên đăng nhập" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="email" rules={[rules.REQUIRED, rules.EMAIL_FORMAT]}>
          <Input placeholder="Email" style={{ width: '100%' }} />
        </Form.Item>

        <div style={{ marginTop: '2rem' }}>
          <Button htmlType="submit" type="primary" loading={isLoading} block>
            {isLoading ? 'Đang gửi' : 'Gửi email'}
          </Button>
        </div>
      </Form>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <button style={{ color: 'var(--primary)' }}>
          <Link to={LOGIN_ROUTE}>Quay lại đăng nhập</Link>
        </button>
      </div>
    </div>
  );
} 