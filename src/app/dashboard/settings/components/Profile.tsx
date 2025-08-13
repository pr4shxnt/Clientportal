import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  projectsCount: string;
  
};

const Profile = (props: Props) => {
  return (
    <>
      <h1 className="text-3xl mb-5 font-bold tracking-wider">
        Your Profile
      </h1>

      <div className="flex w-full gap-10">
        <div className="h-72 w-72 group rounded-full relative">
        <Image
          className="h-72 w-72 aspect-square rounded-full"
          src={props.userAvatar}
          alt=""
          width={100}
          height={100}
        />
        <div className="absolute  transition-all duration-500 ease-in-out hidden group-hover:flex items-end justify-center bg-black/70 z-20 w-72 h-72 top-0 rounded-full">
        <div className="absolute h-20 top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[1px] "></div>
            <div className="absolute w-20 top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-[1px] "></div>
            <p className="mb-10 text-xs">Update your profile picture</p>
        </div>
        </div>
        <div className="profile-data-container flex flex-col">
          <h1 className="">Name: <span className="">{props.name}</span></h1>
          <h1 className="">username: <span className="">{props.userName}</span></h1>
          <h1 className="">Email: <span className="">{props.userEmail}</span></h1>
          <h1 className="">Projects Count: <span className="">{props.projectsCount}</span></h1>
          
          <Link href={`/dashboard/settings/edit`} className="self-end-safe"><Edit/></Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
