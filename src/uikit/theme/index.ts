import { AlertTheme } from "../components/Alert/types";
import { PancakeToggleTheme } from "../components/PancakeToggle/types";
import { RadioTheme } from "../components/Radio/types";
import { ToggleTheme } from "../components/Toggle/types";
import { TooltipTheme } from "../components/Tooltip/types";
import { Colors, Breakpoints, MediaQueries, Spacing, Shadows, Radii, ZIndices } from "./types";

export interface KCCTheme {
  siteWidth: number;
  isDark: boolean;
  alert: AlertTheme;
  colors: Colors;
  pancakeToggle: PancakeToggleTheme;
  radio: RadioTheme;
  toggle: ToggleTheme;
  tooltip: TooltipTheme;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  spacing: Spacing;
  shadows: Shadows;
  radii: Radii;
  zIndices: ZIndices;
}

export { default as light } from "./light";

export { lightColors } from "./colors";
