"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import {
  MdAdminPanelSettings,
  MdSpaceDashboard,
  MdSubscriptions,
} from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { verifyToken } from "@/src/utils/verifyToken";
import React from "react";

// Loading component (you can customize this as needed)
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <span>Loading...</span>
  </div>
);

const Sidebar = () => {
  const searchParams = useSearchParams();
  const queryValue = searchParams?.get("key");

  const user = useAppSelector(selectCurrentUser);
  let currenttUser;
  if (user?.token) {
    currenttUser = verifyToken(user?.token);
  }
  const currenttUserRole = (currenttUser as any)?.role;

  return (
    <div className="min-h-screen fixed h-full flex bg-gray-900">
      {/* Dashboard Sidebar */}
      <div className="md:w-64 w-20 bg-gradient-to-b from-purple-900 to-blue-900 pt-6 shadow-2xl relative">
        <ul className="menu flex flex-col items-center md:items-start p-4">
          {/* Logo */}
          <Link href="/dashboard?key=dashboard">
            <div className="flex justify-center mb-8 hover:scale-105 transition-all duration-300">
              <img
                className="md:w-2/6 w-12 rounded-full border border-purple-500 shadow-lg"
                src="https://i.ibb.co.com/61WySQq/pngwing-com-3.png"
                alt="Logo"
              />
            </div>
          </Link>

          <hr className="border-purple-500 w-full mb-4 opacity-40" />

          {/* Dashboard */}
          <li className="w-full mb-2">
            <Link href="/dashboard?key=dashboard">
              <div
                className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                  queryValue === "dashboard"
                    ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                    : ""
                }`}
              >
                <span className="material-icons md:hidden">
                  <MdSpaceDashboard />
                </span>
                <span className="hidden md:inline-block ml-2">Dashboard</span>
              </div>
            </Link>
          </li>

          {/* Users */}

          {/* Recipes */}
          <li className="w-full mb-2">
            <Link href="/dashboard/recipes?key=recipes">
              <div
                className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                  queryValue === "recipes"
                    ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                    : ""
                }`}
              >
                <span className="material-icons md:hidden">
                  <IoFastFood />
                </span>
                <span className="hidden md:inline-block ml-2">Recipes</span>
              </div>
            </Link>
          </li>

          {/* Membership */}
          <li className="w-full mb-2">
            <Link href="/dashboard/membership?key=membership">
              <div
                className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                  queryValue === "membership"
                    ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                    : ""
                }`}
              >
                <span className="material-icons md:hidden">
                  <MdSubscriptions />
                </span>
                <span className="hidden md:inline-block ml-2">Membership</span>
              </div>
            </Link>
          </li>

          {currenttUserRole == "admin" && (
            <>
              <li className="w-full mb-2">
                <Link href="/dashboard/create-admin?key=create-admin">
                  <div
                    className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                      queryValue === "create-admin"
                        ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                        : ""
                    }`}
                  >
                    <span className="material-icons md:hidden">
                      <MdAdminPanelSettings />
                    </span>
                    <span className="hidden md:inline-block ml-2">
                      Create Admin
                    </span>
                  </div>
                </Link>
              </li>

              <li className="w-full mb-2">
                <Link href="/dashboard/users?key=users">
                  <div
                    className={`block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl ${
                      queryValue === "users"
                        ? "bg-purple-700 shadow-xl text-[#ff4a4afd] font-extrabold"
                        : ""
                    }`}
                  >
                    <span className="material-icons md:hidden">
                      <FaUsers />
                    </span>
                    <span className="hidden md:inline-block ml-2">Users</span>
                  </div>
                </Link>
              </li>
            </>
          )}

          <hr className="border-purple-500 w-full mb-4 opacity-40" />

          {/* Home */}
          <li className="w-full mb-2">
            <Link href="/">
              <div className="block px-2 py-4 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl">
                <span className="material-icons md:hidden">
                  <FaHome />
                </span>
                <span className="hidden md:inline-block ml-2">Home</span>
              </div>
            </Link>
          </li>
        </ul>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 blur-lg"></div>
      </div>
    </div>
  );
};

// Wrap Sidebar with Suspense
const SidebarWithSuspense = () => (
  <Suspense fallback={<Loading />}>
    <Sidebar />
  </Suspense>
);

export default SidebarWithSuspense;
