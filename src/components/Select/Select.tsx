import React, { useState } from "react";
import Option from "./Option";

interface ISelect {
  data?: string[];
}

const Select: React.FC<ISelect> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeValue, setActiveValue] = useState<string>("");

  const openMenuHandler: () => void = () => {
    setIsMenuOpen((prevValue) => !prevValue);
  };

  const setActiveValueHandler: (value: string) => void = (value: string) => {
    setActiveValue(value);
  };

  return (
    <div id="select-wrapper" className="bg-white text-blue">
      <div>
        <label htmlFor="department">{activeValue ? activeValue : "Department"}</label>
        <ul className="h-10" onClick={openMenuHandler}>
          {isMenuOpen &&
            props.data?.map((value) => {
              return (
                <Option
                  value={value}
                  key={Math.random().toString()}
                  onClick={setActiveValueHandler}
                  activeValue={activeValue}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Select;
