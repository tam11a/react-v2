import { useGetRoleById, useUpdateRoleById } from "@/queries/roles";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { Button } from "@mui/material";
import { Input } from "antd";
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
  const { data } = useGetRoleById(params.id);
  const [roleInfo, setRoleInfo] = React.useState<any>([]);
  const { mutateAsync: updateRole, isLoading: isSubmitting } =
    useUpdateRoleById();

  React.useEffect(() => {
    if (!data) return;
    setRoleInfo(data?.data?.data);
  }, [data]);

  React.useEffect(() => {
    if (!roleInfo || isDirty) return;
    reset({
      name: roleInfo?.name,
      prefix: roleInfo?.prefix,
      description: roleInfo?.description,
    });
  }, [roleInfo]);

  const onValid = async (d: FieldValues) => {
    messageApi.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateRole({
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
        <Label className="my-1">Role name</Label>
        <Controller
          control={control}
          name={"name"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              className=" font-medium text-sm my-1"
              placeholder={"role name"}
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label className=" my-1 ">Prefix</Label>
        <Controller
          control={control}
          name={"prefix"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              className=" font-medium text-sm my-1"
              placeholder={"prefix"}
              size={"large"}
              prefix={
                <Iconify
                  icon={"ic:round-alternate-email"}
                  className="text-text-light text-lg"
                />
              }
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />
        <Label className=" my-1 ">Description</Label>
        <Controller
          control={control}
          name={"description"}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input.TextArea
              className="text-text-light font-semibold text-sm min-h-[100px]"
              placeholder="Description..."
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
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
