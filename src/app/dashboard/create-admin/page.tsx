"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const page = () => {
  const [resigter, { isLoading }] = useRegisterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData = { ...data, role: "admin" };
    const res = await resigter(finalData);
  };
  return (
    <div className=" md:w-[800px] w-[400px] flex justify-center">
      {isLoading && <Loading />}
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <h3 className="my-2 text-xl font-bold">Create an Admin</h3>
        <div className="">
          <FXForm onSubmit={onSubmit}>
            <div className="py-3">
              <FXInput name="name" label="name" size="sm" required />
            </div>
            <div className="py-3">
              <FXInput name="email" label="Email" size="sm" required />
            </div>
            <div className="py-3">
              <FXInput name="password" label="Password" size="sm" required />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              size="lg"
              type="submit"
            >
              Create Admin
            </Button>
          </FXForm>
        </div>
      </div>
    </div>
  );
};

export default page;
