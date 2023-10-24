import React from "react";
import { useFollowupLead, useUpdateLeadsById } from "@/queries/leads";
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
import { Select, message } from "antd";
import { MdClose } from "react-icons/md";
import DatePicker from "@components/antd/DatePicker";
import moment from "moment";

const FollowupDialog: React.FC<{
	open: boolean;
	onClose: () => void;
	lead_id?: number | string;
	followup_date?: number | string;
	lead_status?: any;
	lead_info?: any;
}> = ({ open, onClose, lead_id, followup_date, lead_status, lead_info }) => {
	const [status, setStatus] = React.useState<any>({
		status_id: lead_info?.status?.label,
	});

	React.useEffect(
		() =>
			setStatus({
				status_id: lead_info?.status?.label,
			}),
		[lead_info]
	);

	const { mutateAsync: updateLead } = useUpdateLeadsById();
	const onValid = async (d: any) => {
		message.open({
			type: "loading",
			content: `Updating information..`,
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				updateLead({
					id: lead_id,
					data: d,
				}),
			[200]
		);
		message.destroy();
		if (res.status) {
			message.success("Information updated successfully!");
			onClose();
		} else message.error(res.message);
	};

	const [followup, setFollowup] = React.useState<any>(
		moment(followup_date) || undefined
	);
	const { mutateAsync: followLead, isLoading: isFollowupSubmitting } =
		useFollowupLead();
	const onFollow = async (d: any) => {
		message.open({
			type: "loading",
			content: `Updating information..`,
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
				<IconButton
					onClick={onClose}
					size="small"
				>
					<MdClose />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<span className="flex flex-row items-center justify-between gap-2">
					<DatePicker
						disabledDate={(current) => {
							return (
								current && current < moment().subtract(1, "day").endOf("day")
							);
						}}
						allowClear
						size="large"
						placeholder="Date of Birth"
						className="text-text-light w-1/2 "
						onChange={(e) => setFollowup(e)}
						value={followup ? moment(followup || undefined) : undefined}
					/>
					<Select
						dropdownMatchSelectWidth={false}
						bordered={true}
						size="large"
						value={status?.status_id}
						onChange={(value) => setStatus({ status_id: value })}
						options={Array.from(lead_status, (l: any) => ({
							...l,
							disabled:
								l?.data?.type === "RAW" &&
								l?.data?.id < lead_info?.status?.id &&
								lead_info?.status?.type !== "DONE",
						}))}
						className=" w-1/2 text-text-light"
					/>
				</span>
			</DialogContent>
			<Divider />
			<DialogActions>
				<Button
					size="small"
					variant="outlined"
					color="error"
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					size="small"
					variant="contained"
					onClick={async () => (
						await onFollow({ date: followup?.toISOString?.() || null }),
						await onValid(status)
					)}
					disabled={isFollowupSubmitting}
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default FollowupDialog;
