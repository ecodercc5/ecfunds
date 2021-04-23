import { Flex } from "@chakra-ui/layout";
import React from "react";
import { GetProjectsQuery } from "../../graphql/types";
import { ProjectCard, Project } from "./ProjectCard";

interface Props {
  projects: GetProjectsQuery["getProjects"];
  onBookmark?: (project: Project) => any;
  onRemoveBookmark?: (project: Project) => any;
}

export const ProjectsList: React.FC<Props> = ({
  projects,
  onBookmark = () => {},
  onRemoveBookmark = () => {},
}) => {
  return (
    <Flex flexDirection="column">
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project.id}
            project={project}
            onBookmark={onBookmark}
            onRemoveBookmark={onRemoveBookmark}
          />
        );
      })}
    </Flex>
  );
};
