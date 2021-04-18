import { useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../graphql/project";
import {
  GetProjectQuery,
  GetProjectQueryVariables,
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from "../graphql/types";

export const useGetProject = (projectId: string) => {
  return useQuery<GetProjectQuery, GetProjectQueryVariables>(GET_PROJECT, {
    variables: {
      id: projectId,
    },
  });
};

export const useGetProjects = () => {
  return useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GET_PROJECTS);
};
