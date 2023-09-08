import instance from "@/services";
import { ICreateLead, IUpdateLead } from "./type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getLeads = (params: any) => {
	return instance.get(`/leads`, {
		params,
	});
};

export const useGetLeads = (params: any) => {
	return useQuery(["get-all-leads", params], () => getLeads(params));
};

const createLead = (data: ICreateLead | any) => {
	return instance.post("/leads", data);
};

export const useCreateLead = () => {
	const queryClient = useQueryClient();
	return useMutation(createLead, {
		onSuccess: () => queryClient.invalidateQueries(["get-all-leads"]),
	});
};

const getLeadStatus = (params: any) => {
	return instance.get(`/lead-status`, {
		params,
	});
};

export const useGetLeadStatus = (params: any) => {
	return useQuery(["get-all-lead-satatus", params], () =>
		getLeadStatus(params)
	);
};

const getLeadsById = (id?: string) => {
	return instance.get(`/leads/${id}`);
};

export const useGetLeadsById = (id?: string) => {
	return useQuery(["get-all-leads-by-id", id], () => getLeadsById(id), {
		enabled: !!id,
	});
};

const updateLeadsById = ({
	id,
	data,
}: {
	id?: string;
	data: IUpdateLead | any;
}) => {
	return instance.patch(`/leads/${id}`, {
		...data,
	});
};

export const useUpdateLeadsById = () => {
	const query = useQueryClient();
	return useMutation(updateLeadsById, {
		onSuccess: () => {
			query.invalidateQueries(["get-all-leads"]);
			query.invalidateQueries(["get-leads-by-id"]);
		},
	});
};

const deleteLead = ({ id, params }: { id: number | string; params?: any }) => {
	return instance.delete(`/leads/${id}`, {
		params,
	});
};

export const useDeleteLead = () => {
	const query = useQueryClient();
	return useMutation(deleteLead, {
		onSuccess: () => {
			query.invalidateQueries(["get-all-leads"]);
			query.invalidateQueries(["get-leads-by-id"]);
		},
	});
};
