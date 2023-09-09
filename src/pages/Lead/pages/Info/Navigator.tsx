import React from "react";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import DropDown from "./dropdown";

const items: MenuProps["items"] = [
  {
    label: "New",
    key: 1,
  },
  {
    label: "Highest",
    key: 2,
  },
  {
    label: "Transfer",
    key: 3,
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

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">Lead Details</h1>

        <div className="flex flex-row gap-2 md:items-center  justify-center ">
          <DropDown />
          <Button
            type="primary"
            size="large"
            className="bg-[#E7F5FC] text-text-light"
            block
          >
            Highest
          </Button>
          <Button
            type="primary"
            size="large"
            className="bg-[#E7F5FC]  text-text-light"
            block
          >
            Transfer
          </Button>
          <Menu
            onClick={onClick}
            selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
            mode="horizontal"
            items={items}
            className={"border-b-0 w-fit max-w-md"}
          />
        </div>
      </div>
    </>
  );
};

export default Navigator;
