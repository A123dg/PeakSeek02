import { createRoute } from '@tanstack/react-router';
import { rootRoute } from "@/Route";
import UserLayout from '@apps/user/components/UserLayout';
import userListRoute from '@apps/user/pages/user-list/Route';
import userDetailRoute from '@apps/user/pages/user-detail/Route';
import NotFound404 from '@shared/components/404'

const USER_LAYOUT = '_userLayout';
export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: USER_LAYOUT,
  component: UserLayout,
  notFoundComponent: NotFound404,
})

userRoute.addChildren([
  userListRoute,
  userDetailRoute
])

export default userRoute;