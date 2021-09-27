import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <path d="M19.9365 13.7178L18.3175 6.56425C22.0952 5.38761 33.125 3.45641 41.5238 7.16233M14 17.6992L25.3333 47H35.0476L48 5.59661C45.1217 9.63082 34.2921 17.6992 14 17.6992Z" stroke="#B8C6D8" strokeWidth="3"/>
      <rect x="19" y="47" width="22" height="7" stroke="#B8C6D8" strokeWidth="3"/>
      <rect x="29" y="23" width="3" height="15" fill="#18BB97"/>
    </Svg>
  );
};

export default Icon;