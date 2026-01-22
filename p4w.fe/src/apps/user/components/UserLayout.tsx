import { Outlet } from '@tanstack/react-router';
import { Wrapper }  from '@apps/auth/styled';
import Nav from "@/shared/components/nav";

/**
 * @page User Layout
 * @description Màn hình user layout
 * @author huynhnd
 * @date 29/10/2025
 */
export default function Login() {
  return (
    <>
      <Nav />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  );
}