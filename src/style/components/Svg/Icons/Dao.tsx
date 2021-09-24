import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <path d="M12.6667 45.25L30 55L40.6667 49L47.3333 45.25" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M51.3333 39V19L34.6667 9.625" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M25.3333 9.625L8.66666 19V39" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M30 23.5334V11.8" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M36.4 34.2L47.0667 40.5999" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M23.6 34.2L12.9333 40.5999" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M30 12.3333C32.2091 12.3333 34 10.5424 34 8.33325C34 6.12411 32.2091 4.33325 30 4.33325C27.7909 4.33325 26 6.12411 26 8.33325C26 10.5424 27.7909 12.3333 30 12.3333Z" stroke="#B8C6D8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.66666 47C10.8758 47 12.6667 45.2091 12.6667 43C12.6667 40.7909 10.8758 39 8.66666 39C6.45753 39 4.66666 40.7909 4.66666 43C4.66666 45.2091 6.45753 47 8.66666 47Z" stroke="#B8C6D8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M51.3333 47C53.5425 47 55.3333 45.2091 55.3333 43C55.3333 40.7909 53.5425 39 51.3333 39C49.1242 39 47.3333 40.7909 47.3333 43C47.3333 45.2091 49.1242 47 51.3333 47Z" stroke="#B8C6D8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.5 31.0001V27.195L26.7558 25.2957L30 23.4033L33.2442 25.2957L36.5 27.195V31.0001V34.8052L33.2442 36.7044L30 38.5969L26.7558 36.7044L23.5 34.8052V31.0001Z" stroke="#18BB97" strokeWidth="3"/>
    </Svg>
  );
};

export default Icon;