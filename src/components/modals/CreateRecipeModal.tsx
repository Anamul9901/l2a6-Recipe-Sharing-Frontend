import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXModal from "./FXModal";

const CreateRecipeModal = ({ id }: { id: string }) => {
    const onSubmit = (data: any) =>{
        console.log(data);
    }
  return (
    <FXModal title="Create Recipe" buttonText="Post" buttonClassName="flex-1">
      <FXForm onSubmit={onSubmit}>
      <FXInput label="Title" name="title"></FXInput>
      <Button type="submit">Submit</Button>
      </FXForm>
    </FXModal>
  );
};

export default CreateRecipeModal;
