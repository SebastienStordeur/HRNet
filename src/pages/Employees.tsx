import React, { useState, useEffect } from "react";
import Main from "../components/Layout/Main";
import EmployeesList from "../components/List/EmployeesList";
import Search from "../components/List/Search";
import Sorter from "../components/List/Sorter";

type Employee = {
  firstName : string,
  lastName: string,
  dateOfBirth: string,
  startDate: string,
  department: string,
  street: string,
  city: string,
  state: string,
  zipCode: string
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [numberPerPage, setNumberPerPage] = useState<number>(1);
  const storedEmployees = localStorage.getItem("employees");

  useEffect(() => {
    if (typeof storedEmployees === "string") {
      const data = JSON.parse(storedEmployees);
      const filteredData = data.filter(
        (employee: Employee) =>
          employee.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setEmployees(filteredData);
    }
  }, [storedEmployees, searchValue]);

  return (
    <Main>
      <h2 className="uppercase font-bold text-center mt-10 text-3xl">Current employees</h2>
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
