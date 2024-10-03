"use client";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";
import UpdateUserModal from "@/src/components/modals/UpdateUserModal";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { verifyToken } from "@/src/utils/verifyToken";
import { useRouter } from "next/navigation";

const Users = () => {
  const [selectUser, setSelectUser] = useState({});
  const { data: allUsers } = useGetAllUserQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  let currenttUser;
  if (user?.token) {
    currenttUser = verifyToken(user?.token);
  }
  const currenttUserRole = (currenttUser as any)?.role;
  if (currenttUserRole != "admin") {
    router?.push("/");
  }

  const filterUser = allUsers?.data?.filter(
    (user: any) => user?.isDeleted == false
  );

  const handleUpdateUser = async (id: string) => {
    setSelectUser(id);
  };

  const handleDeleteUser = async (id: string) => {
    const data = { id, data: { isDeleted: true } };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateUser(data).unwrap();
        if (res?.data) {
          toast.success("User Delete Successfully");
        }
      }
    });
  };

  const handleBlockUser = async (id: string) => {
    const data = { id, data: { isBlocked: true } };
    const res = await updateUser(data).unwrap();
  };

  const handleUnblockUser = async (id: string) => {
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
                  Role
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
                  <td className="px-6 py-4 whitespace-nowrap text-center md:text-left">
                    {user?.role}
                  </td>
                  <td className=" py-4 items-center whitespace-nowrap flex justify-center md:justify-start space-x-4">
                    <div>
                      {user?.isBlocked ? (
                        <button
                          onClick={() => handleUnblockUser(user?._id)}
                          className="px-2 py-1 bg-green-500 hover:bg-green-700 rounded-full text-sm transition duration-300"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockUser(user?._id)}
                          className="px-2 py-1 bg-yellow-500 hover:bg-yellow-700 rounded-full text-sm transition duration-300"
                        >
                          Block
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteUser(user?._id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded-full  transition duration-300"
                    >
                      Delete
                    </button>
                    <button onClick={() => handleUpdateUser(user)}>
                      <UpdateUserModal user={selectUser} />
                    </button>
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
                <span className="font-semibold text-purple-500">{idx + 1}</span>
                <div className="space-x-2">
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
                  <button className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded-full text-sm transition duration-300">
                    Delete
                  </button>
                  <button onClick={() => handleUpdateUser(user)}>
                    <UpdateUserModal user={selectUser} />
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-gray-200">
                  <span className="font-semibold">Name:</span> {user?.name}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold">Role:</span> {user?.role}
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
