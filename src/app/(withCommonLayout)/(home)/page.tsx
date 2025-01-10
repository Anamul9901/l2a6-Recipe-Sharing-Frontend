"use client";

import RecipeCard from "@/src/components/Card/RecipeCard";
import CreateRecipeModal from "@/src/components/modals/CreateRecipeModal";
import { useGetAllRecipeQuery } from "@/src/redux/features/recipe/recipeApi";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import RecipeSkeletion from "@/src/components/Card/RecipeSkeletion";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [minUpvoteFilter, setminUpvoteFilter] = useState("");
  const [maxUpvoteFilter, setmaxUpvoteFilter] = useState("");
  const [sortOption, setSortOption] = useState(""); // Default sorting option
  const [isMounted, setIsMounted] = useState(false);
  const { data: allRecipe } = useGetAllRecipeQuery(undefined);
  const { data: user } = useGetMyDataQuery(undefined);
  const currentUser = user?.data[0];
  const currentUserIsPremium = currentUser?.premium;
  const { user: user2 } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  if (!user2) {
    router.push("/login");
  }


  const sponsorData = [
    {
      id: 1,
      name: "TechVision",
      imageUrl: "https://picsum.photos/300/200?1",
      websiteUrl: "https://techvision.com",
      description: "Innovating the future of technology.",
    },
    {
      id: 2,
      name: "GreenEarth",
      imageUrl: "https://picsum.photos/300/200?2",
      websiteUrl: "https://greenearth.org",
      description: "Promoting sustainable living for a better tomorrow.",
    },
    {
      id: 3,
      name: "EduLearn",
      imageUrl: "https://picsum.photos/300/200?3",
      websiteUrl: "https://edulearn.io",
      description: "Empowering learners with knowledge and tools.",
    },
  ];

  // Filter recipes based on user type
  const filterForUnPremiumPerson = allRecipe?.data?.filter(
    (recipe: any) => recipe?.isPremium === false && recipe?.idPublish === true
  );

  const filterPremiumPerson = allRecipe?.data?.filter(
    (recipe: any) => recipe?.idPublish === true
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
    ? fuse?.search(searchTerm)?.map((result) => result?.item)
    : showRecipeDepentOnUser;

  // Apply upvote filters
  const upvoteFilteredRecipes = filteredRecipes?.filter((item: any) => {
    const isUpvoteMatch =
      (!minUpvoteFilter ||
        parseInt(item?.cookingTime) >= parseInt(minUpvoteFilter)) &&
      (!maxUpvoteFilter ||
        parseInt(item?.cookingTime) <= parseInt(maxUpvoteFilter));

    return !item?.isDeleted && isUpvoteMatch;
  });

  // Sort the filtered recipes based on selected option
  const sortedRecipes = upvoteFilteredRecipes?.sort((a: any, b: any) => {
    if (sortOption === "most") {
      return b?.upvote - a?.upvote; // Most upvotes first
    } else if (sortOption === "least") {
      return a?.upvote - b?.upvote; // Least upvotes first
    }
    return 0; // Default case (no sorting)
  });

  const handleLogOut = () => {
    dispatch(logout());
  };

  // For hydration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-default-50">
  {/* Search and Filters */}
  <div className="flex flex-col max-w-7xl mx-auto md:flex-row justify-end pt-6 px-6">
    <div className="flex  flex-col md:flex-row md:gap-4 w-full md:w-auto">
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-default-300 px-4 py-2 rounded-lg w-full md:w-72 mb-3 md:mb-0 shadow-sm focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-3 mb-3 md:mb-0">
        <input
          type="number"
          placeholder="Min time"
          value={minUpvoteFilter}
          onChange={(e) => setminUpvoteFilter(e.target.value)}
          className="border border-default-300 px-4 py-2 rounded-lg w-36 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Max time"
          value={maxUpvoteFilter}
          onChange={(e) => setmaxUpvoteFilter(e.target.value)}
          className="border border-default-300 px-4 py-2 rounded-lg w-36 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border border-default-300 px-4 py-2 rounded-lg w-full md:w-60 shadow-sm focus:ring-2 focus:ring-blue-400"
      >
        <option value="" disabled>
          Sort by Upvoted
        </option>
        <option value="most">Most Upvoted</option>
        <option value="least">Least Upvoted</option>
        <option value="">No Sort</option>
      </select>
    </div>
  </div>

  {/* Content */}
  <div className="max-w-7xl mx-auto flex justify-center px-6 py-6">
    {/* Sidebar */}
    <aside className="w-3/12 pr-6 hidden md:block">
      <div className="sticky top-6 bg-default-100 p-6 rounded-lg shadow-lg hover:bg-default-200 hover:cursor-pointer transition-all duration-50">
        <h3 className="font-bold text-xl mb-6 text-default-700">Menu</h3>
        <ul className="space-y-4">
          <div className="hover:bg-blue-100 cursor-pointer p-3 rounded-md transition-all duration-300">
            <Link href="/">Home</Link>
          </div>
          <li className="hover:bg-blue-100 cursor-pointer p-3 rounded-md transition-all duration-300">
            Friends
          </li>
          <li className="hover:bg-blue-100 cursor-pointer p-3 rounded-md transition-all duration-300">
            Messages
          </li>
          <li className="hover:bg-blue-100 cursor-pointer p-3 rounded-md transition-all duration-300">
            Notifications
          </li>
          <div className="hover:bg-blue-100 cursor-pointer p-3 rounded-md transition-all duration-300">
            <Link href={`/profile/${user2?._id}`}>Profile</Link>
          </div>
          <li
            onClick={() => handleLogOut()}
            className="hover:bg-blue-100 cursor-pointer p-3 rounded-md transition-all duration-300"
          >
            Logout
          </li>
        </ul>
      </div>
    </aside>

    {/* Main Content */}
    <main className="w-full md:w-9/12">
      <div className="bg-default-200 px-6 py-4 rounded-lg shadow-md flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-default-800">
          What's on your mind?
        </h3>
        <button className="px-4 py-2 bg-blue-500 text-default-800 rounded-lg shadow hover:bg-blue-600 transition duration-300">
          <CreateRecipeModal />
        </button>
      </div>

      {/* Posts */}
      <div className="bg-default-200 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 gap-6">
          {sortedRecipes &&
            sortedRecipes.map((recipe: any) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}

          {!sortedRecipes?.length && (
            <div className="text-center items-center">
              {[...Array(4)].map(() => (
                <RecipeSkeletion />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>

    {/* Sponsor Section */}
    <aside className="w-3/12 pl-6 hidden md:block">
      <div className="sticky top-6 bg-default-100 p-6 rounded-lg shadow-lg hover:bg-default-200 hover:cursor-pointer transition-all duration-50">
        <h3 className="font-bold text-xl mb-4 text-default-700">Sponsor</h3>
        <div className="space-y-4">
          {sponsorData?.map((sponsor: any) => (
            <Link
              href={sponsor.websiteUrl}
              key={sponsor.id}
              target="_blank"
              className="block group"
            >
              <div className="relative group h-24 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={sponsor.imageUrl}
                  alt={`${sponsor.name} Logo`}
                  width={200}
                  height={96}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold text-lg">
                    {sponsor.name}
                  </p>
                  <a
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 mt-2 underline font-medium"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  </div>
</div>

  );
};

export default HomePage;
