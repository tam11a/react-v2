import React from "react";
import type { MenuProps } from "antd";
import { Button, Menu, Dropdown, Select, Alert } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDeleteLead, useGetLeadsById } from "@/queries/leads";
import moment from "moment";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";

const onMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const Navigator: React.FC = () => {
  // To get the current location pathname
  let location = useLocation();

  // To route
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetLeadsById(id);
  const leadInfo = data?.data?.data;

  const { mutateAsync: deleteLead } = useDeleteLead();

  const onRestore = async (id: any) => {
    message.open({
      type: "loading",
      content: "Restoring Lead..",
      duration: 0,
    });

    const res = await handleResponse(() =>
      deleteLead({
        id,
        params: {
          restore: true,
        },
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Lead restored successfully!");
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "View",
      key: `/app/leads/details/${id}`,
    },
    {
      label: "Update",
      key: `/app/leads/details/${id}/update`,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  const statusItems = [
    {
      key: "1",
      label: "New",
    },
    {
      key: "2",
      label: "In-progress",
    },
    {
      key: "3",
      label: "Completed",
    },
    {
      key: "4",
      label: "Rejected",
    },
  ];

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">Lead Details</h1>

        <div className="flex flex-row gap-2 md:items-center  justify-end ">
          <Dropdown.Button
            type="primary"
            size="large"
            menu={{
              selectable: true,
              items: statusItems,
              onClick: onMenuClick,
            }}
            className="bg-sky-400 rounded "
          >
            New
          </Dropdown.Button>
          <Select
            dropdownMatchSelectWidth={false}
            bordered={false}
            size="large"
            defaultValue="Highest"
            onChange={handleChange}
            options={[
              { value: "Highest", label: "Highest" },
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Low", label: "Low" },
              { value: "Lowest", label: "Lowest" },
            ]}
            className="bg-[#E7F5FC]  text-text-light"
          />
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
            className={"border-b-0 max-w-[40px]"}
          />
        </div>
      </div>
      {leadInfo?.deleted_at && (
        <Alert
          message={`This lead was deleted at 
          ${moment(leadInfo?.deleted_at).calendar()}.`}
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
