"use client";

import CreateOrderModal from "@/src/components/modals/CreateOrderModal";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs"; // Assuming you're using dayjs for date formatting

const Membership = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: userData } = useGetMyDataQuery(undefined);
  const user = userData?.data[0];

  // Membership options
  const memberships = [
    { price: 300, totalMonth: 1, label: "1 Month" },
    { price: 1000, totalMonth: 6, label: "6 Months" },
    { price: 1500, totalMonth: 12, label: "1 Year" },
  ];

  // for hydration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Formatting the membership expiration date
  const formattedPremiumLastDate = user?.premiumLastDate
    ? dayjs(user.premiumLastDate).format("DD-MM-YYYY")
    : "N/A";

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 p-8">
      <h1 className="text-4xl font-bold text-teal-400 mb-10">
        Memberships
      </h1>

      {/* User's membership and payment information */}
      <div className="mb-8 text-center text-white">
        <h1 className="text-xl">
          Your total payment: <span className="text-teal-400">{user?.payment ?? "0"} Tk</span>
        </h1>
        <h1 className="text-xl">
          Your membership valid until: <span className="text-teal-400">{formattedPremiumLastDate}</span>
        </h1>
      </div>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {memberships.map((membership, index) => (
          <div
            key={index}
            className="membership-card bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-teal-400 transition-shadow duration-300 transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              {membership.label} Membership
            </h2>
            <p className="text-teal-400 text-xl font-medium">
              Price: {membership.price} Tk
            </p>
            <div className="flex justify-end">
              <button className="mt-4 bg-teal-500 text-white py-2 px-6 rounded-full font-semibold tracking-wider shadow-lg hover:bg-teal-600 hover:shadow-teal-400 transition duration-300 transform hover:scale-105">
                <CreateOrderModal
                  totalPrice={membership?.price}
                  totalMonth={membership?.totalMonth}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
