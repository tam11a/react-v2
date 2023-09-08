import { useGetLeads } from "@/queries/leads";
import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import LeadColumn from "./components/LeadColumn";
import DataTable from "@components/Datatable";
import { usePaginate } from "@tam11a/react-use-hooks";

const Leads: React.FC = () => {
  const { page, setPage, getQueryParams, limit, setLimit } = usePaginate();

  const { data, isLoading } = useGetLeads(getQueryParams());

  return (
    <>
      <div>
        <div>
          <Typography variant="subtitle1" fontWeight={700}>
            All Leads
          </Typography>
        </div>
      </div>
      <div className="w-full">
        <DataTable
          columns={LeadColumn()}
          // columns={[]}
          // rows={data?.data?.data || []}
          rows={[]}
          isLoading={isLoading}
          getRowId={(r: any) => r?._id}
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
