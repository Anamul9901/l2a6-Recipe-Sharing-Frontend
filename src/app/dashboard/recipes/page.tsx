"use client";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import {
  useDeleteRecipeMutation,
  useGetAllRecipeQuery,
  useUpdateRecipeMutation,
} from "@/src/redux/features/recipe/recipeApi";
import { useAppSelector } from "@/src/redux/hooks";
import { verifyToken } from "@/src/utils/verifyToken";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashRecipes = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: allRecipe } = useGetAllRecipeQuery(undefined);
  const [deletRecipe] = useDeleteRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const user = useAppSelector(selectCurrentUser);

  let verifyUser: any;
  if (user?.token) {
    verifyUser = verifyToken(user?.token);
  }

  const filterMyRecipe = allRecipe?.data?.filter(
    (recipe: any) => recipe?.publishUserId == verifyUser?.userId
  );

  let showRecipeLogically = filterMyRecipe;
  if (verifyUser?.role == "admin") {
    showRecipeLogically = allRecipe?.data;
  }

  const handleDeleteRecipe = async (id: string) => {
    const res = await deletRecipe(id);
  };

  const handleUnpublish = async (id: string) => {
    const data = { id, data: { idPublish: false } };
    const res = await updateRecipe(data).unwrap();
  };

  const handlePublish = async (id: string) => {
    const data = { id, data: { idPublish: true } };
    const res = await updateRecipe(data).unwrap();
  };

  // for hybration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className="text-center py-10 text-2xl font-bold">
        {verifyUser && verifyUser?.role == "admin" ? (
          <h1>All Users Recipe</h1>
        ) : (
          <h1>Your Recipe</h1>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2   px-4">
        {showRecipeLogically?.map((recipe: any) => (
          <div
            key={recipe?._id}
            className="bg-default-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Recipe Image */}
           <Link href={`/recipe/${recipe?._id}`}>
           <img
              className="h-40 w-full object-cover rounded-t-lg"
              src={
                recipe?.image ||
                "https://i.ibb.co.com/kBNtTmC/No-Image-Available.jpg"
              }
              alt={recipe?.title}
            />
           </Link>

            <div className="px-2">
             <Link href={`/recipe/${recipe?._id}`}>
               {/* Recipe Title */}
               <h2 className="text-xl font-semibold text-default-900">
                {recipe?.title}
              </h2>

              {/* Recipe Info */}
              <div className="flex justify-between items-center text-default-800">
                <div className="flex items-center">
                  <span className="text-yellow-500">&#9733;</span>
                  <p className="ml-1 text-sm">{recipe?.rating.toFixed(1)}</p>
                </div>
                <div className="text-sm">
                  <span className="mr-2 text-green-600">
                    👍 {recipe?.upvote}
                  </span>
                  <span className="text-red-600">👎 {recipe?.downvote}</span>
                </div>
              </div>

              {/* Recipe Publisher */}
              <p className="text-xs text-default-500 mt-2">
                Pulisher: {recipe?.publishUser}
              </p>
             </Link>

              <div className="flex justify-end p-2 gap-1">
                {recipe?.idPublish ? (
                  <button
                    onClick={() => handleUnpublish(recipe?._id)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-700 rounded-full text-sm transition duration-300"
                  >
                    unpublish
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublish(recipe?._id)}
                    className="px-3 py-1 bg-green-500 hover:bg-green-700 rounded-full text-sm transition duration-300"
                  >
                    publish
                  </button>
                )}
                <button
                  onClick={() => handleDeleteRecipe(recipe?._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded-full text-sm transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashRecipes;
