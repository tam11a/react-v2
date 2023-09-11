import { useCreateProperty } from "@/queries/properties";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import { Button } from "@mui/material";
import { Checkbox, DatePicker, Input, Radio, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useMedia from "@/hooks/useMedia";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";

const CreateFlat: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { media, isMediaLoading, searchMedia } = useMedia();

  const { mutateAsync: createProperty, isLoading: propertyCreating } =
    useCreateProperty();
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const onSubmit = async (data: any) => {
    messageApi.open({
      type: "loading",
      content: "Creating Property..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createProperty({
          ...data,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) {
      reset();
      messageApi.success("Property created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">Create New Flat</h1>

        <Link to="/app/properties">
          <p className="font-semibold text-text-light underline">
            View All Properties
          </p>
        </Link>
      </div>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mt-4 mx-auto">
        <Label className="my-1 mt-4">Bedrooms</Label>
        <Controller
          control={control}
          name={"flat__num_bedroom"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder={"Number of Bedrooms"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label className="my-1 mt-4">Bathrooms</Label>
        <Controller
          control={control}
          name={"flat__num_bathroom"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder={"Number of Bathrooms"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Label className="my-1 mt-4">Size (sqft)</Label>
        <Controller
          control={control}
          name={"size"}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder={"Enter the size of the flat"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label className="my-1 mt-4">Facing</Label>
        <Controller
          control={control}
          name={"flat__facing_side"}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Select
              placeholder={"Direction of the flat"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              options={[
                { value: "SOUTH", label: "South Facing" },
                { value: "EAST", label: "East Facing" },
                { value: "WEST", label: "West Facing" },
                { value: "NORTH", label: "North Facing" },
              ]}
              className="w-full"
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label className="my-1 mt-4">Completion Status</Label>
        <Controller
          control={control}
          name={"completion_status"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Radio.Group
              defaultValue={""}
              className="grid grid-cols-2"
              onChange={onChange}
            >
              <span>
                <Radio className="rounded-3xl" value="ready">
                  Ready
                </Radio>
              </span>
              <span>
                <Radio value="upcoming">Upcoming</Radio>
              </span>
              <span>
                <Radio value="ongoing">Ongoing</Radio>
              </span>
              <span>
                <Radio value="used">Used</Radio>
              </span>
            </Radio.Group>
          )}
        />
        <Label className="my-1 mt-4">Handover Date</Label>
        <Controller
          control={control}
          name={"flat__handovered_at"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <DatePicker
              size="large"
              className={"w-full"}
              placeholder="Date of Birth"
              onChange={onChange}
              onBlur={onBlur}
              value={dayjs(value)}
            />
          )}
        />
        <Label className="flex flex-row items-center gap-1 my-1 mt-4">
          Address
        </Label>
        <Controller
          control={control}
          name={"address__road"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.TextArea
              placeholder="Enter the street, road, house no...."
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
            />
          )}
        />
        <Label className="flex flex-row items-center gap-1 my-1 mt-4">
          Description
        </Label>
        <Controller
          control={control}
          name={"description"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.TextArea
              placeholder="Add aa description..."
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
            />
          )}
        />

        <Label className="my-1 mt-4">Apartment Type (optional)</Label>
        <Controller
          control={control}
          name={"flat__type"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Checkbox onChange={onChange} value={"shared_land"}>
              Land Share Apartment
            </Checkbox>
          )}
        />
        <Label className="my-1 mt-4">Price Public</Label>
        <Controller
          control={control}
          name={"public_price"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              // disabled
              placeholder={"Enter an amount"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label className="my-1 mt-4">Price Private</Label>
        <Controller
          control={control}
          name={"public_price"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              // disabled
              placeholder={"Enter an amount"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <div className="grid grid-cols-4 gap-3">
          <span className="col-span-2">
            <Label className="my-1 mt-4">Media</Label>
            <Controller
              control={control}
              name={"media_id"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Select
                  size="large"
                  placeholder="Search media..."
                  allowClear={false}
                  value={value || undefined}
                  showSearch
                  options={media}
                  onSearch={searchMedia}
                  loading={isMediaLoading}
                  onChange={onChange}
                  onBlur={onBlur}
                  className="w-full"
                  status={error ? "error" : ""}
                  suffixIcon={
                    <Icon
                      className="text-xl text-text"
                      icon={"mingcute:search-3-line"}
                    />
                  }
                  //   disabled={isLoading}
                />
              )}
            />
          </span>
          <span className="col-span-2">
            <Label className="my-1 mt-4">Commision</Label>
            <Controller
              control={control}
              name={"media_commision"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  // disabled
                  placeholder={"Enter an amount"}
                  size={"large"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  className="w-fit"
                  status={error ? "error" : ""}
                  //   suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
          </span>
        </div>

        {/* Add image section here */}

        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-5 bg-slate-600"
          disabled={propertyCreating}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default CreateFlat;
