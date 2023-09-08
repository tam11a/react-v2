import { Button, Typography } from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { useGetLeadsById } from "@/queries/leads";
import { Tag } from "antd";
import LogColumn from "./components/LogColumn";
import PropertiesColumn from "./components/PropertiesColumn";

const DetailsInfo: React.FC = () => {
  const params = useParams();

  //   const { data } = useGetLeadsById();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h5" fontWeight={700}>
          Lead Details
        </Typography>
        <div className="flex flex-row items-center justify-center gap-4">
          <Button variant="contained" fullWidth size="large">
            New
            <Icon className="text-xl pr-1" icon="pepicons-pop:dots-x" />
          </Button>
          <Button variant="contained" fullWidth size="large">
            <Icon className="text-xl pr-1" icon="ic:twotone-flag" />
            Highest
          </Button>
        </div>
      </div>
      {/* details */}
      <div className="flex md:flex-row flex-col max-w-5xl">
        <div className="w-full p-3">
          <div className="flex flex-col gap-3 items-start">
            <p className="text-4xl font-bold text-text-light">Ashley Blake</p>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-1">
                <Icon
                  icon="ic:twotone-person-pin"
                  className="text-md text-text-light"
                />
                <p className="text-xs font-bold text-text-light">CEO</p>
              </div>
              <div className="flex flex-row gap-1">
                <Icon
                  icon="fluent:building-20-filled"
                  className="text-md text-text-light"
                />
                <p className="text-xs font-bold text-text-light">XYZ Company</p>
              </div>
              <div className="flex flex-row gap-1">
                <Icon
                  icon="octicon:location-24"
                  className="text-md text-text-light"
                />
                <p className="text-xs font-bold text-text-light">Dhaka</p>
              </div>
            </div>

            <div className="flex flex-row gap-1">
              <Icon
                icon="iconamoon:email-light"
                className="text-md text-text-light"
              />
              <p className="text-xs font-bold text-text-light">
                example@email.com
              </p>
            </div>
            <div className="flex flex-row gap-1">
              <Icon
                icon="ic:outline-phone"
                className="text-md text-text-light"
              />
              <p className="text-sm font-bold text-text-light">
                (+880) 176-232-3242
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1>
            Status : <Tag color="blue">Priority</Tag>
          </h1>
          <h1>Assigned : August</h1>
          <h1>Followup date : 27 Feb</h1>
        </div>
      </div>
      <PropertiesColumn />
      <LogColumn />
    </>
  );
};

export default DetailsInfo;
