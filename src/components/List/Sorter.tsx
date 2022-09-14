import React, { Dispatch, SetStateAction } from "react";

interface ISorter {
  setValue: any;
}

const Sorter: React.FC<ISorter> = (props) => {
  console.log(props);

  const changeEntriesHandler = (event: any) => {
    props.setValue(/* event.target.value */ 1);
  };
  return (
    <select name="show-employees" className="mx-2 cursor-pointer" onChange={changeEntriesHandler}>
      <option value="10">10</option>
      <option value="25" onClick={() => props.setValue("10")}>
        25
      </option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  );
};

export default Sorter;
