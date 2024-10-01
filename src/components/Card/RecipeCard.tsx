import { useState } from "react";
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
import CommentModal from "../modals/CommentModal";
import { useGetAllCommentQuery } from "@/src/redux/features/comment/commentApi";

const RecipeCard = ({ recipe }: { recipe: any }) => {
  const [recipeId, setRecipeId] = useState("");
  const user = useAppSelector(selectCurrentUser);
  const loggedUserEmail = user?.user?.email;
  const { data: getAllRecipe } = useGetAllRecipeQuery(undefined);
  const [updateRecipe] = useUpdateRecipeMutation();
  const [addUpvote] = useAddRatingOrUpvoteMutation();
  const { data: getAllRatingAndUpvote } =
    useGetAllRatingAndUpvoteQuery(undefined);
  const [deleteUpvote] = useDeleteRatingOrUpvoteMutation();

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const { data: allComment } = useGetAllCommentQuery(undefined);
  const filterComment = allComment?.data?.filter(
    (comment: any) => comment?.postId == recipeId
  );

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

    if (findUpvote) {
      const currentUpvote = findRecipe?.upvote;
      const updateUpvote = currentUpvote - 1;
      const finalData = { id, data: { upvote: updateUpvote } };
      const res = await updateRecipe(finalData).unwrap();
      if (res.success) {
        const res = await deleteUpvote(findUpvote?._id).unwrap();
        setIsUpvoted(false);
      }
    }

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

            const res = await deleteUpvote(findDownvote?._id).unwrap();
            setIsDownvoted(false);
          }
          setIsUpvoted(true);
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

    if (findDownvote) {
      const currentDownvote = findRecipe?.downvote;
      const updateDownvote = currentDownvote - 1;
      const finalData = { id, data: { downvote: updateDownvote } };
      const res = await updateRecipe(finalData).unwrap();
      if (res.success) {
        const res = await deleteUpvote(findDownvote?._id).unwrap();
        setIsDownvoted(false);
      }
    }

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

            const res = await deleteUpvote(findUpvote?._id).unwrap();
            setIsUpvoted(false);
          }
          setIsDownvoted(true);
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-default-100 rounded-xl overflow-hidden shadow-lg mb-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      {/* Recipe Image */}
      <img
        className="w-full h-56 object-cover filter brightness-90 hover:brightness-110 transition-all duration-500"
        src="https://i.ibb.co.com/pX5YXS6/tra-4.jpg"
        alt={recipe?.title}
      />

      {/* Recipe Details */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-default-900 mb-3 tracking-wider">
          {recipe?.title}
        </h2>
        <p className="text-default-900 mb-4 leading-relaxed tracking-wide">
          {recipe?.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-default-900 tracking-widest">
            Rating: {recipe?.rating}
          </span>
        </div>

        {/* Post and Premium Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-default-900 tracking-wide">
            Posted by: {recipe?.publishUser}
          </span>
          <span
            className={`text-sm font-bold tracking-wide ${
              recipe?.isPremium ? "text-yellow-500 glow" : "text-gray-400"
            }`}
          >
            {recipe?.isPremium ? "Premium" : "Free"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          {/* Upvote / Downvote Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => handleUpvote(recipe?._id)}
              className={`px-4 py-2 rounded-lg transition-all duration-500 tracking-wider ${
                isUpvoted
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:from-teal-400 hover:to-blue-600 focus:outline-none shadow-lg transform hover:scale-105`}
            >
              Up: {recipe?.upvote}
            </button>
            <button
              onClick={() => handleDownVote(recipe?._id)}
              className={`px-4 py-2 rounded-lg transition-all duration-500 tracking-wider ${
                isDownvoted
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:from-teal-400 hover:to-blue-600 focus:outline-none shadow-lg transform hover:scale-105`}
            >
              Down: {recipe?.downvote}
            </button>
          </div>

          {/* Comment Modal */}
          <div
            onClick={() => setRecipeId(recipe?._id)}
            className="text-gray-600 hover:text-teal-500 cursor-pointer transition-all duration-500 transform hover:scale-110"
          >
            <CommentModal id={recipeId} comments={filterComment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
