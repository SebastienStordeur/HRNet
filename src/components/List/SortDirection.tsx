import React from "react";
import ArrowUp from "../../assets/Arrow_Up.svg";
import ArrowDown from "../../assets/Arrow_Down.svg";

const SortDirection: React.FC = (props) => {
  return (
    <div className="flex flex-col w-3 ml-1">
      <img src={ArrowUp} alt="" className="" />
      <img src={ArrowDown} alt="" />
    </div>
  );
};

export default SortDirection;
