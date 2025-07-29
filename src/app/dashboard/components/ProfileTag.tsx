'use client'

import Image from "next/image";



const ProfileTag = () => {
    const getGreeting = () =>{
        const today = new Date();
        const hour = today.getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        else return "Good evening";
    }
  return (
    <div>
        <div className=" w-48 px-2 bg-popover hover:bg-gray-600/40 transition-all  duration-300 flex items-center justify-between overflow-hidden relative text-popover-foreground border p-1 shadow-md rounded-2xl ">
        <Image src="https://avatars.githubusercontent.com/u/130303397?v=4" width={20} height={20} alt="profile picture of Prashant" className="h-10 w-10 rounded-2xl" />
        <div className="flex flex-col pr-5">
            <h1 className="text-lg font-semibold">Hi, Prashant</h1>
            <p className="text-xs">{getGreeting()} ❣️</p>
        </div></div>
    </div>
  )
}

export default ProfileTag