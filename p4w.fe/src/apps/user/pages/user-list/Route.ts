import { createRoute } from '@tanstack/react-router'
import userRoute from '@apps/user/Route';
import UserList from '@/apps/user/pages/user-list/UserList';
import { USER_LIST_ROUTE } from '@apps/user/constants'

export const userListRoute = createRoute({
  getParentRoute: () => userRoute,
  path: USER_LIST_ROUTE,
  component: UserList,
})

export default userListRoute;