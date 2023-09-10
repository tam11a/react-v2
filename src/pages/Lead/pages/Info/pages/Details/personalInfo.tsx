import React from "react";
import { InlineIcon } from "@iconify/react";
import { Tag } from "antd";
import { useGetLeadsById } from "@/queries/leads";
import { useParams } from "react-router-dom";
import moment from "moment";

const PersonalInfo: React.FC = () => {
  const params = useParams();
  const { data } = useGetLeadsById(params.id);

  const leadInfo = data?.data?.data;
  console.log(leadInfo);

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between max-w-5xl p-6 gap-4">
        <div className="flex flex-col gap-3 items-start">
          <p className="text-4xl font-bold text-text-dark">{`${leadInfo?.first_name} ${leadInfo?.last_name}`}</p>

          <div className="flex flex-row gap-2">
            <p className="flex items-center text-sm font-bold text-text-light gap-1">
              <InlineIcon
                icon="ic:twotone-person-pin"
                className="text-md text-text-light"
              />
              {leadInfo?.designation}
            </p>
            <p className="flex items-center text-sm font-bold text-text-light gap-1">
              <InlineIcon
                icon="fluent:building-20-filled"
                className="text-md text-text-light"
              />
              {leadInfo?.company}
            </p>
            <p className="flex items-center text-sm font-bold text-text-light gap-1">
              <InlineIcon
                icon="octicon:location-24"
                className="text-md text-text-light"
              />
              {leadInfo?.address_line1}
            </p>
          </div>

          <p className="flex items-center text-md font-bold text-text-light gap-1">
            <InlineIcon
              icon="iconamoon:email-light"
              className="text-md text-text-light"
            />
            {leadInfo?.email}
          </p>
          <p className="flex items-center text-md font-bold text-text-light gap-1">
            <InlineIcon
              icon="ic:outline-phone"
              className="text-lg text-text-light"
            />
            (+88) {leadInfo?.phone}
          </p>
        </div>
        <div className="flex flex-col gap-2  py-3 text-text-light">
          <p className="text-md font-bold">
            Status:{" "}
            <Tag color="#3DC5FF" className="font-medium text-md">
              {leadInfo?.status?.label}
            </Tag>
          </p>
          <p className="text-md font-bold">
            Assigned:{" "}
            <span className="font-normal text-md">
              {leadInfo?.assignee?.first_name}
            </span>
          </p>
          <p className="text-md font-bold ">
            Followup Date:{" "}
            <span className="font-normal text-md">
              {moment(leadInfo?.created_at).format("MMM D, YYYY")}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
