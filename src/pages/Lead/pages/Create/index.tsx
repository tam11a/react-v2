import useEmployee from "@/hooks/useEmployee";
import useLeadStatus from "@/hooks/useLeadStatus";
import useMedia from "@/hooks/useMedia";
import { useCreateLead } from "@/queries/leads";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import { Cascader, Input, Segmented, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: createLead, isLoading: leadCreating } = useCreateLead();
  const { media, isMediaLoading, searchMedia } = useMedia();
  const { leadStatus, isLeadStatusLoading, searchLeadStatus } = useLeadStatus();
  const { employee, isEmployeeLoading, searchEmployee } = useEmployee();

  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });

  const onSubmit = async (data: any) => {
    messageApi.open({
      type: "loading",
      content: "Creating Lead..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createLead({
          ...data,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) {
      reset();
      messageApi.success("Lead created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">Create New Lead</h1>

        <Link to="/app/leads">
          <p className="font-semibold text-text-light underline">
            View All Leads
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
          Company
        </Label>
        <Controller
          control={control}
          name={"company"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder={"Enter Company..."}
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
          Designation
        </Label>
        <Controller
          control={control}
          name={"designation"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder={"Enter Designation..."}
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
          Address
        </Label>
        <Controller
          control={control}
          name={"address"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
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
          Status
        </Label>
        <Controller
          control={control}
          name={"status_id"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Select
              size="large"
              placeholder="Search Status..."
              allowClear={false}
              value={value || undefined}
              showSearch
              options={leadStatus}
              onSearch={searchLeadStatus}
              loading={isLeadStatusLoading}
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
        <Label isRequired className="my-1">
          Media Source
        </Label>
        <Controller
          control={control}
          name={"media_id"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Cascader
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

        <Label isRequired className="my-1">
          Media Commission
        </Label>
        <Controller
          control={control}
          name={"media_commision"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              className="w-full"
              placeholder={"Commision"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              suffix={
                <Icon
                  icon={"mdi:percent-box"}
                  className="text-text-light text-lg"
                />
              }
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Label isRequired className="my-1">
          Priority
        </Label>
        <Controller
          control={control}
          name={"priority"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Select
              size="large"
              placeholder="Priority..."
              allowClear={false}
              value={value || undefined}
              options={[
                { value: "HIGHEST", label: "Highest" },
                { value: "HIGH", label: "High" },
                { value: "MEDIUM", label: "Medium" },
                { value: "LOW", label: "Low" },
                { value: "LOWEST ", label: "Lowest" },
              ]}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full"
              status={error ? "error" : ""}
              //   disabled={isLoading}
            />
          )}
        />

        <Label isRequired className="my-1">
          Assigned To
        </Label>
        <Controller
          control={control}
          name={"assigned_to"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Cascader
              size="large"
              placeholder="Search Employee..."
              allowClear={false}
              value={value || undefined}
              showSearch
              options={employee}
              onSearch={searchEmployee}
              loading={isEmployeeLoading}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full"
              status={error ? "error" : ""}
              suffixIcon={
                <Icon
                  className="text-xl text-text-dark"
                  icon={"clarity:employee-solid"}
                />
              }
              //   disabled={isLoading}
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
              placeholder={"Enter Address Line 1..."}
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
          Address Line 2
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
              placeholder={"Enter Address Line 2..."}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-5 bg-slate-600"
          disabled={leadCreating}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Create;
