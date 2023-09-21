import React from "react";
import { useFollowupLead } from "@/queries/leads";
import handleResponse from "@/utilities/handleResponse";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  DialogActions,
  Button,
} from "@mui/material";
import { message } from "antd";
import { MdClose } from "react-icons/md";
import DatePicker from "@components/antd/DatePicker";
import moment from "moment";

const FollowupDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  lead_id?: number | string;
  followup_date?: number | string;
}> = ({ open, onClose, lead_id, followup_date }) => {
  const [followup, setFollowup] = React.useState<any>(
    followup_date || undefined
  );
  const { mutateAsync: followLead, isLoading: isFollowupSubmitting } =
    useFollowupLead();

  const onFollow = async (d: any) => {
    message.open({
      type: "loading",
      content: `Submitting...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        followLead({
          id: lead_id,
          date: d.date,
        }),
      [200]
    );
    message.destroy();
    if (res.status) {
      message.success("Submitted successfully!");
      onClose();
    } else message.error(res.message);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "w-[95vw] max-w-[500px]",
      }}
    >
      <DialogTitle className="flex flex-row items-center justify-between text-base">
        <span>Followup Lead</span>{" "}
        <IconButton onClick={onClose} size="small">
          <MdClose />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DatePicker
          allowClear
          size="large"
          placeholder="Date of Birth"
          className="text-text-light w-full my-1"
          onChange={(e) => setFollowup(e)}
          value={followup ? moment(followup || undefined) : undefined}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => onFollow({ date: followup?.toISOString?.() || null })}
          disabled={isFollowupSubmitting}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FollowupDialog;
