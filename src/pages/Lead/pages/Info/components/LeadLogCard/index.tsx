import { useGetLeadLog } from "@/queries/leads";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Pagination } from "antd";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";

const LeadLog: React.FC = () => {
  const params = useParams();
  const { getQueryParams, setPage } = usePaginate({
    defaultParams: {
      filters: {
        sort: "created_at",
      },
    },
  });
  const { data: leadData } = useGetLeadLog({
    lead_id: params.id,
    ...getQueryParams(),
  });

  return (
    <div>
      {leadData?.data?.data?.map((item: any) => {
        return (
          <div key={item.id} className="my-4 flex flex-col gap-1">
            <p className="font-semibold text-xs text-text-dark">
              <Link
                to={`/app/employees/details/${item?.author?.id}`}
                className="underline font-bold"
              >
                {[item?.author?.first_name, item?.author?.last_name].join(" ")}
              </Link>{" "}
              {item?.message}.
            </p>
            {item?.type === "note" ? (
              <div className="font-medium text-sm bg-slate-100 text-text p-3 my-1 max-w-xs whitespace-pre-wrap rounded">
                {item?.note}
              </div>
            ) : item?.type === "conversation" ? (
              <div className="font-medium text-sm bg-slate-100 text-text p-3 my-1 max-w-xs whitespace-pre-wrap rounded">
                {item?.conversation}
              </div>
            ) : (
              <></>
            )}
            <p className="font-semibold text-xs text-text-light">
              {moment(item.created_at).calendar()}
            </p>
          </div>
        );
      })}
      <Pagination
        className="float-right my-4"
        size="small"
        showSizeChanger={false}
        hideOnSinglePage
        current={leadData?.data?.page || 1}
        pageSize={leadData?.data?.limit || 10}
        total={leadData?.data?.total || 0}
        onChange={(page) => {
          setPage(page - 1);
        }}
      />
    </div>
  );
};

export default LeadLog;
