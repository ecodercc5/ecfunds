import React from "react";
import { useParams } from "react-router";
import { Layout } from "../components/layout/Layout";
import { ProjectDetailsContainer } from "../containers/project/DetailsContainer";

interface IParams {
  id: string;
}

export const ProjectDetailsPage: React.FC = () => {
  const { id: projectId } = useParams<IParams>();

  console.log(`the project id is ${projectId}`);

  return (
    <Layout>
      <ProjectDetailsContainer projectId={projectId} />
    </Layout>
  );
};
