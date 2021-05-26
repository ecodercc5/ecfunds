import React from "react";
import { Badge, Box, Image, Text, Flex, Progress } from "@chakra-ui/react";
import { GetProjectsQuery } from "../../graphql/types";
import { convertToRoundedPercentage } from "../../helpers/math";
import { useHover } from "../../hooks/hover";

export type Project = GetProjectsQuery["getProjects"][number];

interface Props {
  project: Project;
  onBookmark?: (project: Project) => any;
  onRemoveBookmark?: (project: Project) => any;
}

export const ProjectCard: React.FC<Props> = ({
  project,
  onBookmark = () => {},
  onRemoveBookmark = () => {},
}) => {
  const { name, target, isBookmarked, amountFunded } = project;

  const [ref, isHovered] = useHover();

  const percentFunded = convertToRoundedPercentage(amountFunded, target);

  return (
    <Box ref={ref} maxWidth={350} borderRadius="4px">
      <Box position="relative">
        <Image
          src="https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80"
          borderRadius="4px 4px 0 0"
        />

        {isHovered && (
          <div
            onClick={() => {
              if (isBookmarked) {
                onRemoveBookmark(project);
              } else {
                onBookmark(project);
              }
            }}
          >
            isBookmarked: {isBookmarked ? "true" : "false"}
          </div>
        )}
      </Box>

      <Box p={3} bg="white" borderRadius="0 0 4px 4px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="p" color="#64BF99" fontSize="sm">
            {percentFunded}% Funded
          </Text>
        </Flex>

        <Box mt={2} mb={3}>
          <Text as="h2" color="#212121" fontSize="lg" fontWeight={600}>
            {name}
          </Text>
          <Text as="p" color="#A4A7B1" fontSize="sm">
            By Eric Chen
          </Text>
        </Box>

        <Box>
          <Progress
            colorScheme="green"
            size="sm"
            value={percentFunded}
            borderRadius="full"
          />

          <Flex justifyContent="space-between" mt={1}>
            <Text as="p" color="#64BF99" fontSize="sm">
              ${amountFunded} Funded
            </Text>
            <Text as="p" color="#A4A7B1" fontSize="sm">
              Target: ${target}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
