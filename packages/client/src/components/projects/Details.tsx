import { Image } from "@chakra-ui/image";
import { AspectRatio, Badge, Box, Flex, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { GetProjectQuery } from "../../graphql/types";
import { convertToRoundedPercentage } from "../../helpers/math";
import { toCamelCase } from "../../helpers/text";
import { Row } from "../table/Row";
import { SimpleTable } from "../table/SimpleTable";
import { AvatarDetails } from "../user/AvatarDetails";

interface Props {
  project: GetProjectQuery["getProject"];
}

export const ProjectDetails: React.FC<Props> = ({ project }) => {
  const { name, description, tag, target, amountFunded, backers } = project!;

  const percentFunded = convertToRoundedPercentage(amountFunded, target);
  const tagText = toCamelCase(tag);

  return (
    <Box width="100%">
      <AspectRatio ratio={4 / 3} width="100%">
        <Image
          src="https://images.unsplash.com/photo-1617357284025-6d4e2dc08cf2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
          borderRadius="8px"
        />
      </AspectRatio>

      <Flex justifyContent="space-between" alignItems="center" my={3}>
        <Badge variant="tag">{tagText}</Badge>
        <Text fontSize="sm" color="brand" fontWeight={500}>
          {percentFunded}% Funded
        </Text>
      </Flex>

      <Text as="h1" fontWeight={600} fontSize="lg" mb={2}>
        {name}
      </Text>

      <AvatarDetails
        photoUrl="https://images.unsplash.com/photo-1617353318123-78b8edc20f82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
        name="Eric Chen"
        date="April 28, 2020"
      />

      <Text color="accent" fontSize="sm" lineHeight="24px">
        {description}
      </Text>

      <Box my={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Text color="brand" fontSize="sm" fontWeight={500}>
            ${amountFunded} Funded
          </Text>
          <Text color="brand" fontSize="sm" fontWeight={500}>
            {percentFunded}%
          </Text>
        </Flex>
        <Progress
          colorScheme="green"
          size="sm"
          value={percentFunded}
          borderRadius="full"
        />
      </Box>

      <SimpleTable>
        <Row label="Target" value={`$${target}`} />
        <Row label="Target" value="$1000" />
        <Row label="Backers" value={backers} />
      </SimpleTable>
    </Box>
  );
};
