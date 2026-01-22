import { createRoute } from '@tanstack/react-router'
import { authdRoute } from '@apps/auth/Route';
import Login from '@apps/auth/pages/login/Login';
import { LOGIN_ROUTE } from '@apps/auth/constants'

export const loginRoute = createRoute({
  getParentRoute: () => authdRoute,
  path: LOGIN_ROUTE,
  component: Login,
})

export default loginRoute;