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
      websiteUrl: "techvision.com",
      description: "Innovating the future of technology.",
    },
    {
      id: 2,
      name: "GreenEarth",
      imageUrl: "https://picsum.photos/300/200?2",
      websiteUrl: "greenearth.org",
      description: "Promoting sustainable living for a better tomorrow.",
    },
    {
      id: 3,
      name: "EduLearn",
      imageUrl: "https://picsum.photos/300/200?3",
      websiteUrl: "edulearn.io",
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
    <div className="w-full bg-default-50 min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex flex-grow max-w-full">
        {/* Sidebar */}
        <aside className="w-1/4 bg-default-100 p-6 hidden lg:block sticky top-0 h-screen overflow-y-auto">
          <h3 className="font-bold text-xl mb-6 text-default-700">Menu</h3>
          <ul className="space-y-4">
            <li>
              <Link
                className="hover:bg-default-400 cursor-pointer p-3 rounded-md transition-all duration-300 flex w-full"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-default-400 cursor-pointer p-3 rounded-md transition-all duration-300 flex w-full"
                href={"/dashboard?key=dashboard"}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-default-400 w-full flex cursor-pointer p-3 rounded-md transition-all duration-300"
                href={`/profile/${currentUser?._id}`}
              >
                Profile
              </Link>
            </li>
            <li
              onClick={handleLogOut}
              className="hover:bg-default-400 cursor-pointer p-3 rounded-md transition-all duration-300"
            >
              Logout
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-1/2 bg-default-50 md:p-6 p-2">
          <div className="bg-default-100 px-6 py-4 rounded-lg shadow-md flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-default-800">
              What's on your mind?
            </h3>
            <button>
              <CreateRecipeModal />
            </button>
          </div>

          {/* Posts */}
          <div className="bg-default-100 md:p-6 p-2 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 gap-6">
              {sortedRecipes &&
                sortedRecipes.map((recipe: any) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}

              {!sortedRecipes?.length && (
                <div className="text-center items-center">
                  {[...Array(4)].map((_, index) => (
                    <RecipeSkeletion key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Sponsor Section */}
        <aside className="w-1/4 bg-default-100 p-6 hidden lg:block sticky top-0 h-screen overflow-y-auto">
          <h3 className="font-bold text-xl mb-4 text-default-700">Sponsor</h3>
          <div className="space-y-4">
            {sponsorData?.map((sponsor: any) => (
              <Link
                href={`http://${sponsor.websiteUrl}`}
                key={sponsor.id}
                target="_blank"
                className="block group"
              >
                <div className="flex items-center p-4 bg-default-200 hover:bg-default-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  {/* Sponsor Image */}
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={sponsor.imageUrl}
                      alt={`${sponsor.name} Logo`}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Sponsor Content */}
                  <div className="ml-4">
                    <p className=" font-semibold text-default-500 group-hover:text-blue-500">
                      {sponsor.name}
                    </p>
                    <a
                      href={`http://${sponsor.websiteUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-500 mt-1 underline"
                    >
                      {sponsor.websiteUrl}
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
