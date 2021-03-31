import { useState } from "react";
import { Chips, Chip } from "../components/chips";

export const Components = () => {
  const [selected, setSelected] = useState<any>("1");

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <div>
        <Chips selected={selected} onSelect={setSelected}>
          <Chip id="1">Hello</Chip>
          <Chip id="2">Bye</Chip>
          <Chip id="3">Afternoon</Chip>
        </Chips>
      </div>
    </div>
  );
};
