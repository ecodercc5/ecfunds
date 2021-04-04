import { Box } from "@chakra-ui/layout";

interface Props {}

export const SimpleTable: React.FC<Props> = ({ children }) => {
  return <Box className="simple-table">{children}</Box>;
};
