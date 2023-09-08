import { useGetLeads } from "@/queries/leads";
import { Button, Typography } from "@mui/material";
import React from "react";
import LeadColumn from "./components/LeadColumn";
import DataTable from "@components/Datatable";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Icon } from "@iconify/react";

const Leads: React.FC = () => {
	const { page, setPage, getQueryParams, limit, setLimit } = usePaginate();

	const { data, isLoading } = useGetLeads(getQueryParams());

	return (
		<>
			<div>
				<div className="flex flex-row items-center justify-between">
					<Typography
						variant="h5"
						fontWeight={700}
					>
						All Leads
					</Typography>
					<div>
						<Button
							size="small"
							variant={"contained"}
							endIcon={<Icon icon="mdi:plus-box-outline" />}
						>
							Create New{" "}
						</Button>
					</div>
				</div>
			</div>
			<div className="w-full">
				<DataTable
					columns={LeadColumn()}
					// columns={[]}
					rows={data?.data?.data || []}
					// rows={[]}
					isLoading={isLoading}
					// getRowId={(r: any) => r?._id}
					// ss pagination
					rowCount={data?.data?.total || 0}
					paginationMode={"server"}
					page={page}
					onPageChange={setPage}
					pageSize={limit}
					onPageSizeChange={setLimit}
				/>
			</div>
		</>
	);
};

export default Leads;
