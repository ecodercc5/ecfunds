import { BackProjectForm } from "./BackProjectForm";
import { useGetProject } from "../../hooks/projects";

interface Props {
  projectId: string;
}

export const BackProjectContainer: React.FC<Props> = ({ projectId }) => {
  const { loading, data } = useGetProject(projectId);
  const project = data?.getProject;

  if (loading) {
    return <div>loading!!!</div>;
  }

  return (
    <div>
      <BackProjectForm project={project!} />
    </div>
  );
};
