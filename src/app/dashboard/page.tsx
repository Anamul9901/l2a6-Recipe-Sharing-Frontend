"use client";
import ChangePasswordModal from "@/src/components/modals/ChangePasswordModal";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: user } = useGetMyDataQuery(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const currentUser = user?.data[0];
  console.log(currentUser);

  // For hydration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-default-100 shadow-2xl rounded-lg transform transition-transform hover:scale-105 p-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-default-900 mb-4">
          User Dashboard
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg">
            <img
              src={
                currentUser?.profileImg || "https://i.ibb.co/z89cgQr/profile.webp"
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold text-default-800">
              {currentUser?.name}
            </h2>
            <p className="text-default-600">{currentUser?.email}</p>
            <p className="text-default-600">
              {currentUser?.bio || "No bio available"}
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mb-6">
          <div className="text-center p-4 bg-default-600 rounded-lg shadow hover:bg-default-800 transition duration-200">
            <h3 className="text-xl md:text-2xl font-semibold text-default-100">
              {currentUser?.follower}
            </h3>
            <p className="text-default-100">Followers</p>
          </div>
          <div className="text-center p-4 bg-default-600 rounded-lg shadow hover:bg-default-800 transition duration-200">
            <h3 className="text-xl md:text-2xl font-semibold text-default-100">
              {currentUser?.following}
            </h3>
            <p className="text-default-100">Following</p>
          </div>
          <div className="text-center p-4 bg-default-600 rounded-lg shadow hover:bg-default-800 transition duration-200">
            <h3 className="text-xl md:text-2xl font-semibold text-default-100">
              {currentUser?.premium ? "Yes" : "No"}
            </h3>
            <p className="text-default-100">Premium Status</p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex justify-center mb-6">
          <button className="">
            <ChangePasswordModal />
          </button>
        </div>

        {/* Account Details */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-default-700 mb-4">
            Account Details
          </h3>
          <div className="bg-default-600 text-default-50 p-4 rounded-lg shadow">
            <p>
              <strong>Role:</strong> {currentUser?.role}
            </p>
            <p>
              <strong>Blocked:</strong> {currentUser?.isBlocked ? "Yes" : "No"}
            </p>
            <p>
              <strong>Deleted:</strong> {currentUser?.isDeleted ? "Yes" : "No"}
            </p>
            <p>
              <strong>Payment:</strong>{" "}
              {currentUser?.payment ? `$${currentUser?.payment}` : "No Payment"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
