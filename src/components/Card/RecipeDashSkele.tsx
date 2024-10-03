import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

const RecipeDashSkele = () => {
  return (
    <div className="bg-default-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Recipe Image */}

      <Skeleton>
        <h1 className="h-40 w-full object-cover rounded-t-lg"></h1>
      </Skeleton>

      {/* Recipe Details */}
      <div className="px-2">
        {/* Recipe Title */}
        <Skeleton>
          {" "}
          <h2 className="text-xl font-semibold text-default-900"></h2>
        </Skeleton>

        {/* Recipe Info */}
        <div className="flex justify-between items-center text-default-800">
          <div className="flex items-center">
            <Skeleton>
              {" "}
              <span className="text-yellow-500">&#9733;</span>{" "}
              {/* Star icon for rating */}
              <p className="ml-1 text-sm"></p> {/* Displaying rating */}
            </Skeleton>
          </div>
        </div>

        {/* Recipe Publisher */}
        <Skeleton>
          {" "}
          <p className="text-xs text-default-500 mt-2"></p>
        </Skeleton>

        {/* Action Buttons */}
        <div className="flex justify-end p-2 gap-1">
          <Skeleton>
            {" "}
            <button className="px-3 py-1 bg-green-500 hover:bg-green-700 rounded-full text-sm transition duration-300">
              Publish
            </button>{" "}
          </Skeleton>

          <Skeleton>
            {" "}
            <button className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded-full text-sm transition duration-300">
              Delete
            </button>{" "}
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default RecipeDashSkele;
