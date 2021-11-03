import { Colors, MediaQueries } from "./types";

export interface KCCTheme {
  siteWidth: number;
  isDark: boolean;
  colors: Colors;
  mediaQueries: MediaQueries;
}

export { default as light } from "./light";

export { lightColors } from "./colors";
