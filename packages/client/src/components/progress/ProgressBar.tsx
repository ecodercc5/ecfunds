import { Progress, ProgressProps } from "@chakra-ui/react";

interface Props extends ProgressProps {}

export const ProgressBar: React.FC<Props> = ({ ...props }) => {
  return <Progress {...props} bg="black" />;
};
