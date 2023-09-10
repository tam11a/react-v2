import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { employeeRoutes } from "./employeeRoutes";
import NProgressSuspense from "@components/NProgressSuspense";

const EmployeeRoutes: React.FC = () => {
  return (
    <Routes>
      {employeeRoutes?.map?.(({ path, Component }) => (
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

export default EmployeeRoutes;
