import { Colors } from "./types";

export interface KCCTheme {
  siteWidth: number;
  isDark: boolean;
  colors: Colors;
}

export { default as light } from "./light";

export { lightColors } from "./colors";
