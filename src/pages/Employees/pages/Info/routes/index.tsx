import NProgressSuspense from "@components/NProgressSuspense";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./infoRoutes";

const LeadDetailsRoutes: React.FC = () => {
  return (
    <Routes>
      {routes?.map?.(({ path, Component }) => (
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

export default LeadDetailsRoutes;
