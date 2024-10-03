import { Skeleton } from "@nextui-org/skeleton";

const RecipeSkeletion = () => {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500">
    {/* Recipe Image */}
    <div className="relative">
      <div className="rounded-full">
      <Skeleton className="">
        <div className="md:w-[500px] rounded-full h-[300px] bg-gray-700 animate-pulse"></div>
      </Skeleton>
      </div>
      <Skeleton className="rounded-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
      </Skeleton>
    </div>
  
    {/* Recipe Details */}
    <div className="px-4 pt-2">
      <div className="flex justify-start gap-2 pb-2">
        <Skeleton className="rounded-full">
          <div className="w-12 h-12 rounded-full border-2 border-teal-400 shadow-lg bg-gray-700 animate-pulse"></div>
        </Skeleton>
        <Skeleton className="rounded-md">
          <div className="text-sm font-bold text-teal-400 bg-gray-700 animate-pulse w-20"></div>
        </Skeleton>
      </div>
      <Skeleton>
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 tracking-wide animate-pulse h-8"></div>
      </Skeleton>
      <Skeleton>
        <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 tracking-wide animate-pulse h-6 w-64"></div>
      </Skeleton>
      <Skeleton>
        <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 tracking-wide animate-pulse h-6 w-48"></div>
      </Skeleton>
  
      {/* Rating and Premium Status */}
      <div className="flex items-center justify-between">
        <Skeleton>
          <div>
            <span className="text-sm text-teal-400 tracking-widest glow animate-pulse h-4 w-32"></span>
          </div>
        </Skeleton>
      </div>
  
      {/* Upvote / Downvote Buttons */}
      <div className="flex items-center justify-between">
          <div className="flex justify-center gap-2 items-center">
        <Skeleton className="rounded-2xl">
            <div className="px-4 py-2 rounded-full bg-gray-700 animate-pulse h-10 w-10"></div>
        </Skeleton>
        <Skeleton className="rounded-2xl">
            <div className="px-4 py-2 rounded-full bg-gray-700 animate-pulse h-10 w-10"></div>
        </Skeleton>
          </div>
  
        {/* Comment Modal */}
        <Skeleton className="rounded-xl">
          <div className="rounded-full text-teal-400 hover:text-purple-500 cursor-pointer transition-all duration-500 transform hover:scale-110 glow-neon h-6 w-24 bg-gray-700 animate-pulse"></div>
        </Skeleton>
      </div>
    </div>
  </div>
  
  
  );
};

export default RecipeSkeletion;
