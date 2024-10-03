"use client";
import RecipeCard from "@/src/components/Card/RecipeCard";
import ChangePasswordModal from "@/src/components/modals/ChangePasswordModal";
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
import { useParams } from "next/navigation";
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
  const { data: allRecipe } = useGetAllRecipeQuery(undefined);

  const filterRecipe = allRecipe?.data?.filter(
    (recipe: any) => recipe?.publishUserId == id
  );
  // console.log("all recipe", filterRecipe);

  const findFollowe = allFollower?.data?.find(
    (item: any) => item?.userId == id && item?.followerEmail == myUserEmail
  );

  // console.log(allFollower);

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
    <div className="bg-default-100 min-h-screen">
      {/* Profile Banner */}
      <div className="relative bg-blue-600 h-60">
        <div className="absolute bottom-0 left-4 flex items-center space-x-4 w-full">
          {/* Profile Picture */}
          <Image
            className="w-28 h-28 rounded-full border-4 border-white"
            src="https://i.ibb.co.com/z89cgQr/profile.webp"
            alt="Profile Picture"
            height={500}
            width={500}
          />
          <div className="text-white w-full">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <div className="flex justify-between items-center">
              <p className="text-sm">
                {user?.follower} followers | {user?.following} following
              </p>
              <div className="flex pr-6 md:pr-20 gap-2">
                {id != myUserId ? (
                  <div>
                    {findFollowe ? (
                      <Button
                        onClick={handleUpdateUnfollow}
                        className="btn btn-sm"
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={handleUpdateFollow}
                        className="btn btn-sm"
                      >
                        Follow
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="md:flex gap-2 text-center">
                    <div className="pb-1">
                      <UpdateProfileModal />
                    </div>
                    <div className="pb-1">
                      <ChangePasswordModal />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {/* Left Sidebar */}
          <div className="w-full md:w-3/12">
            <div className="bg-default-50 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="text-sm">Bio: {user?.bio}</p>
              <p className="text-sm">Role: {user?.role}</p>
              <p className="text-sm">Following: {user?.following}</p>
              <p className="text-sm">
                Premium Status: {user?.premium ? "Premium User" : "Free User"}
              </p>
            </div>

            <div className="bg-default-50 p-4 rounded-lg shadow-md mt-4">
              <h3 className="font-semibold text-lg mb-2">Friends</h3>
              <div className="grid grid-cols-3 gap-2">
                {/* Friend images can be replaced with actual data */}
                <img
                  className="w-full h-20 rounded-lg"
                  src="/friend1.jpg"
                  alt="Friend 1"
                />
                <img
                  className="w-full h-20 rounded-lg"
                  src="/friend2.jpg"
                  alt="Friend 2"
                />
                <img
                  className="w-full h-20 rounded-lg"
                  src="/friend3.jpg"
                  alt="Friend 3"
                />
              </div>
            </div>
          </div>

          {/* Main Content (Posts) */}
          <div className="w-full md:w-10/12">
            <div className="bg-gradient-to-r from-default-50 to-default-300 px-6 py-4 rounded-lg shadow-xl flex justify-between items-center">
              <h3 className="font-semibold text-xl text-default-800">
                What's on your mind?
              </h3>
              <button>
                <CreateRecipeModal />
              </button>
            </div>

            <div className="bg-default-50 p-4 rounded-lg shadow-md mt-4">
              <h3 className="font-semibold text-lg mb-2">Recent Posts</h3>

              {/* Example of Posts */}
              <div className="bg-default-50 p-4 rounded-lg shadow-lg mt-6">
                <div className="grid grid-cols-1 gap-4">
                  {filterRecipe?.length ? (
                    filterRecipe?.map((recipe: any) => (
                      <RecipeCard recipe={recipe} />
                    ))
                  ) : (
                    <div className="text-center text-sm">No post available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
