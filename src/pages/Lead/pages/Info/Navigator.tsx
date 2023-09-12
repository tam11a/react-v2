import React from "react";
import type { MenuProps } from "antd";
import { Button, Menu, Select, Alert } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteLead,
  useGetLeadsById,
  useUpdateLeadsById,
} from "@/queries/leads";
import moment from "moment";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import useLeadStatus from "@/hooks/useLeadStatus";

const Navigator: React.FC = () => {
  // To get the current location pathname
  let location = useLocation();

  // To route
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetLeadsById(id);
  const leadInfo = data?.data?.data;

  const { mutateAsync: updateLead } = useUpdateLeadsById();

  const { leadStatus } = useLeadStatus();

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

  const onValid = async (d: any) => {
    message.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateLead({
          id,
          data: d,
        }),
      [200]
    );
    message.destroy();
    if (res.status) message.success("Information updated successfully!");
    else message.error(res.message);
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">Lead Details</h1>

        <div className="flex flex-row gap-2 md:items-center  justify-end ">
          <Select
            dropdownMatchSelectWidth={false}
            bordered={false}
            size="large"
            value={leadInfo?.status.label}
            onChange={(value) => onValid({ status_id: value })}
            options={leadStatus}
            className="bg-[#E7F5FC]  text-text-light"
          />
          <Select
            dropdownMatchSelectWidth={false}
            bordered={false}
            size="large"
            value={leadInfo?.priority}
            onChange={(value) => onValid({ priority: value })}
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
