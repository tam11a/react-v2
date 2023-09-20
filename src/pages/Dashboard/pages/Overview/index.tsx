import useUser from "@/hooks/useUser";
import { Card, Divider, Statistic } from "antd";
import React from "react";

const Overview: React.FC = () => {
  const user = useUser();
  console.log(user);

  return (
    <>
      <div className="my-2 mx-8">
        <div className="w-fit my-2">
          <p className="text-xl">
            Welcome{" "}
            <b>
              {user.first_name} {user.last_name}.
            </b>
          </p>
          {user.role ? (
            <p className="text-base">
              You are currently designated as <b>{user.role.name}</b>
            </p>
          ) : (
            <p className="text-base">
              You currently don't have any role assigned to you.
            </p>
          )}
        </div>
        <Divider orientation="left">Leads Overview</Divider>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-4">
          <Card bordered={true} className="bg-cyan-100   font-semibold">
            <Statistic
              title="Leads Pending"
              value={110}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
          <Card bordered={true} className="bg-lime-100   font-semibold">
            <Statistic
              title="No of Row"
              value={25}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-4">
          <Card bordered={true} className="  font-semibold bg-emerald-100">
            <Statistic
              title="Todays followup"
              value={20}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
        </div>
        <Divider orientation="left">Properties Overview</Divider>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-4">
          <Card bordered={true} className="bg-sky-100   font-semibold">
            <Statistic
              title="Total properties"
              value={35}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
          <Card bordered={true} className="bg-indigo-100   font-semibold">
            <Statistic
              title="No of Book"
              value={22}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
          <Card bordered={true} className="bg-fuchsia-100   font-semibold">
            <Statistic
              title="Total Sold"
              value={10}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Overview;
