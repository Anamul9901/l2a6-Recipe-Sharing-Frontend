"use client"
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

const Sidebar = () => {
  const searchParams  = useSearchParams();
  const queryValue = searchParams.get('key');
  return (
    <div>
      <div className="flex">
        {/* dashboard side bar */}
        <div className="md:w-64 w-14 pt-6 min-h-screen bg-neutral-700">
          <ul className="menu">
            <Link href="/dashboard?key=dashboard">
              <div className=" flex justify-center mb-2">
                <img
                  className="md:w-[50%] rounded mb-5"
                  src={
                    "https://i.ibb.co/LxLzCSH/Picsart-24-08-29-12-34-16-998.png"
                  }
                  alt=""
                />
              </div>
            </Link>
            <hr className="my-4 mx-2" />

            <li>
              <Link
                href="/dashboard?key=dashboard"
               className={queryValue === "dashboard" ? "text-[#ff4a4afd] underline font-black": ""}
              >
                {/* <RxDashboard /> */}----
                <span className="hidden md:inline-block">Dashboard</span>
              </Link>
            </li>

            {/* //  user sidebar */}

            <div>
              <li>
                <Link
                  href="/dashboard/users?key=users"
                  className={queryValue === "users" ? "text-[#ff4a4afd] underline font-black": ""}
                >
                  {/* <FaRegBookmark /> */}---
                  <span className="hidden md:inline-block">Users</span>
                </Link>
              </li>
            </div>

            {/* admin sidebar*/}
            {/* {user && (user as any)?.role == "admin" && ( */}
            <div>
              <li>
                <Link
                  href="facility-management"
                  //   className={({ isActive, isPending }) =>
                  //     isPending
                  //       ? "pending"
                  //       : isActive
                  //       ? "text-[#050506] underline font-black"
                  //       : "lg:text-white"
                  //   }
                >
                  {/* <FaFlagCheckered /> */}---
                  <span className="hidden md:inline-block">
                    Facility Management
                  </span>
                </Link>
              </li>
            </div>
            {/* )} */}

            <hr className="my-4 mx-2" />
            <li>
              <Link href="/">
                {/* <FaHouseMedicalFlag /> */}---
                <span className="hidden md:inline-block">Home</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
