import { lazy } from "react";
import { LEAD_ROUTES } from "./path";

export const leadRoutes = [
	{
		path: LEAD_ROUTES.ROOT,
		Component: lazy(() => import("../pages/All")),
	},
];
