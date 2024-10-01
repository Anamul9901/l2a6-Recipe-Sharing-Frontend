import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import {
  useAddRatingOrUpvoteMutation,
  useDeleteRatingOrUpvoteMutation,
  useGetAllRatingAndUpvoteQuery,
} from "@/src/redux/features/ratingAndUpvote/ratingAndUpvoteApi";
import {
  useGetAllRecipeQuery,
  useUpdateRecipeMutation,
} from "@/src/redux/features/recipe/recipeApi";
import { useAppSelector } from "@/src/redux/hooks";

const RecipeCard = ({ recipe }: { recipe: any }) => {
  const user = useAppSelector(selectCurrentUser);
  const loggedUserEmail = user?.user?.email;
  const { data: getAllRecipe } = useGetAllRecipeQuery(undefined);
  const [updateRecipe] = useUpdateRecipeMutation();
  const [addUpvote] = useAddRatingOrUpvoteMutation();
  const { data: getAllRatingAndUpvote } =
    useGetAllRatingAndUpvoteQuery(undefined);
    const [deleteUpvote] = useDeleteRatingOrUpvoteMutation();

  const handleUpvote = async (id: string) => {
    const findRecipe = getAllRecipe?.data?.find(
      (recipe: any) => recipe?._id == id
    );
    const currentUpvote = findRecipe?.upvote;
    const updateUpvote = currentUpvote + 1;
    const finalData = { id, data: { upvote: updateUpvote } };

    const findUpvote = await getAllRatingAndUpvote?.data?.find(
      (item: any) =>
        item?.postId == id &&
        item?.type == "upvote" &&
        item?.userEmail == loggedUserEmail
    );

    if (!findUpvote) {
      const res = await updateRecipe(finalData).unwrap();
      if (res.success) {
        const upvoteData = {
          postId: id,
          userEmail: loggedUserEmail,
          type: "upvote",
        };
        const res = await addUpvote(upvoteData).unwrap();
        if (res.success) {
          const findDownvote = await getAllRatingAndUpvote?.data?.find(
            (item: any) =>
              item?.postId == id &&
              item?.type == "downvote" &&
              item?.userEmail == loggedUserEmail
          );
          if (findDownvote) {
            const currentDownVote = findRecipe?.downvote;
            const updateDownvote = currentDownVote - 1;
            const finalData = { id, data: { downvote: updateDownvote } };
             await updateRecipe(finalData).unwrap();
             
             const res = await deleteUpvote(findDownvote?._id).unwrap()
          }
        }
      }
    }
  };
  const handleDownVote = async (id: string) => {
    const findRecipe = getAllRecipe?.data?.find(
      (recipe: any) => recipe?._id == id
    );
    const currentDownVote = findRecipe?.downvote;
    const updateDownvote = currentDownVote + 1;
    const finalData = { id, data: { downvote: updateDownvote } };

    const findDownvote = await getAllRatingAndUpvote?.data?.find(
      (item: any) =>
        item?.postId == id &&
        item?.type == "downvote" &&
        item?.userEmail == loggedUserEmail
    );

    if (!findDownvote) {
      const res = await updateRecipe(finalData).unwrap();
      if (res?.success) {
        const downVote = {
          postId: id,
          userEmail: loggedUserEmail,
          type: "downvote",
        };
        const res = await addUpvote(downVote).unwrap();
        if (res.success) {
            const findUpvote = await getAllRatingAndUpvote?.data?.find(
              (item: any) =>
                item?.postId == id &&
                item?.type == "upvote" &&
                item?.userEmail == loggedUserEmail
            );
            if (findUpvote) {
              const currentUpVote = findRecipe?.upvote;
              const updatedUpvote = currentUpVote - 1;
              const finalData = { id, data: { upvote: updatedUpvote } };
               await updateRecipe(finalData).unwrap();
               
               const res = await deleteUpvote(findUpvote?._id).unwrap()
            }
          }
      }
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg mb-4">
      {/* Recipe Image */}
      <img
        className="w-full h-48 object-cover"
        // src={recipe.image}
        src="https://i.ibb.co.com/pX5YXS6/tra-4.jpg"
        alt={recipe?.title}
      />

      {/* Recipe Details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{recipe?.title}</h2>
        <p className="text-gray-700 mb-4">{recipe?.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Rating: {recipe?.rating}
          </span>
        </div>

        {/* Comments */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Comments</h3>
          <ul>
            {recipe?.comment?.map((cmt: any) => (
              <li key={cmt?._id} className="mb-2">
                <p className="text-sm font-medium">{cmt?.user}</p>
                <p className="text-sm text-gray-700">{cmt?.message}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Post and Premium Status */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Posted by: {recipe?.publishUser}
          </span>
          <span
            className={`text-sm ${recipe?.isPremium ? "text-yellow-500" : "text-gray-500"}`}
          >
            {recipe?.isPremium ? "Premium" : "Free"}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-500">
            <button onClick={() => handleUpvote(recipe?._id)} className="">
              Upvotes: {recipe?.upvote}
            </button>{" "}
            |{" "}
            <button onClick={() => handleDownVote(recipe?._id)}>
              Downvotes: {recipe?.downvote}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
