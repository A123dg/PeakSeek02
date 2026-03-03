import { Outlet, Link } from '@tanstack/react-router';
import styled from 'styled-components';
import {
  ADMIN_REVIEWS_ROUTE,
  ADMIN_LOCATIONS_ROUTE,
  ADMIN_USERS_ROUTE,
  ADMIN_REPORTS_ROUTE,
} from '@apps/admin/constants';

const LayoutWrapper = styled.div`
  display: flex;
  height: var(--device-height, 100vh);
  background: #f5f7fb;
  color: #1f2933;
  font-size: 14px;
`;

const Sidebar = styled.aside`
  width: 260px;
  background: linear-gradient(180deg, #b793ff 0%, #8f63ff 100%);
  color: #ffffff;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Brand = styled.div`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuSectionTitle = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 4px;
`;

const MenuItem = styled(Link)`
  padding: 10px 12px;
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s ease, transform 0.1s ease;

  &[data-status='active'] {
    background: rgba(255, 255, 255, 0.18);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(2px);
  }
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding: 24px 32px;
  overflow: auto;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TopBarTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
`;

const ContentCard = styled.section`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const ContentTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const ContentSubtitle = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

export interface AdminLayoutProps {
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({ title, subtitle }: AdminLayoutProps) {
  return (
    <LayoutWrapper>
      <Sidebar>
        <Brand>P4WS Admin</Brand>

        <div>
          <MenuSectionTitle>Quản lý</MenuSectionTitle>
          <Menu>
            <MenuItem
              to={ADMIN_REVIEWS_ROUTE}
              activeProps={{ ['data-status']: 'active' }}
            >
              <span>Đánh giá</span>
            </MenuItem>
            <MenuItem
              to={ADMIN_LOCATIONS_ROUTE}
              activeProps={{ ['data-status']: 'active' }}
            >
              <span>Địa điểm</span>
            </MenuItem>
            <MenuItem
              to={ADMIN_USERS_ROUTE}
              activeProps={{ ['data-status']: 'active' }}
            >
              <span>Người dùng</span>
            </MenuItem>
            <MenuItem
              to={ADMIN_REPORTS_ROUTE}
              activeProps={{ ['data-status']: 'active' }}
            >
              <span>Báo cáo vi phạm</span>
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>

      <ContentWrapper>
        <TopBar>
          <TopBarTitle>{title || 'Bảng điều khiển'}</TopBarTitle>
          <TopBarRight>
            <span>Admin</span>
          </TopBarRight>
        </TopBar>

        <ContentCard>
          <ContentHeader>
            <ContentTitle>{title || 'Tổng quan'}</ContentTitle>
            {subtitle && <ContentSubtitle>{subtitle}</ContentSubtitle>}
          </ContentHeader>

          <Outlet />
        </ContentCard>
      </ContentWrapper>
    </LayoutWrapper>
  );
}

