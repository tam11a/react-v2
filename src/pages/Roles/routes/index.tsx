import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { rolesRoutes } from "./rolesRoutes";
import NProgressSuspense from "@components/NProgressSuspense";

const RolesRoutes: React.FC = () => {
  return (
    <Routes>
      {rolesRoutes?.map?.(({ path, Component }) => (
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

export default RolesRoutes;
