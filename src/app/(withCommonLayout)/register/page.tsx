"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Register = () => {
  const isPending = false;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <h3 className="my-2 text-xl font-bold">Register with --</h3>
        <p className="mb-4">Welcome to --</p>
        <div className="w-[35%]">
          <FXForm
            defaultValues={{
              name: "Anamul Haque",
              email: "anamul@gmail.com",
              mobileNumber: "01800000000",
              password: "123456",
            }}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput name="name" label="name" size="sm" />
            </div>
            <div className="py-3">
              <FXInput name="email" label="Email" size="sm" />
            </div>
            <div className="py-3">
              <FXInput name="mobileNumber" label="Mobile Number" size="sm" />
            </div>
            <div className="py-3">
              <FXInput name="password" label="Password" size="sm" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              size="lg"
              type="submit"
            >
              Registration
            </Button>
          </FXForm>

          <div className="text-center">
            Already have an account ? <Link href={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
