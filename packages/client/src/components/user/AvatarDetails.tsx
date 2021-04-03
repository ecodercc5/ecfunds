import { Box, Flex, Text, Image } from "@chakra-ui/react";

interface Props {
  photoUrl: string;
  name: string;
  date: string;
}

export const AvatarDetails: React.FC<Props> = ({ photoUrl, name, date }) => {
  return (
    <Flex alignItems="center" mb={2}>
      <Image boxSize="36px" src={photoUrl} borderRadius="full" mr={2} />

      <Box>
        <Text fontSize="xs" fontWeight={500}>
          {name}
        </Text>
        <Text color="accent" fontSize="xs">
          {date}
        </Text>
      </Box>
    </Flex>
  );
};
