import React from "react";
import type { MenuProps } from "antd";
import { Alert, Button, Menu } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ROUTES } from "./routes/paths";
import handleResponse from "@/utilities/handleResponse";
import { useDeleteProperty, useGetPropertiesById } from "@/queries/properties";
import { message } from "@components/antd/message";
import moment from "moment";

const Navigator: React.FC = () => {
  const { id } = useParams();

  //trash alart
  const { data } = useGetPropertiesById(id);
  const propertyInfo = data?.data?.data;
  console.log(propertyInfo);

  const { mutateAsync: deleteProperty } = useDeleteProperty();

  const onRestore = async (id: any) => {
    message.open({
      type: "loading",
      content: "Restoring Property..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteProperty({
        id,
        params: {
          restore: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Property restored successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const items1: MenuProps["items"] = [
    {
      label: "Overview",
      key: ROUTES.OVERVIEW,
      icon: <Icon icon="ph:book-open-duotone" className="text-xl" />,
    },
    {
      label: "Update",
      key: `/app/properties/details/${id}/update-flat`,
    },
    {
      label: "View All Properties",
      key: `/app/properties`,
    },
  ];
  const items2: MenuProps["items"] = [
    {
      label: "Overview",
      key: ROUTES.OVERVIEW,
      icon: <Icon icon="ph:book-open-duotone" className="text-xl" />,
    },
    {
      label: "Update",
      key: `/app/properties/details/${id}/update-land`,
    },
    {
      label: "View All Properties",
      key: `/app/properties`,
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
        <p className="text-md font-bold">properties / {id}</p>

        <Menu
          onClick={onClick}
          selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
          mode="horizontal"
          items={propertyInfo?.type === "FLAT" ? items1 : items2}
          className={"border-b-0 w-full max-w-[450px]"}
        />
      </div>
      {propertyInfo?.deleted_at && (
        <Alert
          message={`This property was deleted at 
          ${moment(propertyInfo?.deleted_at).calendar()}.`}
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
