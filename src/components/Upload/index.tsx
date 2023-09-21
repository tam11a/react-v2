import React from "react";
import {
	Avatar,
	Box,
	Dialog,
	DialogContent,
	Icon,
	IconButton,
	ListItemText,
	Skeleton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { MdAdd, MdImageNotSupported } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoOpenOutline } from "react-icons/io5";
import { useToggle } from "@tam11a/react-use-hooks";
import useAreYouSure from "@/hooks/useAreYouSure";
import { FiDownload } from "react-icons/fi";
import { FloatButton } from "antd";
import { saveAs } from "file-saver";

export type IFile = {
	file?: File;
	isLoading?: boolean;
	data?: any;
	preview?: string;
	error?: string | null;
};

export type IUpload = {
	defaultValue?: IFile[];
	view?: "list" | "single";
	multiple?: boolean;
	showPreview?: boolean;
	maxSize?: number;
	minSize?: number;
	disabled?: boolean;
	maxFiles?: number;
	noClick?: boolean;
	accept?: string[];
	showRejected?: boolean;
	showDeleteWarning?: boolean;
	onChange?: (files: File[]) => Promise<boolean>;
	onDelete?: (file: IFile) => Promise<boolean>;
	className?: string;
	serverSide?: boolean;
	error?: boolean;
	noDelete?: boolean;
};

