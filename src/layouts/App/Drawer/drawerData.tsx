import { MdOutlineSettings } from "react-icons/md";
import { IDrawerData } from "../types";
import { Icon } from "@iconify/react";
import { VscSignOut } from "react-icons/vsc";

export const DrawerData = (logout?: () => void): IDrawerData[] => [
	{
		title: "General",
		sublist: [
			{
				name: "Dashboard",
				icon: <Icon icon="carbon:dashboard" />,
				to: "/app",
			},
		],
	},
	{
		title: "Customers",
		sublist: [
			{
				name: "Customers",
				icon: <Icon icon="ic:outline-people" />,
				to: "/app/leads",
			},
			{
				name: "Flat Customers",
				icon: <Icon icon="fluent:building-people-20-regular" />,
				to: "/app/leads?interested_property_type=FLAT",
			},
			{
				name: "Land Customers",
				icon: <Icon icon="lucide:land-plot" />,
				to: "/app/leads?interested_property_type=LAND",
			},
		],
	},

	{
		title: "Operations",
		sublist: [
			{
				name: "Properties",
				icon: <Icon icon="mdi:building" />,
				to: "/app/properties",
			},
			{
				name: "Media",
				icon: <Icon icon="material-symbols:person-play-outline" />,
				to: "/app/media",
			},
		],
	},

	{
		title: "Additional",
		sublist: [
			{
				name: "Roles",
				icon: <Icon icon="fluent:phone-key-20-regular" />,
				to: "/app/roles",
			},
			{
				name: "Employees",
				icon: <Icon icon="clarity:employee-group-line" />,
				to: "/app/employees",
			},
		],
	},
	{
		title: "Personal",
		sublist: [
			{
				name: "Settings",
				icon: <MdOutlineSettings />,
				to: "/app/settings",
			},
			// {
			// 	name: "Help",
			// 	icon: <Icon icon="material-symbols:live-help-outline-rounded" />,
			// 	to: "/app/help",
			// },
			{
				name: "Logout",
				icon: <VscSignOut />,
				function: logout,
			},
		],
	},
];
