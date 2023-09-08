import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getSessions = (params: any) => {
  return instance.get(`/sessions`, {
    params,
  });
};

export const useGetSessions = (params: any) => {
  return useQuery(["get-all-sessions", params], () => getSessions(params));
};

const sessionSignOut = (id: number) => {
  return instance.put(`/sessions/${id}`);
};

export const useSessionSignOut = () => {
  const query = useQueryClient();
  return useMutation(sessionSignOut, {
    onSuccess: () => {
      query.invalidateQueries(["get-all-sessions"]);
    },
  });
};
