import { lazy } from "react";
import { ROUTES } from "./paths";

export const routes = [
  {
    path: ROUTES.DETAILS,
    Component: lazy(() => import("../pages/Overview")),
  },
  // {
  //   path: ROUTES.PAYROLL,
  //   Component: lazy(() => import("../pages/payroll")),
  // },
  {
    path: ROUTES.UPDATE,
    Component: lazy(() => import("../pages/Update")),
  },
  {
    path: ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
