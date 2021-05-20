import { Box, Text, BoxProps } from "@chakra-ui/layout";
import { CommentsList } from "./List";
import { Comment } from "../../graphql/types";
import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { AddComment } from "./AddComment";

interface Props extends BoxProps {
  comments: Comment[];
  onAddComment: (comment: string) => any;
}

export const CommentsSection: React.FC<Props> = ({
  comments,
  onAddComment,
  ...props
}) => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  return (
    <Box {...props}>
      <Text as="h2" fontWeight={500} mb={3}>
        Comments
      </Text>

      <CommentsList comments={comments} />

      {isAddingComment ? (
        <AddComment
          onAdd={(comment) => {
            console.log(comment);
            onAddComment(comment);
            setIsAddingComment(false);
          }}
          onCancel={() => setIsAddingComment(false)}
        />
      ) : (
        <Button onClick={() => setIsAddingComment(true)}>Add Comment</Button>
      )}
    </Box>
  );
};
