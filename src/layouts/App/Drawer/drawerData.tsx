import { IDrawerData } from "../types";
import { Icon } from "@iconify/react";

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
		title: "Operations",
		sublist: [
			{
				name: "Leads",
				icon: <Icon icon="iconamoon:funnel-light" />,
				to: "/app/lead",
			},
			{
				name: "Properties",
				icon: <Icon icon="mdi:building" />,
				to: "/app/properties",
				disabled: true,
			},
		],
	},
	// {
	//   title: t("drawer:Reservation"),
	//   sublist: [
	//     {
	//       name: t("drawer:ListView"),
	//       icon: <Icon icon="fluent:notepad-edit-20-regular" />,
	//       to: "/app/reservation/list-view",
	//     },
	//     {
	//       name: t("drawer:TimelineView"),
	//       icon: <Icon icon="material-symbols:view-timeline-outline-rounded" />,
	//       to: "/app/reservation/timeline-view",
	//       disabled: true,
	//       hide: true,
	//     },
	//   ],
	// },
	// {
	//   title: t("drawer:Additional"),
	//   sublist: [
	//     {
	//       name: t("drawer:Roles"),
	//       icon: <Icon icon="fluent:phone-key-20-regular" />,
	//       to: "/app/roles",
	//     },
	//     {
	//       name: t("drawer:Employees"),
	//       icon: <Icon icon="clarity:employee-group-line" />,
	//       to: "/app/employees",
	//     },
	//   ],
	// },
	// {
	//   title: t("drawer:Personal"),
	//   sublist: [
	//     {
	//       name: t("drawer:Settings"),
	//       icon: <MdOutlineSettings />,
	//       to: "/app/settings",
	//     },
	//     {
	//       name: t("drawer:Help"),
	//       icon: <Icon icon="material-symbols:live-help-outline-rounded" />,
	//       to: "/app/help",
	//     },
	//     {
	//       name: t("drawer:SignOut"),
	//       icon: <VscSignOut />,
	//       function: logout,
	//     },
	//   ],
	// },
];
