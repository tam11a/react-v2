import useRole from "@/hooks/useRole";
import {
	useGetEmployeesById,
	useUpdateEmployeesById,
} from "@/queries/employees";
import instance from "@/services";
import handleResponse from "@/utilities/handleResponse";
import previewAttachment from "@/utilities/s3Attachment";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import {
	Select,
	DatePicker,
	Button as AntButton,
	Input,
	Cascader,
	Upload as AntUpload,
} from "antd";
import dayjs from "dayjs";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Upload from "@/components/Upload";

const Update: React.FC = () => {
	const params = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const {
		reset,
		handleSubmit,
		control,
		formState: { isDirty },
	} = useForm({});
	const { data } = useGetEmployeesById(params.id);
	const [employeeInfo, setEmployeeInfo] = React.useState<any>([]);
	const { mutateAsync: updateEmployee, isLoading: isSubmitting } =
		useUpdateEmployeesById();
	const { role, isRoleLoading, searchRole } = useRole();

	React.useEffect(() => {
		if (!data) return;
		setEmployeeInfo(data?.data?.data);
	}, [data]);

	React.useEffect(() => {
		if (!employeeInfo || isDirty) return;
		reset({
			first_name: employeeInfo?.first_name,
			last_name: employeeInfo?.last_name,
			email: employeeInfo?.email,
			gender: employeeInfo?.gender,
			role_id: employeeInfo?.role_id,
			display_picture: employeeInfo?.display_picture,
			dob: employeeInfo?.dob,
			max_session: employeeInfo?.max_session,
			hired_date: employeeInfo?.hired_date,
			work_hour: employeeInfo?.work_hour,
			salary: employeeInfo?.salary,
			bank: employeeInfo?.bank,
			address: employeeInfo?.address,
			address2: employeeInfo?.address2,
			cv: employeeInfo?.cv,
		});
	}, [employeeInfo]);

	const onValid = async (d: FieldValues) => {
		messageApi.open({
			type: "loading",
			content: `Updating information...`,
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				updateEmployee({
					id: params?.id,
					data: d,
				}),
			[200]
		);
		messageApi.destroy();
		if (res.status) messageApi.success("Information updated successfully!");
		else messageApi.error(res.message);
	};

	console.log(previewAttachment(employeeInfo?.display_picture));

	return (
		<>
			{contextHolder}
			<form
				onSubmit={handleSubmit(onValid)}
				className=" mx-auto max-w-lg my-5"
			>
				<Label isRequired>Display Image</Label>
				<Controller
					control={control}
					name={"first_name"}
					rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<AntUpload
							fileList={
								value
									? [
											{
												uid: value,
												url: previewAttachment(value),
												preview: previewAttachment(value),
												name: value,
												fileName: value,
												status: "done",
												crossOrigin: "anonymous",
												error,
											},
									  ]
									: undefined
							}
							showUploadList={{
								showDownloadIcon: true,
							}}
							action={`${instance.getUri()}aws/upload`}
							method="POST"
							name="file"
							onChange={(i) => {
								if (i.file.status === "done") {
									onChange(i.file.response?.key);
								}

								if (i.file.status === "success") {
									messageApi.info("Please click update to save changes");
								}

								if (i.file.status === "removed") onChange(null);

								if (i.file.status === "error") {
									messageApi.error(i.file.response?.message);
								}
							}}
						>
							<AntButton
								className="flex flex-col items-center justify-center text-sm"
								type="dashed"
								icon={<Icon icon={"material-symbols:upload"} />}
							>
								<span>Upload</span>
							</AntButton>
						</AntUpload>
					)}
				/>

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
					name={"address"}
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
					name={"address2"}
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
				<Label className="my-1">Role</Label>
				<Controller
					control={control}
					name={"role_id"}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Cascader
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
					)}
				/>
				<Label className="my-1">Max Session</Label>
				<Controller
					control={control}
					name={"max_session"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							className=" font-medium text-sm my-1"
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>

				<Label className="my-1">Hire Date</Label>
				<Controller
					control={control}
					name={"hire_date"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<DatePicker
							size="large"
							placeholder="Hire Date"
							className="text-text-light w-full my-1"
							onChange={onChange}
							onBlur={onBlur}
							value={dayjs(value)}
						/>
					)}
				/>
				<Label className="my-1">Work Hour</Label>
				<Controller
					control={control}
					name={"work_hour"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							className=" font-medium text-sm my-1"
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<Label className="my-1">Salary</Label>
				<Controller
					control={control}
					name={"salary"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							className=" font-medium text-sm my-1"
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<Label className="my-1">Bank Details</Label>
				<Controller
					control={control}
					name={"bank"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							className=" font-medium text-sm my-1"
							placeholder="Add Bank Details"
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<Label className="my-1">Curriculam Vitae</Label>
				<Controller
					control={control}
					name={"cv"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<>
							<AntUpload
								fileList={
									value
										? [
												{
													uid: value,
													url: previewAttachment(value),
													name: value,
													fileName: value,
													status: "done",
													crossOrigin: "anonymous",
													error,
												},
										  ]
										: undefined
								}
								showUploadList={{
									showDownloadIcon: true,
								}}
								action={`${instance.getUri()}aws/upload`}
								method="POST"
								name="file"
								onChange={(i) => {
									if (i.file.status === "done") {
										onChange(i.file.response?.key);
									}

									if (i.file.status === "success") {
										messageApi.info("Please click update to save changes");
									}

									if (i.file.status === "removed") onChange(null);

									if (i.file.status === "error") {
										messageApi.error(i.file.response?.message);
									}
								}}
							>
								{value ? null : (
									<AntButton
										className="flex flex-row items-center justify-center gap-2"
										type="dashed"
										icon={<Icon icon={"material-symbols:upload"} />}
									>
										Click to Upload
									</AntButton>
								)}
							</AntUpload>
						</>
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
