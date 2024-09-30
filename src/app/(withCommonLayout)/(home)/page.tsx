"use client"

import { useGetAllRecipeQuery } from "@/src/redux/features/recipe/recipeApi";

const page = () => {
    const {data: allRecipe} = useGetAllRecipeQuery(undefined)
    console.log(allRecipe);
    return (
        <div>
            <h1>This is home page</h1>
        </div>
    );
};

export default page;