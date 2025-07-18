'use client'

type Props = {}

const ProfileTag = (props: Props) => {
    const getGreeting = () =>{
        const today = new Date();
        const hour = today.getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }
  return (
    <div>
        <div className=" w-48 px-2 bg-popover hover:bg-gray-600/40 transition-all  duration-300 flex items-center justify-between overflow-hidden relative text-popover-foreground border p-1 shadow-md rounded-2xl ">
        <img src="" alt="" className="h-8 w-8 rounded-full" />
        <div className="flex flex-col pr-5">
            <h1 className="text-lg font-semibold">Hi, Prashant</h1>
            <p className="text-xs">{getGreeting()} ❣️</p>
        </div></div>
    </div>
  )
}

export default ProfileTag