import React from "react";
// import Label from "@components/Label";
// import {useForm } from "react-hook-form";
import {
	Divider,
	Input,
	Tag,
	//  Input, Segmented,  DatePicker
} from "antd";
import { Avatar, Chip } from "@mui/material";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";

import Iconify from "@components/iconify";

import { useGetPropertiesById } from "@/queries/properties";
import { useGetMediaById } from "@/queries/media";
import { stringAvatar } from "@/utilities/stringAvatar";
import Label from "@components/Label";

const PropertyInfo: React.FC = () => {
	const params = useParams();

	const { data } = useGetPropertiesById(params.id);
	const [propertyInfo, setPropertyInfo] = React.useState<any>([]);
	// const { mutateAsync: updateEmployee, isLoading: isSubmitting } =
	//   useUpdateEmployeesById();
	const { data: mediaData } = useGetMediaById(propertyInfo?.media_id);

	React.useEffect(() => {
		if (!data) return;
		setPropertyInfo(data?.data?.data);
	}, [data]);

	console.log(mediaData);

	return (
		<>
			<div className="grid grid-cols-3 divide-x-2">
				<div className="relative col-span-2 w-full pt-5  min-h-[100px] md:min-h-[300px]">
					<Avatar
						src={""}
						variant="rounded"
						className="relative w-full rounded-2xl h-auto bg-slate-300  min-h-[100px] md:min-h-[300px]"
					>
						<Iconify
							icon={"mdi:building"}
							className="text-8xl text-slate-50"
						/>
					</Avatar>
					{propertyInfo.title && (
						<p className="text-text font-bold text-xl mt-3 flex flex-row items-center">
							{propertyInfo.title || ""}
							<Chip
								size="small"
								label={propertyInfo?.status}
								className="ml-2"
								color={
									propertyInfo?.status === "New"
										? "error"
										: propertyInfo?.status === "Sold"
										? "success"
										: "warning"
								}
							/>
						</p>
					)}
					<span className="flex flex-row items-center gap-1">
						<span className="flex flex-row items-end gap-1">
							<p className="text-base font-bold text-text-light pt-3"> BDT </p>
							<p className="text-base font-bold text-text-light pt-3">
								{propertyInfo?.private_price} - {propertyInfo?.price}
							</p>
						</span>
						{/* <Icon
							className="text-xl text-text"
							icon={"tabler:currency-taka"}
						/> */}
					</span>
					<span className="flex flex-row items-center gap-1 flex-wrap mt-2">
						<Icon
							className="text-lg text-text-light"
							icon="entypo:address"
						/>
						<p className="text-sm font-semibold text-text">
							{propertyInfo?.["address.area"]}{" "}
							<span className="ml-2 text-text-light">
								{Array.from(
									new Set([
										propertyInfo?.["address.road"],
										propertyInfo?.["address.block"],
									])
								).join(", ")}
							</span>
						</p>
					</span>
					<span>
						{propertyInfo?.description ? (
							<p className="text-sm font-medium text-text-light text-justify pt-3">
								{propertyInfo?.description}
							</p>
						) : (
							<p className="text-sm font-medium text-text-light text-opacity-40 text-justify pt-3">
								No Description Added
							</p>
						)}
					</span>
					{/* <Divider
            orientation="left"
            className="text-lg font-semibold text-text pt-4"
          >
            Interested Buyers
          </Divider> */}

					{/* <Controller
                control={control}
                name={"cv"}
                // rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => ( */}
					{/* <Input
            disabled
            size="large"
            className={"w-full"}
            prefix={<Iconify icon={"ph:link"} />}
            placeholder="Link a Buyer"
            // onChange={onChange}
            // onBlur={onBlur}
            // value={value}
          /> */}
					{/* )}
              /> */}
				</div>
				<div className="mx-5">
					<div className=" w-full px-4">
						<p className="text-xl font-bold text-text py-4">
							Property Information
						</p>
						<div>
							<div className="flex flex-row pt-2 gap-3 ">
								<span className="flex flex-row items-center gap-1">
									{propertyInfo?.type === "FLAT" ? (
										<>
											<Icon
												className="text-2xl text-text-light"
												icon={"fluent:building-20-filled"}
											/>
										</>
									) : propertyInfo?.type === "LAND" ? (
										<>
											<Icon
												className="text-2xl text-text-light"
												icon={"mdi:island"}
											/>
										</>
									) : (
										""
									)}
									<p className="text-md font-bold text-text-light capitalize">
										{propertyInfo?.type?.toLowerCase()}
									</p>
								</span>
								<span className="flex flex-row items-center gap-1">
									<Icon
										className="text-xl text-text-light"
										icon={"fluent:slide-size-20-regular"}
									/>
									<p className="text-md font-bold text-text-light">
										{propertyInfo?.size}
									</p>
									<p className="text-md font-bold text-text-light capitalize">
										{propertyInfo?.size_unit?.toLowerCase()}.
									</p>
								</span>
								<span className="flex flex-row">
									<Tag
										color="#76C6D1"
										className="rounded-xl w-fit text-center px-4 "
									>
										{propertyInfo?.type?.[0]}-{propertyInfo?.id}
									</Tag>
								</span>
							</div>
							<div className="flex flex-row pt-3 gap-3 ">
								{mediaData && (
									<span className="flex flex-row items-center gap-1">
										<Icon
											className="text-2xl text-text-light"
											icon={"tabler:address-book"}
										/>
										<p className="text-sm font-bold text-text-light">
											{`${mediaData?.data?.data?.first_name} ${mediaData?.data?.data?.last_name}`}
										</p>
									</span>
								)}
								{propertyInfo?.["flat.num_bedroom"] && (
									<span className="flex flex-row items-center gap-1">
										<Icon
											icon="mingcute:bed-fill"
											className="text-xl text-text-light"
										/>
										<p className="text-sm font-semibold text-text-light">
											{propertyInfo?.["flat.num_bedroom"]}
										</p>
									</span>
								)}

								{propertyInfo?.["flat.num_bathroom"] && (
									<span className="flex flex-row items-center gap-1">
										<Icon
											icon="fa:bath"
											className="text-sm text-text-light"
										/>
										<p className="text-md font-semibold text-text-light">
											{propertyInfo?.["flat.num_bathroom"]}
										</p>
									</span>
								)}
							</div>
							<div className="flex flex-row pt-3 gap-3 ">
								{propertyInfo?.["flat.facing_side"] && (
									<span className="flex flex-row items-center gap-1">
										<Icon
											className="text-xl text-text-light"
											icon="solar:compass-big-bold"
										/>
										<p className="text-sm font-semibold text-text-light">
											{propertyInfo?.["flat.facing_side"]}
										</p>
									</span>
								)}

								<span className="flex flex-row items-center gap-1 flex-wrap">
									<Icon
										className="text-xl text-text-light"
										icon="entypo:address"
									/>
									<p className="text-sm font-semibold text-text-light">
										{propertyInfo?.["address.area"]}
									</p>
								</span>
							</div>
						</div>
					</div>
					{mediaData ? (
						<>
							<Divider
								orientation="left"
								className="text-lg font-semibold text-text pt-4"
							>
								Medial Information
							</Divider>

							<div className="flex flex-row items-center px-4">
								<Link to={`/app/info/media/${mediaData?.data?.data?.id}`}>
									<Avatar
										variant="rounded"
										src={mediaData?.data?.data?.display_picture}
										{...stringAvatar(
											`${mediaData?.data?.data?.first_name} ${mediaData?.data?.data?.last_name}`
										)}
										className="md:w-[75px] md:h-[75px] w-[60px] h-[60px] rounded-2xl mt-1"
									/>
								</Link>
								<span className="flex flex-col px-2">
									<Link to={`/app/info/media/${mediaData?.data?.data?.id}`}>
										<p className="text-lg font-bold text-text-light">{`${mediaData?.data?.data?.first_name} ${mediaData?.data?.data?.last_name}`}</p>
									</Link>
									<p className="text-sm font-medium text-text-light">
										{mediaData?.data?.data?.gender}
									</p>
									<p className="text-sm font-medium text-text-light">
										<b>ID No:</b> {mediaData?.data?.data?.id}
										{mediaData?.data?.data?.first_name?.[0]}
									</p>
								</span>
							</div>
							<div className="mx-4">
								<Label className="mt-2 text-text-light font-semibold">
									Commission
								</Label>
								{/* <Controller
              control={control}
              name={"media_commision"}
              // rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => ( */}
								<Input
									readOnly
									className="font-medium text-sm my-1"
									prefix={
										<Iconify
											icon={"tabler:currency-taka"}
											className="text-text-light text-lg"
										/>
									}
									placeholder={"Enter percent rate"}
									size={"large"}
									// onChange={onChange}
									// onBlur={onBlur}
									value={propertyInfo?.media_commision} /*needs to change*/
									// status={error ? "error" : ""}
								/>
								{/* )}
            /> */}
							</div>
						</>
					) : (
						<></>
					)}
					{/* <Divider
						orientation="left"
						className="text-lg font-semibold text-text pt-4"
					>
						Photos
					</Divider>
					<div className="mx-4">
						<Avatar
							src={""}
							variant="rounded"
							className="relative rounded-lg bg-slate-300 min-w-[80px] min-h-[80px] "
						>
							<Iconify
								icon={"mdi:image-text"}
								className="text-8xl text-slate-50"
							/>
						</Avatar>
					</div> */}
				</div>
			</div>
			{/* </form> */}
		</>
	);
};

export default PropertyInfo;
