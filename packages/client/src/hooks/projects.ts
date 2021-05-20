import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  ADD_COMMENT_TO_PROJECT,
  BOOKMARK_PROJECT,
  CREATE_PROJECT,
  FUND_PROJECT,
  GET_PROJECT,
  GET_PROJECTS,
  REMOVE_BOOKMARK_FROM_PROJECT,
} from "../graphql/project";
import {
  AddCommentToProjectMutation,
  AddCommentToProjectMutationVariables,
  BookmarkProjectMutation,
  BookmarkProjectMutationVariables,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  FundProjectMutation,
  FundProjectMutationVariables,
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

export const useAddCommentToProject = () => {
  const client = useApolloClient();

  return useMutation<
    AddCommentToProjectMutation,
    AddCommentToProjectMutationVariables
  >(ADD_COMMENT_TO_PROJECT, {
    update: (cache, { data }) => {
      console.log(data);

      const comment = data?.addCommentToProject!;

      // get the project
      const projectQuery = client.readQuery<
        GetProjectQuery,
        GetProjectQueryVariables
      >({
        query: GET_PROJECT,
        variables: {
          id: comment.projectId,
        },
      });

      const project = projectQuery?.getProject!;

      // add comment to the project
      const newProject = {
        ...project,
        comments: [...project.comments, comment],
      };

      console.log({ newProject });

      // save project to cache
      client.writeQuery<GetProjectQuery, GetProjectQueryVariables>({
        query: GET_PROJECT,
        data: {
          getProject: newProject,
        },
        variables: {
          id: project.id,
        },
      });
    },
  });
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

export const useFundProject = () => {
  return useMutation<FundProjectMutation, FundProjectMutationVariables>(
    FUND_PROJECT
  );
};
