import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header id="header" className="flex items-center w-full h-16 px-8 bg-blue">
      <Link to="/">
        <h1 className="font-bold text-4xl text-white">HRnet</h1>
      </Link>
    </header>
  );
};

export default Header;
