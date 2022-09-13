import React, { Dispatch, SetStateAction } from "react";
import Input from "../UI/Input";

interface ISearch {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<ISearch> = (props) => {
  const searchValueChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  return (
    <Input
      id="search"
      name="search"
      className="w-96"
      type="text"
      value={props.value}
      onChange={searchValueChangeHandler}
      placeholder="Search Employee"
    />
  );
};

export default Search;
