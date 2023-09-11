import { useCreateMedia } from "@/queries/media";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { Link } from "react-router-dom";
import Label from "@components/Label";
import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import { Button } from "@mui/material";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: createMedia, isLoading: mediaCreating } =
    useCreateMedia();

  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const onSubmit = async (data: any) => {
    messageApi.open({
      type: "loading",
      content: "Creating Media..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createMedia({
          ...data,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) {
      reset();
      messageApi.success("Media created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">Create New Media</h1>

        <Link to="/app/media">
          <p className="font-semibold text-text-light underline">
            View All Media
          </p>
        </Link>
      </div>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md m-4 mx-auto">
        <Label isRequired>Full Name</Label>
        <Input.Group compact>
          <Controller
            control={control}
            name={"first_name"}
            rules={{ required: true }}
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
            rules={{ required: true }}
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
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder={"Enter Email Address"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Label isRequired className="my-1">
          Phone
        </Label>
        <Controller
          control={control}
          name={"phone"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              // disabled
              placeholder={"Enter Phone Number"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Label className="my-1">Gender</Label>
        <Controller
          control={control}
          name={"gender"}
          rules={{ required: false }}
          defaultValue={"Non Binary"}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Select
              placeholder={"Gender"}
              size={"large"}
              className="relative w-full"
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
        <Label isRequired className="my-1">
          Address Line 1
        </Label>
        <Controller
          control={control}
          name={"address_line1"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.TextArea
              placeholder={"Enter Address..."}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label isRequired className="my-1">
          Address line 2
        </Label>
        <Controller
          control={control}
          name={"address_line2"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.TextArea
              placeholder={"Enter Address..."}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Label isRequired className="mt-2 mb-1">
          Date of Birth
        </Label>
        <Controller
          control={control}
          name={"dob"}
          defaultValue={dayjs()}
          rules={{ required: true }}
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

        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-5 bg-slate-600"
          disabled={mediaCreating}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Create;
