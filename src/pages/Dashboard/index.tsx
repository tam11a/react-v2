import React from "react";
import DashboardRoutes from "./routes";
import Navigator from "./Navigator";

const Dashboard: React.FC = () => {
  return (
    <>
      <Navigator />
      <DashboardRoutes />
    </>
  );
};

export default Dashboard;
