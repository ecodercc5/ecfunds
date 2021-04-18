import { Flex } from "@chakra-ui/layout";
import React from "react";
import { GetProjectsQuery } from "../../graphql/types";
import { ProjectCard } from "./ProjectCard";

interface Props {
  projects: GetProjectsQuery["getProjects"];
}

export const ProjectsList: React.FC<Props> = ({ projects }) => {
  return (
    <Flex flexDirection="column">
      {projects.map((project) => {
        return <ProjectCard key={project.id} project={project} />;
      })}
    </Flex>
  );
};
