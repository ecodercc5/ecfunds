import { Image } from "@chakra-ui/image";
import { AspectRatio, Box, Flex, Text } from "@chakra-ui/layout";
import { AvatarDetails } from "../user/AvatarDetails";

interface Props {}

export const ProjectDetails: React.FC<Props> = () => {
  return (
    <Box width="100%">
      <AspectRatio ratio={4 / 3} width="100%" mb={4}>
        <Image
          src="https://images.unsplash.com/photo-1617357284025-6d4e2dc08cf2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
          borderRadius="8px"
        />
      </AspectRatio>
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

      <Box></Box>

      <Box>
        <Flex>
          <Text>Target</Text>
          <Text>$1000</Text>
        </Flex>
        <Flex>
          <Text>Target</Text>
          <Text>$1000</Text>
        </Flex>
        <Flex>
          <Text>Target</Text>
          <Text>$1000</Text>
        </Flex>
      </Box>
    </Box>
  );
};
