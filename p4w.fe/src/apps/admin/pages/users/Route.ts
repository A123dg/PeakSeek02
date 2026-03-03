import { createRoute } from '@tanstack/react-router';
import { ADMIN_USERS_ROUTE } from '@apps/admin/constants';
import adminRoute from '@apps/admin/Route';
import AdminUserList from '@apps/admin/pages/users/AdminUserList';

export const adminUserListRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: ADMIN_USERS_ROUTE,
  component: AdminUserList,
});

export default adminUserListRoute;

