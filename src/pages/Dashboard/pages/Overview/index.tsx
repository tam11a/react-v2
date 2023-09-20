import { Card, Tag } from "antd";
import React from "react";

const Overview: React.FC = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 p-3 text-text border-b">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
      </div>
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
    </>
  );
};

export default Overview;
