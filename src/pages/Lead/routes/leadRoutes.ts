import { lazy } from "react";
import { LEAD_ROUTES } from "./path";

export const leadRoutes = [
  {
    path: LEAD_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: LEAD_ROUTES.CREATE,
    Component: lazy(() => import("../pages/Create")),
  },
  {
    path: LEAD_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
];
