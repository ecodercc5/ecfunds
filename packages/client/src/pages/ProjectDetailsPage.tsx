import React from "react";
import { useParams } from "react-router";
import { Layout } from "../components/layout/Layout";
import { ProjectDetails } from "../components/projects/Details";
import { useGetProject } from "../hooks/projects";

interface IParams {
  id: string;
}

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<IParams>();

  console.log(`the project id is ${id}`);
  const { loading, error, data } = useGetProject(id);

  console.log({ loading, error, data });

  const project = data?.getProject;

  return loading ? (
    <div>loading!!!</div>
  ) : (
    <Layout>
      <ProjectDetails project={project} />
    </Layout>
  );
};
