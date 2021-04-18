import React from "react";
import { CommentsSection } from "../../components/comments/CommentsSection";
import { ProjectDetails } from "../../components/projects/Details";
import { useGetProject } from "../../hooks/projects";

interface Props {
  projectId: string;
}

export const ProjectDetailsContainer: React.FC<Props> = ({ projectId }) => {
  const { loading, data } = useGetProject(projectId);

  const project = data?.getProject;
  const comments = project?.comments;

  return loading ? (
    <div>loading!!!</div>
  ) : (
    <>
      <ProjectDetails project={project} />
      <CommentsSection comments={comments!} />
    </>
  );
};
