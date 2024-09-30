"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useForgetPasswordMutation } from "@/src/redux/features/auth/authApi";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ForgetPassword = () => {
  const [forgatePassword, { isLoading }] = useForgetPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = await forgatePassword(data);
    console.log("res-", res);
  };
  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Forget Password</h3>
        <div className="w-[35%]">
          <FXForm onSubmit={onSubmit}>
            <div className="py-3">
              <FXInput name="email" label="Email" type="email" size="sm" required/>
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="md"
              type="submit"
            >
              Login
            </Button>
          </FXForm>

          <div className="">
            Don&lsquo;t have account ?{" "}
            <Link href={"/login"} className="text-blue-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
