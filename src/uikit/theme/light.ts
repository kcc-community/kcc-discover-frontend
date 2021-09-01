import { DefaultTheme } from "styled-components";
import { light as lightAlert } from "../components/Alert/theme";
import { light as lightRadio } from "../components/Radio/theme";
import { light as lightToggle } from "../components/Toggle/theme";
import { light as lightTooltip } from "../components/Tooltip/theme";
import { light as lightPancakeToggle } from "../components/PancakeToggle/theme";
import base from "./base";
import { lightColors } from "./colors";

const lightTheme: DefaultTheme = {
  ...base,
  isDark: false,
  alert: lightAlert,
  colors: lightColors,
  toggle: lightToggle,
  radio: lightRadio,
  tooltip: lightTooltip,
  pancakeToggle: lightPancakeToggle,
};

export default lightTheme;
