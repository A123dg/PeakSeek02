import { useEffect, useState } from 'react';
import { Outlet, Link } from '@tanstack/react-router';
import { Avatar, Dropdown } from 'antd';
import {
  DownOutlined,
  EnvironmentOutlined,
  FileSearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import styled, { css } from 'styled-components';
import {
  ADMIN_LOCATIONS_ROUTE,
  ADMIN_REPORTS_ROUTE,
  ADMIN_REVIEWS_ROUTE,
  ADMIN_USERS_ROUTE,
} from '@apps/admin/constants';
import { useGetUserInfo } from '@/shared/services/query';

const MOBILE_BREAKPOINT = 992;
const PRIMARY_COLOR = '#8c80cc';

type AdminHeaderUser = {
  username?: string;
  tenDangNhap?: string;
  hoTen?: string;
  avatar?: string;
  anhDaiDien?: string;
};

const navigationItems = [
  {
    to: ADMIN_REVIEWS_ROUTE,
    label: 'Đánh giá',
    icon: MessageOutlined,
  },
  {
    to: ADMIN_LOCATIONS_ROUTE,
    label: 'Địa điểm',
    icon: EnvironmentOutlined,
  },
  {
    to: ADMIN_USERS_ROUTE,
    label: 'Người dùng',
    icon: TeamOutlined,
  },
  {
    to: ADMIN_REPORTS_ROUTE,
    label: 'Báo cáo vi phạm',
    icon: FileSearchOutlined,
  },
] as const;

const LayoutWrapper = styled.div`
  display: flex;
  min-height: var(--device-height, 100vh);
`;

const SidebarBackdrop = styled.button<{ $visible: boolean }>`
  display: none;

  @media (max-width: 991px) {
    ${({ $visible }) =>
      $visible &&
      css`
        display: block;
        position: fixed;
        inset: 0;
        border: 0;
        background: rgba(12, 18, 31, 0.48);
        backdrop-filter: blur(4px);
        z-index: 20;
      `}
  }
`;

const Sidebar = styled.aside<{ $collapsed: boolean; $mobileOpen: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '9.2rem' : '28.2rem')};
  min-width: ${({ $collapsed }) => ($collapsed ? '9.2rem' : '28.2rem')};
  background: linear-gradient(180deg, #1b2334 0%, #253047 100%);
  color: #ffffff;
  padding: 2rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 0;
  height: 100vh;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 18px 0 40px rgba(15, 23, 42, 0.12);
  transition:
    width 0.24s ease,
    min-width 0.24s ease,
    transform 0.24s ease;
  z-index: 30;
  overflow: hidden;

  @media (max-width: 991px) {
    width: min(28.2rem, 86vw);
    min-width: min(28.2rem, 86vw);
    position: fixed;
    left: 0;
    transform: translateX(${({ $mobileOpen }) => ($mobileOpen ? '0' : '-100%')});
    border-radius: 0 2rem 2rem 0;
  }
`;

const SidebarHeader = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  gap: 1.2rem;
`;

const Brand = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.3rem;
  min-width: 0;
`;

const BrandMark = styled.div`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 1.6rem;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, #cbc4ef 0%, ${PRIMARY_COLOR} 100%);
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  box-shadow: 0 14px 28px rgba(140, 128, 204, 0.28);
`;

const BrandText = styled.div<{ $collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  max-width: ${({ $collapsed }) => ($collapsed ? '0' : '16rem')};
  overflow: hidden;
  transition:
    opacity 0.18s ease,
    max-width 0.24s ease;
  white-space: nowrap;
`;

const BrandTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`;

const BrandSubtitle = styled.span`
  font-size: 1.15rem;
  color: rgba(230, 235, 245, 0.78);
`;

const SidebarToggleButton = styled.button<{ $floating?: boolean }>`
  width: 4rem;
  height: 4rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: #f8fafc;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(140, 128, 204, 0.58);
    transform: translateY(-1px);
  }

  ${({ $floating }) =>
    $floating &&
    css`
      background: #ffffff;
      color: #334155;
      border-color: rgba(203, 213, 225, 0.9);
      box-shadow: 0 16px 30px rgba(15, 23, 42, 0.08);
    `}
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  flex: 1;
`;

const MenuSectionTitle = styled.div<{ $collapsed: boolean }>`
  padding: 0 0.4rem;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(226, 232, 240, 0.38);
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  max-height: ${({ $collapsed }) => ($collapsed ? '0' : '2rem')};
  overflow: hidden;
  transition:
    opacity 0.18s ease,
    max-height 0.24s ease;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MenuItem = styled(Link)<{ $collapsed: boolean }>`
  padding: ${({ $collapsed }) => ($collapsed ? '1.2rem' : '1.4rem 1.6rem')};
  border-radius: 2rem;
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};
  gap: ${({ $collapsed }) => ($collapsed ? '0' : '1.2rem')};
  border: 1px solid
    ${({ $collapsed }) =>
      $collapsed ? 'transparent' : 'rgba(255, 255, 255, 0.05)'};
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.16s ease;

  &[data-status='active'] {
    background: ${({ $collapsed }) =>
      $collapsed
        ? 'transparent'
        : 'linear-gradient(135deg, rgba(109, 103, 167, 0.92) 0%, rgba(92, 87, 148, 0.88) 100%)'};
    border-color: ${({ $collapsed }) =>
      $collapsed ? 'transparent' : 'rgba(157, 144, 226, 0.42)'};
    box-shadow: ${({ $collapsed }) =>
      $collapsed ? 'none' : 'inset 0 1px 0 rgba(255, 255, 255, 0.04)'};
  }

  &[data-status='active'] [data-menu-icon='true'] {
    color: #ffffff;
    background: ${({ $collapsed }) =>
      $collapsed
        ? 'linear-gradient(135deg, rgba(140, 128, 204, 0.98) 0%, rgba(114, 104, 184, 0.92) 100%)'
        : 'rgba(255, 255, 255, 0.16)'};
    border-color: rgba(183, 171, 244, 0.42);
    box-shadow:
      0 10px 20px rgba(140, 128, 204, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${({ $collapsed }) =>
      $collapsed ? 'transparent' : 'rgba(255, 255, 255, 0.08)'};
    transform: translateX(2px);
  }

  @media (max-width: 991px) {
    &:hover {
      transform: none;
    }
  }
`;

