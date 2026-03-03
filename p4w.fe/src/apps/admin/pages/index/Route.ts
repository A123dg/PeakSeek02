import { createRoute, redirect } from '@tanstack/react-router';
import adminRoute from '@apps/admin/Route';
import { ADMIN_BASE_ROUTE, ADMIN_REVIEWS_ROUTE } from '@apps/admin/constants';

export const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: ADMIN_BASE_ROUTE,
  beforeLoad: async () => {
    throw redirect({ to: ADMIN_REVIEWS_ROUTE });
  },
});

export default adminIndexRoute;

