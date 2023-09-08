import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateEmployee, IUpdateEmployee } from "./types";

const getEmployees = (params: any) => {
  return instance.get(`/employees`, {
    params,
  });
};

export const useGetEmployees = (params: any) => {
  return useQuery(["get-all-employees", params], () => getEmployees(params));
};

const createEmployee = (data: ICreateEmployee) => {
  return instance.post("/employees", data);
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(createEmployee, {
    onSuccess: () => queryClient.invalidateQueries(["get-all-employees"]),
  });
};

const getEmployeesById = (id?: string) => {
  return instance.get(`/employees/${id}`);
};

export const useGetEmployeesById = (id?: string) => {
  return useQuery(["get-all-employees-by-id", id], () => getEmployeesById(id), {
    enabled: !!id,
  });
};

const updateEmployeesById = ({
  id,
  data,
}: {
  id?: string;
  data: IUpdateEmployee | any;
}) => {
  return instance.patch(`/employees/${id}`, {
    ...data,
  });
};

export const useUpdateEmployeesById = () => {
  const query = useQueryClient();
  return useMutation(updateEmployeesById, {
    onSuccess: () => {
      query.invalidateQueries(["get-all-employees"]);
      query.invalidateQueries(["get-employees-by-id"]);
    },
  });
};

const deleteEmployee = ({ id, params }: { id: number; params?: any }) => {
  return instance.delete(`/employees/${id}`, { params });
};

export const useDeleteEmployee = () => {
  const query = useQueryClient();
  return useMutation(deleteEmployee, {
    onSuccess: () => {
      query.invalidateQueries(["get-all-employees"]);
      query.invalidateQueries(["get-employees-by-id"]);
    },
  });
};
