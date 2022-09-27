import React from "react";
import ArrowUp from "../../assets/Arrow_Up.svg";
import ArrowDown from "../../assets/Arrow_Down.svg";

interface ISortdirection {
  state: null | boolean;
}

const SortDirection: React.FC<ISortdirection> = (props) => {
  return (
    <div className="flex flex-col w-3 ml-1">
      <img src={ArrowUp} alt="" className={props.state ? "arrow-active" : ""} />
      <img
        src={ArrowDown}
        alt=""
        className={props.state === false ? "arrow-active" : ""}
      />
    </div>
  );
};

export default SortDirection;
