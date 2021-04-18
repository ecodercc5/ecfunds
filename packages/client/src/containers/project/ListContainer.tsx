import React from "react";
import { useGetProjects } from "../../hooks/projects";
import { ProjectsList } from "../../components/projects/List";

interface Props {}

export const ProjectListContainer = (props: Props) => {
  const { loading, data } = useGetProjects();

  const projects = data?.getProjects;

  return loading ? (
    <div>loading!!!</div>
  ) : (
    <ProjectsList projects={projects!} />
  );
};
