import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateProperty } from "./types";

const getProperties = (params: any) => {
  return instance.get(`/assets`, {
    params,
  });
};

export const useGetProperties = (params: any) => {
  return useQuery(["get-all-properties", params], () => getProperties(params));
};

const getPropertiesById = (id?: string) => {
  return instance.get(`/assets/${id}`);
};

export const useGetPropertiesById = (id?: string) => {
  return useQuery(
    ["get-all-properties-by-id", id],
    () => getPropertiesById(id),
    {
      enabled: !!id,
    }
  );
};

const createProperty = (data: ICreateProperty | any) => {
  return instance.post("/assets", data);
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation(createProperty, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-properties"]),
  });
};

const deleteProperty = ({ id, params }: { id: number; params?: any }) => {
  return instance.delete(`/assets/${id}`, {
    params,
  });
};

export const useDeleteProperty = () => {
  const query = useQueryClient();
  return useMutation(deleteProperty, {
    onSuccess: () => {
      query.invalidateQueries(["get-all-properties"]);
      query.invalidateQueries(["get-property-by-id"]);
    },
  });
};
