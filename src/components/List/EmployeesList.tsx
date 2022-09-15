import React, { useState, useEffect } from "react";
import Employee from "./Employee";

type Employe = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

interface IEmployee {
  employees: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    startDate: string;
    department: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }[];
  numberPerPage: any;
}

const EmployeesList: React.FC<IEmployee> = (props) => {
  console.log("nb / page", props.numberPerPage);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [sortedEmployees, setSortedEmployees] = useState<Employe[]>(props.employees);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setNumberOfPages(Math.ceil(props.employees.length / props.numberPerPage));
  }, [props]);

  const nextPageHandler = () => {
    setCurrentPage((prevValue) => prevValue + 1);
  };

  const previousPageHandler = () => {
    setCurrentPage((prevValue) => prevValue - 1);
  };

  const sortAlphabetically = (value: string) => {
    console.log(value);
    if (!isSorted) {
      setSortedEmployees(
        props.employees.sort((a: any, b: any) => {
          return a[value] > b[value] ? 1 : -1;
        })
      );
      setIsSorted(true);
    } else {
      setSortedEmployees(
        props.employees.sort((a: any, b: any) => {
          return a[value] > b[value] ? -1 : 1;
        })
      );
      setIsSorted(false);
    }
    console.log(sortedEmployees);
  };

  const sortNumbers = () => {
    if (!isSorted) {
      setSortedEmployees(
        props.employees.sort((a: any, b: any) => {
          return a.zipCode - b.zipCode;
        })
      );
      setIsSorted(true);
    } else {
      setSortedEmployees(
        props.employees.sort((a: any, b: any) => {
          return b.zipCode - a.zipCode;
        })
      );
      setIsSorted(false);
    }

    console.log(sortedEmployees);
  };

  return (
    <section id="employee-list" className="max-w-[1110px] mx-auto mt-5 ">
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-9 text-white w-full bg-blue h-10 font-medium text-center py-1.5">
            <th onClick={() => sortAlphabetically("firstName")}>First Name</th>
            <th onClick={() => sortAlphabetically("lastName")}>Last Name</th>
            <th>Start Date</th>
            <th onClick={() => sortAlphabetically("department")}>Department</th>
            <th>Date of Birth</th>
            <th onClick={() => sortAlphabetically("street")}>Street</th>
            <th onClick={() => sortAlphabetically("city")}>City</th>
            <th onClick={() => sortAlphabetically("state")}>State</th>
            <th onClick={sortNumbers}>Zip Code</th>
          </tr>
        </thead>
        <tbody className="w-full mt-10">
          {props.employees
            .slice(0 + props.numberPerPage * (currentPage - 1), props.numberPerPage * currentPage)
            .map((employee: Employe) => {
              return <Employee key={Math.random().toString()} employee={employee} />;
            })}
        </tbody>
      </table>
      <div className="flex justify-between">
        <p>
          Showing {1 + props.numberPerPage * (currentPage - 1)} to
          {props.numberPerPage <= props.employees.length && <span>{props.numberPerPage * currentPage}</span>}
          {props.numberPerPage > props.employees.length && <span>{props.employees.length}</span>}
          of {props.employees.length}
        </p>
        <div>
          {currentPage - 1 !== 0 && <button onClick={previousPageHandler}>Previous</button>}
          <span className="mx-4">{currentPage}</span>
          {currentPage + 1 <= numberOfPages && <button onClick={nextPageHandler}>Next</button>}
        </div>
      </div>
    </section>
  );
};

export default EmployeesList;
