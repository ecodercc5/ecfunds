import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useState } from "react";

interface Props {
  onCancel?: () => any;
  onAdd: (comment: string) => any;
}

export const AddComment: React.FC<Props> = ({ onCancel, onAdd }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <Box>
      <Textarea
        placeholder="Write your comment..."
        resize="none"
        value={comment}
        onChange={handleChange}
      />
      <ButtonGroup>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onAdd(comment)}>Add</Button>
      </ButtonGroup>
    </Box>
  );
};
