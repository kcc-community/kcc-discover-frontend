import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <path d="M47 25.5C49.4853 25.5 51.5 27.5147 51.5 30C51.5 32.4853 49.4853 34.5 47 34.5C44.5147 34.5 42.5 32.4853 42.5 30C42.5 27.5147 44.5147 25.5 47 25.5Z" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M30 25.5C32.4853 25.5 34.5 27.5147 34.5 30C34.5 32.4853 32.4853 34.5 30 34.5C27.5147 34.5 25.5 32.4853 25.5 30C25.5 27.5147 27.5147 25.5 30 25.5Z" stroke="#18BB97" strokeWidth="3"/>
      <path d="M13 25.5C15.4853 25.5 17.5 27.5147 17.5 30C17.5 32.4853 15.4853 34.5 13 34.5C10.5147 34.5 8.5 32.4853 8.5 30C8.5 27.5147 10.5147 25.5 13 25.5Z" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M10 18V8H51" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M50 42L50 52L9 52" stroke="#B8C6D8" strokeWidth="3"/>
    </Svg>
  );
};

export default Icon;