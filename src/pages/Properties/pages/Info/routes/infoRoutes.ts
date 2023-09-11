import { lazy } from "react";
import { ROUTES } from "./paths";

export const routes = [
  {
    path: ROUTES.OVERVIEW,
    Component: lazy(() => import("../pages/Overview")),
  },
  // {
  //   path: ROUTES.PAYROLL,
  //   Component: lazy(() => import("../pages/payroll")),
  // },
  {
    path: ROUTES.UPDATELAND,
    Component: lazy(() => import("../pages/UpdateLand")),
  },
  {
    path: ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
