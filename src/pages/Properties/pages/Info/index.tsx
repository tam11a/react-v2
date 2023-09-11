import React from "react";
import Navigator from "./Navigator";
import EmployeeDetailsRoutes from "./routes";

const DetailsInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <EmployeeDetailsRoutes />
    </>
  );
};

export default DetailsInfo;
