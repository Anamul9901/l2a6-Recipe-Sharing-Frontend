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
      const { email, name, id, role } = res?.data?.data;
      const finalUserData = { email, name, id, role };
      dispatch(setUser({ user: finalUserData, token: res?.data?.token }));
      router?.push("/");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {isLoading && <Loading />}

      <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
        <h3 className="text-3xl font-bold text-center text-default-700">
          Login to CookUp
        </h3>
        <p className="text-center text-default-800 mb-6">
          Welcome back! Let’s get started.
        </p>

        <div className="pb-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() =>
                handleCredentialSet("anamul1@gmail.com", "anamul1")
              }
              className="bg-default-300 text-sm rounded-lg px-1 hover:cursor-pointer"
            >
              User credential
            </button>
            <button
              onClick={() => handleCredentialSet("admin1@gmail.com", "admin1")}
              className="bg-default-300 text-sm rounded-lg px-1 hover:cursor-pointer"
            >
              Admin credential
            </button>
          </div>
        </div>

        {/* <FXForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <FXInput name="email" label="Email" type="email" size="sm" />
            <FXInput
              name="password"
              label="Password"
              type="password"
              size="sm"
            />
            <Button
              className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </div>
        </FXForm> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-default-800 font-medium mb-1"
            >
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
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-default-800 font-medium mb-1"
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
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
            />
          </div>
          <Button
            className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
            size="lg"
            type="submit"
          >
            Login
          </Button>
        </form>

        {/* <div>
          <GoogleLogin
            clientId={ClientID}
            buttonText="Login"
            onSuccess={onGoogleLoginSuccess}
            onFailure={onGoogleLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>*/}

        <div className="mt-4 text-center">
          <p className="text-default-500">
            Don’t have an account?{" "}
            <Link href={"/register"} className="text-teal-500 font-semibold">
              Register
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

export default Login;
