import { Box, Container } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Logo } from "../logo/Logo";

export const Layout: React.FC = ({ children }) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      width="100%"
      height="100vh"
    >
      <Box as="nav" py={4}>
        <Link to="/">
          <Logo />
        </Link>
      </Box>

      {children}
    </Container>
  );
};
