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

const CreateRecipeModal = () => {
  const user = useAppSelector(selectCurrentUser);
  const verifyUser: any = verifyToken(user?.token as string);
  const userEmail = verifyUser?.email;
  const [addRecipe, { isLoading }] = useAddRecipeMutation();

  const onSubmit = async (data: any) => {
    if (data?.isPremium == "true") {
      data.isPremium  = true;
    } else {
      data.isPremium = false;
    }
    const finalData = { ...data, publishUser: userEmail };
    // console.log("final", finalData);
    const res = await addRecipe(finalData).unwrap();
  };
  const selectOpdiont = [
    { key: false, label: "Not Premium" },
    { key: true, label: "Premium" },
  ];
  return (
    <FXModal
      title="Create Recipe"
      buttonText="Post"
      buttonClassName="flex-1 bg-blue-600"
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
          <FXSelect
            label="Premium or Not"
            name="isPremium"
            options={selectOpdiont}
          ></FXSelect>
        </div>
        <Button type="submit">Submit</Button>
      </FXForm>
    </FXModal>
  );
};

export default CreateRecipeModal;
