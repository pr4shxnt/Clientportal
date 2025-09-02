"use client";

import { AppDispatch, RootState } from "@/app/store";
import { getClientDetails } from "@/app/store/slices/clientSlice";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
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
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold text-white tracking-wide">
        Your Profile
      </h1>
      <p className="mb-10">You can review and edit profile from here.</p>

      <div className="flex flex-col md:flex-row max-w-[90%] gap-12 p-10 bg-black border border-white/20 rounded-2xl shadow-lg">
        {/* Avatar Section */}
        <div className="relative w-full group mx-auto">
          <Image
            className="h-64 w-64 object-cover rounded-full border-4 border-white shadow-md"
            src={
              clientData.profilePhoto ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Avatar"
            width={256}
            height={256}
          />
          <div className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 rounded-full bg-black/70 hidden group-hover:flex flex-col items-center justify-center transition-all duration-500 ease-in-out cursor-pointer">
            <div className="h-12 w-12 flex items-center justify-center border-2 border-white rounded-full">
              <Edit className="text-white" size={20} />
            </div>
            <p className="text-xs mt-3 text-white tracking-wide">
              Update profile picture
            </p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col gap-4 w-full text-white">
          {[
            { label: "Name", value: clientData.name },
            { label: "Username", value: clientData.username },
            { label: "Email", value: clientData.email },
            { label: "Projects", value: clientData._id },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-xl"
            >
              <span className="font-semibold text-lg">{item.label}:</span>
              <span className="font-light cursor-pointer hover:underline pl-10">
                {item.value}
              </span>
            </div>
          ))}

          <Link
            href={`/dashboard/settings/edit`}
            className="mt-6 flex items-center gap-2 self-end text-sm px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-black transition-colors"
          >
            <Edit size={18} />
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
