import "styled-components";
import { KCCTheme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends KCCTheme {}
}
