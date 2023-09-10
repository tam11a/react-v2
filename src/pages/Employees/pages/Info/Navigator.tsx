import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ROUTES } from "./routes/paths";

const Navigator: React.FC = () => {
  const { id } = useParams();

  const items: MenuProps["items"] = [
    {
      label: "Overview",
      key: ROUTES.OVERVIEW,
      icon: <Icon icon="ph:book-open-duotone" className="text-xl" />,
    },
    {
      label: "Payroll",
      key: ROUTES.PAYROLL,
      disabled: true,
      icon: <Icon icon="mdi:performance" className="text-xl" />,
    },
    {
      label: "Attendance",
      key: ROUTES.ATTENDANCE,
      disabled: true,
      icon: <Icon icon="ic:round-show-chart" className="text-xl" />,
    },
    {
      label: "Update",
      key: `/app/employees/details/${id}/update`,
    },
    {
      label: "View All Employees",
      key: `/app/employees`,
    },
  ];
  // To get the current location pathname

  let location = useLocation();

  // To route
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 px-2 text-text border-b">
        <p className="text-md font-bold">employees / {id}</p>

        <Menu
          onClick={onClick}
          selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
          mode="horizontal"
          items={items}
          className={"border-b-0 w-full max-w-[450px]"}
        />
      </div>
    </>
  );
};

export default Navigator;
