import { Col, Divider, Row } from 'antd';
import { Outlet } from '@tanstack/react-router';
import { Wrapper, FormWrapper }  from '@apps/auth/styled';
import bg from '@assets/images/login_bg.png';
import logo from '@assets/images/ViDoc_logo.png';

/**
 * @page Auth Login
 * @description Màn hình đăng nhập
 * @author huynhnd
 * @date 29/10/2025
 */
export default function Login() {
  return (
    <Wrapper>
      <Row>
        <Col xs={14}>
          <img src={bg} alt="" style={{ width: '100%', height: '100%' }} />
        </Col>
        <Col xs={10}>
          <FormWrapper>
            <div>
              <img src={logo} alt="logo" />
            </div>
            <div>
              <Divider />
              <Outlet />
            </div>
          </FormWrapper>
        </Col>
      </Row>
    </Wrapper>
  );
}