const MenuItemLeading = styled.span<{ $collapsed: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  gap: 1.2rem;
  min-width: 0;
  width: ${({ $collapsed }) => ($collapsed ? 'auto' : '100%')};
  flex: ${({ $collapsed }) => ($collapsed ? '0 0 auto' : '1')};
`;

const MenuItemIcon = styled.span.attrs(() => ({
  'data-menu-icon': 'true',
} as Record<string, string>))`
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 1.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.92);
`;

const MenuItemText = styled.span<{ $collapsed: boolean }>`
  min-width: 0;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  max-width: ${({ $collapsed }) => ($collapsed ? '0' : '14rem')};
  overflow: hidden;
  transition:
    opacity 0.18s ease,
    max-width 0.24s ease;
  white-space: nowrap;
`;

const MenuItemTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f8fafc;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MenuItemArrow = styled.span<{ $collapsed: boolean }>`
  font-size: 1.9rem;
  font-weight: 700;
  color: rgba(231, 236, 245, 0.56);
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  max-width: ${({ $collapsed }) => ($collapsed ? '0' : '2rem')};
  overflow: hidden;
  transition:
    opacity 0.18s ease,
    max-width 0.24s ease;
`;

const SidebarFooter = styled.div<{ $collapsed: boolean }>`
  display: flex;
  justify-content: center;
  padding-top: 0.8rem;
`;

const ContentWrapper = styled.main<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media (min-width: 992px) {
    padding: ${({ $sidebarCollapsed }) =>
      $sidebarCollapsed ? '2rem 2rem 2rem 1.6rem' : '2.4rem'};
  }

  @media (max-width: 991px) {
    padding: 1.6rem;
  }
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
`;

const UserSummary = styled.div`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  min-width: 0;
  padding: 0.8rem 1.2rem 0.8rem 0.8rem;
  border-radius: 1.8rem;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.06);
  cursor: pointer;
`;

const UserSummaryCaret = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const UserLabel = styled.span`
  font-size: 1.15rem;
  color: #64748b;
`;

const UserName = styled.span`
  font-size: 1.45rem;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropdownPanel = styled.div`
  width: 26rem;
  padding: 1.2rem;
  border-radius: 1.8rem;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 20px 44px rgba(15, 23, 42, 0.12);
`;

const DropdownUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.4rem;
  margin-bottom: 1.2rem;
`;

const DropdownUserMeta = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const DropdownUserTitle = styled.span`
  font-size: 1.45rem;
  font-weight: 700;
  color: #0f172a;
`;

const DropdownUserHint = styled.span`
  font-size: 1.2rem;
  color: #64748b;
`;

const DropdownActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const DropdownActionButton = styled.button`
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
  background: #f8fafc;
  color: #0f172a;
  font-size: 1.35rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #f1f5f9;
    border-color: rgba(140, 128, 204, 0.35);
    transform: translateY(-1px);
  }
`;

const ContentSurface = styled.div`
  min-height: calc(100vh - 4rem);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(10px);

  @media (max-width: 991px) {
    min-height: calc(100vh - 3.2rem);
  }
`;

const ContentCard = styled.section`
  background: #ffffff;
  border-radius: 2rem;
  padding: 2.4rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.06);
`;

export interface AdminLayoutProps {
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({ title, subtitle }: AdminLayoutProps) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { data: userInfo } = useGetUserInfo();
  const currentUser = (userInfo ?? {}) as AdminHeaderUser;

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = event.matches;
      setIsMobile(matches);
      setMobileSidebarOpen(false);

