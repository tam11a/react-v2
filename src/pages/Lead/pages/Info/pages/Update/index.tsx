import useLeadStatus from "@/hooks/useLeadStatus";
import { useGetLeadsById, useUpdateLeadsById } from "@/queries/leads";
import { useGetMediaById } from "@/queries/media";
import handleResponse from "@/utilities/handleResponse";
import { stringAvatar } from "@/utilities/stringAvatar";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { Icon } from "@iconify/react";
import { Avatar, Button } from "@mui/material";
import { Input, Segmented, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

const Update: React.FC = () => {
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({});
  const { data } = useGetLeadsById(params.id);
  const [leadInfo, setLeadInfo] = React.useState<any>([]);
  const { data: mediaData } = useGetMediaById(leadInfo?.media_id);
  const { mutateAsync: updateLead, isLoading: isSubmitting } =
    useUpdateLeadsById();
  const { leadStatus, isLeadStatusLoading, searchLeadStatus } = useLeadStatus();

  React.useEffect(() => {
    if (!data) return;
    setLeadInfo(data?.data?.data);
  }, [data]);

  React.useEffect(() => {
    if (!leadInfo || isDirty) return;
    reset({
      first_name: leadInfo?.firstName,
      last_name: leadInfo?.lastName,
      phone: leadInfo?.phone,
      email: leadInfo?.email,
      gender: leadInfo?.gender,
      company: leadInfo?.company,
      designation: leadInfo?.designation,
      created_at: leadInfo?.dob,
      status_id: leadInfo?.status_id,
      priority: leadInfo?.priority,
      address_line1: leadInfo?.address_line1,
      display_picture: leadInfo?.assignee?.display_picture,
    });
  }, [leadInfo]);

  const onValid = async (d: FieldValues) => {
    messageApi.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateLead({
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
      <form onSubmit={handleSubmit(onValid)} className=" mx-auto max-w-xl my-5">
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
            // rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                className="w-1/2"
                placeholder={"last name"}
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
        <Label className="my-1">Designation</Label>
        <Controller
          control={control}
          name={"designation"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              className="font-medium text-sm my-1"
              placeholder={"Designation"}
              prefix={
                <Iconify
                  icon={"ic:twotone-person-pin"}
                  className="text-text-light text-lg"
                />
              }
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Label className=" my-1 ">Company</Label>
        <Controller
          control={control}
          name={"company"}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              className="font-medium text-sm my-1"
              placeholder={"Company"}
              prefix={
                <Iconify
                  icon={"fluent:building-20-filled"}
                  className="text-text-light text-lg"
                />
              }
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

        <Label className=" my-1 ">Address</Label>
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

        <Label className="my-1">Phone</Label>
        <Controller
          control={control}
          name={"phone"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              className="font-medium text-sm my-1"
              placeholder={"Phone"}
              prefix={
                <Iconify
                  icon={"ic:outline-phone"}
                  className="text-text-light text-lg"
                />
              }
              size={"large"}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              status={error ? "error" : ""}
              //   suffix={<ErrorSuffix error={error} />}
            />
          )}
        />

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

        <Label className="my-1">Gender</Label>
        <Controller
          control={control}
          name={"gender"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Segmented
              block
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
              onResize={undefined}
              onResizeCapture={undefined}
              // status={error ? "error" : ""}
              // loading={isLoading}
            />
          )}
        />

        <Label className="my-1">Status</Label>
        <Controller
          control={control}
          name={"status_id"}
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
              className="w-full my-1"
              status={error ? "error" : ""}

              //   disabled={isLoading}
            />
          )}
        />

        <Label className="my-1">Priority</Label>
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
              className="w-full my-1"
              status={error ? "error" : ""}
              //   disabled={isLoading}
            />
          )}
        />

        <Label className="my-1">Entry Date</Label>
        <Controller
          control={control}
          name={"created_at"}
          // rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <DatePicker
              disabled
              size="large"
              placeholder="Date of Birth"
              className="text-text-light w-full my-1"
              onChange={onChange}
              onBlur={onBlur}
              value={dayjs(value)}
            />
          )}
        />

        <Label className="my-1">
          Assignee &bull;{" "}
          <Link to="#" className="text-sm ml-1 underline">
            Change Assignee
          </Link>
        </Label>
        <div className=" flex flex-row gap-2 items-center border border-[#d9d9d9] rounded my-2 p-2">
          <Avatar
            variant="rounded"
            src={leadInfo?.display_picture}
            {...stringAvatar(`${leadInfo?.first_name} ${leadInfo?.last_name}`)}
            className="text-sm w-[25px] h-[25px] border"
          />
          <p className="text-sm font-bold text-text">
            {leadInfo?.assignee?.first_name} {leadInfo?.assignee?.last_name}
          </p>
        </div>

        <h1 className="text-xl font-bold text-text-light my-5">
          Medial Information
        </h1>

        <div className="flex flex-row items-center">
          <Link to={`/app/info/media/${mediaData?.data?.data?.id}`}>
            <Avatar
              variant="rounded"
              src={leadInfo?.media?.display_picture}
              {...stringAvatar(
                `${leadInfo?.media?.first_name} ${leadInfo?.media?.last_name}`
              )}
              className="md:w-[75px] md:h-[75px] w-[60px] h-[60px] rounded-2xl mt-1"
            />
          </Link>
          <span className="flex flex-col px-2">
            <Link to={`/app/info/media/${leadInfo?.media?.id}`}>
              <p className="text-lg font-bold text-text-light">{`${leadInfo?.media?.first_name} ${mediaData?.data?.data?.last_name}`}</p>
            </Link>
            <p className="text-sm font-medium text-text-light">
              {leadInfo?.media?.gender}
            </p>
            <p className="text-sm font-medium text-text-light">
              <b>ID No:</b> {leadInfo?.media?.id}
              {leadInfo?.media?.first_name?.[0]}
            </p>
          </span>
        </div>
        <Label className="mt-4">Commision</Label>
        {/* <Controller
              control={control}
              name={"media_commision"}
              // rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => ( */}
        <Input
          disabled
          className="font-medium text-sm my-1"
          prefix={
            <Iconify
              icon={"mdi:percent-box"}
              className="text-text-light text-lg"
            />
          }
          placeholder={"Enter percent rate"}
          size={"large"}
          // onChange={onChange}
          // onBlur={onBlur}
          value={leadInfo?.media_commision} /*needs to change*/
          // status={error ? "error" : ""}
          suffix={"%"}
        />
        {/* )}
            /> */}

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
