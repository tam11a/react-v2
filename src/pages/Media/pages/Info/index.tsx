import React from "react";
import Navigator from "./Navigator";
import MediaDetailsRoutes from "./routes";

const DetailsInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <MediaDetailsRoutes />
    </>
  );
};

export default DetailsInfo;
