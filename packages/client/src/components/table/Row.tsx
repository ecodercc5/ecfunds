import { Flex, Text } from "@chakra-ui/react";

interface Props {
  label: string;
  value: any;
}

export const Row: React.FC<Props> = ({ label, value }) => {
  return (
    <Flex
      className="simple-table-row"
      justifyContent="space-between"
      py={2}
      borderBottomWidth="1px"
      borderBottomColor="light-accent"
      borderBottomStyle="solid"
    >
      <Text fontSize="sm" fontWeight={500}>
        {label}
      </Text>
      <Text fontSize="sm" color="accent">
        {value}
      </Text>
    </Flex>
  );
};
