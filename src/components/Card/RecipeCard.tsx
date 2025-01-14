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
import { Avatar } from "@nextui-org/avatar";
import ShareModal from "../modals/ShareModal";
import { FacebookIcon, FacebookShareCount } from "react-share";
import Image from "next/image";

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
    <div className="max-w-md mx-auto bg-gradient-to-b from-default-50 via-default-100 to-black rounded-md overflow-hidden shadow-2xl transform transition-all duration-500  hover:shadow-neon">
      {/* Recipe Image */}
      <div className="relative">
        <Image
          className="md:w-[500px] h-[300px]  object-cover"
          src={
            recipe?.image ||
            "https://i.ibb.co.com/kBNtTmC/No-Image-Available.jpg"
          }
          alt={recipe?.title}
          height={200}
          width={500}
        />
      </div>

      {/* Recipe Details */}
      <div className="px-4 pt-2">
        <div className="flex justify-start gap-2 pb-2">
          <Link href={`/profile/${recipe?.publishUserId}`}>
            <Avatar
              src={recipe?.publishUserImage}
              className="w-12 h-12 rounded-full border-2 border-teal-400 shadow-lg"
            />
          </Link>
          <Link
            href={`/profile/${recipe?.publishUserId}`}
            className="text-sm font-bold text-teal-400 pt-2 hover:text-blue-400 transition-all duration-300"
          >
            {recipe?.publishUserName}
          </Link>
        </div>
        <h2 className="text-3xl font-extrabold text-default-800">
          {recipe?.title}
        </h2>
        <Link
          href={`/recipe/${recipe?._id}`}
          className=" font-extrabold text-default-700"
        >
          Instructions:{" "}
          {recipe?.instructions?.slice(0, 25) || "See more details"}...
        </Link>
        <h2 className="text-default-500">
          Cooking Time: {recipe?.cookingTime} m
        </h2>

        {/* Rating and Premium Status */}
        <div className="flex items-center justify-between">
          {/* Rating */}
          <div className="">
            <span className="text-sm text-default-800">
              Avg. Rating: {recipe?.rating}
            </span>
            {/* Rating Section */}
            <div className="flex items-center mb-1">
              <span className="text-sm text-default-800">
                My Rate:
              </span>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FaStar
                    key={index}
                    size={20}
                    className={`cursor-pointer transition-all ${
                      // Apply yellow color if the star index is less than the user's rating
                      index <
                      (filtreRatingAnimation?.find(
                        (item: any) => item?.postId === recipe?._id
                      )?.rating || userRating)
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleRating(index + 1, recipe?._id)} // Set the rating on click
                    onMouseEnter={() => setUserRating(index + 1)} // Show rating on hover
                    onMouseLeave={() => setUserRating(0)} // Reset on hover leave
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
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => handleUpvote(recipe?._id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filterUpvoteAnimation?.some(
                  (item: any) => item?.postId === recipe?._id
                )
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-500"
              } hover:bg-blue-400`}
            >
              👍 {recipe?.upvote}
            </button>

            <button
              onClick={() => handleDownVote(recipe?._id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filterDownvoteAnimation?.some(
                  (item: any) => item?.postId === recipe?._id
                )
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-500"
              } hover:bg-blue-400`}
            >
              👎 {recipe?.downvote}
            </button>
          </div>

          {/* Comment Modal */}
          <div className="flex justify-center items-center w-[200px]">
            <div onClick={() => setRecipeId(recipe?._id)}>
              <CommentModal id={recipeId} comments={filterComment} />
            </div>
            <div onClick={() => setRecipeId(recipe?._id)}>
              <ShareModal
                urlData={`https://coockup.netlify.app/recipe/${recipe?._id}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
