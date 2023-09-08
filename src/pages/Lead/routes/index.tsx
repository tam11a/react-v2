import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { leadRoutes } from "./leadRoutes";
import NProgressSuspense from "@components/NProgressSuspense";

const LeadRoutes: React.FC = () => {
	return (
		<Routes>
			{leadRoutes?.map?.(({ path, Component }) => (
				<Route
					key={path}
					path={path}
					element={
						<Suspense fallback={<NProgressSuspense />}>
							<Component />
						</Suspense>
					}
				/>
			))}
		</Routes>
	);
};

export default LeadRoutes;
