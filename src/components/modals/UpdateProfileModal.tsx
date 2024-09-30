import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXModal from "./FXModal";
import {
  useGetMyDataQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";
import Loading from "../UI/loading";

const UpdateProfileModal = () => {
  const { data: user } = useGetMyDataQuery(undefined);
  const currentUser = user?.data[0];
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const onSubmit = async (data: any) => {
    const finalData = { id: currentUser?._id, data };
    const res = await updateUser(finalData);
  };
  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        title="Update Your Profile"
        buttonText="Edit"
        buttonClassName="flex-1 bg-gray-700"
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
