import { Box, Text, BoxProps } from "@chakra-ui/layout";
import { CommentsList } from "./List";
import { Comment } from "../../graphql/types";

interface Props extends BoxProps {
  comments: Comment[];
}

export const CommentsSection: React.FC<Props> = ({ comments, ...props }) => {
  return (
    <Box {...props}>
      <Text as="h2" fontWeight={500} mb={3}>
        Comments
      </Text>

      <CommentsList comments={comments} />
    </Box>
  );
};
