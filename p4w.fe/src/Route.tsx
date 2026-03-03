import { createRootRoute, createRouter, redirect } from '@tanstack/react-router';
import NotFound404 from '@shared/components/404';
import RootComponent from './RootComponent';
//route
import dashboardRoute from '@apps/dashboard/Route';
import authdRoute from '@apps/auth/Route';
import userRoute from '@apps/user/Route';
import adminRoute from '@apps/admin/Route';
//constant
import { LOGIN_ROUTE } from '@/constants';
import tokenManager from '@utils/tokenManager';

export const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound404,
  beforeLoad: async ({ location }) => {
    const accessToken = tokenManager.getAccessToken();
    const loggedIn = !!accessToken
    if (!loggedIn && !location.pathname.startsWith(LOGIN_ROUTE)) {
      throw redirect({
        to: LOGIN_ROUTE,
        search: {
          redirect: location.href, // lưu lại URL gốc để quay lại sau
        },
      })
    }
  },
})

export const routeTree = rootRoute.addChildren([
  dashboardRoute,
  authdRoute,
  userRoute,
  adminRoute,
])

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
})

export default router;