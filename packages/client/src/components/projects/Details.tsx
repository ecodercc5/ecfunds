import { Image } from "@chakra-ui/image";
import { AspectRatio, Badge, Box, Flex, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { Row } from "../table/Row";
import { SimpleTable } from "../table/SimpleTable";
import { AvatarDetails } from "../user/AvatarDetails";

interface Props {}

export const ProjectDetails: React.FC<Props> = () => {
  return (
    <Box width="100%">
      <AspectRatio ratio={4 / 3} width="100%">
        <Image
          src="https://images.unsplash.com/photo-1617357284025-6d4e2dc08cf2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
          borderRadius="8px"
        />
      </AspectRatio>

      <Flex justifyContent="space-between" alignItems="center" my={3}>
        <Badge variant="tag">Tech</Badge>
        <Text fontSize="sm" color="brand" fontWeight={500}>
          25% Funded
        </Text>
      </Flex>

      <AvatarDetails
        photoUrl="https://images.unsplash.com/photo-1617353318123-78b8edc20f82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
        name="Eric Chen"
        date="April 28, 2020"
      />

      <Text color="accent" fontSize="sm" lineHeight="24px">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex tenetur
        magnam dolorem rem soluta! Magni officiis repudiandae nemo velit
        recusandae distinctio quam corporis, quod impedit repellendus autem,
        nam, id quo!
      </Text>

      <Box my={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Text color="brand" fontSize="sm" fontWeight={500}>
            $100 Funded
          </Text>
          <Text color="brand" fontSize="sm" fontWeight={500}>
            25%
          </Text>
        </Flex>
        <Progress
          colorScheme="green"
          size="sm"
          value={25}
          borderRadius="full"
        />
      </Box>

      <SimpleTable>
        <Row label="Target" value="$1000" />
        <Row label="Target" value="$1000" />
        <Row label="Target" value="$1000" />
      </SimpleTable>
    </Box>
  );
};
