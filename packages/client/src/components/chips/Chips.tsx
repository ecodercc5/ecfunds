import React from "react";
import { Flex } from "@chakra-ui/react";

interface Props extends IChipsContext {}

export type ChipId = string | number | null;

interface IChipsContext {
  selected: ChipId;
  onSelect: (id: ChipId) => any;
}

const ChipsContext = React.createContext<IChipsContext>({
  selected: null,
  onSelect: () => {},
});

export const Chips: React.FC<Props> = ({ selected, onSelect, children }) => {
  const value = { selected, onSelect };

  return (
    <Flex>
      <ChipsContext.Provider value={value}>{children}</ChipsContext.Provider>
    </Flex>
  );
};

export const useChipsContext = () => React.useContext(ChipsContext);
