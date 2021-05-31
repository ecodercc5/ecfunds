import { Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { ProjectListContainer } from "../containers/project/ListContainer";

export const HomePage = () => {
  return (
    <Layout>
      <Text fontSize="lg" fontWeight={500} mb={2}>
        Explore or{" "}
        <Link to="/create-project">
          <Text as="span" color="brand">
            Create
          </Text>
        </Link>{" "}
        your own project
      </Text>
      <ProjectListContainer />
    </Layout>
  );
};
