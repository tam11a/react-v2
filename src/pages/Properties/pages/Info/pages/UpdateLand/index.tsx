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
import { Select, Input, Checkbox } from "antd";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateLand: React.FC = () => {
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
      first_name: propertyInfo?.first_name,
      last_name: propertyInfo?.last_name,
      email: propertyInfo?.email,
      gender: propertyInfo?.gender,
      role_id: propertyInfo?.role_id,
      display_picture: propertyInfo?.display_picture,
      dob: propertyInfo?.dob,
      max_session: propertyInfo?.max_session,
      hired_date: propertyInfo?.hired_date,
      work_hour: propertyInfo?.work_hour,
      salary: propertyInfo?.salary,
      bank: propertyInfo?.bank,
      address: propertyInfo?.address,
      address2: propertyInfo?.address2,
      cv: propertyInfo?.cv,
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
        <div>
          <Label className="my-1 mt-4">Land Type</Label>
          <Controller
            control={control}
            name={"land_type"}
            // rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Checkbox.Group className="grid grid-cols-2" onChange={onChange}>
                <span>
                  <Checkbox className="col-span-1" value="Agricultural">
                    Agricultural
                  </Checkbox>
                </span>
                <span>
                  <Checkbox value="Residential">Residential</Checkbox>
                </span>
                <span>
                  <Checkbox value="Commercial">Commercial</Checkbox>
                </span>
                <span>
                  <Checkbox value="Other">Other</Checkbox>
                </span>
              </Checkbox.Group>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <span className="col-span-2">
            <Label className="my-1 mt-4">Land Size</Label>
            <Controller
              control={control}
              name={"size"}
              // rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"Whats the size of the property?"}
                  size={"large"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  //   suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
          </span>
          <span className="col-span-1">
            <Label className="my-1 mt-4">Unit</Label>
            <Controller
              control={control}
              name={"size_unit"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Select
                  placeholder={"Choose Unit"}
                  size={"large"}
                  onChange={onChange}
                  onBlur={onBlur}
                  options={[
                    { value: "KATHA", label: "katha" },
                    { value: "BIGHA", label: "bigha" },
                    { value: "ACRES", label: "acres" },
                    { value: "SHOTOK", label: "shotok" },
                    { value: "DECIMAL", label: "decimal" },
                  ]}
                  value={value}
                  status={error ? "error" : ""}
                  //   suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
          </span>
        </div>
        <Label className="my-1 mt-4">Description</Label>
        <Controller
          control={control}
          name={"description"}
          rules={{ required: false }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.TextArea
              className="w-full"
              placeholder={"Add a description"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label className="my-1 mt-4">Address</Label>
        <Controller
          control={control}
          name={"address__line1"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.TextArea
              placeholder={"Enter Address Line 1"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label isRequired className="my-1 mt-4">
          Area
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
              // disabled
              placeholder={"Enter Block Name"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label isRequired className="my-1 mt-4">
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
              // disabled
              placeholder={"Enter Block Name"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
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
            <>
              <Input
                placeholder="Enter Road Number"
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
              />
            </>
          )}
        />

        <Label isRequired className="my-1 mt-4">
          Plot
        </Label>
        <Controller
          control={control}
          name={"address__plot"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              // disabled
              placeholder={"Enter plot Name"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
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
                  status={error ? "error" : ""}
                  className="w-full"
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

export default UpdateLand;
