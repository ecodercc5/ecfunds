import { useParams } from "react-router";
import { Layout } from "../components/layout/Layout";
import { BackProjectContainer } from "../containers/project/BackProjectContainer";

export const BackProjectPage = () => {
  const params = useParams<{ id: string }>();

  const projectId = params.id;

  return (
    <Layout>
      <BackProjectContainer projectId={projectId} />
    </Layout>
  );
};
