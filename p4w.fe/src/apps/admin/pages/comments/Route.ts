import { createRoute } from '@tanstack/react-router';
import adminRoute from '@apps/admin/Route';
import { ADMIN_COMMENTS_ROUTE } from '@apps/admin/constants';
import CommentList from '@apps/admin/pages/comments/CommentList';

export const adminCommentListRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: ADMIN_COMMENTS_ROUTE,
  component: CommentList,
});

export default adminCommentListRoute;
