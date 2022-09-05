import React from "react";

interface ILabel {
  children: React.ReactNode;
  htmlFor: string;
}

const Label: React.FC<ILabel> = (props) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className="flex flex-col text-white font-medium"
    >
      {props.children}
    </label>
  );
};

export default Label;
