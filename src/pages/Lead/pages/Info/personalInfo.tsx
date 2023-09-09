import React from "react";
import { Icon } from "@iconify/react";
import { Tag } from "antd";

const PersonalInfo: React.FC = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col justify-between max-w-5xl p-6 gap-4">
        <div>
          <div className="flex flex-col gap-3 items-start">
            <p className="text-4xl font-bold text-text-light">Ashley Blake</p>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-1">
                <Icon
                  icon="ic:twotone-person-pin"
                  className="text-md text-text-light"
                />
                <p className="text-sm font-bold text-text-light">CEO</p>
              </div>
              <div className="flex flex-row gap-1">
                <Icon
                  icon="fluent:building-20-filled"
                  className="text-md text-text-light"
                />
                <p className="text-sm font-bold text-text-light">XYZ Company</p>
              </div>
              <div className="flex flex-row gap-1">
                <Icon
                  icon="octicon:location-24"
                  className="text-md text-text-light"
                />
                <p className="text-sm font-bold text-text-light">Dhaka</p>
              </div>
            </div>

            <div className="flex flex-row gap-1">
              <Icon
                icon="iconamoon:email-light"
                className="text-md text-text-light"
              />
              <p className="text-sm font-bold text-text-light">
                example@email.com
              </p>
            </div>
            <div className="flex flex-row gap-1">
              <Icon
                icon="ic:outline-phone"
                className="text-lg text-text-light"
              />
              <p className="text-md font-bold text-text-light">
                (+880) 176-232-3242
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2  py-3">
          <p className="text-md font-bold">
            Status:{" "}
            <Tag color="#3DC5FF" className="font-medium text-md">
              Priority
            </Tag>
          </p>
          <p className="text-md font-bold">
            Assigned: <span className="font-normal text-md">August</span>
          </p>
          <p className="text-md font-bold ">
            Followup Date:{" "}
            <span className="font-normal text-md">Aug 30, 2023</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
