import { createRoute } from '@tanstack/react-router'
import { rootRoute } from "@/Route";
import Dashboard from "@apps/dashboard";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
})

export default dashboardRoute;