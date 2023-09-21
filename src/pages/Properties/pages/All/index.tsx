import { useGetProperties } from "@/queries/properties";
import React from "react";
import PropertiesColumn from "./components/PropertiesColumn";
import DataTable from "@components/Datatable";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { Upload, Input, Select, Switch, Card, Statistic } from "antd";
import { Icon, InlineIcon } from "@iconify/react";
import { Button } from "@mui/material";

const Properties: React.FC = () => {
  const { state: showTrash, toggleState: toggleTrash } = useToggle(false);

  const { page, setPage, getQueryParams, limit, setLimit, search, setSearch } =
    usePaginate();

  const [type, setType] = React.useState<"FLAT" | "LAND" | "ALL">("ALL");

  const { data, isLoading } = useGetProperties({
    ...getQueryParams(),
    trash: showTrash,
    type: type === "ALL" ? undefined : type,
  });

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <div className="flex flex-row items-baseline">
          <p className="text-2xl md:text-3xl font-bold mr-3">All Properties</p>
          /
          <Select
            value={type}
            onChange={(e) => {
              setType(e);
            }}
            bordered={false}
            showArrow={true}
            dropdownMatchSelectWidth={false}
            options={[
              { value: "ALL", label: "All" },
              { value: "FLAT", label: "Flat" },
              { value: "LAND", label: "Land" },
            ]}
          />
        </div>
        <div className="flex flex-row gap-2 items-center  justify-center ">
          {/* <Link to="/app/properties/create">
            <Button
              type="primary"
              size="large"
              className="bg-[#FDE4BF] text-text-light"
              block
            >
              Create New
            </Button>
          </Link> */}

          <Button
            variant="contained"
            className="bg-[#FDE4BF] text-text"
            endIcon={
              <Icon className="text-2xl mr-1 " icon="basil:add-outline" />
            }
            disableElevation
            component={"a"}
            href="/app/properties/create-land"
          >
            Create New Land
          </Button>
          <Button
            variant="contained"
            className="bg-[#FDE4BF] text-text"
            endIcon={
              <Icon className="text-2xl mr-1 " icon="basil:add-outline" />
            }
            disableElevation
            component={"a"}
            href="/app/properties/create-flat"
          >
            Create New Flat
          </Button>

          <Upload>
            <Button
              variant="outlined"
              className="border-[#FDE4BF] border-2 text-text"
              endIcon={<Icon className="text-xl mr-1 " icon="uil:upload" />}
              disableElevation
            >
              Upload
            </Button>
          </Upload>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 my-4">
        <Card bordered={true} className="bg-sky-100   font-semibold">
          <Statistic
            title="Latest properties"
            value={35}
            // precision={2}
            valueStyle={{ color: "black" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card bordered={true} className="bg-fuchsia-100   font-semibold">
          <Statistic
            title="Booked Properties"
            value={22}
            // precision={2}
            valueStyle={{ color: "black" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card bordered={true} className="bg-amber-100   font-semibold">
          <Statistic
            title="In progress properties"
            value={10}
            // precision={2}
            valueStyle={{ color: "black" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card bordered={true} className="bg-emerald-100   font-semibold">
          <Statistic
            title="Sold properties"
            value={10}
            // precision={2}
            valueStyle={{ color: "black" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card bordered={true} className="bg-red-100   font-semibold">
          <Statistic
            title="cancelled properties"
            value={10}
            // precision={2}
            valueStyle={{ color: "black" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
      </div>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 mt-2">
        <div className="flex flex-row items-center">
          <p className="font-semibold text-sm underline flex items-center gap-1">
            <InlineIcon icon={"pepicons-pencil:down-up"} className="text-xl" />{" "}
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
          <Switch
            size="default"
            style={{ background: showTrash ? "#475569" : "#aeaeae" }}
            // checkedChildren={<AiOutlineCheck />}
            // unCheckedChildren={<AiOutlineClose />}
            checked={showTrash}
            onChange={toggleTrash}
            className="ml-2.5"
          />
          <p className="font-semibold text-sm mx-2">Show deleted properties</p>
        </div>
        <Input
          allowClear
          size="large"
          className="font-semibold max-w-[220px]"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            console.log("triggering");
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
  );
};

export default Properties;
