'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByIdAndToken } from "@/app/store/slices/clientProjectSlice";
import { AppDispatch, RootState } from "@/app/store";
import { GitGraph } from "./GitGraph";
import GitActivity from "./GitActivity";

export default function ClientPage({ projectId }: { projectId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectByIdAndToken(projectId));
    }
  }, [dispatch, projectId]);

  const { project } = useSelector((state: RootState) => state.projects);

  return (
    <div className="m-5">
      <h1>Project ID: {projectId}</h1>
      <GitGraph RepoName={project?.RepoName} RepoOwner={project?.RepoOwner} />
      <GitActivity RepoName={project?.RepoName} RepoOwner={project?.RepoOwner} />
    </div>
  );
}
