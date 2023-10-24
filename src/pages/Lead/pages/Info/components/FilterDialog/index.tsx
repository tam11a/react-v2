import React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Divider,
	DialogActions,
	Button,
} from "@mui/material";
import {
	InputNumber,
	Select,
	// message
} from "antd";
import { MdClose } from "react-icons/md";
import Label from "@components/Label";
import {
	Control,
	Controller,
	FieldValues,
	UseFormReset,
} from "react-hook-form";

const FilterDialog: React.FC<{
	open: boolean;
	onClose: () => void;
	control: Control<FieldValues, any> | any;
	reset: UseFormReset<FieldValues> | any;
	isDirty: boolean;
	setValue: any;
}> = ({ open, onClose, control, reset, isDirty, setValue }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				className: "w-[95vw] max-w-[700px]",
			}}
		>
			<DialogTitle className="flex flex-row items-center justify-between text-base">
				<span>Customer Requirements</span>{" "}
				<IconButton
					onClick={onClose}
					size="small"
				>
					<MdClose />
				</IconButton>
			</DialogTitle>
			<Divider />
			{/* <form onSubmit={}> */}
			<DialogContent>
				<div className="max-w-5xl px-3  mx-3">
					<div className="grid grid-cols-3 gap-2">
						<span>
							<Label className="my-1">Type</Label>
							<Controller
								control={control}
								name={"type"}
								defaultValue={undefined}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Select
										size="large"
										placeholder="Select Type..."
										allowClear={true}
										value={value}
										options={[
											{ value: "FLAT", label: "Flat" },
											{ value: "LAND", label: "Land" },
										]}
										onChange={onChange}
										onBlur={onBlur}
										className="w-full"
										status={error ? "error" : ""}
										//   disabled={isLoading}
									/>
								)}
							/>
						</span>
						<span>
							<Label className="my-1">Location</Label>
							<Controller
								control={control}
								name={"area"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Select
										size="large"
										placeholder="Select Location..."
										allowClear={true}
										value={value}
										options={[
											{ value: "uttara", label: "Uttara" },
											{ value: "rampura", label: "Rampura" },
											{ value: "banani", label: "Banani" },
											{ value: "mirpur", label: "Mirpur" },
										]}
										onChange={onChange}
										onBlur={onBlur}
										className="w-full"
										status={error ? "error" : ""}

										//   disabled={isLoading}
									/>
								)}
							/>
						</span>
						<span>
							<Label className="my-1">Using Type</Label>
							<Controller
								control={control}
								name={"using_type"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Select
										size="large"
										placeholder="Select Using Type..."
										allowClear={true}
										value={value}
										options={[
											{ value: "new", label: "New" },
											{ value: "used", label: "Used" },
										]}
										onChange={onChange}
										onBlur={onBlur}
										className="w-full"
										status={error ? "error" : ""}

										//   disabled={isLoading}
									/>
								)}
							/>
						</span>
						<span>
							<Label className="my-1">Max Size</Label>
							<Controller
								control={control}
								name={"max_size"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<InputNumber
										size="large"
										placeholder="Input Max Size..."
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										className="w-full"
										status={error ? "error" : ""}

										//   disabled={isLoading}
									/>
								)}
							/>
						</span>
						<span>
							<Label className="my-1">Min Size</Label>
							<Controller
								control={control}
								name={"min_size"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<InputNumber
										size="large"
										placeholder="Input Min Size..."
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										className="w-full"
										status={error ? "error" : ""}
										//   disabled={isLoading}
									/>
								)}
							/>
						</span>
						<span>
							<Label className="my-1">Unit</Label>
							<Controller
								control={control}
								name={"size_unit"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<Select
										size="large"
										placeholder="Select Unit..."
										allowClear={true}
										value={value}
										options={[
											{ value: "SQFT", label: "Sqft" },
											{ value: "KATHA", label: "Katha" },
											{ value: "BIGHA", label: "Bigha" },
											{ value: "ACRES", label: "Acres" },
											{ value: "SHOTOK", label: "Shotok" },
											{ value: "DECIMAL", label: "Decimal" },
										]}
										onChange={onChange}
										onBlur={onBlur}
										className="w-full"
										status={error ? "error" : ""}
										//   disabled={isLoading}
									/>
								)}
							/>
						</span>
						<span>
							<Label className="my-1">Max Budget</Label>
							<Controller
								control={control}
								name={"max_budget"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<InputNumber
										size="large"
										placeholder="Input Max Budget..."
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										className="w-full"
										status={error ? "error" : ""}

										//   disabled={isLoading}
									/>
								)}
							/>
						</span>
						<span>
							<Label className="my-1">Min Budget</Label>
							<Controller
								control={control}
								name={"min_budget"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<InputNumber
										size="large"
										placeholder="Input Min Budget..."
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										className="w-full"
										status={error ? "error" : ""}
										//   disabled={isLoading}
									/>
								)}
							/>
						</span>
					</div>
				</div>
			</DialogContent>
			<Divider />
			<DialogActions>
				{/* {isDirty && (
					<Button
						size="small"
						variant="text"
						color="error"
						onClick={() =>
							reset({
								type: undefined,
								area: undefined,
								using_type: undefined,
								max_size: undefined,
								min_size: undefined,
								size_unit: undefined,
								max_budget: undefined,
								min_budget: undefined,
							})
						}
					>
						Clear All
					</Button>
				)} */}

				<Button
					size="small"
					variant="outlined"
					color="error"
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					size="small"
					type={"submit"}
					className=" bg-slate-600"
					onClick={onClose}
					//   disabled={propertyCreating}
				>
					Search
				</Button>
			</DialogActions>
			{/* </form> */}
		</Dialog>
	);
};

export default FilterDialog;
