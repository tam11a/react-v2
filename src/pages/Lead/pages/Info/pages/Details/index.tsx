import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import PersonalInfo from "./personalInfo";
import DataTable from "@components/Datatable";
import PropertiesColumn from "../../components/PropertiesColumn";
import { useGetInterestedProperties } from "@/queries/leads";
import { useParams } from "react-router-dom";
import LeadLog from "../../components/LeadLogCard";

const Details: React.FC = () => {
  const params = useParams();
  const { page, setPage, limit, setLimit } = usePaginate();
  const { data, isLoading } = useGetInterestedProperties(params.id);

  return (
    <>
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <PersonalInfo />
          <div className="p-3 mx-3">
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
        </div>

        <div className="col-span-2 border-dashed border-l-2 p-4">
          <p className="text-xl font-bold text-text-light pb-4">Customer Log</p>
          <LeadLog />
        </div>
      </div>
    </>
  );
};

export default Details;
