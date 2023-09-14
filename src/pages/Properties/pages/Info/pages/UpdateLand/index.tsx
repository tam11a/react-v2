import useMedia from "@/hooks/useMedia";
import {
	useGetPropertiesById,
	useUpdatePropertyById,
} from "@/queries/properties";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { message } from "@components/antd/message";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import { Select, Input, Radio, Cascader } from "antd";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateLand: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const {
		reset,
		handleSubmit,
		control,
		formState: { isDirty },
	} = useForm({});
	const { data } = useGetPropertiesById(params.id);
	const [propertyInfo, setPropertyInfo] = React.useState<any>([]);
	const { mutateAsync: updateProperty, isLoading: isSubmitting } =
		useUpdatePropertyById();
	const { media, isMediaLoading, searchMedia } = useMedia();

	React.useEffect(() => {
		if (!data) return;
		setPropertyInfo(data?.data?.data);
	}, [data]);
	console.log(propertyInfo);

	React.useEffect(() => {
		if (!propertyInfo || isDirty) return;
		reset({
			title: propertyInfo?.title,
			status: propertyInfo?.status,
			land_type: propertyInfo?.land_type,
			size: propertyInfo?.size,
			size_unit: propertyInfo?.size_unit,
			description: propertyInfo?.description,
			remarks: propertyInfo?.remarks,
			address__line1: propertyInfo?.["address.line1"],
			address__area: propertyInfo?.["address.area"],
			address__block: propertyInfo?.["address.block"],
			address__road: propertyInfo?.["address.road"],
			address__plot: propertyInfo?.["address.plot"],
			price: propertyInfo?.price,
			private_price: propertyInfo?.private_price,
			media_id: propertyInfo?.media_id,
			media_commision: propertyInfo?.media_commision,
		});
	}, [propertyInfo]);

	const onValid = async (d: FieldValues) => {
		messageApi.open({
			type: "loading",
			content: `Updating information...`,
			duration: 0,
		});
		const formattedData = Object.keys(d)
			.map((key) => {
				let name = key.replace("__", ".");
				return { [name]: d[key] };
			})
			.reduce((prev, cur) => {
				prev[Object.keys(cur)[0]] = Object.values(cur)[0];
				return prev;
			}, {});
		const res = await handleResponse(
			() =>
				updateProperty({
					id: params?.id,
					data: formattedData,
				}),
			[200]
		);
		messageApi.destroy();
		if (res.status) {
			messageApi.success("Information updated successfully!");
			navigate(`/app/properties/details/${params.id}`, {
				replace: true,
			});
		} else messageApi.error(res.message);
	};

	return (
		<>
			{contextHolder}
			<form
				onSubmit={handleSubmit(onValid)}
				className="max-w-md mt-4 mx-auto"
			>
				<Label
					isRequired
					className="my-1 mt-4"
				>
					Title
				</Label>
				<Controller
					control={control}
					name={"title"}
					rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							// disabled
							placeholder={"Enter Title.."}
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<div>
					<Label className="my-1 mt-4">Status</Label>
					<Controller
						control={control}
						name={"status"}
						// rules={{ required: true }}
						render={({
							field: { onChange },
							fieldState: { error: _error },
						}) => (
							<Radio.Group
								className="grid grid-cols-2 mt-2"
								onChange={onChange}
								defaultValue={"New"}
							>
								<span>
									<Radio
										className="col-span-1"
										value="New"
									>
										New
									</Radio>
								</span>
								<span>
									<Radio value="Booked">Booked</Radio>
								</span>
								<span>
									<Radio value="Sold">Sold</Radio>
								</span>
							</Radio.Group>
						)}
					/>
				</div>
				<div>
					<Label className="my-1 mt-4">Land Type</Label>
					<Controller
						control={control}
						name={"land_type"}
						// rules={{ required: true }}
						render={({
							field: { value, onChange },
							fieldState: { error: _error },
						}) => (
							<Radio.Group
								value={value}
								className="grid grid-cols-2 mt-2"
								onChange={onChange}
							>
								<span>
									<Radio
										className="col-span-1"
										value="agricultural"
									>
										Agricultural
									</Radio>
								</span>
								<span>
									<Radio value="residential">Residential</Radio>
								</span>
								<span>
									<Radio value="commercial">Commercial</Radio>
								</span>
								<span>
									<Radio value="others">Others</Radio>
								</span>
							</Radio.Group>
						)}
					/>
				</div>
				<div className="grid grid-cols-3 gap-3">
					<span className="col-span-2">
						<Label
							isRequired
							className="my-1 mt-4"
						>
							Land Size
						</Label>
						<Controller
							control={control}
							name={"size"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									placeholder={"Whats the size of the property?"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									//   suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>
					</span>
					<span className="col-span-1">
						<Label
							isRequired
							className="my-1 mt-4"
						>
							Unit
						</Label>
						<Controller
							control={control}
							name={"size_unit"}
							rules={{ required: true }}
							defaultValue={"KATHA"}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Select
									placeholder={"Choose Unit"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									options={[
										{ value: "KATHA", label: "Katha" },
										{ value: "BIGHA", label: "Bigha" },
										{ value: "ACRES", label: "Acres" },
										{ value: "SHOTOK", label: "Shotok" },
										{ value: "DECIMAL", label: "Decimal" },
									]}
									value={value}
									status={error ? "error" : ""}
									//   suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>
					</span>
				</div>
				<Label className="my-1 mt-4">Description</Label>
				<Controller
					control={control}
					name={"description"}
					rules={{ required: false }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input.TextArea
							className="w-full"
							placeholder={"Add a description"}
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<Label className="my-1 mt-4">Remarks</Label>
				<Controller
					control={control}
					name={"remarks"}
					rules={{ required: false }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input.TextArea
							className="w-full"
							placeholder={"Add a remark"}
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<Label
					// isRequired
					className="my-1 mt-4"
				>
					Block
				</Label>
				<Controller
					control={control}
					name={"address__block"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							// disabled
							placeholder={"Enter Block Name"}
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<Label
					// isRequired
					className="flex flex-row items-center gap-1 my-1 mt-4"
				>
					Road
				</Label>
				<Controller
					control={control}
					name={"address__road"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<>
							<Input
								placeholder="Enter Road Number"
								size="large"
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								status={error ? "error" : ""}
							/>
						</>
					)}
				/>

				<Label
					// isRequired
					className="my-1 mt-4"
				>
					Plot
				</Label>
				<Controller
					control={control}
					name={"address__plot"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							// disabled
							placeholder={"Enter plot Name"}
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<Label
					isRequired
					className="my-1 mt-4"
				>
					Area
				</Label>
				<Controller
					control={control}
					name={"address__area"}
					rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							// disabled
							placeholder={"Enter area Name"}
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<Label className="my-1 mt-4">Address</Label>
				<Controller
					control={control}
					name={"address__line1"}
					rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input.TextArea
							placeholder={"Enter Details Address"}
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>

				<Label
					// isRequired
					className="my-1 mt-4"
				>
					Public Price
				</Label>
				<Controller
					control={control}
					name={"price"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							// disabled
							placeholder={"Enter an amount"}
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<Label className="my-1 mt-4">Private Price</Label>
				<Controller
					control={control}
					name={"private_price"}
					// rules={{ required: true }}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input
							// disabled
							placeholder={"Enter an amount"}
							size={"large"}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
							//   suffix={<ErrorSuffix error={error} />}
						/>
					)}
				/>
				<div className="grid grid-cols-4 gap-3">
					<span className="col-span-2">
						<Label className="my-1 mt-4">Media</Label>
						<Controller
							control={control}
							name={"media_id"}
							// rules={{ required: true }}
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
					</span>
					<span className="col-span-2">
						<Label className="my-1 mt-4">Commision</Label>
						<Controller
							control={control}
							name={"media_commision"}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									// disabled
									placeholder={"Enter an amount"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									className="w-full"
									//   suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>
					</span>
				</div>

				{/* Add image section here */}

				<Button
					variant="contained"
					size="large"
					type={"submit"}
					className="w-full mt-5 bg-slate-600"
					disabled={isSubmitting}
				>
					Submit
				</Button>
			</form>
		</>
	);
};

export default UpdateLand;
