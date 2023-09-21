import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

const getDashboardReport = () => {
  return instance.get(`/report/dashboard`);
};

export const useGetDashboardReport = () => {
  return useQuery(["get-all-report"], () => getDashboardReport());
};
