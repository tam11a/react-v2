import useRole from "@/hooks/useRole";
import { useCreateEmployee } from "@/queries/employees";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { Button } from "@mui/material";
import { DatePicker, Input, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: createEmployee, isLoading: employeeCreating } =
    useCreateEmployee();
  const { role, isRoleLoading, searchRole } = useRole();
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const onSubmit = async (data: any) => {
    messageApi.open({
      type: "loading",
      content: "Creating Employee..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createEmployee({
          ...data,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) {
      reset();
      messageApi.success("Employee created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">Create New Employee</h1>

        <Link to="/app/employees">
          <p className="font-semibold text-text-light underline">
            View All Employees
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
        <Controller
          control={control}
          name={"password"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <Label isRequired className="flex flex-row items-center gap-1">
                New Password
                {/* {error ? (
                    <ErrorSuffix error={error} />
                  ) : (
                    <Tooltip
                      title={"Password should be atleast 6 characters long."}
                       placement="topLeft"
                    >
                       <Icon color={"action"} className="text-base mb-1">
                        <AiFillInfoCircle />
                      </Icon> 
                    </Tooltip>
                  )}  */}
              </Label>
              <Input.Password
                placeholder="Enter Password"
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
              />
            </>
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

        <Controller
          control={control}
          name={"role_id"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <Label
                isRequired
                className="flex flex-row items-center gap-1 mt-2 my-1 "
              >
                Role
                {/* {error ? (
                  <ErrorSuffix error={error} />
                ) : (
                  <Tooltip
                    title={"Password should be atleast 6 characters long."}
                     placement="topLeft"
                  >
                     <Icon color={"action"} className="text-base mb-1">
                      <AiFillInfoCircle />
                    </Icon> 
                  </Tooltip>
                )}  */}
              </Label>
              <Select
                value={value}
                size="large"
                showSearch
                className="w-full"
                placeholder={"Select a Role..."}
                suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                onChange={onChange}
                options={role}
                onSearch={searchRole}
                loading={isRoleLoading}
                status={error ? "error" : ""}
              />
            </>
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
        <Label className="my-1">Curriculum Vitae</Label>
        <Controller
          control={control}
          name={"media_commision"}
          rules={{ required: false }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              disabled
              className="w-full"
              placeholder={"Attach a file"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              prefix={<Iconify icon={"ph:link"} />}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Label className="my-1">NID Number</Label>
        <Controller
          control={control}
          name={"nid"}
          rules={{ required: false }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              // disabled
              placeholder={"Enter 13 digits..."}
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
          Hired Date
        </Label>
        <Controller
          control={control}
          name={"hired_date"}
          defaultValue={dayjs()}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <DatePicker
              size="large"
              className={"w-full"}
              placeholder="Hired Date"
              onChange={onChange}
              onBlur={onBlur}
              value={dayjs(value)}
            />
          )}
        />

        <Label isRequired className="mt-2 mb-1">
          Maximum Device
        </Label>
        <Controller
          control={control}
          name={"max_session"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder={"2"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <p className="text-lg font-semibold my-3">Payroll Information</p>

        <Label className="mt-2 mb-1">Work Hours</Label>
        <Controller
          control={control}
          name={"work_hour"}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              prefix={<Iconify icon={"iconamoon:clock-duotone"} />}
              placeholder={"8"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label className="mt-2 mb-1">Salary</Label>
        <Controller
          control={control}
          name={"salary"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder={"Enter Salary"}
              addonAfter={<Iconify icon={"tabler:currency-taka"} />}
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
          disabled={employeeCreating}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Create;
