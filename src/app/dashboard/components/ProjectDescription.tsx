import Link from "next/link";
import React from "react";

interface ProjectDescriptionProps {
  title: string;
  description: string;
  owner: string;
  repo: string;
  deadline: string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  title,
  description,
  owner,
  repo,
  deadline
}) => (
  <div className="shadow-md rounded-lg p-6 ">
    <h2 className="mb-1 text-2xl font-semibold">{title}</h2>
    <p className="text-gray-400 mb-2">{description}</p>
        <p className="text-sm text-gray-400">Deadline: <span className="">{new Date(deadline).toLocaleDateString()}</span></p>

    <div className="flex gap-2 text-sm items-end">
      <h1 className="">Link:</h1>{" "}
      <Link
      target="_blank"
        href={`https://www.github.com/${owner}/${repo}`}
        className=" hover:text-blue-500 hover:underline"
      >{`https://www.github.com/${owner}/${repo}`}</Link>
    </div>
  </div>
);

export default ProjectDescription;
