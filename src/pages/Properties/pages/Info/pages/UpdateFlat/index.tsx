import useMedia from "@/hooks/useMedia";
import {
  useGetPropertiesById,
  useUpdatePropertyById,
} from "@/queries/properties";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import { Select, DatePicker, Input, Checkbox, Radio } from "antd";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const UpdateFlat: React.FC = () => {
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({});
  const { data } = useGetPropertiesById(params.id);
  const [propertyInfo, setPropertyInfo] = React.useState<any>([]);
  const { mutateAsync: updateProperty, isLoading: isSubmitting } =
    useUpdatePropertyById();
  const { media, isMediaLoading, searchMedia } = useMedia();

  React.useEffect(() => {
    if (!data) return;
    setPropertyInfo(data?.data?.data);
  }, [data]);
  console.log(propertyInfo);

  React.useEffect(() => {
    if (!propertyInfo || isDirty) return;
    reset({
      size: propertyInfo?.size,
      size_unit: propertyInfo?.size_unit,
      description: propertyInfo?.description,
      address__line1: propertyInfo?.["address.line1"],
      address__area: propertyInfo?.["address.area"],
      address__block: propertyInfo?.["address.block"],
      address__road: propertyInfo?.["address.road"],
      address__plot: propertyInfo?.["address.plot"],
      flat__num_bedroom: propertyInfo?.["flat.num_bedroom"],
      flat__num_bathroom: propertyInfo?.["flat.num_bathroom"],
      flat__facing_side: propertyInfo?.["flat.facing_side"],
      flat__handovered_at: propertyInfo?.["flat.handovered_at"],
      price: propertyInfo?.price,
      // private_price: propertyInfo?.private_price,
      media: propertyInfo?.media,
      media_commision: propertyInfo?.media_commision,
    });
  }, [propertyInfo]);

  const onValid = async (d: FieldValues) => {
    messageApi.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const formattedData = Object.keys(d)
      .map((key) => {
        let name = key.replace("__", ".");
        return { [name]: d[key] };
      })
      .reduce((prev, cur) => {
        prev[Object.keys(cur)[0]] = Object.values(cur)[0];
        return prev;
      }, {});
    const res = await handleResponse(
      () =>
        updateProperty({
          id: params?.id,
          data: formattedData,
        }),
      [200]
    );
    messageApi.destroy();
    if (res.status) messageApi.success("Information updated successfully!");
    else messageApi.error(res.message);
  };

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onValid)} className="max-w-md mt-4 mx-auto">
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
        <Label
          isRequired
          className="flex flex-row items-center gap-1 my-1 mt-4"
        >
          Address
        </Label>
        <Controller
          control={control}
          name={"address__line1"}
          rules={{ required: true }}
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
        <Label
          isRequired
          className="flex flex-row items-center gap-1 my-1 mt-4"
        >
          Area
        </Label>
        <Controller
          control={control}
          name={"address__area"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Enter the area..."
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
            />
          )}
        />
        <Label
          isRequired
          className="flex flex-row items-center gap-1 my-1 mt-4"
        >
          Block
        </Label>
        <Controller
          control={control}
          name={"address__block"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Enter Block Name..."
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
            />
          )}
        />
        <Label
          isRequired
          className="flex flex-row items-center gap-1 my-1 mt-4"
        >
          Road
        </Label>
        <Controller
          control={control}
          name={"address__road"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Enter the road no..."
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
        <Label isRequired className="my-1 mt-4">
          Price Public
        </Label>
        <Controller
          control={control}
          name={"price"}
          rules={{ required: true }}
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
          name={"private_price"}
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
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </>
  );
};

export default UpdateFlat;
