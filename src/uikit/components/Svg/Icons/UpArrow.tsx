import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 28 28" {...props}>
      <path d="M5.6001 23.8002L14.4001 17.2669L12.8001 11.5502L22.4001 4.2002M22.4001 4.2002H18.4001L20.8001 7.46686L22.4001 4.2002Z" stroke="#18BB97" strokeWidth="2.52"/>
    </Svg>
  );
}; 

export default Icon;
