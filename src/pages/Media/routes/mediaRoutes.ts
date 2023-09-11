import { lazy } from "react";
import { MEDIA_ROUTES } from "./path";

export const mediaRoutes = [
  {
    path: MEDIA_ROUTES.ROOT,
    Component: lazy(() => import("../pages/All")),
  },
  {
    path: MEDIA_ROUTES.CREATE,
    Component: lazy(() => import("../pages/Create")),
  },
  {
    path: MEDIA_ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
];
