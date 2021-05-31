import { Image } from "@chakra-ui/image";
import { AspectRatio, Box, Flex, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { useTheme } from "@chakra-ui/system";
import { IconBookmark } from "@tabler/icons";
import { GetProjectQuery } from "../../graphql/types";
import { convertToRoundedPercentage } from "../../helpers/math";
import { Row } from "../table/Row";
import { SimpleTable } from "../table/SimpleTable";
import { AvatarDetails } from "../user/AvatarDetails";

interface Props {
  project: GetProjectQuery["getProject"];
  onBookmark: () => any;
  onRemoveBookmark: () => any;
}

export const ProjectDetails: React.FC<Props> = ({
  project,
  onBookmark,
  onRemoveBookmark,
}) => {
  const { name, description, target, amountFunded, backers, isBookmarked } =
    project!;

  const theme = useTheme();

  const percentFunded = convertToRoundedPercentage(amountFunded, target);

  return (
    <Box width="100%">
      <AspectRatio ratio={4 / 3} width="100%">
        <Image
          src="https://images.unsplash.com/photo-1617357284025-6d4e2dc08cf2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
          borderRadius="8px"
        />
      </AspectRatio>

      <Flex justifyContent="space-between" alignItems="center" my={3}>
        <Text fontSize="sm" color="brand" fontWeight={500}>
          {percentFunded}% Funded
        </Text>

        <div
          onClick={(e) => {
            e.stopPropagation();

            if (isBookmarked) {
              onRemoveBookmark();
            } else {
              onBookmark();
            }
          }}
        >
          {!isBookmarked ? (
            <IconBookmark
              size={24}
              fill={theme.colors.brand}
              color={theme.colors.brand}
            />
          ) : (
            <IconBookmark size={24} color={theme.colors.brand} />
          )}
        </div>
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
        <Row label="Funded" value={`$${amountFunded}`} />
        <Row label="Target" value={`$${target}`} />
        <Row label="Backers" value={backers} />
      </SimpleTable>
    </Box>
  );
};
