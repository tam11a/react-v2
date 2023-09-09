import React from "react";
import PropertiesColumn from "./components/PropertiesColumn";
import Navigator from "./Navigator";
import PersonalInfo from "./personalInfo";
import DataTable from "@components/Datatable";
import { usePaginate } from "@tam11a/react-use-hooks";
import Label from "@components/Label";

const DetailsInfo: React.FC = () => {
  const { page, setPage, getQueryParams, limit, setLimit } = usePaginate();

  return (
    <>
      <Navigator />
      {/* details */}
      <PersonalInfo />
      <>
        <div className=" mx-auto m-8">
          <Label className="text-md font-medium">Interested Properties</Label>
          <DataTable
            columns={PropertiesColumn()}
            // columns={[]}
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

export default DetailsInfo;
