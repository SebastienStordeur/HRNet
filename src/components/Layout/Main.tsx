import React from "react";

interface IMain {
  children: React.ReactNode;
}

const Main: React.FC<IMain> = (props) => {
  return <main id="main">{props.children}</main>;
};

export default Main;
