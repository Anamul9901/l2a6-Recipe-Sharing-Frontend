"use client";
import { logout, selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavberDropdown = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  // for hybration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" name="ana" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onClick={() => handleNavigation(`/profile/${user?.user?._id}`)}
        >
          Profile
        </DropdownItem>

        <DropdownItem
          onClick={() => handleNavigation("/dashboard?key=dashboard")}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          onClick={() => handleLogOut()}
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavberDropdown;
