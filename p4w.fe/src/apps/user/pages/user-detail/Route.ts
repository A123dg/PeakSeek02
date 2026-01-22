import { createRoute } from '@tanstack/react-router'
import userRoute from '@apps/user/Route';
import UserDetail from '@/apps/user/pages/user-detail/UserDetail';
import { USER_DETAIL_ROUTE } from '@apps/user/constants'

export const userDetailRoute = createRoute({
  getParentRoute: () => userRoute,
  path: USER_DETAIL_ROUTE,
  component: UserDetail,
})

export default userDetailRoute;