const Upload: React.FC<IUpload> = ({
	defaultValue = [],
	multiple = false,
	showPreview = false,
	maxSize,
	minSize,
	disabled,
	maxFiles,
	noClick,
	accept = [".jpg", ".jpeg", ".png", ".svg", ".gif"],
	onChange,
	onDelete,
	showDeleteWarning = false,
	showRejected = false,
	className = "",
	serverSide = true,
	error = false,
	noDelete = false,
}) => {
	const { contextHolder: delContextHolder, open } = useAreYouSure({
		title: "Delete Image?",
		okText: "Delete",
		cancelText: "Cancel",
	});

	const [files, setFiles] = React.useState<IFile[]>(defaultValue);
	React.useEffect(() => {
		if (!serverSide) return;
		setFiles(defaultValue);
	}, [defaultValue, serverSide]);
	const [loadingLength, setLoadingLength] = React.useState<number>(0);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			"image/*": accept,
		},
		multiple,
		disabled,
		maxSize,
		minSize,
		maxFiles,
		noClick,
		onDropAccepted: async (files: File[]) => {
			setLoadingLength(files.length || 0);
			if (typeof onChange === "function" && !(await onChange(files))) {
				setLoadingLength(0);
				return;
			}
			setLoadingLength(0);
			setFiles((of) => [
				...of,
				...Array.from(files, (f: File) => {
					return {
						file: f,
						error: null,
					};
				}),
			]);
		},
		onDropRejected: async (fileRejections) => {
			if (showRejected)
				setFiles((of) => [
					...of,
					...Array.from(fileRejections, (f) => {
						return {
							file: f.file,
							// preview: f.file?.name,
							error: f.errors?.[0]?.message,
						};
					}),
				]);
		},
	});

	const deleteImage = async (file: IFile, index: number) => {
		if (showDeleteWarning)
			open(async () => {
				if (typeof onDelete === "function" && !(await onDelete(file))) return;
				setFiles((f) => {
					return f.filter((v, i) => i !== index);
				});
			}, <>{"You are deleting an image."}</>);
		else {
			if (typeof onDelete === "function" && !(await onDelete(file))) return;
			setFiles((f) => {
				return f.filter((v, i) => i !== index);
			});
		}
	};

	const Image: React.FC<{
		file: IFile;
		index: number;
		deleteImage: (file: IFile, index: number) => void;
	}> = ({ file, index, deleteImage }) => {
		const { state: open, toggleState: onClose } = useToggle(false);
		const { state: showButton, setState: setToggle } = useToggle(false);

		return (
			<>
				<Tooltip title={file.error}>
					<Box
						className="flex flex-row flex-wrap w-28 h-28 relative p-1 border-dashed border-2 group"
						sx={{
							borderColor: file.error ? "error.light" : "",
						}}
						onMouseOver={() => setToggle(true)}
						onMouseOut={() => setToggle(false)}
					>
						<Avatar
							src={
								file?.preview ||
								(file?.file ? URL.createObjectURL(file.file) : "")
							}
							variant="square"
							className="w-full h-full bg-transparent text-5xl"
							sx={{
								color: "error.light",
								opacity: file.error ? 0.4 : 1,
							}}
						>
							<MdImageNotSupported />
						</Avatar>
						{file.error ? (
							<></>
						) : (
							<>
								{showButton && (
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-row gap-1 h-full w-full backdrop-blur-sm items-center justify-center backdrop-brightness-90 flex">
										{showPreview && (
											<IconButton
												color={"primary"}
												onClick={onClose}
											>
												<AiFillEye className="text-slate-200" />
											</IconButton>
										)}
										{!noDelete && (
											<IconButton
												color={"primary"}
												onClick={() => deleteImage(file, index)}
											>
												<RiDeleteBin5Fill className="text-slate-200" />
											</IconButton>
										)}
									</div>
								)}
							</>
						)}
					</Box>
				</Tooltip>
				<Dialog
					open={open}
					onClose={onClose}
					PaperProps={{
						sx: {
							width: "80vw",
							maxWidth: "420px",
							bgcolor: "transparent",
							boxShadow: 0,
							overflow: "visible",
						},
					}}
				>
					<DialogContent className="p-0 h-fit relative overflow-visible">
						{file?.preview && (
							<FloatButton.Group
								shape="square"
								className="absolute -top-[50px] right-0 transform-none flex flex-row w-fit h-fit bg-primary-50 mb-1"
							>
								<FloatButton
									icon={<FiDownload />}
									onClick={async () =>
										saveAs(
											await fetch(file?.preview || "").then((i) => i.blob()),
											(
												file?.preview || (file?.file ? file.file.name : "")
											).split("/")[
												(
													file?.preview || (file?.file ? file.file.name : "")
												).split("/").length - 1
											]
										)
									}
								/>
								<a
									href={file?.preview}
									target="_blank"
								>
									<FloatButton icon={<IoOpenOutline />} />
								</a>
							</FloatButton.Group>
						)}
						<Avatar
							src={
								file?.preview ||
								(file?.file ? URL.createObjectURL(file.file) : "")
							}
							variant="rounded"
							className="w-full h-full bg-transparent text-5xl m-auto"
						>
							<MdImageNotSupported />
						</Avatar>
					</DialogContent>
					{file?.preview && (
						<Typography
							className="font-bold text-white mt-2"
							variant="caption"
							noWrap
							textAlign={"right"}
							component={"a"}
							href={file?.preview}
							target="_blank"
						>
							{
								(file?.preview || (file?.file ? file.file.name : "")).split(
									"/"
								)[
									(file?.preview || (file?.file ? file.file.name : "")).split(
										"/"
									).length - 1
								]
							}
						</Typography>
					)}
				</Dialog>
			</>
		);
	};

	return (
		<div className={className}>
			<div className="flex flex-row flex-wrap w-full items-center justify-center gap-2">
				{files?.map?.((file: IFile, index: number) => (
					<Image
						file={file}
						key={index}
						index={index}
						deleteImage={deleteImage}
					/>
				))}
				{Array.from(Array(loadingLength).keys())?.map((l) => (
					<Skeleton
						variant="rectangular"
						className="relative h-32 w-32"
						key={l}
					/>
				))}
				{(multiple && (maxFiles ? files.length < maxFiles : true)) ||
				(!multiple && files.length < 1) ? (
					<Tooltip title={`Format: ${accept?.join(", ")}`}>
						<Stack
							direction={"row"}
							className="flex-wrap w-28 h-28 relative p-1"
							sx={{
								border: "2px dashed",
								borderColor: error
									? "error.main"
									: !isDragActive
									? "#e5e7eb"
									: "primary.light",
							}}
						>
							<div
								{...getRootProps()}
								className="relative h-full w-full flex flex-col items-center justify-center"
							>
								<input {...getInputProps()} />
								<Icon
									color={isDragActive ? "primary" : "disabled"}
									className="text-4xl"
								>
									<MdAdd />
								</Icon>
								<ListItemText
									className="relative w-full h-fit grow-0"
									primary={"Upload"}
									secondary={""}
									primaryTypographyProps={{
										noWrap: true,
										textAlign: "center",
										className: "relative",
									}}
									secondaryTypographyProps={{
										noWrap: true,
										textAlign: "center",
										className: "relative",
									}}
								/>
							</div>
						</Stack>
					</Tooltip>
				) : (
					<></>
				)}
			</div>
			{delContextHolder}
		</div>
	);
};

export default Upload;
