import { lazy } from "react";
import { PROPERTY_ROUTES } from "./path";

export const propertyRoutes = [
  {
    path: PROPERTY_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: PROPERTY_ROUTES.CREATELAND,
    Component: lazy(() => import("../pages/CreateLand")),
  },
  {
    path: PROPERTY_ROUTES.CREATEFLAT,
    Component: lazy(() => import("../pages/CreateFlat")),
  },
  {
    path: PROPERTY_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
];
