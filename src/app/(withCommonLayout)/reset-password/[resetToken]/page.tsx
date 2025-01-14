"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useResitPasswordMutation } from "@/src/redux/features/auth/authApi";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const ResetPassword = () => {
  const router = useRouter();
  const { resetToken } = useParams();
  const [resetPassword, { isLoading }] = useResitPasswordMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData = { token: resetToken, data };
    const res = await resetPassword(finalData).unwrap();
    toast.success(res?.messaage);
    if (res?.success) {
      router?.push("/login");
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
            alt="Security Animation"
            className="w-24 h-24"
          />
        </div>

        <h3 className="text-4xl font-bold text-center text-gray-800">
          Reset Password
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password.
        </p>

        {/* Form */}
        <FXForm onSubmit={onSubmit}>
          <div className="pb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              New Password
            </label>
            <FXInput
              name="password"
              label="New Password"
              type="password"
              size="sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 text-white font-semibold py-3 hover:shadow-lg hover:scale-105 transition-transform"
          >
            Change Password
          </button>
        </FXForm>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Don’t have an account?{" "}
            <Link
              href={"/register"}
              className="text-blue-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
          <p className="text-sm text-blue-500 mt-2">
            <Link href={"/login"} className="hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
