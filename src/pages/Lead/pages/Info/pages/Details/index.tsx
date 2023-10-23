import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import React from "react";
import PersonalInfo from "./personalInfo";
import DataTable from "@components/Datatable";
import PropertiesColumn from "../../components/PropertiesColumn";
import { useGetInterestedProperties, usePostInterest } from "@/queries/leads";
import { useParams } from "react-router-dom";
import LeadLog from "../../components/LeadLogCard";
import Label from "@components/Label";
import { Cascader } from "antd";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import useProperty from "@/hooks/useProperty";
import Iconify from "@components/iconify";
import { Button } from "@mui/material";
// import Requirements from "./requirements";
import FilterDialog from "../../components/FilterDialog";

const Details: React.FC = () => {
  const params = useParams();
  const { page, setPage, limit, setLimit } = usePaginate();
  const { data, isLoading } = useGetInterestedProperties(params.id);
  const { property, isPropertyLoading, searchProperty } = useProperty();

  const { mutateAsync: postInterest } = usePostInterest();

  // const leadInfo = data?.data?.data;

  const onValid = async (d: any) => {
    message.open({
      type: "loading",
      content: `Loading information...`,
      duration: 0,
    });
    message.destroy();
    const res = await handleResponse(
      () =>
        postInterest({
          lead_id: params?.id || "",
          property_id: d,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Information updated successfully!");
      setPropertyValue(undefined);
    } else message.error(res.message);
  };

  const [propertyValue, setPropertyValue] = React.useState<any | undefined>(
    undefined
  );

  const { state: openFilter, toggleState: onCloseFilter } = useToggle(false);

  return (
    <>
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <PersonalInfo />
          {/* <Requirements /> */}
          <div className="max-w-5xl px-3 mt-6 mx-3">
            <Label className="text-lg font-semibold text-text">
              Interested Properties
            </Label>

            <div className="flex flex-row items-center gap-1 mt-2">
              <Cascader
                size="large"
                placeholder="Search properties..."
                allowClear={false}
                value={(propertyValue as any) || undefined}
                showSearch
                options={property} // properties
                onSearch={searchProperty}
                loading={isPropertyLoading}
                onChange={(value) => setPropertyValue(value)}
                className="w-full max-w-md"
                suffixIcon={
                  <Iconify
                    className="text-xl text-text"
                    icon={"mingcute:search-3-line"}
                  />
                }
                //   disabled={isLoading}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onCloseFilter()}
              >
                Filter
              </Button>
              <FilterDialog
                open={openFilter}
                onClose={onCloseFilter}
                // lead_id={id}
                // lead_info={leadInfo}
                // followup_date={leadInfo?.followup_date}
                // lead_status={leadStatus}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => onValid(propertyValue)}
              >
                Add
              </Button>
            </div>
          </div>
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
          {/* <div className="max-w-5xl px-3 mt-6 mx-3">
            <Label className="text-lg font-semibold text-text">
              Suggested Properties
            </Label>
          </div>
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
          </div> */}
        </div>

        <div className="col-span-2 border-dashed border-l-2 p-4">
          <p className="text-xl font-bold text-text-light pb-4">Comments</p>
          <LeadLog />
        </div>
      </div>
    </>
  );
};

export default Details;
