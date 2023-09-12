import React from "react";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "./routes/paths";

const items: MenuProps["items"] = [
  {
    label: "Overview",
    key: ROUTES.OVERVIEW,
  },
  {
    label: "Documents",
    key: 2,
    disabled: true,
  },
  {
    label: "Reports",
    key: 3,
    disabled: true,
  },
];

const Navigator: React.FC = () => {
  // To get the current location pathname
  let location = useLocation();

  // To route
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  // const { data } = useGetEmployeesById(params.id);

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-2 p-3 text-text">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-2 border-b">
        <Menu
          onClick={onClick}
          selectedKeys={[location.pathname?.split?.("/")[2] || ""]}
          mode="horizontal"
          items={items}
          className={"border-b-0 w-full max-w-md"}
        />
        {/* <DatePicker.RangePicker
          bordered={false}
          size={"large"}
          allowClear
          allowEmpty={[false, false]}
        /> */}
      </div>
    </>
  );
};

export default Navigator;
