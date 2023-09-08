import React from "react";
import { usePaginate } from "@tam11a/react-use-hooks";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const useSearchParamsPaginate = () => {
	let location = useLocation();
	const navigate = useNavigate();
	let [searchParams] = useSearchParams();

	const getParamsLimit = () => parseInt(searchParams.get("limit") || "10");
	const getParamsSearch = () => searchParams.get("search") || "";
	const getParamsPage = () => parseInt(searchParams.get("page") || "0");

	const {
		limit,
		page,
		params,
		search,
		setFilterField,
		setLimit,
		setPage,
		setSearch,
		watch,
		getQueryParams,
	} = usePaginate({
		defaultParams: {
			limit: getParamsLimit(),
			search: getParamsSearch(),
			page: getParamsPage(),
		},
	});

	React.useEffect(() => {
		if (
			params.limit === getParamsLimit() &&
			params.page === getParamsPage() + 1 &&
			params.search === getParamsSearch()
		)
			return;

		navigate(
			{
				pathname: location.pathname,
				search: new URLSearchParams(
					JSON.parse(
						JSON.stringify({
							...searchParams,
							...params,
							filters: undefined,
						})
					)
				).toString(),
			},
			{
				replace: true,
			}
		);
	}, [params]);

	React.useEffect(() => {
		setLimit(getParamsLimit());
		setSearch(getParamsSearch());
		setPage(getParamsPage() - 1);
	}, [searchParams]);

	return {
		limit,
		page,
		params,
		search,
		setFilterField,
		setLimit,
		setPage,
		setSearch,
		watch,
		getQueryParams,
	};
};

export default useSearchParamsPaginate;
