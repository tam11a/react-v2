import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateRole, IUpdateRole } from "./types";

const getRoles = (params: any) => {
  return instance.get(`/roles`, { params });
};

export const useGetRoles = (params: any) => {
  return useQuery(["get-all-roles", params], () => getRoles(params));
};

const createRole = (data: ICreateRole) => {
  return instance.post("/roles", data);
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation(createRole, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-roles"]),
  });
};

const getRoleById = (id?: string) => {
  return instance.get(`/roles/${id}`);
};

export const useGetRoleById = (id?: string) => {
  return useQuery(["get-all-roles-by-id", id], () => getRoleById(id), {
    enabled: !!id,
  });
};

const updateRoleById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateRole | any;
}) => {
  return instance.patch(`/roles/${id}`, {
    ...data,
  });
};

export const useUpdateRoleById = () => {
  const query = useQueryClient();
  return useMutation(updateRoleById, {
    onSuccess: () => {
      query.invalidateQueries(["get-all-roles"]);
      query.invalidateQueries(["get-role-by-id"]);
    },
  });
};

const deleteRole = ({ id, params }: { id: number; params?: any }) => {
  return instance.delete(`/roles/${id}`, {
    params,
  });
};

export const useDeleteRole = () => {
  const query = useQueryClient();
  return useMutation(deleteRole, {
    onSuccess: () => {
      query.invalidateQueries(["get-all-roles"]);
      query.invalidateQueries(["get-role-by-id"]);
    },
  });
};
