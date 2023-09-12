import React from "react";
import type { MenuProps } from "antd";
import { Alert, Button, Menu } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ROUTES } from "./routes/paths";
import moment from "moment";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { useDeleteRole, useGetRoleById } from "@/queries/roles";

const Navigator: React.FC = () => {
  const { id } = useParams();

  //trash alart
  const { data } = useGetRoleById(id);
  const roleInfo = data?.data?.data;

  const { mutateAsync: deleteRole } = useDeleteRole();

  const onRestore = async (id: any) => {
    message.open({
      type: "loading",
      content: "Restoring Role..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteRole({
        id,
        params: {
          restore: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Role restored successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Overview",
      key: ROUTES.DETAILS,
      icon: <Icon icon="ph:book-open-duotone" className="text-xl" />,
    },
    // {
    //   label: "Performance",
    //   key: ROUTES.PERFORMANCE,
    //   disabled: true,
    //   icon: <Icon icon="mdi:performance" className="text-xl" />,
    // },
    {
      label: "Update",
      key: `/app/roles/details/${id}/update`,
    },
    {
      label: "View All Roles",
      key: `/app/roles`,
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
        <p className="text-md font-bold">Roles / {id}</p>

        <Menu
          onClick={onClick}
          selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
          mode="horizontal"
          items={items}
          className={"border-b-0 w-full max-w-[450px]"}
        />
      </div>
      {roleInfo?.deleted_at && (
        <Alert
          message={`This role was deleted at 
          ${moment(roleInfo?.deleted_at).calendar()}.`}
          banner
          action={
            <Button size="small" type="text" onClick={() => onRestore(id)}>
              UNDO
            </Button>
          }
        />
      )}
    </>
  );
};

export default Navigator;
