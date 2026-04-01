import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/Route';
import AdminLayout from '@apps/admin/components/AdminLayout';
import adminIndexRoute from '@apps/admin/pages/index/Route';
import adminCommentListRoute from '@apps/admin/pages/comments/Route';
import adminReviewListRoute from '@apps/admin/pages/reviews/Route';
import adminLocationListRoute from '@apps/admin/pages/locations/Route';
import adminUserListRoute from '@apps/admin/pages/users/Route';
import adminReportListRoute from '@apps/admin/pages/reports/Route';

const ADMIN_LAYOUT = '_adminLayout';

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: ADMIN_LAYOUT,
  component: AdminLayout,
});

adminRoute.addChildren([
  adminIndexRoute,
  adminCommentListRoute,
  adminReviewListRoute,
  adminLocationListRoute,
  adminUserListRoute,
  adminReportListRoute,
]);

export default adminRoute;

