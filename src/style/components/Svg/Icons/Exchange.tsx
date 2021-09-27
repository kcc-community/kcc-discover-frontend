import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <path d="M7 2.5C10.0376 2.5 12.5 4.96243 12.5 8C12.5 11.0376 10.0376 13.5 7 13.5C3.96243 13.5 1.5 11.0376 1.5 8C1.5 4.96243 3.96243 2.5 7 2.5Z" stroke="#18BB97" strokeWidth="3"/>
      <path d="M41 36.5C44.0376 36.5 46.5 38.9624 46.5 42C46.5 45.0376 44.0376 47.5 41 47.5C37.9624 47.5 35.5 45.0376 35.5 42C35.5 38.9624 37.9624 36.5 41 36.5Z" stroke="#18BB97" strokeWidth="3"/>
      <path d="M21 49L27 38.25L4.00001 38.25L4 20" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M27 0.999999L21 11.75L44 11.75L44 30" stroke="#B8C6D8" strokeWidth="3"/>
    </Svg>
  );
};

export default Icon;