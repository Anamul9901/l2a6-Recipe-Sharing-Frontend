"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";
import { verifyToken } from "@/src/utils/verifyToken";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const [resigter, { isLoading, error }] = useRegisterMutation();

  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  let currenttUser;
  if (user?.token) {
    currenttUser = verifyToken(user?.token);
  }
  const currenttUserRole = (currenttUser as any)?.role;
  if (currenttUserRole != "admin") {
    router?.push("/");
  }

  useEffect(() => {
    if ((error as any)?.status == 400) {
      toast.error("Email is already exist");
    }
  }, [error]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData = { ...data, role: "admin" };
    const res = await resigter(finalData).unwrap();
    if(res?.data){
      toast.success(res?.messaage)
    }
  };
  return (
    <div className="relative h-screen flex items-center justify-center p-4">
  {isLoading && <Loading />}
  
  <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
    <h3 className="text-3xl font-bold text-center text-default-700 mb-4">
      Create an Admin
    </h3>

    <FXForm onSubmit={onSubmit}>
      <div className="space-y-4">
        <FXInput name="name" label="Name" size="sm" required />
        <FXInput name="email" label="Email" type="email" size="sm" required />
        <FXInput name="password" label="Password" type="password" size="sm" required />
        
        <Button
          className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
          size="lg"
          type="submit"
        >
          Create Admin
        </Button>
      </div>
    </FXForm>
  </div>
</div>

  );
};

export default page;
