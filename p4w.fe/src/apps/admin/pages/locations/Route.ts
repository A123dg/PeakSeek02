import { createRoute } from '@tanstack/react-router';
import { ADMIN_LOCATIONS_ROUTE } from '@apps/admin/constants';
import adminRoute from '@apps/admin/Route';
import LocationList from '@apps/admin/pages/locations/LocationList';

export const adminLocationListRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: ADMIN_LOCATIONS_ROUTE,
  component: LocationList,
});

export default adminLocationListRoute;

