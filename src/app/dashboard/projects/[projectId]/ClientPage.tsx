"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByIdAndToken } from "@/app/store/slices/clientProjectSlice";
import { AppDispatch, RootState } from "@/app/store";
import { GitGraph } from "./GitGraph";
import GitActivity from "./GitActivity";
import Arc from "../../components/ProjectCompletion";
import ProjectDescription from "../../components/ProjectDescription";
import Agreement from "../../components/Agreement";

export default function ClientPage({ projectId }: { projectId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectByIdAndToken(projectId));
    }
  }, [dispatch, projectId]);

  const { project } = useSelector((state: RootState) => state.projects);

  console.log(project);

  const percentageValue = Number(project?.Completion) || 0;

  const chooseColor = (percentageValue: number): string => {
    if (percentageValue >= 80) return "#4caf50"; // green
    if (percentageValue >= 50) return "#ffeb3b"; // yellow
    return "#f44336";
  };

  return (
    <div className="m-5">
      <div className="flex mb-20 justify-start gap-20">
        {" "}
        <ProjectDescription title={project.Name} description={project.Description} owner={project.RepoOwner} repo={project.RepoName} deadline={project.Deadline}/>
        <div className="flex justify-end gap-20 w-full"><Arc
          percentage={percentageValue}
          color={chooseColor(percentageValue)}
        />
        <Agreement fileUrl={project.Agreement}/></div>
        

      </div>
      <GitGraph RepoName={project?.RepoName} RepoOwner={project?.RepoOwner} />
      <GitActivity
        RepoName={project?.RepoName}
        RepoOwner={project?.RepoOwner}
      />
    </div>
  );
}
