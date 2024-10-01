"use client";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";

const Users = () => {
  const { data: allUsers } = useGetAllUserQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  console.log(allUsers?.data);

  const filterUser = allUsers?.data?.filter(
    (user: any) => user?.isDeleted == false
  );

  const handleDeleteUser = async (id: string) => {
    console.log(id);
    const data = { id, data: { isDeleted: true } };
    const res = await updateUser(data).unwrap();
  };

  const handleBlockUser = async (id: string) => {
    console.log(id);
    const data = { id, data: { isBlocked: true } };
    const res = await updateUser(data).unwrap();
  };

  const handleUnblockUser = async (id: string) => {
    console.log(id);
    const data = { id, data: { isBlocked: false } };
    const res = await updateUser(data).unwrap();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center pt-10 px-4">
      <div className="w-full max-w-6xl">
        {/* Futuristic Table Container for desktop and tablet */}
        <div className="overflow-x-auto shadow-2xl bg-gray-800 rounded-lg p-6 hidden md:block">
          <table className="min-w-full table-auto text-sm">
            {/* Head */}
            <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-700 text-left font-semibold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filterUser?.map((user: any, idx: number) => (
                <tr
                  key={user?._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center md:text-left">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center md:text-left">
                    {user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center md:text-left">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center md:justify-start space-x-4">
                    <button
                      onClick={() => handleDeleteUser(user?._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded-full text-sm transition duration-300"
                    >
                      Delete
                    </button>
                    <div>
                      {user?.isBlocked ? (
                        <button
                          onClick={() => handleUnblockUser(user?._id)}
                          className="px-3 py-1 bg-green-500 hover:bg-green-700 rounded-full text-sm transition duration-300"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockUser(user?._id)}
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-700 rounded-full text-sm transition duration-300"
                        >
                          Block
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Card Layout */}
        <div className="block md:hidden">
          {filterUser?.map((user: any, idx: number) => (
            <div
              key={user?._id}
              className="border-b border-gray-700 p-4 mb-4 rounded-lg shadow-lg bg-gray-700"
            >
              <div className="flex justify-between">
                <span className="font-semibold text-purple-500">
                  No. {idx + 1}
                </span>
                <div className="space-x-2">
                  <button className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded-full text-sm transition duration-300">
                    Delete
                  </button>

                  {user?.isBlocked ? (
                    <button
                      onClick={() => handleUnblockUser(user?._id)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-700 rounded-full text-sm transition duration-300"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockUser(user?._id)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-700 rounded-full text-sm transition duration-300"
                    >
                      Block
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-gray-200">
                  <span className="font-semibold">Name:</span> {user?.name}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
