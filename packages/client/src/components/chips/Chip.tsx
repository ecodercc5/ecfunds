import React from "react";
import { Badge } from "@chakra-ui/layout";
import { ChipId, useChipsContext } from "./Chips";

interface Props {
  id: ChipId;
}

export const Chip: React.FC<Props> = ({ id, children }) => {
  const { selected, onSelect } = useChipsContext();

  const active = id === selected;
  const chipStyle = active ? "selected" : "unselected";
  const chipVariant = `chip-${chipStyle}`;

  return (
    <Badge variant={chipVariant} onClick={() => onSelect(id)}>
      {children}
    </Badge>
  );
};
