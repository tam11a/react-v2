import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { IOption } from "../useRole/types";
import { useGetProperties } from "@/queries/properties";

const useProperty = (x?: { params?: any }) => {
	const { setSearch, getQueryParams } = usePaginate({
		defaultParams: {
			limit: 40,
		},
	});

	const [property, setProperty] = React.useState<IOption[]>([]);
	const { data: propertyData, isLoading: propertyLoading } = useGetProperties({
		...getQueryParams(),
		...(x ? x?.params : {}),
	});

	React.useEffect(() => {
		if (!propertyData) return;
		var d: IOption[] = [];
		propertyData?.data?.data?.map?.(
			(s: { id: string; "address.line1": string }) => {
				d.push({
					value: s.id,
					label: s[`address.line1`],
					data: s,
				});
			}
		);
		setProperty(d);
	}, [propertyData]);

	return {
		isPropertyLoading: propertyLoading,
		property,
		searchProperty: (value: string) => {
			setSearch(value);
		},
	};
};

export default useProperty;
