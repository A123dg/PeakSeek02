import { createRoute } from '@tanstack/react-router';
import adminRoute from '@apps/admin/Route';
import { ADMIN_BASE_ROUTE } from '@apps/admin/constants';
import AdminDashboard from '@apps/admin/pages/index/AdminDashboard';

export const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: ADMIN_BASE_ROUTE,
  component: AdminDashboard,
});

export default adminIndexRoute;

