import useUser from "@/hooks/useUser";
import Iconify from "@components/iconify";
import { Button } from "@mui/material";
import { Card, Divider, Statistic } from "antd";
import React from "react";
import { Link } from "react-router-dom";

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
        <Divider orientation="center">Leads Overview</Divider>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-4">
          <Card bordered={true} className="bg-lime-100   font-semibold">
            <Statistic
              title="Raw Leads"
              value={115}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
          <Card bordered={true} className="bg-cyan-100 font-semibold">
            <Statistic
              title="Assigned Leads"
              value={30}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
          <Card bordered={true} className="  font-semibold bg-indigo-100">
            <Statistic
              title="Todays Followup"
              value={20}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
          <Card bordered={true} className="bg-emerald-100 font-semibold">
            <Statistic
              title="Completed Leads"
              value={30}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
        </div>
        {/* <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-4"></div> */}
        <Divider orientation="center">Properties Overview</Divider>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-4">
          <Card bordered={true} className="bg-sky-100   font-semibold">
            <Statistic
              title="Available properties"
              value={35}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
          <Card bordered={true} className="bg-fuchsia-100   font-semibold">
            <Statistic
              title="Booked Properties"
              value={22}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
          <Card bordered={true} className="bg-emerald-100   font-semibold">
            <Statistic
              title="Sold properties"
              value={10}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
          <Card bordered={true} className="bg-red-100   font-semibold">
            <Statistic
              title="Deleted properties"
              value={10}
              // precision={2}
              valueStyle={{ color: "black" }}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
        </div>
        <Divider orientation="center">Application Shortcuts</Divider>
        <div className="grid grid-cols-1 sm:grid-cols-2 [&>a>button]:text-center [&>a>button]:w-full max-w-lg mx-auto mt-6">
          <Link to="/app/leads">
            <Button
              className="text-slate-700"
              startIcon={<Iconify icon={"iconamoon:funnel-light"} />}
            >
              Leads List
            </Button>
          </Link>
          <Link to="/app/properties">
            <Button
              className="text-slate-700"
              startIcon={<Iconify icon={"mdi:building"} />}
            >
              Properties List
            </Button>
          </Link>

          <Link to="/app/media">
            <Button
              className="text-slate-700"
              startIcon={
                <Iconify icon={"material-symbols:person-play-outline"} />
              }
            >
              Medias List
            </Button>
          </Link>
          <Link to="/app/employees">
            <Button
              className="text-slate-700"
              startIcon={<Iconify icon={"clarity:employee-group-line"} />}
            >
              Employees List
            </Button>
          </Link>
          <Link to="/app/settings">
            <Button
              className="text-slate-700"
              startIcon={<Iconify icon={"mdi:user-details"} />}
            >
              User Profile
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Overview;
