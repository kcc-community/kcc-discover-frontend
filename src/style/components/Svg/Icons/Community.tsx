import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <path d="M40.8333 40.8333C43.8249 40.8333 46.25 38.4082 46.25 35.4167C46.25 32.4251 43.8249 30 40.8333 30C37.8418 30 35.4167 32.4251 35.4167 35.4167C35.4167 38.4082 37.8418 40.8333 40.8333 40.8333Z" stroke="#B8C6D8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 19.1666C32.9916 19.1666 35.4167 16.7415 35.4167 13.7499C35.4167 10.7584 32.9916 8.33325 30 8.33325C27.0085 8.33325 24.5833 10.7584 24.5833 13.7499C24.5833 16.7415 27.0085 19.1666 30 19.1666Z" stroke="#B8C6D8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 51.6666C30 45.6836 25.1497 40.8333 19.1667 40.8333C13.1836 40.8333 8.33334 45.6836 8.33334 51.6666" stroke="#18BB97" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M51.6667 51.6666C51.6667 45.6836 46.8164 40.8333 40.8333 40.8333C34.8503 40.8333 30 45.6836 30 51.6666" stroke="#B8C6D8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40.8333 30.0001C40.8333 24.017 35.983 19.1667 30 19.1667C24.017 19.1667 19.1667 24.017 19.1667 30.0001" stroke="#B8C6D8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.1667 40.8333C22.1582 40.8333 24.5833 38.4082 24.5833 35.4167C24.5833 32.4251 22.1582 30 19.1667 30C16.1751 30 13.75 32.4251 13.75 35.4167C13.75 38.4082 16.1751 40.8333 19.1667 40.8333Z" stroke="#18BB97" strokeWidth="3"/>
    </Svg>
  );
};

export default Icon;