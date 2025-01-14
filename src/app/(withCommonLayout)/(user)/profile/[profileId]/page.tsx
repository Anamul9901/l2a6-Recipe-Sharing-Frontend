"use client";
import RecipeCard from "@/src/components/Card/RecipeCard";
import RecipeSkeletion from "@/src/components/Card/RecipeSkeletion";
import CreateRecipeModal from "@/src/components/modals/CreateRecipeModal";
import UpdateProfileModal from "@/src/components/modals/UpdateProfileModal";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import {
  useAddFollowerMutation,
  useDeleteFollowerMutation,
  useGetAllFollowerQuery,
} from "@/src/redux/features/follower/followerApi";
import { useGetAllRecipeQuery } from "@/src/redux/features/recipe/recipeApi";
import {
  useGetMyDataQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const id = params?.profileId;
  const myData = useAppSelector(selectCurrentUser);
  const myUserId = myData?.user?._id;
  const myUserEmail = myData?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(id);
  const user = singleUser?.data;
  const [updateUser, {}] = useUpdateUserMutation();
  const { data: allFollower } = useGetAllFollowerQuery(undefined);
  const [addFollower, {}] = useAddFollowerMutation();
  const [deleteFollow, {}] = useDeleteFollowerMutation();
  const { data: currentUserData } = useGetMyDataQuery(undefined);
  const currentUserFollowing = currentUserData?.data[0]?.following;
  const { data: allRecipe, isLoading } = useGetAllRecipeQuery(undefined);
  const router = useRouter();
  if (!myData) {
    router.push("/login");
  }
  console.log("all recipt", allRecipe);
  const filterRecipe = allRecipe?.data?.filter(
    (recipe: any) => recipe?.publishUserId == id
  );

  const findFollowe = allFollower?.data?.find(
    (item: any) => item?.userId == id && item?.followerEmail == myUserEmail
  );

  // const handleUpdateFollow = async () => {
  //   const followerData = { userId: id, followerEmail: myUserEmail };
  //   const res = await addFollower(followerData);

  //   if (res?.data) {
  //     const currentFollower = user?.follower;
  //     const updateFollower = currentFollower + 1;
  //     const followerData = { id, data: { follower: updateFollower } };
  //     const updateUserFollower = updateUser;
  //     const res = await updateUserFollower(followerData);

  //     const updateFollowong = currentUserFollowing + 1;
  //     const folloingData = {
  //       id: myUserId,
  //       data: { following: updateFollowong },
  //     };
  //     const updateUserFollowing = updateUser;
  //     await updateUserFollowing(folloingData);
  //   }
  // };
  // const handleUpdateUnfollow = async () => {
  //   const res = await deleteFollow(findFollowe?._id);
  //   if (res?.data) {
  //     const currentFollower = user?.follower;
  //     const updateFollower = currentFollower - 1;
  //     const data = { id, data: { follower: updateFollower } };
  //     const updateUserUnfollower = updateUser;
  //     const res = await updateUserUnfollower(data);

  //     const updateFollowong = currentUserFollowing - 1;
  //     const folloingData = {
  //       id: myUserId,
  //       data: { following: updateFollowong },
  //     };
  //     const updateUserUnfollowing = updateUser;
  //     await updateUserUnfollowing(folloingData);
  //   }
  // };

  const handleUpdateFollow = async () => {
    const followerData = { userId: id, followerEmail: myUserEmail };
    const res = await addFollower(followerData);

    if (res?.data) {
      // Update the profile user's follower count
      const updatedFollowerCount = (await (user?.follower || 0)) + 1;
      await updateUser({ id, data: { follower: updatedFollowerCount } });

      // Update the current user's following count
      const updatedFollowingCount = (await (currentUserFollowing || 0)) + 1;
      await updateUser({
        id: myUserId,
        data: { following: updatedFollowingCount },
      });
    }
  };

  const handleUpdateUnfollow = async () => {
    const res = await deleteFollow(findFollowe?._id);

    if (res?.data) {
      // Update the profile user's follower count
      const updatedFollowerCount = (await (user?.follower || 0)) - 1;
      await updateUser({ id, data: { follower: updatedFollowerCount || 0 } });

      // Update the current user's following count
      const updatedFollowingCount = (await (currentUserFollowing || 0)) - 1;
      await updateUser({
        id: myUserId,
        data: { following: updatedFollowingCount },
      });
    }
  };

  // for hybration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-default-100">
    {/* Profile Banner */}
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 h-60">
      {/* Profile Info Container */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="max-w-7xl w-full mx-auto px-6 flex items-center space-x-6">
          {/* Profile Picture */}
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            src={user?.profileImg || "https://i.ibb.co.com/z89cgQr/profile.webp"}
            alt="Profile Picture"
            height={500}
            width={500}
          />
          <div className="text-white w-full">
            {/* User Name and Premium Status */}
            <h2 className="text-4xl font-extrabold tracking-wide">
              {user?.name}{" "}
              <span className="text-lg text-yellow-400 ml-2">
                {user?.premium ? "Premium" : "Free"}
              </span>
            </h2>
  
            {/* User Bio */}
            <h3 className="text-lg font-medium italic text-gray-200">
              {user?.bio}
            </h3>
  
            {/* Additional Info */}
            <div className="flex flex-wrap mt-4 space-y-1 md:space-y-0">
              <p className="w-full md:w-auto md:pr-4">
                👥 Followers: {user?.follower}
              </p>
              <p className="w-full md:w-auto">
                👥 Following: {user?.following}
              </p>
            </div>
  
            {/* Action Buttons */}
            <div className="flex items-center mt-4 space-x-3">
              {id !== myUserId ? (
                <div>
                  {findFollowe ? (
                    <Button
                      onClick={handleUpdateUnfollow}
                      className="bg-default-500 hover:bg-default-600 text-white py-1.5 px-6 rounded-md font-semibold shadow-md"
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      onClick={handleUpdateFollow}
                      className="bg-blue-800 hover:bg-blue-900 text-white py-1.5 px-6 rounded-md font-semibold shadow-md"
                    >
                      Follow
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <UpdateProfileModal />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* Recent Posts Section */}
    <div className="max-w-7xl mx-auto py-10">
      <div className="bg-gradient-to-r from-default-50 to-default-300 mx-2 px-6 py-4 rounded-lg shadow-xl flex justify-between items-center">
        <h3 className="font-semibold text-xl text-default-800">
          What's on your mind?
        </h3>
        <CreateRecipeModal />
      </div>
  
      {/* Posts */}
      <div className="grid grid-cols-1 gap-4 mt-6 bg-default-50 p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg mb-4 text-center">
          Recent Posts
        </h3>
  
        {/* Post Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filterRecipe?.length > 0 ? (
            filterRecipe.map((recipe: any) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : isLoading ? (
            <div className="text-center">
              {[...Array(4)].map((_, index) => (
                <RecipeSkeletion key={index} />
              ))}
            </div>
          ) : (
            <div className="text-center">No Recipes</div>
          )}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ProfilePage;
