import React from "react";

interface IInput {
  id: string;
  className?: string;
  value: string | number;
  name: string;
  type: string;
  onChange: () => void;
  onBlur: () => void;
  placeholder?: string;
}

const Input: React.FC<IInput> = (props) => {
  return (
    <input
      id={props.id}
      type={props.type}
      className={`h-10 w-full rounded-lg px-8 placeholder:text-blue`}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
