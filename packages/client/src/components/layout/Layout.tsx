import { Box, Container } from "@chakra-ui/layout";
import { Logo } from "../logo/Logo";

export const Layout: React.FC = ({ children }) => {
  return (
    <Container width="100%">
      <Box as="nav" py={4}>
        <Logo />
      </Box>

      {children}
    </Container>
  );
};
