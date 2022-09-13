import React from "react";

const Sorter: React.FC = () => {
  return (
    <select name="show-employees" className="mx-2 cursor-pointer">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  );
};

export default Sorter;
