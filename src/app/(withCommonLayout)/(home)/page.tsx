"use client";

import RecipeCard from "@/src/components/Card/RecipeCard";
import CreateRecipeModal from "@/src/components/modals/CreateRecipeModal";
import { useGetAllRecipeQuery } from "@/src/redux/features/recipe/recipeApi";
import { useEffect, useState } from "react";

const page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: allRecipe } = useGetAllRecipeQuery(undefined);
  console.log(allRecipe?.data);

  // for hybration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="min-h-screen bg-default-100">
      <div className="">
        {/* Navbar */}
        <nav className="bg-blue-600 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className=" text-2xl font-bold">Facebook Clone</h1>
            <div className="space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 rounded-md focus:outline-none"
              />
              <button className=" px-4 py-2 rounded-lg text-blue-600">
                Search
              </button>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-7xl mx-auto flex mt-6 p-4">
          {/* Sidebar */}
          <aside className="w-3/12 hidden md:block pr-4">
            <div className="bg-default-50 p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg mb-4">Menu</h3>
              <ul className="space-y-2">
                <li className="hover:bg-gray-200 p-2 rounded-md">Home</li>
                <li className="hover:bg-gray-200 p-2 rounded-md">Friends</li>
                <li className="hover:bg-gray-200 p-2 rounded-md">Messages</li>
                <li className="hover:bg-gray-200 p-2 rounded-md">
                  Notifications
                </li>
                <li className="hover:bg-gray-200 p-2 rounded-md">Profile</li>
                <li className="hover:bg-gray-200 p-2 rounded-md">Logout</li>
              </ul>
            </div>
          </aside>

          {/* Main Content (Posts) */}
          <main className="w-full md:w-9/12">
            <div className="bg-default-50 px-4 py-2 rounded-lg shadow-md flex justify-between items-center">
              <h3 className="font-semibold text-lg mb-2">
                Whats on your mind?
              </h3>
              <div className="flex justify-end">
                <button className="mt-2 px-4 py-2  text-white rounded-lg ">
                  <CreateRecipeModal />
                </button>
              </div>
            </div>

            {/* Example of a Post */}
            <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
              {/* <div>
           <h4 className="font-semibold text-md mb-2">John Doe</h4>
            <p className="text-gray-700">
              This is an example of a post on your timeline!
            </p>
            <div className="mt-4 flex space-x-4">
              <button className="text-blue-600 hover:underline">Like</button>
              <button className="text-blue-600 hover:underline">Comment</button>
              <button className="text-blue-600 hover:underline">Share</button>
            </div>
           </div> */}
              <div className="pb-2">
                {allRecipe &&
                  allRecipe?.data?.map((recipe) => (
                    <RecipeCard recipe={recipe} />
                  ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default page;
