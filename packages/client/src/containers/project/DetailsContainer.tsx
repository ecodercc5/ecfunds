import React from "react";
import { CommentsSection } from "../../components/comments/CommentsSection";
import { ProjectDetails } from "../../components/projects/Details";
import {
  useAddBookmarkToProject,
  useAddCommentToProject,
  useGetProject,
  useRemoveBookmarkFromProject,
} from "../../hooks/projects";

interface Props {
  projectId: string;
}

export const ProjectDetailsContainer: React.FC<Props> = ({ projectId }) => {
  const { loading, data } = useGetProject(projectId);
  const [addComment] = useAddCommentToProject();
  const [bookmarkProject] = useAddBookmarkToProject();
  const [removeBookmarkFromProject] = useRemoveBookmarkFromProject();

  console.log({ data });

  const project = data?.getProject;
  const comments = project?.comments;

  console.log({ comments });

  return loading ? (
    <div>loading!!!</div>
  ) : (
    <>
      <ProjectDetails
        project={project}
        onBookmark={() => {
          console.log("on bookmark");

          bookmarkProject({
            variables: {
              projectId: project!.id,
            },
          });
        }}
        onRemoveBookmark={() => {
          console.log("on remove bookmark");

          removeBookmarkFromProject({
            variables: {
              projectId: project!.id,
            },
          });
        }}
      />
      <CommentsSection
        comments={comments!}
        onAddComment={(comment) => {
          addComment({
            variables: {
              input: {
                projectId,
                content: comment,
              },
            },
          });
        }}
      />
    </>
  );
};
