import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import PersonalInfo from "./personalInfo";
import DataTable from "@components/Datatable";
import PropertiesColumn from "../../components/PropertiesColumn";
import { useGetInterestedProperties } from "@/queries/leads";
import { useParams } from "react-router-dom";

const Details: React.FC = () => {
	const params = useParams();
	const { page, setPage, limit, setLimit } = usePaginate();
	const { data, isLoading } = useGetInterestedProperties(params.id);
	// console.log(data);

	return (
		<>
			{/* details */}
			<PersonalInfo />
			<>
				<div className="p-3">
					<DataTable
						columns={PropertiesColumn()}
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
		</>
	);
};

export default Details;
