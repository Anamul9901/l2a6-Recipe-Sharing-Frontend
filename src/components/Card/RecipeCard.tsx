import { useEffect, useState } from "react";
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
import { FaStar } from "react-icons/fa";

const RecipeCard = ({ recipe }: { recipe: any }) => {
  const [recipeId, setRecipeId] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
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

  // Handle rating submission
  const handleRating = async (ratingValue: number, id: string) => {
    setUserRating(ratingValue);

    //current post rating length
    const filterRating = getAllRatingAndUpvote?.data?.filter(
      (rating: any) => rating?.postId == id
    );
    const currentNumberOfUser = filterRating?.length + 1;

    // Logic to save rating to the backend
    const ratingData = {
      postId: id,
      userEmail: loggedUserEmail,
      type: "rating",
      rating: userRating,
    };

    const findRating = await getAllRatingAndUpvote?.data?.find(
      (item: any) =>
        item?.postId == id &&
        item?.type == "rating" &&
        item?.userEmail == loggedUserEmail
    );
    if (!findRating) {
      const findRecipe = await getAllRecipe?.data?.find(
        (recipe: any) => recipe?._id == id
      );
      const newRating = userRating;
      const currentAverageRating = findRecipe?.rating;
      const totalRating = currentAverageRating * currentNumberOfUser;
      const newTotalRating = totalRating + newRating;
      const newNumberOfUsers = currentNumberOfUser + 1;
      const newAvarageRating = newTotalRating / newNumberOfUsers;
      const roundedAvarageRating = parseFloat(newAvarageRating.toFixed(1));
      const finalData = { id, data: { rating: roundedAvarageRating } };
      const res1 = await updateRecipe(finalData).unwrap();

      const res = await addUpvote(ratingData).unwrap();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-2xl mb-6 transform transition-all duration-500 hover:scale-105 hover:shadow-neon">
      {/* Recipe Image */}
      <div className="relative">
        <img
          className="w-full h-56 object-cover filter brightness-75 hover:brightness-100 transition-all duration-500"
          src={
            recipe?.image ||
            "https://i.ibb.co.com/kBNtTmC/No-Image-Available.jpg"
          }
          alt={recipe?.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
      </div>

      {/* Recipe Details */}
      <div className="p-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 mb-3 tracking-wide">
          {recipe?.title}
        </h2>

        {/* Rating and Premium Status */}
        <div className="flex items-center justify-between mb-4">
          {/* Rating */}
          <div>
            <span className="text-sm text-teal-400 tracking-widest glow">
              Rating: {recipe?.rating}
            </span>
            {/* Rating Section */}
            <div className="flex items-center mb-4">
              <span className="text-sm text-teal-400 tracking-widest mr-4">
                Rate:
              </span>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FaStar
                    key={index}
                    size={24}
                    className={`cursor-pointer transition-all ${
                      (hoverRating || userRating) > index
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleRating(index + 1, recipe?._id)}
                    onMouseEnter={() => setUserRating(index + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
            </div>
          </div>
          <span
            className={`text-sm font-bold tracking-wider ${
              recipe?.isPremium ? "text-yellow-400 glow-neon" : "text-gray-500"
            }`}
          >
            {recipe?.isPremium ? "Premium" : "Free"}
          </span>
        </div>

        {/* Upvote / Downvote Buttons */}
        <div className="flex items-center justify-between space-x-4">
          <button
            onClick={() => handleUpvote(recipe?._id)}
            className={`px-5 py-2 rounded-full transition-all duration-500 tracking-wider bg-gradient-to-r ${
              isUpvoted
                ? "from-teal-400 to-purple-500 text-white"
                : "from-gray-700 to-gray-900 text-gray-400"
            } hover:from-blue-500 hover:to-purple-600 focus:outline-none shadow-neon transform hover:scale-105`}
          >
            👍 {recipe?.upvote}
          </button>
          <button
            onClick={() => handleDownVote(recipe?._id)}
            className={`px-5 py-2 rounded-full transition-all duration-500 tracking-wider bg-gradient-to-r ${
              isDownvoted
                ? "from-teal-400 to-purple-500 text-white"
                : "from-gray-700 to-gray-900 text-gray-400"
            } hover:from-blue-500 hover:to-purple-600 focus:outline-none shadow-neon transform hover:scale-105`}
          >
            👎 {recipe?.downvote}
          </button>

          {/* Comment Modal */}
          <div
            onClick={() => setRecipeId(recipe?._id)}
            className="text-teal-400 hover:text-purple-500 cursor-pointer transition-all duration-500 transform hover:scale-110 glow-neon"
          >
            <CommentModal id={recipeId} comments={filterComment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
