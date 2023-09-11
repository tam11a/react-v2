import { useCreateRole } from "@/queries/roles";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import React from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Input } from "antd";
import { Button } from "@mui/material";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: createRole, isLoading: roleCreating } = useCreateRole();

  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const onSubmit = async (data: any) => {
    messageApi.open({
      type: "loading",
      content: "Creating Role..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createRole({
          ...data,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) {
      reset();
      messageApi.success("Role created successfully!");
    } else {
      messageApi.error(res.message);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">Create New Role</h1>

        <Link to="/app/roles">
          <p className="font-semibold text-text-light underline">
            View All Roles
          </p>
        </Link>
      </div>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md m-4 mx-auto">
        <Label isRequired>Name</Label>
        <Controller
          control={control}
          name={"name"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              className="w-full"
              placeholder={"Enter Name"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Label className="my-1">Prefix</Label>
        <Controller
          control={control}
          name={"prefix"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder={"Enter Prefix"}
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
          Description
        </Label>
        <Controller
          control={control}
          name={"description"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              // disabled
              placeholder={"Enter Description"}
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
          disabled={roleCreating}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Create;
