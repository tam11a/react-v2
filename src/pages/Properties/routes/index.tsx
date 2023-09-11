import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { propertyRoutes } from "./propertyRoutes";
import NProgressSuspense from "@components/NProgressSuspense";

const PropertyRoutes: React.FC = () => {
  return (
    <Routes>
      {propertyRoutes?.map?.(({ path, Component }) => (
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

export default PropertyRoutes;
