import useEmployee from "@/hooks/useEmployee";
import { useUpdateLeadsById } from "@/queries/leads";
import handleResponse from "@/utilities/handleResponse";
import Iconify from "@components/iconify";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Divider,
	DialogActions,
	Button,
} from "@mui/material";
import { Cascader, message } from "antd";
import React from "react";
import { MdClose } from "react-icons/md";

const TransferDialog: React.FC<{
	open: boolean;
	onClose: () => void;
	lead_id?: number | string;
	assigned_to?: number | string;
}> = ({ open, onClose, lead_id, assigned_to }) => {
	const [assignee, setAssignee] = React.useState<any>(assigned_to || undefined);

	const { mutateAsync: updateLead, isLoading: isSubmitting } =
		useUpdateLeadsById();
	const { employee, isEmployeeLoading, searchEmployee } = useEmployee();

	const onValid = async (d: any) => {
		message.open({
			type: "loading",
			content: `Transferring...`,
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				updateLead({
					id: lead_id,
					data: {
						assigned_to: d.assigned_to,
					},
				}),
			[200]
		);
		message.destroy();
		if (res.status) {
			message.success("Transferred successfully!");
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
				<span>Transfer Lead</span>{" "}
				<IconButton
					onClick={onClose}
					size="small"
				>
					<MdClose />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<Cascader
					size="large"
					placeholder="Search Employee..."
					allowClear={false}
					value={assignee || undefined}
					showSearch
					options={employee}
					onSearch={searchEmployee}
					loading={isEmployeeLoading}
					onChange={(v) => setAssignee(v[0])}
					popupClassName="z-[1350]"
					className="w-full"
					suffixIcon={
						<Iconify
							className="text-xl text-text-dark"
							icon={"clarity:employee-solid"}
						/>
					}
					//   disabled={isLoading}
				/>
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
					onClick={() => onValid({ assigned_to: assignee })}
					disabled={isSubmitting}
				>
					Transfer
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TransferDialog;
