import React from "react";

interface IButton {
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button: React.FC<IButton> = (props) => {
  return (
    <button
      className="bg-green w-3/6 h-12 absolute left-[77%] text-white font-bold rounded-lg"
      type={props.type || "button"}
    >
      {props.children}
    </button>
  );
};

export default Button;
