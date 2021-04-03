import { extendTheme } from "@chakra-ui/react";

const baseChipStyles = {
  fontSize: "xs",
  px: 2,
  py: 1,
  borderRadius: "full",
  textTransform: "none",
  fontWeight: 600,
  cursor: "pointer",
};

export const theme = extendTheme({
  colors: {
    brand: "#64BF99",
    accent: "#A4A7B1",
    "light-accent": "#EAEAEA",
    text: "#212121",
  },
  components: {
    Badge: {
      variants: {
        "chip-selected": {
          bg: "#64BF99",
          color: "#fff",
          ...baseChipStyles,
        },
        "chip-unselected": {
          bg: "none",
          color: "#A4A7B1",
          ...baseChipStyles,
        },
      },
    },
  },
});
