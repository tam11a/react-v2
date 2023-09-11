import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import Label from "@components/Label";
import DataTable from "@components/Datatable";
import PettyCashCol from "../../components/PettyCashCol";
import PropertyInfo from "./PropertyInfo";
import { Container } from "@mui/material";

const Overview: React.FC = () => {
  const { page, setPage, limit, setLimit } = usePaginate();
  return (
    <>
      {/* details */}
      <Container>
        <PropertyInfo />

        <div className="my-4">
          <Label className="text-base font-semibold text-text-light">
            Petty Cash
          </Label>
          <DataTable
            columns={PettyCashCol()}
            // columns={[]}
            // rows={data?.data?.data || []}
            rows={[]}
            isLoading={false}
            // getRowId={(r: any) => r?._id}
            // ss pagination
            // rowCount={data?.data?.total || 0}
            checkboxSelection
            paginationMode={"server"}
            page={page}
            onPageChange={setPage}
            pageSize={limit}
            onPageSizeChange={setLimit}
          />
        </div>
      </Container>
    </>
  );
};

export default Overview;
