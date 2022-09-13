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
    <div
      id="select-wrapper"
      className="bg-white text-blue rounded font-semibold cursor-pointer relative"
    >
      <div>
        <ul className="h-8 py-1 px-4" onClick={openMenuHandler}>
          <label htmlFor="department">
            {activeValue ? activeValue : "Department"}
          </label>
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
