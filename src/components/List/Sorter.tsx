import React, { Dispatch, SetStateAction } from "react";

interface ISorter {
  setValue: Dispatch<SetStateAction<number>>;
}

const Sorter: React.FC<ISorter> = (props) => {
  const changeEntriesHandler = (event: any) => {
    props.setValue(JSON.parse(event.target.value));
  };
  return (
    <select name="show-employees" className="mx-2 cursor-pointer" onChange={changeEntriesHandler}>
      <option value="10">10</option>
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="100">100</option>
    </select>
  );
};

export default Sorter;
