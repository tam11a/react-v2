import { useGetLeadLog, usePostLeadLog } from "@/queries/leads";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Pagination, Input, Button, Card } from "antd";
import moment from "moment";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const LeadLog: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
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

  const [text, setText] = React.useState("");
  const [type, setType] = React.useState("note");
  React.useEffect(() => setType("note"), [leadData]);

  const { mutateAsync: mutate } = usePostLeadLog();

  const onValid = async () => {
    message.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        mutate({
          lead_id: params.id,
          type,
          // conversation: type === "conversation" ? text : undefined,
          note: type === "note" ? text : undefined,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      setText("");
      navigate(`/app/leads`);
      message.success(res.message);
    } else message.error(res.message);
  };

  return (
    <div>
      <Card
        bodyStyle={{
          padding: 8,
        }}
        className="bg-slate-100 border border-slate-300 p-0 rounded"
      >
        <Input.TextArea
          // showCount
          // maxLength={100}
          style={{ height: 120, marginBottom: 8, background: "#fff" }}
          // onChange={onChange}
          className="border border-slate-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Aa..."
        />
        <div className="flex flex-row items-center justify-end">
          <Button
            type="primary"
            size="small"
            className="ml-2 bg-primary hover:bg-primary-500"
            onClick={onValid}
          >
            Submit
          </Button>
        </div>
      </Card>
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
              {moment(item.created_at).format("l")}
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
