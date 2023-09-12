import { Icon } from "@iconify/react";
import { Card, Tag } from "antd";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
];

const Overview: React.FC = () => {
  return (
    <>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-2 mx-8">
        <Card size="small" className="shadow-md bg-[#B3ECF4]" bordered={false}>
          <h1 className="font-semibold text-text-light">Total</h1>

          <div className="flex flex-row items-center justify-between">
            <span className="font-bold text-xl text-text-dark">8M</span>
            <Tag
              color="#fff"
              className="text-text-light font-semibold rounded-xl"
            >
              +2,5%
            </Tag>
          </div>
        </Card>
        <Card size="small" className="shadow-md bg-[#A8FFE4]" bordered={false}>
          <h1 className="font-semibold text-text-light">New</h1>

          <div className="flex flex-row items-center justify-between">
            <span className="font-bold text-xl text-text-dark">2.678K</span>
            <Tag
              color="#fff"
              className="text-text-light font-semibold rounded-xl"
            >
              -1,2%
            </Tag>
          </div>
        </Card>
        <Card size="small" className="shadow-md  bg-[#FEE0A0]" bordered={false}>
          <h1 className="font-semibold text-text-light">Ongoing</h1>

          <div className="flex flex-row items-center justify-between">
            <span className="font-bold text-xl text-text-dark">2.76M</span>
            <Tag
              color="#fff"
              className="text-text-light font-semibold rounded-xl"
            >
              +11%
            </Tag>
          </div>
        </Card>
        <Card size="small" className="shadow-md  bg-[#E7CFFF]" bordered={false}>
          <h1 className="font-semibold text-text-light">Cancelled</h1>

          <div className="flex flex-row items-center justify-between">
            <span className="font-bold text-xl text-text-dark">8K</span>
            <Tag
              color="#fff"
              className="text-text-light font-semibold rounded-xl"
            >
              +2,5%
            </Tag>
          </div>
        </Card>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-2">
        <Card className="col-span-2  shadow-xl" title="Target" bordered={false}>
          <div className="flex md:flex-row flex-col gap-2">
            <div className="flex flex-row  items-center">
              <Icon
                icon="icon-park-outline:dot"
                color="#00C49F"
                className="text-2xl"
              />
              <h1>Achieved</h1>
            </div>
            <div className="flex flex-row  items-center">
              <Icon
                icon="icon-park-outline:dot"
                color="#0088FE"
                className="text-2xl"
              />
              <h1>Remaining</h1>
            </div>
            <div className="flex flex-row items-center">
              <Icon
                icon="icon-park-outline:dot"
                color="#FFBB28"
                className="text-2xl"
              />
              <h1>Target</h1>
            </div>
            <div className="flex flex-row items-center">
              <Icon
                icon="icon-park-outline:dot"
                color="#FF8042"
                className="text-2xl"
              />
              <h1>Rejected</h1>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card
          className="col-span-2 shadow-xl"
          title="Most Active Account Types"
          bordered={false}
        >
          <div className="flex flex-row gap-2">
            <div className="flex flex-row  items-center">
              <Icon
                icon="icon-park-outline:dot"
                color="#82ca9d"
                className="text-2xl"
              />
              <h1>Active</h1>
            </div>
            <div className="flex flex-row  items-center">
              <Icon
                icon="icon-park-outline:dot"
                color="#8884d8"
                className="text-2xl"
              />
              <h1>Inactive</h1>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data01}
                dataKey="value"
                outerRadius={60}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                innerRadius={70}
                outerRadius={90}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
};

export default Overview;
