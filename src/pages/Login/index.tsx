import React from "react";

// import { loginResolver } from './resolver';
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Checkbox, Input, Typography } from "antd";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import logo from "/assets/logo.png";
import useAuth from "@/hooks/useAuth";

const Login: React.FC = () => {
	const { login, isLoginLoading } = useAuth();

	const {
		// reset,
		handleSubmit,
		control,
	} = useForm({
		// resolver: joiResolver(loginResolver),
		defaultValues: {
			phone: "",
			password: "",
			remember: true,
		},
	});
	const onValid = async ({ phone, password, remember }: FieldValues) => {
		login(phone, password, remember);
	};
	return (
		<>
			<section className="h-screen md:p-20 bg-gradient-to-br from-[#C5F6F9]  to-[#E8EAFB] ">
				<div className="container mx-auto h-full bg-white drop-shadow-xl flex md:flex-row flex-col items-center justify-between max-w-6xl rounded-md overflow-hidden">
					{/* Left column  */}
					<div className="w-[70%] h-full md:bg-[#E8FFF8] bg-none md:flex flex-col items-center justify-between drop-shadow-xl hidden">
						<div></div>
						<img
							src={logo}
							className="w-20"
							alt=""
						/>
						<Typography
							className={
								"text-center text-[10px] font-medium tracking-wider pb-10 hidden md:inline"
							}
						>
							We do believe in Creation, Not Construction
						</Typography>
					</div>

					{/* right column */}
					<div className="h-full w-full flex flex-col items-center justify-center gap-4 pb-12">
						<Typography
							className={
								"mb-8 text-center text-3xl font-semibold tracking-widest leading-3 text-text-dark"
							}
						>
							WELCOME
						</Typography>

						<form
							onSubmit={handleSubmit(onValid)}
							className="max-w-xs"
						>
							<Controller
								control={control}
								name={"phone"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Typography className="tracking-wide text-sm font-medium text-text-light">
											Phone Number
										</Typography>
										<Input
											prefix={
												<Icon
													icon="ph:phone"
													color="#999"
													className="mr-1 text-xl"
												/>
											}
											className="my-2 text-md"
											placeholder={"Enter Phone Number"}
											size={"large"}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											//   suffix={<ErrorSuffix error={error} />}
										/>
									</>
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
										<Typography className="tracking-wide text-sm font-medium text-text-light">
											Password
											{/* <ErrorSuffix error={error} size="small" /> */}
										</Typography>
										<Input.Password
											prefix={
												<Icon
													icon="ri:lock-password-line"
													color="#999"
													className="mr-1 text-lg"
												/>
											}
											className="my-2 text-md text-text-light"
											placeholder={"Enter Password"}
											size="large"
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											//   suffix={<ErrorSuffix error={error} />}
										/>
									</>
								)}
							/>
							<Controller
								control={control}
								name={"remember"}
								render={({ field: { onChange, value } }) => (
									<Checkbox
										onChange={onChange}
										checked={value}
										className="text-sm font-medium text-text-light"
									>
										Remember me
									</Checkbox>
								)}
							/>

							<Button
								className="mt-2 uppercase bg-slate-600 text-sm font-semibold"
								variant="contained"
								fullWidth
								size="large"
								type={"submit"}
								disabled={isLoginLoading}
							>
								LogIn
							</Button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
