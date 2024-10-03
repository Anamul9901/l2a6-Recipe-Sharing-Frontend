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
import Link from "next/link";

const RecipeDetailCard = ({ recipe }: { recipe: any }) => {
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

  //* upvote downvote and rating show START
  const filterUpvoteAnimation = getAllRatingAndUpvote?.data?.filter(
    (item: any) => item?.type == "upvote" && item?.userEmail == loggedUserEmail
  );

  const filterDownvoteAnimation = getAllRatingAndUpvote?.data?.filter(
    (item: any) =>
      item?.type == "downvote" && item?.userEmail == loggedUserEmail
  );

  const filtreRatingAnimation = getAllRatingAndUpvote?.data?.filter(
    (item: any) => item?.type == "rating" && item?.userEmail == loggedUserEmail
  );

  // const ra = filterDownvoteAnimation?.map((item: any) => item?.postId == recipe?._id)
  // console.log(ra);

  //* upvote downvote and rating show END

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
    setHoverRating(ratingValue);

    //current post rating length
    const filterRating = getAllRatingAndUpvote?.data?.filter(
      (rating: any) => rating?.postId == id
    );
    const currentNumberOfUser = filterRating?.length;

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
    <div className="max-w-full mx-auto bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-neon">
  {/* Recipe Image */}
  <div className="relative h-72 md:h-96">
    <img
      className="w-full h-full object-cover"
      src={recipe?.image || "https://i.ibb.co/kBNtTmC/No-Image-Available.jpg"}
      alt={recipe?.title}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
  </div>

  {/* Recipe Details */}
  <div className="px-6 py-4 space-y-4">
    {/* Title */}
    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 tracking-wide">
      {recipe?.title}
    </h2>

    {/* Link to Full Recipe */}
    <Link
      href={`/recipe/${recipe?._id}`}
      className="inline-block text-lg font-semibold text-teal-400 bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 hover:underline"
    >
      {recipe?.instructions}
    </Link>

    {/* Rating and Premium Status */}
    <div className="flex justify-between items-center">
      <div>
        <span className="text-lg text-teal-400 tracking-wide">
          Avg. Rating: {recipe?.rating}
        </span>
        {/* Rating Section */}
        <div className="flex items-center space-x-1">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <FaStar
                key={index}
                size={24}
                className={`cursor-pointer transition-all ${
                  index <
                  (filtreRatingAnimation?.find(
                    (item: any) => item?.postId === recipe?._id
                  )?.rating || userRating)
                    ? "text-yellow-400"
                    : "text-gray-500"
                }`}
                onClick={() => handleRating(index + 1, recipe?._id)}
                onMouseEnter={() => setUserRating(index + 1)}
                onMouseLeave={() => setUserRating(0)}
              />
            ))}
        </div>
      </div>

      <span
        className={`text-lg font-bold ${
          recipe?.isPremium ? "text-yellow-400" : "text-gray-500"
        }`}
      >
        {recipe?.isPremium ? "Premium" : "Free"}
      </span>
    </div>

    {/* Upvote / Downvote */}
    <div className="flex items-center space-x-4">
      <button
        onClick={() => handleUpvote(recipe?._id)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 tracking-wide bg-gradient-to-r ${
          filterUpvoteAnimation?.some(
            (item: any) => item?.postId === recipe?._id
          )
            ? "from-teal-400 to-purple-500 text-white"
            : "from-gray-700 to-gray-900 text-gray-400"
        } hover:from-blue-500 hover:to-purple-600 focus:outline-none shadow-neon transform hover:scale-105`}
      >
        👍 <span>{recipe?.upvote}</span>
      </button>

      <button
        onClick={() => handleDownVote(recipe?._id)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 tracking-wide bg-gradient-to-r ${
          filterDownvoteAnimation?.some(
            (item: any) => item?.postId === recipe?._id
          )
            ? "from-teal-400 to-purple-500 text-white"
            : "from-gray-700 to-gray-900 text-gray-400"
        } hover:from-blue-500 hover:to-purple-600 focus:outline-none shadow-neon transform hover:scale-105`}
      >
        👎 <span>{recipe?.downvote}</span>
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

export default RecipeDetailCard;
