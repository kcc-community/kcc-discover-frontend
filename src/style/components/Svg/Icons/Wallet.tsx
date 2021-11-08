import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <path d="M57 2H3V56H57V2Z" fill="white" fillOpacity="0.01"/>
      <path d="M44.625 39H52V28H44.625C41.5184 28 39 30.4625 39 33.5C39 36.5375 41.5184 39 44.625 39Z" stroke="#18BB97" strokeWidth="3"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M23.2299 15.465L38.7578 6.5L43.9467 15.4875L23.2299 15.465Z" stroke="#B8C6D8" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M8 18.1875C8 16.9793 8.98497 16 10.2 16H49.8C51.0151 16 52 16.9793 52 18.1875V48.8125C52 50.0207 51.0151 51 49.8 51H10.2C8.98497 51 8 50.0207 8 48.8125V18.1875Z" stroke="#B8C6D8" strokeWidth="3"/>
    </Svg>
  );
};

export default Icon;