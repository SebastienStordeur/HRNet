import React from "react";

interface IInputValidator {
  children: React.ReactNode;
}

const InputValidator: React.FC<IInputValidator> = (props) => {
  return <div className="flex flex-col mt-6">{props.children}</div>;
};

export default InputValidator;
