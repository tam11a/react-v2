import React from "react";

import { Controller, FieldValues, useForm } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { useUpdateUserInfo } from "@/queries/auth";
import { Input, Typography, Tooltip, DatePicker, Segmented } from "antd";
// import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import useUser from "@/hooks/useUser";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";

const Personal: React.FC = () => {
	const user = useUser();
	const [messageApi, contextHolder] = message.useMessage();
	const {
		reset,
		handleSubmit,
		control,
		formState: { isDirty },
	} = useForm({
		// resolver: joiResolver(loginResolver),
	});
	const { mutateAsync: updateUser, isLoading: isSubmitting } =
		useUpdateUserInfo();

	React.useEffect(() => {
		if (!user || isDirty) return;

		reset({
			first_name: user.first_name,
			last_name: user?.last_name,
			phone: user?.phone,
			email: user?.email,
			display_picture: user?.display_picture,
			gender: user?.gender,
			dob: user?.dob,
			bank: user?.bank,
			address: user?.address,
		});
	}, [
		user.first_name,
		user?.last_name,
		user?.email,
		user?.display_picture,
		user?.gender,
		user?.dob,
		user?.bank,
		user?.address,
	]);

	const onValid = async (d: FieldValues) => {
		messageApi.open({
			type: "loading",
			content: `Updating information...`,
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				updateUser({
					userId: user.id,
					data: d,
				}),
			[201]
		);
		messageApi.destroy();
		if (res.status) messageApi.success("Information updated successfully!");
		else messageApi.error(res.message);
	};
	return (
		<>
			{contextHolder}
			<div className="container max-w-sm mx-auto ">
				<form onSubmit={handleSubmit(onValid)}>
					<Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
						Full Name
					</Typography>
					<Input.Group compact>
						<Controller
							control={control}
							name={"first_name"}
							// rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									className="w-1/2"
									placeholder={"First Name"}
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
									placeholder={"Last Name"}
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

					<Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
						Phone
					</Typography>
					<Controller
						control={control}
						name={"phone"}
						// rules={{ required: true }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<Input
								disabled
								placeholder={"Phone"}
								size={"large"}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								status={error ? "error" : ""}
								//   suffix={<ErrorSuffix error={error} />}
							/>
						)}
					/>

					<Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
						Email
						<Tooltip
							title={"Please enter a valid email address"}
							placement="rightTop"
						>
							<Icon icon="ph:info-fill" />
						</Tooltip>
					</Typography>
					<Controller
						control={control}
						name={"email"}
						// rules={{ required: true }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<Input
								placeholder={"Email"}
								size={"large"}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								status={error ? "error" : ""}
								//   suffix={<ErrorSuffix error={error} />}
							/>
						)}
					/>

					<Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
						Gender
					</Typography>
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
								className="relative w-full"
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

					<div className="flex flex-row gap-2">
						<div>
							<Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
								Date of Birth
							</Typography>
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
										onChange={onChange}
										onBlur={onBlur}
										value={dayjs(value)}
									/>
								)}
							/>
						</div>
						<div>
							<Typography className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
								Bank
							</Typography>
							<Controller
								control={control}
								name={"bank"}
								// rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Input
										placeholder={"Bank"}
										size={"large"}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										//   suffix={<ErrorSuffix error={error} />}
									/>
								)}
							/>
						</div>
					</div>

					<Typography className="flex flex-row items-center gap-1 mt-2 my-1">
						Address
					</Typography>
					<Controller
						control={control}
						name={"address"}
						// rules={{ required: true }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<Input
								placeholder={"Address"}
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
						fullWidth
						size="large"
						type={"submit"}
						className="mt-5 bg-slate-600"
						disabled={isSubmitting}
					>
						Update
					</Button>
				</form>
			</div>
		</>
	);
};

export default Personal;
