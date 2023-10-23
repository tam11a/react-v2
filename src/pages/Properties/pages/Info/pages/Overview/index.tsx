import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import Label from "@components/Label";
import DataTable from "@components/Datatable";
import CustomerCol from "../../components/CustomerCol";
import PropertyInfo from "./PropertyInfo";
import { Container } from "@mui/material";
import { useGetInterestedCustomerById } from "@/queries/properties";
import { useParams } from "react-router-dom";

const Overview: React.FC = () => {
  const params = useParams();
  const { page, setPage, limit, setLimit } = usePaginate();
  const { data } = useGetInterestedCustomerById(params.id);

  return (
    <>
      {/* details */}
      <Container>
        <PropertyInfo />

        <div className="my-8">
          <div className="flex flex-row items-center justify-between mb-2">
            <Label className="text-base font-semibold text-text-light">
              Interested Customer
            </Label>
          </div>
          <DataTable
            columns={CustomerCol()}
            rows={data?.data?.data || []}
            // rows={[]}
            isLoading={false}
            // getRowId={(r: any) => r?._id}
            // ss pagination
            rowCount={data?.data?.total || 0}
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
