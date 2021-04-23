import {
  useAddBookmarkToProject,
  useGetProjects,
  useRemoveBookmarkFromProject,
} from "../../hooks/projects";
import { ProjectsList } from "../../components/projects/List";

interface Props {}

export const ProjectListContainer = (props: Props) => {
  const { loading, data } = useGetProjects();
  const [removeBookmark] = useRemoveBookmarkFromProject();
  const [addBookmark] = useAddBookmarkToProject();

  const projects = data?.getProjects;

  return loading ? (
    <div>loading!!!</div>
  ) : (
    <ProjectsList
      projects={projects!}
      onBookmark={(project) => {
        console.log("adding bookmark");

        addBookmark({
          variables: {
            projectId: project.id,
          },
        });
      }}
      onRemoveBookmark={(project) => {
        console.log("removing bookmark");

        removeBookmark({
          variables: {
            projectId: project.id,
          },
        });
      }}
    />
  );
};
