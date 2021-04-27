import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  BOOKMARK_PROJECT,
  CREATE_PROJECT,
  GET_PROJECT,
  GET_PROJECTS,
  REMOVE_BOOKMARK_FROM_PROJECT,
} from "../graphql/project";
import {
  BookmarkProjectMutation,
  BookmarkProjectMutationVariables,
  CreateProjectMutation,
  CreateProjectMutationVariables,
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

export const useCreateProject = () => {
  return useMutation<CreateProjectMutation, CreateProjectMutationVariables>(
    CREATE_PROJECT
  );
};

export const useAddBookmarkToProject = () => {
  const client = useApolloClient();

  return useMutation<BookmarkProjectMutation, BookmarkProjectMutationVariables>(
    BOOKMARK_PROJECT,
    {
      update: (cache, { data }) => {
        const projectId = data?.bookmarkProject.projectId;
        const projectCacheId = `Project:${projectId}`;

        client.writeFragment({
          id: projectCacheId,
          fragment: gql`
            fragment BookmarkField on Project {
              isBookmarked
            }
          `,
          data: {
            isBookmarked: true,
          },
        });

        console.log("finished add bookmark mutation");
      },
    }
  );
};

export const useRemoveBookmarkFromProject = () => {
  const client = useApolloClient();

  return useMutation<
    RemoveBookmarkFromProjectMutation,
    RemoveBookmarkFromProjectMutationVariables
  >(REMOVE_BOOKMARK_FROM_PROJECT, {
    update: (cache, { data }) => {
      const projectId = data?.removeBookmarkFromProject.projectId;
      const projectCacheId = `Project:${projectId}`;

      client.writeFragment({
        id: projectCacheId,
        fragment: gql`
          fragment BookmarkField on Project {
            isBookmarked
          }
        `,
        data: {
          isBookmarked: false,
        },
      });

      console.log("finished removing bookmark");
    },
  });
};
