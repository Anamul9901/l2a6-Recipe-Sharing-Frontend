"use client";
import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";
import FXSelect from "../form/FXSelect";
import Loading from "../UI/loading";
import { toast } from "sonner";

const UpdateUserModal = ({ user }: { user: any }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if(data!.role == ''){
        data.role = user?.role
    }
      const finalData = {id:user?._id, data}
    const res = await updateUser(finalData).unwrap();
    if(res?.data){
      toast.success(res?.messaage)
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        title="Update Your Profile"
        buttonText="Edit"
        buttonClassName="px-3 py-1 bg-green-500 hover:bg-green-700 rounded-full text-sm transition duration-300"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              label="User Name"
              name="name"
              defaultValue={user?.name}
              required
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="User Bio"
              name="bio"
              defaultValue={user?.bio}
              required
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="User Profile Img URL"
              name="profileImg"
              defaultValue={user?.profileImg}
              required
            ></FXInput>
          </div>
          <div className="py-1">
            <FXSelect
              label={`${user?.role}`}
              name="role"
              defaultValue={user?.role}
              options={[
                { label: "Admin", key: "admin" },
                { label: "User", key: "user" },
              ]}
            ></FXSelect>
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default UpdateUserModal;
