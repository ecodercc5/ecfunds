import { useParams } from "react-router";
import { BackProjectContainer } from "../containers/project/BackProjectContainer";

export const BackProjectPage = () => {
  const params = useParams<{ id: string }>();

  const projectId = params.id;

  return (
    <div>
      <BackProjectContainer projectId={projectId} />
    </div>
  );
};
