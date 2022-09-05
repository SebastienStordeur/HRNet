import React from "react";
import Main from "../components/Layout/Main";
import EmployeesList from "../components/List/EmployeesList";
import Search from "../components/List/Search";
import Sorter from "../components/List/Sorter";

const Employees: React.FC = () => {
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
        <Search />
      </div>
      <EmployeesList />
    </Main>
  );
};

export default Employees;
