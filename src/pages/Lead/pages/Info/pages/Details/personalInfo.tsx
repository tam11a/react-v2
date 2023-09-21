import React from "react";
import { InlineIcon } from "@iconify/react";
import { Cascader, Tag } from "antd";
import { useGetLeadsById, usePostInterest } from "@/queries/leads";
import { useParams } from "react-router-dom";
import moment from "moment";
import Iconify from "@components/iconify";
import Label from "@components/Label";
import useProperty from "@/hooks/useProperty";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { Button } from "@mui/material";

const PersonalInfo: React.FC = () => {
  const params = useParams();
  const { data } = useGetLeadsById(params.id);
  const { property, isPropertyLoading, searchProperty } = useProperty();

  const { mutateAsync: postInterest } = usePostInterest();

  const leadInfo = data?.data?.data;

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

  return (
    <>
      <div>
        <div className="flex md:flex-row flex-col justify-between max-w-5xl p-6 gap-4">
          <div className="flex flex-col gap-3 items-start">
            <p className="text-4xl font-bold text-text-dark">{`${leadInfo?.first_name} ${leadInfo?.last_name}`}</p>

            <div className="flex flex-row gap-2">
              <p className="flex items-center text-sm font-bold text-text-light gap-1">
                <InlineIcon
                  icon="ic:twotone-person-pin"
                  className="text-md text-text-light"
                />
                {leadInfo?.designation}
              </p>
              <p className="flex items-center text-sm font-bold text-text-light gap-1">
                <InlineIcon
                  icon="fluent:building-20-filled"
                  className="text-md text-text-light"
                />
                {leadInfo?.company}
              </p>
              <p className="flex items-center text-sm font-bold text-text-light gap-1">
                <InlineIcon
                  icon="octicon:location-24"
                  className="text-md text-text-light"
                />
                {leadInfo?.address_line1}
              </p>
            </div>

            <p className="flex items-center text-sm font-bold text-text-light gap-1">
              <InlineIcon
                icon="iconamoon:email-light"
                className="text-md text-text-light"
              />
              {leadInfo?.email || "N/A"}
            </p>
            <p className="flex items-center text-sm font-bold text-text-light gap-1">
              <InlineIcon
                icon="ic:outline-phone"
                className="text-lg text-text-light"
              />
              +88{leadInfo?.phone}
              <a
                href={`tel:+88${leadInfo?.phone}`}
                className="ml-2 flex flex-row items-center gap-1 border-2 px-2 py-1 bg-slate-200 rounded-full"
                target="_blank"
              >
                <InlineIcon
                  icon="ic:outline-call"
                  className="text-lg text-text-light"
                />
                Call
                <span className="font-normal">
                  {leadInfo?.first_name} {leadInfo?.last_name}
                </span>
              </a>
              <a
                href={`https://wa.me/+88${leadInfo?.phone}`}
                className="ml-2"
                target="_blank"
              >
                <InlineIcon
                  icon="ic:baseline-whatsapp"
                  className="text-lg text-text-light"
                />
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-2  py-3 text-text-light">
            <p className="text-md font-bold">
              Status:{" "}
              <Tag
                color={leadInfo?.status?.color || "#3DC5FF"}
                className="font-bold text-md text-slate-800"
              >
                {leadInfo?.status?.label}
              </Tag>
            </p>
            <p className="text-md font-bold">
              Assigned:{" "}
              <span className="font-normal text-md">
                {leadInfo?.assignee?.first_name}
              </span>
            </p>
            <p className="text-md font-bold ">
              Followup Date:{" "}
              <span className="font-normal text-md">
                {leadInfo?.followup_date
                  ? moment(leadInfo?.followup_date).format("MMM D, YYYY")
                  : "-"}
              </span>
            </p>
          </div>
        </div>
        <div className="max-w-5xl pl-3">
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
              variant="contained"
              color="primary"
              onClick={() => onValid(propertyValue)}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
