import React, { useState, useEffect, useContext } from "react";
import Main from "../components/Layout/Main";
import EmployeesList, { Employe } from "../components/List/EmployeesList";
import Search from "../components/List/Search";
import Sorter from "../components/List/Sorter";
import EmployeeContext from "../store/EmployeeContext";

const Employees: React.FC = () => {
  const employeeContext = useContext(EmployeeContext);
  const employeesArray = employeeContext.employees;
  const [employees, setEmployees] = useState<Employe[]>(employeesArray);
  const [searchValue, setSearchValue] = useState<string>("");
  const [numberPerPage, setNumberPerPage] = useState<number>(10);

  useEffect(() => {
    const filteredData: Employe[] = employeesArray.filter(
      (employee: Employe) =>
        employee.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setEmployees(filteredData);
  }, [employeesArray, searchValue]);

  return (
    <Main>
      <h2 className="uppercase font-bold text-center mt-10 text-3xl">
        Current employees
      </h2>
      <div className="px-4  flex flex-col md:flex-row md:justify-between w-full max-w-[1110px] mx-auto mt-8">
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
