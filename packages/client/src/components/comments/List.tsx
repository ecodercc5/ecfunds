import { Flex } from "@chakra-ui/react";
import { Comment } from "../../graphql/types";
import { CommentsCard } from "./Card";

interface Props {
  comments: Comment[];
}

export const CommentsList: React.FC<Props> = ({ comments }) => {
  console.log(comments);

  return (
    <Flex flexDirection="column">
      {comments.map((comment) => {
        return <CommentsCard key={comment.id} comment={comment} mb={2} />;
      })}
    </Flex>
  );
};
