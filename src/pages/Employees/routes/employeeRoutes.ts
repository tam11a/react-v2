import { lazy } from "react";
import { EMPLOYEE_ROUTES } from "./path";

export const employeeRoutes = [
  {
    path: EMPLOYEE_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: EMPLOYEE_ROUTES.CREATE,
    Component: lazy(() => import("../pages/Create")),
  },
  {
    path: EMPLOYEE_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
];
