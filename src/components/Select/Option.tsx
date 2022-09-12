import React, { useState } from "react";

interface IOption {
  value: string;
  onClick?: any;
  activeValue: string;
}

const Option: React.FC<IOption> = (props) => {
  return (
    <li
      value={props.value}
      className={`border-solid border-2 border-blue hover:bg-blue hover:text-white cursor-pointer ${
        props.value === props.activeValue ? "bg-blue text-white" : "bg-white text-blue"
      }`}
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </li>
  );
};

export default Option;
