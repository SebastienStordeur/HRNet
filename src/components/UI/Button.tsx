import React from "react";

interface IButton {
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<IButton> = (props) => {
  return (
    <button
      className={`bg-blue h-10 px-4 text-white font-bold rounded-lg ${
        props.className || ""
      }`}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
