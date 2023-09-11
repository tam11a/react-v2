import { useGetMediaById, useUpdateMediaById } from "@/queries/media";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { Button } from "@mui/material";
import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const Update: React.FC = () => {
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({});
  const { data } = useGetMediaById(params.id);
  const [mediaInfo, setMediaInfo] = React.useState<any>([]);
  const { mutateAsync: updateMedia, isLoading: isSubmitting } =
    useUpdateMediaById();

  React.useEffect(() => {
    if (!data) return;
    setMediaInfo(data?.data?.data);
  }, [data]);

  React.useEffect(() => {
    if (!mediaInfo || isDirty) return;
    reset({
      first_name: mediaInfo?.first_name,
      last_name: mediaInfo?.last_name,
      email: mediaInfo?.email,
      gender: mediaInfo?.gender,
      display_picture: mediaInfo?.display_picture,
      dob: mediaInfo?.dob,
      address_line1: mediaInfo?.address_line1,
      address_line2: mediaInfo?.address_line2,
    });
  }, [mediaInfo]);

  const onValid = async (d: FieldValues) => {
    messageApi.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateMedia({
          id: params?.id,
          data: d,
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
      <form onSubmit={handleSubmit(onValid)} className=" mx-auto max-w-lg my-5">
        <Label>Full Name</Label>
        <Input.Group compact>
          <Controller
            control={control}
            name={"first_name"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                className="w-1/2"
                placeholder={"Enter First Name"}
                size={"large"}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                //   suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Controller
            control={control}
            name={"last_name"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                className="w-1/2"
                placeholder={"Enter Last Name"}
                size={"large"}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                //   suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
        </Input.Group>
        <Label className="my-1">Email</Label>
        <Controller
          control={control}
          name={"email"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              className=" font-medium text-sm my-1"
              prefix={
                <Iconify
                  icon={"mdi-light:email"}
                  className="text-text-light text-lg"
                />
              }
              placeholder={"example@gmail.com"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label className=" my-1 ">Address Line 1</Label>
        <Controller
          control={control}
          name={"address_line1"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.TextArea
              className="text-text-light font-semibold text-sm min-h-[100px]"
              placeholder="Address..."
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
            />
          )}
        />
        <Label className=" my-1 ">Address Line 2</Label>
        <Controller
          control={control}
          name={"address_line2"}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.TextArea
              className="text-text-light font-semibold text-sm min-h-[100px]"
              placeholder="Address..."
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
            />
          )}
        />
        <Label className="my-1">Gender</Label>
        <Controller
          control={control}
          name={"gender"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Select
              placeholder={"Gender"}
              size={"large"}
              className="relative w-full  my-1"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Non Binary", label: "Non Binary" },
              ]}
              // status={error ? "error" : ""}
              // loading={isLoading}
            />
          )}
        />
        <Label className="my-1">Date Of Birth</Label>
        <Controller
          control={control}
          name={"dob"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <DatePicker
              size="large"
              placeholder="Date of Birth"
              className="text-text-light w-full my-1"
              onChange={onChange}
              onBlur={onBlur}
              value={dayjs(value)}
            />
          )}
        />
        <Button
          variant="contained"
          fullWidth
          size="large"
          type={"submit"}
          className="mt-5 bg-slate-600"
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </>
  );
};

export default Update;
