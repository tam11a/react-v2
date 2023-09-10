import React from "react";
import { Icon } from "@iconify/react";
import { useGetEmployeesById } from "@/queries/employees";
import { useParams } from "react-router-dom";
import { Avatar, Container } from "@mui/material";
import { stringAvatar } from "@/utilities/stringAvatar";

const PersonalInfo: React.FC = () => {
  const params = useParams();
  const { data } = useGetEmployeesById(params.id);

  const employeeInfo = data?.data?.data;
  console.log(employeeInfo);

  return (
    <>
      <Container className=" flex flex-col items-center mt-8">
        <div className="flex flex-row gap-2">
          <Avatar
            variant="rounded"
            src={employeeInfo?.display_picture}
            {...stringAvatar(
              `${employeeInfo?.first_name} ${employeeInfo?.last_name}`
            )}
            className="md:w-[110px] md:h-[110px] w-[60px] h-[60px] rounded-xl  m-2"
          />
          <p className="text-2xl font-bold text-text-light">{`${employeeInfo?.first_name} ${employeeInfo?.last_name}`}</p>
        </div>
      </Container>
    </>
  );
};

export default PersonalInfo;
