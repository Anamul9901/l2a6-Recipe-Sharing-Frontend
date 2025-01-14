"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
      router?.push("/");
    }
  };
  return (
    <div className="relative h-screen flex items-center justify-center bg-default-100">
      {isLoading && <Loading />}

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/94T8W8T/computer-security-with-login-password-padlock.jpg')", // Replace with your image
          filter: "blur(8px)",
        }}
      ></div>

      <div className="relative bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 mx-4 z-10">
        {/* Lottie Animation */}
        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co.com/94T8W8T/computer-security-with-login-password-padlock.jpg" // Replace with an actual Lottie animation or GIF
            alt="Chef Animation"
            className="w-24 h-24"
          />
        </div>

        <h3 className="text-4xl font-bold text-center text-gray-800">
          Register to CookUp
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Create your account to get started.
        </p>

        {/* Form */}
        <FXForm onSubmit={onSubmit}>
          <div className="pb-3">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium"
            >
              Name
            </label>
            <FXInput name="name" label="Name"  size="sm" required />
          </div>
          <div className="pb-3">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium"
            >
              Email
            </label>
            <FXInput
              name="email"
              label="Email"
              type="email"
              size="sm"
              required
            />
          </div>
          <div className="pb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <FXInput
              name="password"
              label="Password"
              type="password"
              size="sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white font-semibold py-3 hover:shadow-lg hover:scale-105 transition-transform"
          >
            Register
          </button>
        </FXForm>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
          <p className="text-sm text-blue-500 mt-2">
            <Link href={"/forget-password"} className="hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