      if (matches) {
        setSidebarCollapsed(false);
      }
    };

    handleChange(mediaQuery);
    const listener = (event: MediaQueryListEvent) => handleChange(event);
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileSidebarOpen ? 'hidden' : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobile, mobileSidebarOpen]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen((current) => !current);
      return;
    }

    setSidebarCollapsed((current) => !current);
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  void title;
  void subtitle;

  const displayName =
    currentUser.username ||
    currentUser.tenDangNhap ||
    currentUser.hoTen ||
    'Admin';
  const avatarSrc = currentUser.avatar || currentUser.anhDaiDien;
  const avatarFallback = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  const dropdownContent = (
    <DropdownPanel>
      <DropdownUserInfo>
        <Avatar
          size={48}
          src={avatarSrc}
          style={{
            background: 'linear-gradient(135deg, #cbc4ef 0%, #8c80cc 100%)',
            color: '#ffffff',
            fontWeight: 700,
          }}
        >
          {!avatarSrc ? avatarFallback : null}
        </Avatar>

        <DropdownUserMeta>
          <DropdownUserTitle>{displayName}</DropdownUserTitle>
          <DropdownUserHint>Tài khoản quản trị</DropdownUserHint>
        </DropdownUserMeta>
      </DropdownUserInfo>

      <DropdownActions>
        <DropdownActionButton type="button">Thông tin cá nhân</DropdownActionButton>
        <DropdownActionButton type="button">Đăng xuất</DropdownActionButton>
      </DropdownActions>
    </DropdownPanel>
  );

  return (
    <LayoutWrapper>
      <SidebarBackdrop
        aria-label="Close sidebar"
        $visible={mobileSidebarOpen}
        onClick={() => setMobileSidebarOpen(false)}
      />

      <Sidebar $collapsed={!isMobile && sidebarCollapsed} $mobileOpen={mobileSidebarOpen}>
        <SidebarHeader $collapsed={!isMobile && sidebarCollapsed}>
          <Brand $collapsed={!isMobile && sidebarCollapsed}>
            <BrandMark>P4</BrandMark>
            <BrandText $collapsed={!isMobile && sidebarCollapsed}>
              <BrandTitle>P4WS Admin</BrandTitle>
              <BrandSubtitle>Dashboard</BrandSubtitle>
            </BrandText>
          </Brand>
        </SidebarHeader>

        <MenuSection>
          <MenuSectionTitle $collapsed={!isMobile && sidebarCollapsed}>
            Quản lý
          </MenuSectionTitle>

          <Menu>
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <MenuItem
                  key={item.to}
                  $collapsed={!isMobile && sidebarCollapsed}
                  activeProps={{ ['data-status']: 'active' }}
                  onClick={handleMenuClick}
                  to={item.to}
                >
                  <MenuItemLeading $collapsed={!isMobile && sidebarCollapsed}>
                    <MenuItemIcon>
                      <Icon />
                    </MenuItemIcon>

                    <MenuItemText $collapsed={!isMobile && sidebarCollapsed}>
                      <MenuItemTitle>{item.label}</MenuItemTitle>
                    </MenuItemText>
                  </MenuItemLeading>

                  <MenuItemArrow $collapsed={!isMobile && sidebarCollapsed}>
                    {'>'}
                  </MenuItemArrow>
                </MenuItem>
              );
            })}
          </Menu>
        </MenuSection>

        <SidebarFooter $collapsed={!isMobile && sidebarCollapsed}>
          <SidebarToggleButton
            aria-label={isMobile ? 'Close sidebar' : 'Toggle sidebar'}
            onClick={handleSidebarToggle}
            type="button"
          >
            {isMobile || !sidebarCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </SidebarToggleButton>
        </SidebarFooter>
      </Sidebar>

      <ContentWrapper $sidebarCollapsed={sidebarCollapsed}>
        <TopBar>
          <SidebarToggleButton
            $floating
            aria-label={isMobile ? 'Open sidebar' : 'Toggle sidebar'}
            onClick={handleSidebarToggle}
            type="button"
          >
            {isMobile ? (
              mobileSidebarOpen ? (
                <MenuFoldOutlined />
              ) : (
                <MenuUnfoldOutlined />
              )
            ) : !sidebarCollapsed ? (
              <MenuFoldOutlined />
            ) : (
              <MenuUnfoldOutlined />
            )}
          </SidebarToggleButton>

          <Dropdown
            open={profileDropdownOpen}
            onOpenChange={setProfileDropdownOpen}
            trigger={['click']}
            popupRender={() => dropdownContent}
          >
            <UserSummary>
              <Avatar
                size={42}
                src={avatarSrc}
                style={{
                  background: 'linear-gradient(135deg, #cbc4ef 0%, #8c80cc 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                }}
              >
                {!avatarSrc ? avatarFallback : null}
              </Avatar>

              <UserText>
                <UserLabel>Tài khoản</UserLabel>
                <UserName>{displayName}</UserName>
              </UserText>

              <UserSummaryCaret $open={profileDropdownOpen}>
                <DownOutlined />
              </UserSummaryCaret>
            </UserSummary>
          </Dropdown>
        </TopBar>

        <ContentSurface>
          <ContentCard>
            <Outlet />
          </ContentCard>
        </ContentSurface>
      </ContentWrapper>
    </LayoutWrapper>
  );
}
