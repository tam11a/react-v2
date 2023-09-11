import { lazy } from "react";
import { PROPERTY_ROUTES } from "./path";

export const propertyRoutes = [
  {
    path: PROPERTY_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: PROPERTY_ROUTES.CREATE,
    Component: lazy(() => import("../pages/Create")),
  },
  {
    path: PROPERTY_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
];
