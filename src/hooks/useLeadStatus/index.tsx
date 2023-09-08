import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { IOption } from "./types";
import { useGetLeadStatus } from "@/queries/leads";

const useLeadStatus = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [leadStatus, setLeadStatus] = React.useState<IOption[]>([]);
  const { data: leadStatusData, isLoading: leadStatusLoading } =
    useGetLeadStatus(getQueryParams());

  React.useEffect(() => {
    if (!leadStatusData) return;
    var d: IOption[] = [];
    leadStatusData?.data?.data?.map?.((s: { id: string; label: string }) => {
      d.push({
        value: s.id,
        label: s.label,
        data: s,
      });
    });
    setLeadStatus(d);
  }, [leadStatusData]);

  return {
    isLeadStatusLoading: leadStatusLoading,
    leadStatus,
    searchLeadStatus: (value: string) => {
      setSearch(value);
    },
  };
};

export default useLeadStatus;
