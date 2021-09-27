import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <path d="M35.314 45.0667L52.3704 26.7774L51.164 8.55437L32.9012 8.62058L15.8447 26.9099L10.0949 27.7525L6.99999 31.0712L31.779 54.1799L34.8739 50.8613L35.314 45.0667Z" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M14.0213 39.0672L12.0688 41.1608L12.8902 49.5948L21.3609 49.8266L23.3134 47.733" stroke="#B8C6D8" strokeWidth="3"/>
      <path d="M37.4199 23.7716C39.4896 25.7018 39.6027 28.9444 37.6725 31.014C35.7423 33.0837 32.4998 33.1968 30.4301 31.2667C28.3604 29.3365 28.2473 26.0939 30.1775 24.0243C32.1077 21.9546 35.3502 21.8415 37.4199 23.7716Z" stroke="#18BB97" strokeWidth="3"/>
    </Svg>
  );
};

export default Icon;