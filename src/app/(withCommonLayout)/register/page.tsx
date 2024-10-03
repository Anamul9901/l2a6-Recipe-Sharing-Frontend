"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useAppDispatch();

  const [resigter, { isLoading, error }] = useRegisterMutation();

  useEffect(() => {
    if ((error as any)?.status == 400) {
      toast.error("Email is already exist");
    }
  }, [error]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await resigter(data).unwrap();
    if (res?.data) {
      toast.success(`${res?.messaage}`);
      const { email, name, _id, profileImg } = res?.data;
      const finalUserData = { email, name, _id, profileImg };
      dispatch(setUser({ user: finalUserData, token: res?.data?.token }));
    }
  };
  return (
    <div className="relative h-screen flex items-center justify-center">
      {isLoading && <Loading />}

      <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
        <h3 className="text-3xl font-bold text-center text-default-700">
          Register to CookUp
        </h3>
        <p className="text-center text-default-800 mb-6">
          Create your account to get started.
        </p>

        <FXForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <FXInput name="name" label="Name" size="sm" required />
            <FXInput
              name="email"
              label="Email"
              type="email"
              size="sm"
              required
            />
            <FXInput
              name="password"
              label="Password"
              type="password"
              size="sm"
              required
            />

            <Button
              className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </div>
        </FXForm>

        <div className="mt-4 text-center">
          <p className="text-default-500">
            Already have an account?{" "}
            <Link href={"/login"} className="text-teal-500 font-semibold">
              Login
            </Link>
          </p>
          <p className="text-sm text-teal-500 mt-2">
            <Link href={"/forget-password"}>Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
