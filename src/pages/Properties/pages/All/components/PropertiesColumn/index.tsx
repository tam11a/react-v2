import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/types";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useDeleteProperty } from "@/queries/properties";
import moment from "moment";

const DeleteButton: React.FC<{ id: number | string; permanent?: boolean }> = ({
	id,
	permanent = false,
}) => {
	const { mutateAsync: deleteProperty } = useDeleteProperty();

	const onDelete = async (id: any) => {
		message.open({
			type: "loading",
			content: permanent
				? "Deleting Property Permanently.."
				: "Deleting Property..",
			duration: 0,
		});
		const res = await handleResponse(() =>
			deleteProperty({
				id,
				params: {
					permanent: permanent || null,
				},
			})
		);

		message.destroy();

		if (res.status) {
			message.success(
				permanent
					? "Property deleted permanently!"
					: "Property deleted successfully!"
			);
			return true;
		} else {
			message.error(res.message);
			return false;
		}
	};

	const { contextHolder: delContextHolder, open: delOpen } = useAreYouSure({
		title: permanent ? "Delete Property Permanently?" : "Delete Property?",
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
							You are deleting a property.
							<br />
							<br />
							Deleting a property means the property will
							{permanent ? " deleted forever" : " move to trash folder"} . After
							deleting, this work can't be undone.{" "}
							{permanent
								? ""
								: " You'll have to restore the property to use again"}
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

const PropertiesColumn = (): GridColumns<IDataTable> => {
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
			headerName: "Type",
			headerAlign: "center",
			field: "type",
			align: "center",
			minWidth: 200,
			flex: 1,
			sortable: false,
			// hide: true,
		},
		{
			headerName: "Area",
			headerAlign: "center",
			field: "area",
			align: "center",
			width: 250,
			minWidth: 200,
			flex: 1,
			renderCell: (data: any) => `${data?.row?.["address.area"] || "N/A"}`,
		},
		{
			headerName: "Block/Sec",
			headerAlign: "center",
			field: "block",
			align: "center",
			width: 250,
			minWidth: 200,
			flex: 1,
			renderCell: (data: any) => `${data?.row?.["address.block"] || "N/A"}`,
		},

		{
			headerName: "Road",
			headerAlign: "center",
			field: "road",
			align: "center",
			flex: 1,
			width: 160,
			minWidth: 150,
			renderCell: (data: any) => `${data?.row?.["address.road"] || "N/A"}`,
		},
		{
			headerName: "Size",
			headerAlign: "center",
			field: "size",
			width: 250,
			minWidth: 200,
			flex: 1,
			align: "center",
			renderCell: (data: any) => `${data?.row?.size} ${data?.row?.size_unit}`,
		},
		{
			headerName: "Price (BDT)",
			headerAlign: "center",
			field: "price",
			minWidth: 100,
			flex: 1,
			align: "center",
		},
		{
			headerName: "Media",
			headerAlign: "center",
			field: "media_id",
			width: 200,
			minWidth: 180,
			flex: 1,
			align: "center",
			renderCell: (data: any) =>
				data.row.media_id
					? `${data?.row["media.first_name"]} ${data?.row["media.last_name"]}`
					: "-",
		},
		{
			headerName: "Status",
			headerAlign: "center",
			field: "status",
			minWidth: 100,
			flex: 1,
			align: "center",
			renderCell: (data: any) => (data?.row?.status ? data?.row?.status : "-"),
		},
		{
			headerName: "Completion Status",
			headerAlign: "center",
			field: "completion_status",
			minWidth: 200,
			flex: 1,
			align: "center",
			renderCell: (data: any) =>
				data?.row?.completion_status ? data?.row?.completion_status : "-",
		},
		{
			headerName: "Handovered At",
			headerAlign: "center",
			field: "flat.handovered_at",
			minWidth: 130,
			flex: 1,
			align: "center",
			renderCell: (data: any) =>
				data.row["flat.handovered_at"]
					? `${moment(data.row["flat.handovered_at"]).format("ll")}`
					: "-",
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
						onClick={() => navigate(`/app/properties/details/${data.row?.id}`)}
						// disabled={!checkAccess(defaultPermissions.PROPERTYS.FULL)}
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

export default PropertiesColumn;
