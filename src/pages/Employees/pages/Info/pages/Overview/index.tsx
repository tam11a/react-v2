import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import PersonalInfo from "./personalInfo";
import Label from "@components/Label";
import DataTable from "@components/Datatable";
// import LeadsLogCol from "../../components/LeadsLogCol";

const Overview: React.FC = () => {
  const { page, setPage, limit, setLimit } = usePaginate();
  return (
    <>
      {/* details */}
      <PersonalInfo />
      <>
        <div className="mx-auto m-4">
          <Label className="text-md font-medium">Interested Properties</Label>
          <DataTable
            // columns={LeadsLogCol()}
            columns={[]}
            // rows={data?.data?.data || []}
            rows={[]}
            isLoading={false}
            // getRowId={(r: any) => r?._id}
            // ss pagination
            // rowCount={data?.data?.total || 0}
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

export default Overview;
