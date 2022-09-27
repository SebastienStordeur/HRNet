import React, { useState, useEffect } from "react";
import Main from "../components/Layout/Main";
import EmployeesList, { Employe } from "../components/List/EmployeesList";
import Search from "../components/List/Search";
import Sorter from "../components/List/Sorter";

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employe[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [numberPerPage, setNumberPerPage] = useState<number>(10);
  const storedEmployees: string | null = localStorage.getItem("employees");

  useEffect(() => {
    if (typeof storedEmployees === "string") {
      const data: Employe[] = JSON.parse(storedEmployees);
      const filteredData: Employe[] = data.filter(
        (employee: Employe) =>
          employee.firstName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setEmployees(filteredData);
    }
  }, [storedEmployees, searchValue]);

  return (
    <Main>
      <h2 className="uppercase font-bold text-center mt-10 text-3xl">
        Current employees
      </h2>
      <div className="flex justify-between w-full max-w-[1110px] mx-auto mt-8">
        <div>
          Show
          <Sorter setValue={setNumberPerPage} />
          entries
        </div>
        <Search value={searchValue} setValue={setSearchValue} />
      </div>
      <EmployeesList employees={employees} numberPerPage={numberPerPage} />
    </Main>
  );
};

export default Employees;
