import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import { AvatarDetails } from "../user/AvatarDetails";
import { Comment } from "../../graphql/types";
import { format } from "date-fns";

interface Props extends BoxProps {
  comment: Comment;
}

export const CommentsCard: React.FC<Props> = ({ comment, ...props }) => {
  const { content, user, createdAt } = comment;

  const createdAtDate = new Date(createdAt);
  const formatedCreatedAt = format(createdAtDate, "LLLL dd, u");

  return (
    <Box
      maxWidth="400px"
      height="auto"
      p={4}
      borderColor="light-gray"
      borderStyle="solid"
      borderWidth="1px"
      borderRadius="1px"
      {...props}
    >
      <Flex alignItems="center" mb={2}>
        <AvatarDetails
          photoUrl="https://images.unsplash.com/photo-1617353318123-78b8edc20f82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
          name={user.name}
          date={formatedCreatedAt}
        />
      </Flex>
      <Text fontSize="sm">{content}</Text>
    </Box>
  );
};
