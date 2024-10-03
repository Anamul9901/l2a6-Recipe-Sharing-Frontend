"use client";
import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXModal from "./FXModal";
import FXSelect from "../form/FXSelect";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useAddRecipeMutation } from "@/src/redux/features/recipe/recipeApi";
import Loading from "../UI/loading";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import FXTextarea from "../form/FXTextArea";
import { toast } from "sonner";

const CreateRecipeModal = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: currentUser } = useGetMyDataQuery(undefined);
  const userIsPremeum = currentUser?.data[0]?.premium;
  const myUserData = currentUser?.data[0];
  const publishUserImage = currentUser?.data[0]?.profileImg;
  const publishUserName = currentUser?.data[0]?.name;
  let verifyUser: any;
  if (user?.token) {
    verifyUser = verifyToken(user?.token as string);
  }
  const publishUser = verifyUser?.email;
  const publishUserId = verifyUser?.userId;
  const [addRecipe, { isLoading }] = useAddRecipeMutation();

  const onSubmit = async (data: any) => {
    if (data?.isPremium == "true") {
      data.isPremium = true;
    } else {
      data.isPremium = false;
    }
    const finalData = {
      ...data,
      publishUser,
      publishUserId,
      publishUserName,
      publishUserImage,
    };
    const res = await addRecipe(finalData).unwrap();
    if (res?.data) {
      toast.success(res?.messaage);
    }
  };
  const selectOpdiont = [
    { key: false, label: "Not Premium" },
    { key: true, label: "Premium" },
  ];
  return (
    <FXModal
      title="Create Recipe"
      buttonText="Post"
      buttonClassName="bg-blue-500 text-white px-4 py-1 rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300"
    >
      {isLoading && <Loading />}
      <FXForm onSubmit={onSubmit}>
        <div className="py-1">
          <FXInput label="Title" name="title" required></FXInput>
        </div>
        <div className="py-1">
          <FXInput label="Image URL" name="image" required></FXInput>
        </div>
        <div className="py-1">
          <FXInput
            label="Cooking Time (minute)"
            name="cookingTime"
            type="number"
            required
          ></FXInput>
        </div>

        {verifyUser && (verifyUser?.role == "admin" || userIsPremeum) && (
          <div className="py-1">
            <FXSelect
              label="Premium or Not"
              name="isPremium"
              options={selectOpdiont}
            ></FXSelect>
          </div>
        )}
        <div className="py-1">
          <FXTextarea
            label="Instructions"
            name="instructions"
            required
          ></FXTextarea>
        </div>
        <div className="py-2">
          <Button type="submit" className="w-full">
            POST
          </Button>
        </div>
      </FXForm>
    </FXModal>
  );
};

export default CreateRecipeModal;
