"use client";

import { AppDispatch, RootState } from "@/app/store";
import { getClientDetails } from "@/app/store/slices/clientSlice";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const ProfileTag = () => {
  const getGreeting = () => {
    const today = new Date();
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 16) return "Good afternoon";
    else return "Good evening";
  };

  const { clientData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("client_session");
      if (token) {
        dispatch(getClientDetails(token));
      }
    }
  }, [dispatch]); // Dependency array correct to avoid infinite loop

  return (
    <div>
      <div className=" w-48 px-2 bg-popover hover:bg-gray-600/40 transition-all  duration-300 flex items-center justify-between overflow-hidden relative text-popover-foreground border p-1 shadow-md rounded-2xl ">
        <Image
          src={`${
            clientData.profilePhoto
              ? clientData.profilePhoto
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }`}
          width={20}
          height={20}
          alt="profile picture of Prashant"
          className="h-10 w-10 rounded-2xl"
        />
        <div className="flex flex-col pr-5">
          <h1 className="text-lg font-semibold">
            Hi, {clientData?.name.split(" ")[0]}
          </h1>
          <p className="text-xs">{getGreeting()} ❣️</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTag;
