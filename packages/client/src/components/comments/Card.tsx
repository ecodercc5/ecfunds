import { Box, Flex, Text } from "@chakra-ui/react";
import { AvatarDetails } from "../user/AvatarDetails";

interface Props {}

export const CommentsCard: React.FC<Props> = () => {
  return (
    <Box
      maxWidth="400px"
      height="auto"
      p={4}
      borderColor="light-gray"
      borderStyle="solid"
      borderWidth="1px"
      borderRadius="1px"
    >
      <Flex alignItems="center" mb={2}>
        <AvatarDetails
          photoUrl="https://images.unsplash.com/photo-1617353318123-78b8edc20f82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
          name="Eric Chen"
          date="April 28, 2020"
        />
      </Flex>
      <Text fontSize="sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente non
        quasi blanditiis necessitatibus perspiciatis omnis.
      </Text>
    </Box>
  );
};
