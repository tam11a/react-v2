import { lazy } from "react";
import { PRIVATE_ROUTES } from "./paths";

export const privateRoutes = [
  {
    path: PRIVATE_ROUTES.DASHBOARD,
    Component: lazy(() => import("@pages/Dashboard")),
  },
  {
    path: PRIVATE_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
  {
    path: PRIVATE_ROUTES.LEADS,
    Component: lazy(() => import("@pages/Lead")),
  },
  {
    path: PRIVATE_ROUTES.EMPLOYEES,
    Component: lazy(() => import("@pages/Employees")),
  },
  {
    path: PRIVATE_ROUTES.PROPERTIES,
    Component: lazy(() => import("@pages/Properties")),
  },
  {
    path: PRIVATE_ROUTES.SETTINGS,
    Component: lazy(() => import("@pages/Settings")),
  },
];
