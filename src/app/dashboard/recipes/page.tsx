"use client";
import { useDeleteRecipeMutation, useGetAllRecipeQuery } from "@/src/redux/features/recipe/recipeApi";

const DashRecipes = () => {
  const { data: allRecipe } = useGetAllRecipeQuery(undefined);
  const [deletRecipe] = useDeleteRecipeMutation();

  const handleDeleteRecipe = async(id: string)=>{
    console.log(id);
    const res = await deletRecipe(id);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-10 px-4">
      {allRecipe?.data?.map((recipe: any) => (
        <div
          key={recipe?._id}
          className="bg-default-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {/* Recipe Image */}
          <img
            className="h-40 w-full object-cover rounded-t-lg"
            src={
              recipe?.image ||
              "https://i.ibb.co.com/kBNtTmC/No-Image-Available.jpg"
            }
            alt={recipe?.title}
          />

          <div className="px-2">
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
                <span className="mr-2 text-green-600">👍 {recipe?.upvote}</span>
                <span className="text-red-600">👎 {recipe?.downvote}</span>
              </div>
            </div>

            {/* Recipe Publisher */}
            <p className="text-xs text-default-500 mt-2">
              Pulisher: {recipe?.publishUser}
            </p>

            <div className="flex justify-end p-2">
              <button onClick={()=>handleDeleteRecipe(recipe?._id)} className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded-full text-sm transition duration-300">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashRecipes;
