import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXModal from "./FXModal";
import {
  useGetMyDataQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";
import Loading from "../UI/loading";
import { toast } from "sonner";

const UpdateProfileModal = () => {
  const { data: user } = useGetMyDataQuery(undefined);
  const currentUser = user?.data[0];
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const onSubmit = async (data: any) => {
    const finalData = { id: currentUser?._id, data };
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
        buttonText="Edit profile"
        buttonClassName="bg-default-200 text-default-700 hover:text-default-200 px-4 md:px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-default-700"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              label="Name"
              name="name"
              defaultValue={currentUser?.name}
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="Bio"
              name="bio"
              defaultValue={currentUser?.bio}
            ></FXInput>
          </div>
          <div className="py-1">
            <FXInput
              label="Profile Img URL"
              name="profileImg"
              defaultValue={currentUser?.profileImg}
            ></FXInput>
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

export default UpdateProfileModal;
