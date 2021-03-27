import React from "react";
import { Badge, Box, Image, Text, Flex, Progress } from "@chakra-ui/react";

interface Props {}

export const ProjectCard: React.FC<Props> = () => {
  return (
    <Box maxWidth={350} borderRadius="4px">
      <Image
        src="https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80"
        borderRadius="4px 4px 0 0"
      />

      <Box p={3} bg="white" borderRadius="0 0 4px 4px">
        <Flex justifyContent="space-between" alignItems="center">
          <Badge colorScheme="green">Tech</Badge>
          <Text as="p" color="#64BF99" fontSize="sm">
            25% Funded
          </Text>
        </Flex>

        <Box mt={2} mb={3}>
          <Text as="h2" color="#212121" fontSize="lg" fontWeight={600}>
            Cool Camera
          </Text>
          <Text as="p" color="#A4A7B1" fontSize="sm">
            By Eric Chen
          </Text>
        </Box>

        <Box>
          <Progress
            colorScheme="green"
            value={25}
            size="sm"
            borderRadius="999px"
          />

          <Flex justifyContent="space-between" mt={1}>
            <Text as="p" color="#64BF99" fontSize="sm">
              $100 Funded
            </Text>
            <Text as="p" color="#A4A7B1" fontSize="sm">
              Target: $1000
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
