import { Dropdown, MenuProps } from "antd";
import React from "react";

const onMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const DropDown: React.FC = () => {
  const items = [
    {
      key: "1",
      label: "1st item",
    },
    {
      key: "2",
      label: "2nd item",
    },
    {
      key: "3",
      label: "3rd item",
    },
  ];

  return (
    <>
      <Dropdown.Button
        type="primary"
        size="large"
        menu={{ items, onClick: onMenuClick }}
        className="bg-sky-400 rounded "
      >
        New
      </Dropdown.Button>
    </>
  );
};

export default DropDown;
