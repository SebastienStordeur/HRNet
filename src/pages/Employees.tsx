import React, { useState, useEffect } from "react";
import Main from "../components/Layout/Main";
import EmployeesList from "../components/List/EmployeesList";
import Search from "../components/List/Search";
import Sorter from "../components/List/Sorter";

const Employees: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  console.log(searchValue);
  const stored = localStorage.getItem("employees");
  let data: any;
  useEffect(() => {
    if (typeof stored === "string") {
      data = JSON.parse(stored);
    }
  }, [stored, searchValue]);

  /*   if (data !== null) {
    console.log(
      data.filter((employee: any) => employee.firstname.includes(searchValue))
    );
  } */

  return (
    <Main>
      <h2 className="uppercase font-bold text-center mt-10 text-3xl">
        Current employees
      </h2>
      <div className="flex justify-between w-full max-w-[1110px] mx-auto mt-8">
        <div>
          Show
          <Sorter />
          entries
        </div>
        <Search value={searchValue} setValue={setSearchValue} />
      </div>
      <EmployeesList />
    </Main>
  );
};

export default Employees;
