import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  theme: {
    colors: {
      blue: colors.blue,
      black: colors.black,
      purple: colors.purple,
      gray: colors.gray,
      green: colors.green,
      emerald: colors.emerald,
      white: colors.white,
      yellow: colors.yellow,
      blueGray: colors.blueGray,
      transparent: "transparent",
    },
  },
} as Options;
