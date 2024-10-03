import RecipeSkeletion from "../Card/RecipeSkeletion";

const recipeSkeLoaging = () => {
    return (
        <div>
        {[...Array(4)].map(() => (
      <RecipeSkeletion />
    ))}
    </div>
    );
};

export default recipeSkeLoaging;