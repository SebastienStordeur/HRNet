import React from "react";
import Input from "../UI/Input";

const Search: React.FC = () => {
  return (
    <Input
      id="search"
      name="search"
      className="w-96"
      value=""
      type="text"
      onChange={() => {}}
      placeholder="Search Employee"
    />
  );
};

export default Search;
