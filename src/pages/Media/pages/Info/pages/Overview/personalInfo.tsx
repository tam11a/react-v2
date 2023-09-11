import React from "react";
import { useParams } from "react-router-dom";
import { Avatar, Container } from "@mui/material";
import { stringAvatar } from "@/utilities/stringAvatar";
import { useGetMediaById } from "@/queries/media";

const PersonalInfo: React.FC = () => {
  const params = useParams();
  const { data } = useGetMediaById(params.id);

  const mediaInfo = data?.data?.data;
  // console.log(mediaInfo);

  return (
    <>
      <Container className=" flex flex-col items-center justify-center mt-8">
        <div className="flex flex-row gap-2 items-center">
          <Avatar
            variant="rounded"
            src={mediaInfo?.display_picture}
            {...stringAvatar(
              `${mediaInfo?.first_name} ${mediaInfo?.last_name}`
            )}
            className="md:w-[110px] md:h-[110px] w-[100px] h-[100px] rounded-xl  m-2"
          />
          <div>
            <p className="text-3xl font-bold text-text">{`${mediaInfo?.first_name} ${mediaInfo?.last_name}`}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-2 max-w-lg gap-1">
          <p className="text-base font-bold text-text-light">
            Address Line 1 :
          </p>
          <p className="text-base font-medium text-text-light">
            {mediaInfo?.address_line1}
          </p>
          {mediaInfo?.address_line2 ? (
            <>
              <p className="text-base font-bold text-text-light">
                Address Line 2 :
              </p>
              <p className="text-base font-medium text-text-light">
                {mediaInfo?.address_line2}
              </p>
            </>
          ) : (
            ""
          )}
          <p className="text-base font-bold text-text-light">
            Contact Number :
          </p>
          <p className="text-base font-medium text-text-light">
            {mediaInfo?.phone}
          </p>
          <p className="text-base font-bold text-text-light">Email :</p>
          <p className="text-base font-medium text-text-light">
            {mediaInfo?.email}
          </p>{" "}
          <p className="text-base font-bold text-text-light">Date Of Birth :</p>
          <p className="text-base font-medium text-text-light">
            {mediaInfo?.dob}
          </p>{" "}
          <p className="text-base font-bold text-text-light">Gender :</p>
          <p className="text-base font-medium text-text-light">
            {mediaInfo?.gender}
          </p>{" "}
        </div>
      </Container>
    </>
  );
};

export default PersonalInfo;
