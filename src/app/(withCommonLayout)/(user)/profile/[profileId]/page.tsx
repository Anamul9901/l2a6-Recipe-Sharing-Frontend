import { Button } from "@nextui-org/button";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  // User data
  const user = {
    _id: "66f94bdad2d6902ba8946cf2",
    email: "user2@gmail.com",
    role: "user",
    profileImg: "https://i.ibb.co.com/z89cgQr/profile.webp",
    follower: 0,
    following: 0,
    bio: "Ke bio demu vai",
    premium: false,
    payment: 0,
  };

  return (
    <div className="bg-default-100 min-h-screen">
      {/* Profile Banner */}
      <div className="relative bg-blue-600 h-60">
        <div className="absolute bottom-0 left-4 flex items-center space-x-4 w-full">
          {/* Profile Picture */}
          <Image
            className="w-28 h-28 rounded-full border-4 border-white"
            src={user.profileImg}
            alt="Profile Picture"
            height={500}
            width={500}
          />
          <div className="text-white w-full">
            <h2 className="text-2xl font-bold">{user.email.split("@")[0]}</h2>
            <div className="flex justify-between items-center">
              <p className="text-sm">
                {user.follower} followers | {user.following} following
              </p>
              <div className="flex pr-6 md:pr-20 gap-2">
                <Button className="btn btn-sm">Follow</Button>
                <Button className="btn btn-sm">Edit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {/* Left Sidebar */}
          <div className="w-full md:w-3/12">
            <div className="bg-default-50 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="text-sm">Bio: {user.bio}</p>
              <p className="text-sm">
                Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
              <p className="text-sm">Following: {user.following}</p>
              <p className="text-sm">
                Premium Status: {user.premium ? "Premium User" : "Free User"}
              </p>
            </div>

            <div className="bg-default-50 p-4 rounded-lg shadow-md mt-4">
              <h3 className="font-semibold text-lg mb-2">Friends</h3>
              <div className="grid grid-cols-3 gap-2">
                {/* Friend images can be replaced with actual data */}
                <img
                  className="w-full h-20 rounded-lg"
                  src="/friend1.jpg"
                  alt="Friend 1"
                />
                <img
                  className="w-full h-20 rounded-lg"
                  src="/friend2.jpg"
                  alt="Friend 2"
                />
                <img
                  className="w-full h-20 rounded-lg"
                  src="/friend3.jpg"
                  alt="Friend 3"
                />
              </div>
            </div>
          </div>

          {/* Main Content (Posts) */}
          <div className="w-full md:w-9/12">
            <div className="bg-default-50 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">
                Whats on your mind?
              </h3>
              <textarea
                className="w-full p-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write something..."
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Post
              </button>
            </div>

            <div className="bg-default-50 p-4 rounded-lg shadow-md mt-4">
              <h3 className="font-semibold text-lg mb-2">Recent Posts</h3>

              {/* Example Post */}
              <div className="bg-gray-50 p-3 rounded-lg mt-4">
                <div className="flex items-start space-x-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.profileImg}
                    alt="User"
                  />
                  <div>
                    <h4 className="font-semibold">
                      {user.email.split("@")[0]}
                    </h4>
                    <p className="text-sm text-gray-500">1 hour ago</p>
                    <p className="mt-2">
                      This is an example of a recent post. Here goes the
                      content.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example Post */}
              <div className="bg-gray-50 p-3 rounded-lg mt-4">
                <div className="flex items-start space-x-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.profileImg}
                    alt="User"
                  />
                  <div>
                    <h4 className="font-semibold">
                      {user.email.split("@")[0]}
                    </h4>
                    <p className="text-sm text-gray-500">2 days ago</p>
                    <p className="mt-2">Another post example for the feed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
