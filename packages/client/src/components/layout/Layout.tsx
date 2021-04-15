import { Container } from "@chakra-ui/layout";

interface Props {}

export const Layout: React.FC<Props> = ({ children }) => {
  return <Container pt={4}>{children}</Container>;
};
