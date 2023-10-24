import { useGetLeads } from "@/queries/leads";
import React from "react";
import LeadColumn from "./components/LeadColumn";
import DataTable from "@components/Datatable";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { Input, Select, Switch } from "antd";
import { Icon, InlineIcon } from "@iconify/react";
// import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Button } from "@mui/material";
import useUser from "@/hooks/useUser";
import { useSearchParams } from "react-router-dom";

const Leads: React.FC = () => {
	const user = useUser();
	const { state: showTrash, toggleState: toggleTrash } = useToggle(false);
	const { state: showMyLeads, toggleState: toggleMyLeads } = useToggle(false);

	const { page, setPage, getQueryParams, limit, setLimit, search, setSearch } =
		usePaginate();

	const [searchParams] = useSearchParams();

	const { data, isLoading } = useGetLeads({
		...Object.fromEntries(searchParams.entries()),
		...getQueryParams(),
		trash: showTrash,
		assigned_to: showMyLeads ? user.id : undefined,
	});

	return (
		<>
			<div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
				<h1 className="text-2xl md:text-3xl font-bold">All Customers</h1>

				<div className="flex flex-row gap-2 items-center  justify-center ">
					<Button
						variant="contained"
						className="bg-[#FDE4BF] text-text"
						endIcon={
							<Icon
								className="text-2xl mr-1 "
								icon="basil:add-outline"
							/>
						}
						disableElevation
						component={"a"}
						href="/app/leads/create"
					>
						Create New
					</Button>

					{/* <Upload>
						<Button
							variant="outlined"
							className="border-[#FDE4BF] border-2 text-text"
							endIcon={
								<Icon
									className="text-xl mr-1 "
									icon="uil:upload"
								/>
							}
							disableElevation
						>
							Upload
						</Button>
					</Upload> */}
				</div>
			</div>
			<div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 mt-2">
				<div className="flex flex-row items-center flex-wrap gap-2">
					<span className={"flex flex-row items-center gap-1"}>
						<p className="font-semibold text-sm underline flex items-center gap-1">
							<InlineIcon
								icon={"pepicons-pencil:down-up"}
								className="text-xl"
							/>{" "}
							Sort By:
						</p>
						<Select
							defaultValue="created_at"
							bordered={false}
							showArrow={false}
							dropdownMatchSelectWidth={false}
							options={[
								{ value: "-created_at", label: "Newest" },
								{ value: "-updated_at", label: "Last Updated" },
								{ value: "created_at", label: "Oldest" },
							]}
						/>
					</span>
					<span className={"flex flex-row items-center gap-1"}>
						<Switch
							size="default"
							style={{ background: showMyLeads ? "#475569" : "#aeaeae" }}
							checked={showMyLeads}
							onChange={toggleMyLeads}
						/>
						<p className="font-semibold text-sm mx-2">Show My Customers</p>
					</span>

					<span className={"flex flex-row items-center gap-1"}>
						<Switch
							size="default"
							style={{ background: showTrash ? "#475569" : "#aeaeae" }}
							checked={showTrash}
							onChange={toggleTrash}
						/>
						<p className="font-semibold text-sm mx-2">Show Deleted Customers</p>
					</span>
				</div>

				<Input
					allowClear
					size="large"
					className="font-semibold max-w-[220px]"
					placeholder="Search..."
					value={search}
					onChange={(e) => {
						setSearch(e.target.value || "");
					}}
					prefix={
						<Icon
							className="text-2xl mr-1 [&_.ant-menu-item-selected>.ant-menu-title-content]:text-text"
							icon="mingcute:search-3-line"
						/>
					}
				/>
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
