"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const Login = () => {
  const [errorShow, setErrorShow] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginUser, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
   
    if (error) {
      setErrorShow(true);
    }
  }, [error]); 

  useEffect(() => {
    if (errorShow && (error as any)?.data) {
      toast.error((error as any)?.data?.message);
    }
  }, [errorShow, error]);

  const handleCredentialSet = (email: string, password: string) => {
    setCredentials({ email, password });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await loginUser(credentials).unwrap();
    if (res?.data) {
      toast.success(`${res?.messaage}`);
      const { email, name, _id, role } = res?.data?.data;
      const finalUserData = { email, name, _id, role };
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
        backgroundImage: "url('https://i.ibb.co.com/94T8W8T/computer-security-with-login-password-padlock.jpg')", // Replace with your image
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
  
      <h3 className="text-4xl font-bold text-center text-gray-800">Welcome to CookUp</h3>
      <p className="text-center text-gray-600 mb-6">
        Ready to discover amazing recipes? Let’s get started.
      </p>
  
      <div className="pb-4 flex justify-center gap-4">
        <button
          onClick={() => handleCredentialSet("anamul1@gmail.com", "anamul1")}
          className="bg-teal-200 text-sm text-teal-800 rounded-full px-4 py-2 hover:bg-teal-300 hover:scale-105 transition-transform"
        >
          User Credential
        </button>
        <button
          onClick={() => handleCredentialSet("admin1@gmail.com", "admin1")}
          className="bg-teal-200 text-sm text-teal-800 rounded-full px-4 py-2 hover:bg-teal-300 hover:scale-105 transition-transform"
        >
          Admin Credential
        </button>
      </div>
  
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className="w-full text-black px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full px-4 py-2 border text-black bg-white rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-teal-400 to-purple-500 text-white font-semibold py-3 hover:shadow-lg hover:scale-105 transition-transform"
        >
          Login
        </button>
      </form>
  
      <div className="mt-6 text-center">
        <p className="text-gray-500">
          Don’t have an account?{" "}
          <Link href={"/register"} className="text-teal-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
        <p className="text-sm text-teal-500 mt-2">
          <Link href={"/forget-password"} className="hover:underline">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  </div>
  
  
  );
};

export default Login;
