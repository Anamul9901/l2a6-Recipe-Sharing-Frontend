import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "@/src/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser, setUser } from "@/src/redux/features/auth/authSlice";
import Login from "@/src/app/(withCommonLayout)/login/page";

const ChangePasswordModal = () => {
  const dispatch = useAppDispatch();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const user = useAppSelector(selectCurrentUser);
  console.log(user?.user?.email);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData = { email: user?.user?.email, ...data };
    console.log(finalData);
    const res = await changePassword(finalData).unwrap();
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
        buttonClassName="flex-1 bg-gray-700"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput label="Old Password" name="prePassword" required></FXInput>
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
