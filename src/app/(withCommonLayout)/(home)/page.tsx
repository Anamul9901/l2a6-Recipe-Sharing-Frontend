"use client";

import RecipeCard from "@/src/components/Card/RecipeCard";
import CreateRecipeModal from "@/src/components/modals/CreateRecipeModal";
import { useGetAllRecipeQuery } from "@/src/redux/features/recipe/recipeApi";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minUpvoteFilter, setminUpvoteFilter] = useState("");
  const [maxUpvoteFilter, setmaxUpvoteFilter] = useState("");
  const [sortOption, setSortOption] = useState(""); // Default sorting option
  const [isMounted, setIsMounted] = useState(false);
  const { data: allRecipe } = useGetAllRecipeQuery(undefined);
  const { data: user } = useGetMyDataQuery(undefined);
  const currentUser = user?.data[0];
  const currentUserIsPremium = currentUser?.premium;

  // Filter recipes based on user type
  const filterForUnPremiumPerson = allRecipe?.data?.filter(
    (recipe) => recipe?.isPremium === false && recipe?.idPublish === true
  );

  const filterPremiumPerson = allRecipe?.data?.filter(
    (recipe) => recipe?.idPublish === true
  );

  let showRecipeDepentOnUser = filterForUnPremiumPerson;
  if (currentUserIsPremium || currentUser?.role === "admin") {
    showRecipeDepentOnUser = filterPremiumPerson;
  }

  // Fuzzy search logic
  const fuse = new Fuse(showRecipeDepentOnUser || [], {
    keys: ["name", "title"],
    threshold: 0.3, // Adjust this value for more or less strict matching
  });

  const filteredRecipes = searchTerm
    ? fuse?.search(searchTerm)?.map(result => result?.item)
    : showRecipeDepentOnUser;

  // Apply upvote filters
  const upvoteFilteredRecipes = filteredRecipes?.filter((item) => {
    const isUpvoteMatch =
      (!minUpvoteFilter || parseInt(item?.upvote) >= parseInt(minUpvoteFilter)) &&
      (!maxUpvoteFilter || parseInt(item?.upvote) <= parseInt(maxUpvoteFilter));

    return !item?.isDeleted && isUpvoteMatch;
  });

  // Sort the filtered recipes based on selected option
  const sortedRecipes = upvoteFilteredRecipes?.sort((a, b) => {
    if (sortOption === "most") {
      return b?.upvote - a?.upvote; // Most upvotes first
    } else if (sortOption === "least") {
      return a?.upvote - b?.upvote; // Least upvotes first
    }
    return 0; // Default case (no sorting)
  });

  // For hydration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-default-100">
      {/* Search and Filters */}
      <div className="flex justify-end pt-2">
        <div className="flex justify-end gap-2 pb-3">
          <input
            type="text"
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-2 py-1 rounded-md"
          />
          <div className="flex">
            <input
              type="number"
              placeholder="Min upvote"
              value={minUpvoteFilter}
              onChange={(e) => setminUpvoteFilter(e.target.value)}
              className="border flex-1 w-24 px-1 rounded-l-md"
            />
            <input
              type="number"
              placeholder="Max upvote"
              value={maxUpvoteFilter}
              onChange={(e) => setmaxUpvoteFilter(e.target.value)}
              className="border flex-1 w-24 px-1 rounded-r-md"
            />
          </div>
          {/* Sorting Options */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option value="most">Most Upvoted</option>
            <option value="least">Least Upvoted</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto flex p-4">
        {/* Sidebar (Static) */}
        <aside className="w-3/12 pr-4 hidden md:block">
          <div className="fixed lg:w-[230px] md:w-[150px]">
            <div className="bg-gradient-to-br h-[80vh] from-default-50 to-default-300 p-6 rounded-xl shadow-xl text-default-800 static">
              <h3 className="font-semibold text-xl mb-6 tracking-wider">Menu</h3>
              <ul className="space-y-4">
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">Home</li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">Friends</li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">Messages</li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">Notifications</li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">Profile</li>
                <li className="hover:bg-gray-600 p-3 rounded-md transition-all duration-300">Logout</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-9/12">
          <div className="bg-gradient-to-r from-default-50 to-default-300 px-6 py-4 rounded-lg shadow-xl flex justify-between items-center">
            <h3 className="font-semibold text-xl text-default-800">What's on your mind?</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300">
              <CreateRecipeModal />
            </button>
          </div>

          {/* Example of Posts */}
          <div className="bg-default-50 p-4 rounded-lg shadow-lg mt-6">
            <div className="grid grid-cols-1 gap-4">
              {sortedRecipes && sortedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
