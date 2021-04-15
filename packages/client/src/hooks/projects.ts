import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/project";
import { GetProjectQuery, GetProjectQueryVariables } from "../graphql/types";

export const useGetProject = (projectId: string) => {
  return useQuery<GetProjectQuery, GetProjectQueryVariables>(GET_PROJECT, {
    variables: {
      id: projectId,
    },
  });
};
