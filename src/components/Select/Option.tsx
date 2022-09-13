import React from "react";

interface IOption {
  value: string;
  onClick?: any;
  activeValue: string;
}

const Option: React.FC<IOption> = (props) => {
  return (
    <li
      value={props.value}
      className={`px-4 py-1 w-full h-8 border-solid border-[1px] border-blue hover:bg-blue hover:text-white cursor-pointer ${
        props.value === props.activeValue
          ? "bg-blue text-white"
          : "bg-white text-blue"
      }`}
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </li>
  );
};

export default Option;
