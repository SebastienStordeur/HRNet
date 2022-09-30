import React from "react";

interface IInputValidator {
  children: React.ReactNode;
  id?: string;
}

const InputValidator: React.FC<IInputValidator> = (props) => {
  return (
    <div className="flex flex-col mt-6" id={props.id}>
      {props.children}
    </div>
  );
};

export default InputValidator;
