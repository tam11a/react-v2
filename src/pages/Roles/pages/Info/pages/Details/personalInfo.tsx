import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { useGetRoleById } from "@/queries/roles";
import { Tag } from "antd";

const PersonalInfo: React.FC = () => {
  const params = useParams();
  const { data } = useGetRoleById(params.id);

  const roleInfo = data?.data?.data;
  // console.log(roleInfo);

  return (
    <>
      <div className="flex flex-col items-center text-start mt-8">
        <div>
          <p className="text-4xl font-bold text-text-dark pb-2">
            {roleInfo?.name}
          </p>

          <p className="text-md font-bold text-text-light gap-1">
            @{roleInfo?.prefix}
          </p>
          <p className="text-md font-bold text-text-light gap-1">
            Description: {roleInfo?.description}
          </p>
          <p className="text-md font-bold text-text-light pt-2">
            Status:{" "}
            <Tag color={`${roleInfo?.is_active ? "#36b336" : "#b1160d"}`}>
              {roleInfo?.is_active ? "Active" : "Inactive"}
            </Tag>
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
