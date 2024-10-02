"use client";

import RecipeCard from "@/src/components/Card/RecipeCard";
import CreateRecipeModal from "@/src/components/modals/CreateRecipeModal";
import { useGetAllRecipeQuery } from "@/src/redux/features/recipe/recipeApi";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: allRecipe } = useGetAllRecipeQuery(undefined);
  const { data: user } = useGetMyDataQuery(undefined);
  const currentUser = user?.data[0];
  const currentUserIsPremium = currentUser?.premium;

  // isPremium, isDeleted, idPublish
  const filterForUnPremiumPerson = allRecipe?.data?.filter(
    (recipe: any) => recipe?.isPremium == false && recipe?.idPublish == true
  );

  const filterPremiumPerson = allRecipe?.data?.filter(
    (recipe: any) => recipe?.idPublish == true
  );

  let showRecipeDepentOnUser = filterForUnPremiumPerson;
  if (currentUserIsPremium || currentUser?.role == "admin") {
    showRecipeDepentOnUser = filterPremiumPerson;
  }

  // for hybration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="min-h-screen bg-default-100">
      {/* Navbar */}
      {/* <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-white tracking-widest">
            Name of the web
          </h1>
          <div className="space-x-4 flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-md focus:outline-none bg-gray-200"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-all shadow-md">
              Search
            </button>
          </div>
        </div>
      </nav> */}

      {/* Content */}
      <div className="max-w-7xl mx-auto flex  p-4">
        {/* Sidebar (Static) */}
        <aside className="w-3/12  pr-4 hidden md:block">
          <div className="fixed lg:w-[230px]  md:w-[150px]">
            <div className="bg-gradient-to-br h-[80vh] from-default-50 to-default-300 p-6 rounded-xl shadow-xl text-default-800 static">
              <h3 className="font-semibold text-xl mb-6 tracking-wider">
                Menu
              </h3>
              <ul className="space-y-4">
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">
                  Home
                </li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">
                  Friends
                </li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">
                  Messages
                </li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">
                  Notifications
                </li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">
                  Profile
                </li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-9/12">
          <div className="bg-gradient-to-r from-default-50 to-default-300 px-6 py-4 rounded-lg shadow-xl flex justify-between items-center">
            <h3 className="font-semibold text-xl text-default-800">
              What's on your mind?
            </h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300">
              <CreateRecipeModal />
            </button>
          </div>

          {/* Example of Posts */}
          <div className="bg-default-50 p-4 rounded-lg shadow-lg mt-6">
            <div className="grid grid-cols-1 gap-4">
              {showRecipeDepentOnUser &&
                showRecipeDepentOnUser?.map((recipe: any) => (
                  <RecipeCard recipe={recipe} />
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
