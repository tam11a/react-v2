import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/types";
import { IconButton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteLead } from "@/queries/leads";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import moment from "moment";

const DeleteButton: React.FC<{ id: number | string; permanent?: boolean }> = ({
	id,
	permanent = false,
}) => {
	const { mutateAsync: deleteLead } = useDeleteLead();

	const onDelete = async (id: any) => {
		message.open({
			type: "loading",
			content: permanent ? "Deleting Lead Permanently.." : "Deleting Lead..",
			duration: 0,
		});
		const res = await handleResponse(() =>
			deleteLead({
				id,
				params: {
					permanent: permanent || null,
				},
			})
		);

		message.destroy();

		if (res.status) {
			message.success(
				permanent ? "Lead deleted permanently!" : "Lead deleted successfully!"
			);
			return true;
		} else {
			message.error(res.message);
			return false;
		}
	};

	const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
		title: permanent ? "Delete Lead Permanently?" : "Delete Lead?",
		okText: "Delete",
		cancelText: "Cancel",
		color: "error",
	});

	return (
		<>
			{delContextHolder}
			<IconButton
				sx={{ fontSize: "large" }}
				color="error"
				onClick={() => {
					delOpen(
						() => onDelete(id),
						<>
							You are deleting a lead.
							<br />
							<br />
							Deleting a lead means the lead will
							{permanent ? " deleted forever" : " move to trash folder"} . After
							deleting, this work can't be undone.{" "}
							{permanent ? "" : " You'll have to restore the lead to use again"}
						</>
					);
				}}
				// disabled={!checkAccess(defaultPermissions.leadS.FULL)}
			>
				<Icon icon="bxs:trash" />
			</IconButton>
		</>
	);
};

const LeadColumn = (): GridColumns<IDataTable> => {
	const navigate = useNavigate();

	return [
		{
			headerName: "ID",
			headerAlign: "center",
			field: "id",
			align: "center",
			// width: 200,
			flex: 1,
			sortable: false,
			// hide: true,
		},
		{
			headerName: "Lead Title",
			headerAlign: "center",
			field: "firstName",
			align: "center",
			minWidth: 250,
			renderCell: (data: any) => (
				<Typography
					variant="subtitle2"
					noWrap
					component={Link}
					to={`/app/leads/details/${data.row.id}`}
				>{`${data.row.first_name} ${data.row.last_name}`}</Typography>
			),
		},
		{
			headerName: "Assign Person",
			headerAlign: "center",
			field: "assignee",
			align: "center",
			width: 150,
			minWidth: 150,
			flex: 1,
			renderCell: (data: any) =>
				data.row.assignee ? (
					<Link
						to={`/app/employees/details/${data.row.assignee.id}`}
					>{`${data.row.assignee?.first_name} ${data.row.assignee?.last_name}`}</Link>
				) : (
					"-"
				),
		},

		// {
		//   headerName: "Phone",
		//   headerAlign: "center",
		//   field: "phone",
		//   align: "center",
		//   flex: 1,
		//   width: 160,
		//   minWidth: 150,
		// },
		// {
		//   headerName: "Email",
		//   headerAlign: "center",
		//   field: "email",
		//   width: 200,
		//   minWidth: 200,
		//   flex: 1,
		//   align: "center",
		// },
		// {
		//   headerName: "Gender",
		//   headerAlign: "center",
		//   field: "gender",
		//   minWidth: 100,
		//   flex: 1,
		//   align: "center",
		// },
		// {
		//   headerName: "Priority",
		//   headerAlign: "center",
		//   field: "priority",
		//   minWidth: 100,
		//   flex: 1,
		//   align: "center",
		// },
		{
			headerName: "Follow Up",
			headerAlign: "center",
			field: "followup_date",
			minWidth: 100,
			flex: 1,
			align: "center",
			renderCell: (data: any) =>
				data.row.followup_date
					? `${moment(data.row.followup_date).format("ll")}`
					: "-",
		},
		{
			headerName: "Status",
			headerAlign: "center",
			field: "status",
			minWidth: 100,
			flex: 1,
			align: "center",
			renderCell: (data: any) => `${data.row.status.label || "No Status"}`,
		},
		{
			headerName: "Created At",
			headerAlign: "center",
			field: "created_at",
			minWidth: 100,
			flex: 1,
			align: "center",
			renderCell: (data: any) => `${moment(data.row.created_at).format("ll")}`,
		},
		{
			headerName: "Action",
			field: "action",
			width: 100,
			minWidth: 80,
			// flex: 1,
			flex: 1,
			headerAlign: "center",
			align: "center",
			renderCell: (data: any) => (
				<>
					<IconButton
						sx={{ fontSize: "large" }}
						color="primary"
						onClick={() => navigate(`/app/leads/details/${data.row?.id}`)}
						// disabled={!checkAccess(defaultPermissions.leadS.FULL)}
					>
						<Icon icon="icon-park-solid:info" />
					</IconButton>
					{data?.row?.deleted_at ? (
						<>
							{/* Restore Button Here */}
							<DeleteButton
								id={data?.row?.id}
								permanent={true}
							/>
						</>
					) : (
						<DeleteButton id={data?.row?.id} />
					)}
				</>
			),
		},
	];
};

export default LeadColumn;
