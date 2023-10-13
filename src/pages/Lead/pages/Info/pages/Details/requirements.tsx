import Label from "@components/Label";
import { Button } from "@mui/material";
import { InputNumber, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const Requirements: React.FC = () => {
  const { control } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  return (
    <div className="max-w-5xl px-3 mt-6 mx-3">
      <Label className="text-lg font-semibold text-text">
        Customer Requirements
      </Label>

      <div className="grid grid-cols-3 gap-2">
        <span>
          <Label className="my-1">Type</Label>
          <Controller
            control={control}
            name={"type"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                size="large"
                placeholder="Select Type..."
                allowClear={true}
                value={value || undefined}
                options={[
                  { value: "flat", label: "Flat" },
                  { value: "land", label: "Land" },
                  { value: "land-share", label: "Land Share" },
                ]}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full"
                status={error ? "error" : ""}

                //   disabled={isLoading}
              />
            )}
          />
        </span>
        <span>
          <Label className="my-1">Location</Label>
          <Controller
            control={control}
            name={"location"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                size="large"
                placeholder="Select Location..."
                allowClear={true}
                value={value || undefined}
                options={[
                  { value: "uttara", label: "Uttara" },
                  { value: "rampura", label: "Rampura" },
                  { value: "Banani", label: "Banani" },
                  { value: "mirpur", label: "Mirpur" },
                ]}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full"
                status={error ? "error" : ""}

                //   disabled={isLoading}
              />
            )}
          />
        </span>
        <span>
          <Label className="my-1">Using Type</Label>
          <Controller
            control={control}
            name={"source"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                size="large"
                placeholder="Select Using Type..."
                allowClear={true}
                value={value || undefined}
                options={[
                  { value: "new", label: "New" },
                  { value: "used", label: "Used" },
                ]}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full"
                status={error ? "error" : ""}

                //   disabled={isLoading}
              />
            )}
          />
        </span>
        <span>
          <Label className="my-1">Max Size</Label>
          <Controller
            control={control}
            name={"max_size"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <InputNumber
                size="large"
                placeholder="Input Max Size..."
                value={value || undefined}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full"
                status={error ? "error" : ""}

                //   disabled={isLoading}
              />
            )}
          />
        </span>
        <span>
          <Label className="my-1">Min Size</Label>
          <Controller
            control={control}
            name={"min_size"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <InputNumber
                size="large"
                placeholder="Input Min Size..."
                value={value || undefined}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full"
                status={error ? "error" : ""}

                //   disabled={isLoading}
              />
            )}
          />
        </span>
        <span>
          <Label className="my-1">Unit</Label>
          <Controller
            control={control}
            name={"location"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                size="large"
                placeholder="Select Unit..."
                allowClear={true}
                value={value || undefined}
                options={[
                  { value: "KATHA", label: "Katha" },
                  { value: "BIGHA", label: "Bigha" },
                  { value: "ACRES", label: "Acres" },
                  { value: "SHOTOK", label: "Shotok" },
                  { value: "DECIMAL", label: "Decimal" },
                ]}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full"
                status={error ? "error" : ""}

                //   disabled={isLoading}
              />
            )}
          />
        </span>
        <span>
          <Label className="my-1">Max Budget</Label>
          <Controller
            control={control}
            name={"max_budget"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <InputNumber
                size="large"
                placeholder="Input Max Budget..."
                value={value || undefined}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full"
                status={error ? "error" : ""}

                //   disabled={isLoading}
              />
            )}
          />
        </span>
        <span>
          <Label className="my-1">Min Budget</Label>
          <Controller
            control={control}
            name={"min_budget"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <InputNumber
                size="large"
                placeholder="Input Min Budget..."
                value={value || undefined}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full"
                status={error ? "error" : ""}

                //   disabled={isLoading}
              />
            )}
          />
        </span>
        <Button
          variant="contained"
          size="medium"
          type={"submit"}
          className=" mt-7 mb-[1px] bg-slate-600"
          //   disabled={propertyCreating}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Requirements;
