'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '@/app/store/slices/clientProjectSlice'; // Implement this action in your slice
import type { AppDispatch, RootState } from '@/app/store'; // Adjust path as needed
import Link from 'next/link';

export default function ProjectsClient() {
  const dispatch = useDispatch<AppDispatch>();
  const {projects}= useSelector((state: RootState)=> state.projects)
  useEffect(() => {
    const token = localStorage.getItem('client_session') ?? '';
    dispatch(getProjects(token));
  }, [dispatch]);

  
  return (
    <div className="m-5">
      <section className="flex flex-col items-center">
        <h1 className="pb-3 pl-2 w-full text-start">Create a new project...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:gap-10 max-w-md sm:max-w-full md:max-w-3xl lg:max-w-none mx-auto w-full overflow-x-auto">
          <Link href={`/dashboard/request-project`} className="bg-popover hover:bg-gray-600/40 transition-all duration-300 flex items-end justify-center text-center overflow-hidden relative text-popover-foreground border p-1 shadow-md h-40 rounded-2xl min-w-0 w-full md:min-w-72">
            <div className="absolute h-20 top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[1px] "></div>
            <div className="absolute w-20 top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-[1px] "></div>
            <h1 className="text-xs font-extralight">Add a new project</h1>
          </Link>
        </div>
      </section>
      <section className="mt-10 flex flex-col items-center">
        <h1 className="pb-3 pl-2 text-start w-full">Explore existing projects...</h1>
        <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-6 max-w-md sm:max-w-full md:max-w-3xl lg:max-w-none mx-auto w-full overflow-x-auto">
          {projects?.map((project, idx) => (
            <Link key={project._id} href={`/dashboard/projects/${project._id}`} className="bg-popover hover:bg-gray-600/40 transition-all duration-300  flex items-center justify-center text-center overflow-hidden relative text-popover-foreground border p-1 shadow-md h-40 rounded-2xl min-w-0 w-full md:min-w-72">
              <div className="">
                <h1 className="text-xl font-semibold">Project {idx+1}</h1>
                <p className="text-sm font-extralight">{project.Name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 