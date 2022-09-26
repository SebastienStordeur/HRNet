import React, { useState, useEffect } from "react";
import Employee from "./Employee";
import SortDirection from "./SortDirection";
import HeadTable from "./SortDirection";

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
  employees: Employe[];
  numberPerPage: number;
}

const EmployeesList: React.FC<IEmployee> = (props) => {
  const initialState = {
    firstName: null,
    lastName: null,
    startDate: null,
    department: null,
    birthDate: null,
    street: null,
    city: null,
    state: null,
    zipCode: null,
  };

  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [sortStates, setSortStates] = useState<any>(initialState);

  useEffect(() => {
    setNumberOfPages(Math.ceil(props.employees.length / props.numberPerPage));
    setCurrentPage(1);
  }, [props]);

  const nextPageHandler = () => {
    setCurrentPage((prevValue) => prevValue + 1);
  };

  const previousPageHandler = () => {
    setCurrentPage((prevValue) => prevValue - 1);
  };

  const sortAlphabetically = (value: string) => {
    props.employees.sort((a: any, b: any) =>
      sortStates[value]
        ? a[value] > b[value]
          ? -1
          : 1
        : a[value] > b[value]
        ? 1
        : -1
    );
    /* setIsSorted((prevValue) => !prevValue); */
    sortStates[value] === null || sortStates[value] === false
      ? setSortStates({ firstName: true })
      : setSortStates({ firstName: false });
  };

  const sortNumbers = () => {
    props.employees.sort((a: any, b: any) =>
      isSorted ? b.zipCode - a.zipCode : a.zipCode - b.zipCode
    );
    setIsSorted((prevValue) => !prevValue);
  };

  const sortDates = (value: string) => {
    props.employees.sort((a: any, b: any) =>
      isSorted
        ? +new Date(a[value]) - +new Date(b[value])
        : +new Date(b[value]) - +new Date(a[value])
    );
    setIsSorted((prevValue) => !prevValue);
  };

  const employeesSlice = props.employees.slice(
    0 + props.numberPerPage * (currentPage - 1),
    props.numberPerPage * currentPage
  );

  return (
    <section id="employee-list" className="max-w-[1110px] mx-auto mt-5 ">
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-9 text-white w-full bg-blue h-10 font-small text-center text-sm py-2.5 cursor-pointer">
            <th
              className="flex justify-center"
              onClick={() => sortAlphabetically("firstName")}
            >
              First Name <SortDirection />
            </th>
            <th
              className="flex justify-center"
              onClick={() => sortAlphabetically("lastName")}
            >
              Last Name <SortDirection />
            </th>
            <th
              className="flex justify-center"
              onClick={() => sortDates("startDate")}
            >
              Start Date <SortDirection />
            </th>
            <th
              className="flex justify-center"
              onClick={() => sortAlphabetically("department")}
            >
              Department <SortDirection />
            </th>
            <th
              className="flex justify-center"
              onClick={() => sortDates("dateOfBirth")}
            >
              Date of Birth <SortDirection />
            </th>
            <th
              className="flex justify-center"
              onClick={() => sortAlphabetically("street")}
            >
              Street <SortDirection />
            </th>
            <th
              className="flex justify-center"
              onClick={() => sortAlphabetically("city")}
            >
              City <SortDirection />
            </th>
            <th
              className="flex justify-center"
              onClick={() => sortAlphabetically("state")}
            >
              State <SortDirection />
            </th>
            <th className="flex justify-center" onClick={sortNumbers}>
              Zip Code <SortDirection />
            </th>
          </tr>
        </thead>
        <tbody className="w-full mt-10">
          {props.employees
            .slice(
              0 + props.numberPerPage * (currentPage - 1),
              props.numberPerPage * currentPage
            )
            .map((employee: Employe) => {
              return (
                <Employee key={Math.random().toString()} employee={employee} />
              );
            })}
        </tbody>
      </table>
      <div className="flex justify-between">
        <p>
          Showing {1 + props.numberPerPage * (currentPage - 1)} to
          {props.numberPerPage <= props.employees.length && (
            <span>
              &nbsp;
              {employeesSlice.length === props.numberPerPage
                ? props.numberPerPage * currentPage
                : 1 +
                  props.numberPerPage * (currentPage - 1) +
                  employeesSlice.length -
                  1}
            </span>
          )}
          {props.numberPerPage > props.employees.length && (
            <span> &nbsp; {props.employees.length}</span>
          )}
          &nbsp;of {props.employees.length}
        </p>
        <div>
          {currentPage - 1 !== 0 && (
            <button onClick={previousPageHandler}>Previous</button>
          )}
          <span className="mx-4">{currentPage}</span>
          {currentPage + 1 <= numberOfPages && (
            <button onClick={nextPageHandler}>Next</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmployeesList;
