import { useMutation, useQuery } from "@apollo/client";
import {
  BOOKMARK_PROJECT,
  GET_PROJECT,
  GET_PROJECTS,
  REMOVE_BOOKMARK_FROM_PROJECT,
} from "../graphql/project";
import {
  BookmarkProjectMutation,
  BookmarkProjectMutationVariables,
  GetProjectQuery,
  GetProjectQueryVariables,
  GetProjectsQuery,
  GetProjectsQueryVariables,
  RemoveBookmarkFromProjectMutation,
  RemoveBookmarkFromProjectMutationVariables,
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

export const useAddBookmarkToProject = () => {
  return useMutation<BookmarkProjectMutation, BookmarkProjectMutationVariables>(
    BOOKMARK_PROJECT,
    {
      update: (cache, { data }) => {
        console.log("finished add bookmark mutation");
      },
    }
  );
};

export const useRemoveBookmarkFromProject = () => {
  return useMutation<
    RemoveBookmarkFromProjectMutation,
    RemoveBookmarkFromProjectMutationVariables
  >(REMOVE_BOOKMARK_FROM_PROJECT);
};
