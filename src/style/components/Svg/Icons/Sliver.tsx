import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 28 35" {...props}>
      <mask id="mask0" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="6" y="21" width="16" height="14">
      <path d="M6 21H22V35L14 31.255L6 35V21Z" fill="#C4C4C4"/>
      </mask>
      <g mask="url(#mask0)">
      <path d="M6 21H22V35L14 31.255L6 35V21Z" fill="#4690FF"/>
      <rect x="11" y="19" width="6" height="16" fill="#FCD23B"/>
      </g>
      <circle cx="14" cy="14" r="14" fill="#E0DFDF"/>
      <circle cx="14" cy="14" r="10" stroke="#B5B5B5" strokeWidth="2"/>
      <circle cx="14" cy="14" r="9" fill="#E0DFDF"/>
      <path d="M14 9L15.7927 11.5325L18.7553 12.4549L16.9007 14.9425L16.9389 18.0451L14 17.05L11.0611 18.0451L11.0993 14.9425L9.24472 12.4549L12.2073 11.5325L14 9Z" fill="#AAAAAA"/>
      <defs>
      <linearGradient id="paint0_linear" x1="5.5" y1="3" x2="23" y2="25.5" gradientUnits="userSpaceOnUse">
      <stop stopColor="#D2D2D2"/>
      <stop offset="1" stopColor="#FBFBFB"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="13.1667" y1="9.41667" x2="17.3333" y2="16.9167" gradientUnits="userSpaceOnUse">
      <stop stopColor="#AAAAAA"/>
      <stop offset="1" stopColor="#A2A2A2"/>
      </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;

