import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();

  return (
    <Flex flexDirection="column">
      {projects.map((project) => {
        const projectLink = `/projects/${project.id}`;

        return (
          <Box onClick={() => history.push(projectLink)}>
            <ProjectCard
              project={project}
              onBookmark={onBookmark}
              onRemoveBookmark={onRemoveBookmark}
            />
          </Box>
        );
      })}
    </Flex>
  );
};
