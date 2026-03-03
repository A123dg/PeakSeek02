import { createRoute } from '@tanstack/react-router';
import { ADMIN_REPORTS_ROUTE } from '@apps/admin/constants';
import adminRoute from '@apps/admin/Route';
import ReportList from '@apps/admin/pages/reports/ReportList';

export const adminReportListRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: ADMIN_REPORTS_ROUTE,
  component: ReportList,
});

export default adminReportListRoute;
