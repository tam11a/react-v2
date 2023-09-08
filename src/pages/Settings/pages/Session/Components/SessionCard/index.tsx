import React from "react";
import { ISession } from "../../types";
import moment from "moment";
import { Button, Typography } from "@mui/material";
import { useSessionSignOut } from "@/queries/sessions";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";

const SessionCard: React.FC<ISession> = ({
  id,
  device_details,
  logged_out_at,
  logged_in_at,
}) => {
  const { mutateAsync: sessionSignOut } = useSessionSignOut();

  const onSubmit = async (id: any) => {
    message.open({
      type: "loading",
      content: "Signing out from the session..",
      duration: 0,
    });
    const res = await handleResponse(() => sessionSignOut(id), [200]);
    message.destroy();
    if (res.status) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <div>
      <div className="pb-1 flex flex-row flex-wrap">
        <div className="grow">
          <Typography
            variant="subtitle2"
            className="uppercase text-xs leading-6"
          >
            Device Details:
          </Typography>
          {device_details ? (
            <p className="text-[11px] text-text-light whitespace-pre-wrap">
              {device_details}
            </p>
          ) : (
            <p className="text-[11px] text-text-light">undefined</p>
          )}
        </div>
        <div className="grow flex-1 pr-12">
          <Typography
            variant="subtitle2"
            className="uppercase text-xs leading-6"
          >
            Log Details
          </Typography>
          <p className="text-[11px] text-text-light">
            Logged in on {moment(logged_in_at).calendar()}
          </p>
          {logged_out_at ? (
            <p className="text-[11px] text-text-light">
              Logged out on {moment(logged_out_at).calendar()}
            </p>
          ) : (
            <Button
              size="small"
              variant="contained"
              className="bg-error-dark text-xs mt-[3px]"
              color={"error"}
              onClick={() => onSubmit(id)}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
      <Typography variant="caption">
        {/* Last updated on {moment(modifiedOn || createdOn).calendar()} */}
      </Typography>
    </div>
  );
};

export default SessionCard;
