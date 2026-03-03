import { createRoute } from '@tanstack/react-router';
import { ADMIN_REVIEWS_ROUTE } from '@apps/admin/constants';
import adminRoute from '@apps/admin/Route';
import ReviewList from '@apps/admin/pages/reviews/ReviewList';

export const adminReviewListRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: ADMIN_REVIEWS_ROUTE,
  component: ReviewList,
});

export default adminReviewListRoute;

