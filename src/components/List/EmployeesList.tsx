import React, { useState, useEffect } from "react";
import Employee from "./Employee";
import SortDirection from "./SortDirection";

export type Employe = {
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
    dateOfBirth: null,
    street: null,
    city: null,
    state: null,
    zipCode: null,
  };

  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [sortStates, setSortStates] = useState<any>(initialState);

  useEffect(() => {
    setNumberOfPages(Math.ceil(props.employees.length / props.numberPerPage));
    setCurrentPage(1);
  }, [props]);

  const nextPageHandler: () => void = () => {
    setCurrentPage((prevValue) => prevValue + 1);
  };

  const previousPageHandler: () => void = () => {
    setCurrentPage((prevValue) => prevValue - 1);
  };

  const sortAlphabetically: (value: string) => void = (value: string) => {
    props.employees.sort((a: any, b: any) =>
      sortStates[value]
        ? a[value] > b[value]
          ? -1
          : 1
        : a[value] > b[value]
        ? 1
        : -1
    );
    sortStates[value] === null || sortStates[value] === false
      ? setSortStates({ ...initialState, [value]: true })
      : setSortStates({ ...initialState, [value]: false });
  };

  const sortNumbers = (value: string) => {
    props.employees.sort((a: Employe, b: Employe) =>
      sortStates[value] ? +b.zipCode - +a.zipCode : +a.zipCode - +b.zipCode
    );
    sortStates[value] === null || sortStates[value] === false
      ? setSortStates({ ...initialState, [value]: true })
      : setSortStates({ ...initialState, [value]: false });
  };

  const sortDates: (value: string) => void = (value: string) => {
    props.employees.sort((a: any, b: any) =>
      sortStates[value]
        ? +new Date(a[value]) - +new Date(b[value])
        : +new Date(b[value]) - +new Date(a[value])
    );
    sortStates[value] === null || sortStates[value] === false
      ? setSortStates({ ...initialState, [value]: true })
      : setSortStates({ ...initialState, [value]: false });
  };

  const employeesSlice: Employe[] = props.employees.slice(
    0 + props.numberPerPage * (currentPage - 1),
    props.numberPerPage * currentPage
  );

  return (
    <section
      id="employee-list"
      className="max-w-[1110px] mx-4 mt-5 lg:mx-auto overflow-auto"
    >
      {props.employees.length > 0 ? (
        <React.Fragment>
          <table className="min-w-[1100px] overflow-auto">
            <thead>
              <tr className="grid grid-cols-9 text-white w-full bg-blue h-10 font-small text-center text-sm py-2.5 cursor-pointer">
                <th
                  className="flex justify-center"
                  onClick={() => sortAlphabetically("firstName")}
                >
                  First Name <SortDirection state={sortStates.firstName} />
                </th>
                <th
                  className="flex justify-center"
                  onClick={() => sortAlphabetically("lastName")}
                >
                  Last Name <SortDirection state={sortStates.lastName} />
                </th>
                <th
                  className="flex justify-center"
                  onClick={() => sortDates("startDate")}
                >
                  Start Date <SortDirection state={sortStates.startDate} />
                </th>
                <th
                  className="flex justify-center"
                  onClick={() => sortAlphabetically("department")}
                >
                  Department <SortDirection state={sortStates.department} />
                </th>
                <th
                  className="flex justify-center"
                  onClick={() => sortDates("dateOfBirth")}
                >
                  Date of Birth <SortDirection state={sortStates.dateOfBirth} />
                </th>
                <th
                  className="flex justify-center"
                  onClick={() => sortAlphabetically("street")}
                >
                  Street <SortDirection state={sortStates.street} />
                </th>
                <th
                  className="flex justify-center"
                  onClick={() => sortAlphabetically("city")}
                >
                  City <SortDirection state={sortStates.city} />
                </th>
                <th
                  className="flex justify-center"
                  onClick={() => sortAlphabetically("state")}
                >
                  State <SortDirection state={sortStates.state} />
                </th>
                <th
                  className="flex justify-center"
                  onClick={() => sortNumbers("zipCode")}
                >
                  Zip Code <SortDirection state={sortStates.zipCode} />
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
                    <Employee
                      key={Math.random().toString()}
                      employee={employee}
                    />
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
        </React.Fragment>
      ) : (
        <p className="flex justify-center text-3xl font-bold mt-20">
          No employee to display
        </p>
      )}
    </section>
  );
};

export default EmployeesList;
