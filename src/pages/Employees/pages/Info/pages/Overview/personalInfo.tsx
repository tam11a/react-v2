import React from "react";
import { useGetEmployeesById } from "@/queries/employees";
import { useParams } from "react-router-dom";
import { Avatar, Button, Container } from "@mui/material";
import { stringAvatar } from "@/utilities/stringAvatar";
import { Icon } from "@iconify/react";
import previewAttachment from "@/utilities/s3Attachment";
import moment from "moment";

const PersonalInfo: React.FC = () => {
  const params = useParams();
  const { data } = useGetEmployeesById(params.id);

  const employeeInfo = data?.data?.data;

  return (
    <>
      <Container className=" flex flex-col items-center justify-center mt-8">
        <div className="flex flex-row gap-2 items-center">
          <Avatar
            variant="rounded"
            src={employeeInfo?.display_picture}
            {...stringAvatar(
              `${employeeInfo?.first_name} ${employeeInfo?.last_name}`
            )}
            className="md:w-[110px] md:h-[110px] w-[100px] h-[100px] rounded-xl  m-2"
          />
          <div>
            <p className="text-3xl font-bold text-text">{`${employeeInfo?.first_name} ${employeeInfo?.last_name}`}</p>
            <p className="text-md font-bold text-text-light">
              {employeeInfo?.role?.name
                ? employeeInfo?.role?.name
                : "No Designation Assigned"}
              {employeeInfo?.role?.prefix
                ? ` - ${employeeInfo?.role?.prefix}`
                : ""}
            </p>
            <p className="text-md font-semibold text-text-light text-opacity-90">
              @{employeeInfo?.username}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-2 max-w-lg gap-1">
          <p className="text-base font-bold text-text-light">
            Address Line 1 :
          </p>
          <p className="text-base font-medium text-text-light">
            {employeeInfo?.address}
          </p>
          {employeeInfo?.address2 ? (
            <>
              <p className="text-base font-bold text-text-light">
                Address Line 2 :
              </p>
              <p className="text-base font-medium text-text-light">
                {employeeInfo?.address2}
              </p>
            </>
          ) : (
            ""
          )}
          <p className="text-base font-bold text-text-light">
            Contact Number :
          </p>
          <p className="text-base font-medium text-text-light">
            {employeeInfo?.phone}
          </p>
          <p className="text-base font-bold text-text-light">Email :</p>
          <p className="text-base font-medium text-text-light">
            {employeeInfo?.email}
          </p>{" "}
          <p className="text-base font-bold text-text-light">Date Of Birth :</p>
          <p className="text-base font-medium text-text-light">
            {moment(employeeInfo?.work_hour).format("ll")}
          </p>{" "}
          <p className="text-base font-bold text-text-light">Gender :</p>
          <p className="text-base font-medium text-text-light">
            {employeeInfo?.gender}
          </p>{" "}
          <p className="text-base font-bold text-text-light">Work Hour :</p>
          <p className="text-base font-medium text-text-light">
            {employeeInfo?.work_hour}
          </p>{" "}
          <p className="text-base font-bold text-text-light">NID Number :</p>
          {employeeInfo?.nid ? (
            <p className="text-base font-medium text-text-light">
              {employeeInfo?.nid}
            </p>
          ) : (
            "-"
          )}{" "}
          <p className="text-base font-bold text-text-light">CV :</p>
          <div>
            <Button
              variant="text"
              className="underline p-0"
              endIcon={<Icon className="text-lg" icon="iconoir:import" />}
              component="a"
              href={previewAttachment(employeeInfo?.cv)}
              download={true}
            >
              Download
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PersonalInfo;
