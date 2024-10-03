import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "@/src/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  selectCurrentUser,
  setUser,
} from "@/src/redux/features/auth/authSlice";
import Login from "@/src/app/(withCommonLayout)/login/page";
import { toast } from "sonner";

const ChangePasswordModal = () => {
  const dispatch = useAppDispatch();
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();
  const user = useAppSelector(selectCurrentUser);
  if (error) {
    toast.error((error  as any)?.data?.message);
  }
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData = { email: user?.user?.email, ...data };
    const res = await changePassword(finalData).unwrap();
    if (res?.data) {
      toast.success(res?.messaage);
    }
    if (res?.success) {
      dispatch(setUser({ user: user?.user, token: res?.data?.token }));
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        title="Update Your Password"
        buttonText="Change Password"
        buttonClassName="bg-default-200 text-default-700 hover:text-default-200 px-4 md:px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-default-700"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput label="Previous Password" name="prePassword" required></FXInput>
          </div>
          <div className="py-1">
            <FXInput label="New Password" name="newPassword" required></FXInput>
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              Change Password
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default ChangePasswordModal;
