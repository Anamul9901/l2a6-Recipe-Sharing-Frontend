"use client";

import RecipeDetailCard from "@/src/components/Card/RecipeDetailCard";
import { useGetSingleRecipeQuery } from "@/src/redux/features/recipe/recipeApi";
import { useParams } from "next/navigation";

const SingleRecipe = () => {
  const { singleRecipe: recipeId } = useParams();
  const { data: singleRecipe } = useGetSingleRecipeQuery(recipeId);
  console.log(recipeId);
  const recipeData = singleRecipe?.data[0];

  return (
    <div className="h-[90vh]">
      <div className="flex h-full justify-center items-center">
        <RecipeDetailCard recipe={recipeData} />
      </div>
    </div>
  );
};

export default SingleRecipe;
