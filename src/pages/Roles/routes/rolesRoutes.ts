import { lazy } from "react";
import { ROLES_ROUTES } from "./path";

export const rolesRoutes = [
  {
    path: ROLES_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: ROLES_ROUTES.CREATE,
    Component: lazy(() => import("../pages/Create")),
  },
  {
    path: ROLES_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
];
